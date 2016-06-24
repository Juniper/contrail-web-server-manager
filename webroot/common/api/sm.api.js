/*
 Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var commonUtils = require(process.mainModule.exports["corePath"] + '/src/serverroot/utils/common.utils'),
    logutils = require(process.mainModule.exports["corePath"] + '/src/serverroot/utils/log.utils');

var sm = require('../../common/api/sm'),
    introspect = require('../../common/api/introspect.api'),
    smConstants = require('../../common/api/sm.constants'),
    smCache = require('../../common/api/sm.cache'),
    smMessages = require('../../common/api/sm.messages'),
    url = require('url'),
    qs = require('querystring'),
    async = require('async'),
    jsonPath = require('JSONPath').eval,
    _ = require('underscore');

var rest = require(process.mainModule.exports["corePath"] + '/src/serverroot/common/rest.api'),
    smConfig = require('../../common/api/sm.config'),
    analytics = rest.getAPIServer({apiName:global.label.OPS_API_SERVER, server:smConfig.sm.analytics_ip, port:smConfig.sm.analytics_port });

function getObjects(req, res) {
    var objectName = req.param(smConstants.KEY_NAME),
        urlParts = url.parse(req.url, true),
        filterInNull = req.param(smConstants.KEY_FILTER_IN_NULL),
        objectUrl = '/' + objectName,
        qsObj = urlParts.query,
        responseArray, resultArray;

    filterInAllowedParams(qsObj);
    objectUrl += '?' + qs.stringify(qsObj);

    sm.get(objectUrl, function (error, responseJSON) {
        if (error != null) {
            commonUtils.handleJSONResponse(formatErrorMessage(error), res);
        } else {
            responseArray = responseJSON[objectName];
            resultArray = filterObjectsDetails(responseArray, filterInNull);
            commonUtils.handleJSONResponse(null, res, responseArray);
        }
    });
};

function getObjectsDetails(req, res) {
    var objectName = req.param(smConstants.KEY_NAME),
        filterInNull = req.param(smConstants.KEY_FILTER_IN_NULL),
        postProcessor = req.param(smConstants.KEY_POST_PROCESSOR),
        urlParts = url.parse(req.url, true),
        objectUrl = '/' + objectName,
        qsObj = urlParts.query,
        responseArray, filteredResponseArray, resultArray;

    filterInAllowedParams(qsObj);
    // add show_pass field as we need passwords from SM backend
    objectUrl += '?detail&show_pass&' + qs.stringify(qsObj);

    sm.get(objectUrl, function (error, responseJSON) {
        if (error != null) {
            commonUtils.handleJSONResponse(formatErrorMessage(error), res);
        } else {
            responseArray = responseJSON[objectName];
            filteredResponseArray = filterObjectsDetails(responseArray, filterInNull);
            resultArray = processResultsCB(res, filteredResponseArray, postProcessor);
        }
    });
};

function processResultsCB(res, filteredResponseArray, postProcessor) {
    switch (postProcessor) {
        case smConstants.FUNC_COMPUTE_SERVER_STATES:
            computeServerStates(res, filteredResponseArray);
            break;

        case smConstants.FUNC_FILTER_IN_IMAGES:
            filterImagesPackages(res, filteredResponseArray, smConstants.IMAGE_TYPES, smConstants.KEY_IMAGE);
            break;

        case smConstants.FUNC_FILTER_IN_PACKAGES:
            filterImagesPackages(res, filteredResponseArray, smConstants.PACKAGE_TYPES, smConstants.KEY_PACKAGE);
            break;

        case smConstants.FUNC_FILTER_IN_CONTRAIL_CONTROLLER_PACKAGES:
            filterImagesPackages(res, filteredResponseArray, smConstants.CONTRAIL_CONTROLLER_PACKAGE_TYPES, smConstants.KEY_PACKAGE);
            break;

        case smConstants.FUNC_FILTER_IN_CONTRAIL_STORAGE_PACKAGES:
            filterImagesPackages(res, filteredResponseArray, smConstants.CONTRAIL_STORAGE_PACKAGE_TYPES, smConstants.KEY_PACKAGE);
            break;

        default:
            commonUtils.handleJSONResponse(null, res, filteredResponseArray);
    }
};

function computeServerStates(res, filteredResponseArray) {
    var objectUrl = smConstants.URL_SERVERS_STATUS,
        responseArray;

    sm.get(objectUrl, function (error, responseJSON) {
        var clusterStatusMap = {}, clusterId, serverStatus,
            cluster, clusterStatus, totalServers;

        if (error != null) {
            commonUtils.handleJSONResponse(formatErrorMessage(error), res);
        } else {
            responseArray = responseJSON[smConstants.KEY_SERVER];
            for (var i = 0; i < responseArray.length; i++) {
                clusterId = responseArray[i][smConstants.KEY_CLUSTER_ID];
                serverStatus = responseArray[i][smConstants.KEY_STATUS];

                if (clusterId == null || clusterId == '') {
                    clusterId = smConstants.KEY_EMPTY_CLUSTER;
                }

                if (clusterStatusMap[clusterId] == null) {
                    clusterStatusMap[clusterId] = {};
                }

                if (clusterStatusMap[clusterId][serverStatus] == null) {
                    clusterStatusMap[clusterId][serverStatus] = 0;
                }

                clusterStatusMap[clusterId][serverStatus]++;
            }

            for (var j = 0; j < filteredResponseArray.length; j++) {
                cluster = filteredResponseArray[j];
                clusterId = cluster[smConstants.KEY_ID];
                clusterStatus = clusterStatusMap[clusterId];
                if (clusterStatus != null) {
                    clusterStatus['total_servers'] = getTotalServers4Cluster(clusterStatus);
                    clusterStatus['new_servers'] = getServerCount4State(clusterStatus, 'server_discovered');
                    clusterStatus['configured_servers'] = getServerCount4State(clusterStatus, 'server_added');
                    clusterStatus['provisioned_servers'] = getServerCount4State(clusterStatus, 'provision_completed');
                    clusterStatus['inreimage_servers'] = getServerCount4State(clusterStatus, 'reimage_started') + getServerCount4State(clusterStatus, 'restart_issued');
                    clusterStatus['reimaged_servers'] = getServerCount4State(clusterStatus, 'reimage_completed');
                    clusterStatus['inprovision_servers'] = clusterStatus['total_servers'] - clusterStatus['new_servers'] - clusterStatus['configured_servers'] - clusterStatus['provisioned_servers'] - clusterStatus['inreimage_servers'] - clusterStatus['reimaged_servers'];
                    filteredResponseArray[j] = _.extend(cluster, {ui_added_parameters: {servers_status: clusterStatus}});
                } else {
                    filteredResponseArray[j] = _.extend(cluster, {ui_added_parameters: {servers_status: {total_servers: 0, new_servers: 0, configured_servers: 0, inreimage_servers: 0, reimaged_servers: 0, inprovision_servers: 0, provisioned_servers: 0}}});
                }
            }
            commonUtils.handleJSONResponse(null, res, filteredResponseArray);
        }
    });
};

function getTotalServers4Cluster(clusterStatus) {
    var totalServers = 0;
    for (var key in clusterStatus) {
        totalServers += clusterStatus[key];
    }
    return totalServers;
};

function getServerCount4State(clusterStatus, state) {
    var serverCount = 0;
    if (clusterStatus[state] != null) {
        serverCount = clusterStatus[state];
    }
    return serverCount;
};

function filterImagesPackages(res, filteredResponseArray, types, imageCategory) {
    var image, type, responseArray = [], category;
    for (var i = 0; i < filteredResponseArray.length; i++) {
        image = filteredResponseArray[i];
        type = image['type'];
        category = image['category'];
        if((category == null || category == imageCategory) && types.indexOf(type) != -1) {
            responseArray.push(image);
        }
    }
    commonUtils.handleJSONResponse(null, res, responseArray);
};

function filterObjectsDetails(responseArray, filterInNull) {
    var resultArray = [];
    if (filterInNull != null) {
        for (var i = 0; i < responseArray.length; i++) {
            if (responseArray[i][filterInNull] == null || responseArray[i][filterInNull] == '') {
                resultArray.push(responseArray[i]);
            }
        }
        return resultArray;
    } else {
        return responseArray;
    }
};

// PUT method of web-server api should be used only to edit object.
// To create new objects use POST method of web-server api.
function putObjects(req, res, appdata) {
    var objectName = req.param(smConstants.KEY_NAME),
        objectUrl = '/' + objectName,
        postData = req.body;

    sm.put(objectUrl, postData, appdata, function (error, resultJSON) {
        if (error != null) {
            commonUtils.handleJSONResponse(formatErrorMessage(error), res);
        } else {
            commonUtils.handleJSONResponse(null, res, resultJSON);
        }
    });

    smCache.deleteRedisCache(smConstants.REDIS_TAG_VALUES);
};

// POST method of web-server api should be used only to create new objects; it checks for duplicate id.
// To create objects use PUT method of web-server api.
function postObjects(req, res, appdata) {
    var objectName = req.param(smConstants.KEY_NAME),
        objectUrl = '/' + objectName,
        postData = req.body;

    check4DuplicateId(res, objectName, postData[objectName][0]['id'], function () {
        sm.put(objectUrl, postData, appdata, function (error, resultJSON) {
            if (error != null) {
                commonUtils.handleJSONResponse(formatErrorMessage(error), res);
            } else {
                commonUtils.handleJSONResponse(null, res, resultJSON);
            }
        });
    });
};

function deleteObjects(req, res, appdata) {
    var objectName = req.param(smConstants.KEY_NAME),
        urlParts = url.parse(req.url, true),
        objectUrl = '/' + objectName,
        qsObj = urlParts.query,
        responseArray, resultArray;

    filterInAllowedParams(qsObj);
    objectUrl += '?' + qs.stringify(qsObj);

    sm.del(objectUrl, appdata, function (error, responseJSON) {
        if (error != null) {
            commonUtils.handleJSONResponse(formatErrorMessage(error), res);
        } else {
            commonUtils.handleJSONResponse(null, res, responseArray);
        }
    });
};

function provision(req, res, appdata) {
    var provisionUrl = smConstants.PROVISON_URL,
        postData = req.body;

    if (postData != null) {
        async.map(postData, function (item, callback) {
            sm.post(provisionUrl, item, appdata, function (error, resultJSON) {
                if (error != null) {
                    callback(error);
                } else {
                    callback(null, resultJSON);
                }
            });
        }, function (error, results) {
            if (error != null) {
                commonUtils.handleJSONResponse(formatErrorMessage(error), res);
            } else {
                commonUtils.handleJSONResponse(null, res, results);
            }
        });
    } else {
        commonUtils.handleJSONResponse({"custom": true, "responseCode": global.HTTP_STATUS_BAD_REQUEST, "message": smMessages.ERROR_POST_DATA_NULL}, res);
    }
};

function reimage(req, res, appdata) {
    var reimageUrl = smConstants.REIMAGE_URL,
        postData = req.body;

    if (postData != null) {
        async.map(postData, function (item, callback) {
            sm.post(reimageUrl, item, appdata, function (error, resultJSON) {
                if (error != null) {
                    callback(error);
                } else {
                    callback(null, resultJSON);
                }
            });
        }, function (error, results) {
            if (error != null) {
                commonUtils.handleJSONResponse(formatErrorMessage(error), res);
            } else {
                commonUtils.handleJSONResponse(null, res, results);
            }
        });
    } else {
        commonUtils.handleJSONResponse({"custom": true, "responseCode": global.HTTP_STATUS_BAD_REQUEST, "message": smMessages.ERROR_POST_DATA_NULL}, res);
    }
};

function getTagValues(req, res) {
    var tagName = req.param(smConstants.KEY_NAME),
        objectUrl = smConstants.URL_SERVERS_DETAILS,
        urlParts = url.parse(req.url, true),
        qsObj = urlParts.query;

    filterInAllowedParams(qsObj);
    objectUrl += '&' + qs.stringify(qsObj);

    smCache.handleTagValues(res, objectUrl, tagName);
};

function getTagNames(req, res) {
    if (smCache.TAG_NAMES.length == 0) {
        smCache.initTagNamesCache(function () {
            commonUtils.handleJSONResponse(null, res, smCache.TAG_NAMES);
        });
    } else {
        commonUtils.handleJSONResponse(null, res, smCache.TAG_NAMES);
    }
};

function getChassisIds(req, res) {
    var chassisIdUrl = smConstants.CHASSIS_ID_URL;

    sm.get(chassisIdUrl, function (error, responseJSON) {
        if (error) {
            commonUtils.handleJSONResponse(null, res, []);
            logutils.logger.error(error.stack);
        } else {
            commonUtils.handleJSONResponse(null, res, responseJSON['chassis_id']);
        }
    });
};

function getServerIPMIInfo (req, res) {
    var serverId = req.param("id"),
        url = smConstants.SM_IPMI_INFO_INTROSPECT_URL,
        ipmiInfo, formattedResult = [], sensorStats;

    introspect.get(url, function(error, result) {
        if(error) {
            logutils.logger.error(error.stack);
            commonUtils.handleJSONResponse(formatErrorMessage(error), res);
        } else {
            ipmiInfo = jsonPath(result, "$..smipmiinfo");
            for(var i = 0; i < ipmiInfo.length; i++) {
                sensorStats = ipmiInfo[i];
                if(sensorStats['name'] == serverId) {
                    formattedResult = sensorStats['sensor_state']['list']['ipmisensor'];
                    break;
                }
            }
            commonUtils.handleJSONResponse(null, res, formattedResult);
        }
    });
};

function getServerManagerMonitoringConfig (req, res) {
    var monitoringUrl = smConstants.SM_MONITORING_CONF_URL;

    sm.get(monitoringUrl, commonUtils.doEnsureExecution(function(error, result) {
        if(error) {
            logutils.logger.error(error.stack);
            commonUtils.handleJSONResponse(formatErrorMessage(error), res);
        } else {
            commonUtils.handleJSONResponse(null, res, result);
        }
    }, global.DEFAULT_CB_TIMEOUT));
};


function getMonitoringInfoSummary4Servers (req, res) {
    var urlParts = url.parse(req.url, true),
        qsObj = urlParts.query,
        monitoringUrl;

    filterInAllowedParams(qsObj);
    monitoringUrl = smConstants.SM_MONITORING_SUMMARY_INFO_URL + '?' + qs.stringify(qsObj);

    sm.get(monitoringUrl, commonUtils.doEnsureExecution(function(error, result) {
        if(error) {
            logutils.logger.error(error.stack);
            commonUtils.handleJSONResponse(formatErrorMessage(error), res);
        } else {
            commonUtils.handleJSONResponse(null, res, result);
        }
    }, global.DEFAULT_CB_TIMEOUT));
};

function getMonitoringInfo4Servers (req, res) {
    var urlParts = url.parse(req.url, true),
        qsObj = urlParts.query,
        monitoringUrl;

    filterInAllowedParams(qsObj);
    monitoringUrl = smConstants.SM_MONITORING_INFO_URL + '?' + qs.stringify(qsObj);

    sm.get(monitoringUrl, commonUtils.doEnsureExecution(function(error, result) {
        if(error) {
            logutils.logger.error(error.stack);
            commonUtils.handleJSONResponse(formatErrorMessage(error), res);
        } else {
            commonUtils.handleJSONResponse(null, res, result);
        }
    }, global.DEFAULT_CB_TIMEOUT));
};

function getInventoryInfo4Servers (req, res) {
    var urlParts = url.parse(req.url, true),
        qsObj = urlParts.query,
        inventoryUrl;

    filterInAllowedParams(qsObj);
    inventoryUrl = smConstants.SM_INVENTORY_INFO_URL + '?' + qs.stringify(qsObj);

    sm.get(inventoryUrl, commonUtils.doEnsureExecution(function(error, result) {
        if(error) {
            logutils.logger.error(error.stack);
            commonUtils.handleJSONResponse(formatErrorMessage(error), res);
        } else {
            commonUtils.handleJSONResponse(null, res, result);
        }
    }, global.DEFAULT_CB_TIMEOUT));
};

function runInventory(req, res, appdata) {
    var urlParts = url.parse(req.url, true),
        qsObj = urlParts.query, runInventoryUrl, postData = {};

    filterInAllowedParams(qsObj);
    runInventoryUrl = smConstants.SM_RUN_INVENTORY_URL + '?' + qs.stringify(qsObj);

    sm.post(runInventoryUrl, postData, appdata, function (error, resultJSON) {
        if (error != null) {
            logutils.logger.error(error.stack);
            commonUtils.handleJSONResponse(formatErrorMessage(error), res);
        } else {
            commonUtils.handleJSONResponse(null, res, resultJSON);
        }
    });
};

function filterInAllowedParams(qsObj) {
    for (var key in qsObj) {
        if (smConstants.ALLOWED_FORWARDING_PARAMS.indexOf(key) == -1) {
            delete qsObj[key];
        }
    }
};

function check4DuplicateId(res, objectName, id, callback) {
    var objectUrl = '/' + objectName + '?id=' + id;

    sm.get(objectUrl, function (error, responseJSON) {
        if (error != null) {
            logutils.logger.error(error.stack);
            commonUtils.handleJSONResponse(formatErrorMessage(error), res);
        } else if (responseJSON[objectName] && responseJSON[objectName].length == 0) {
            callback();
        } else {
            commonUtils.handleJSONResponse({"custom": true, "responseCode": global.HTTP_STATUS_BAD_REQUEST, "message": smMessages.get(smMessages.ERROR_DUPLICATE_OBJ_ID, objectName)}, res);
        }
    });
};

function formatErrorMessage(error) {
    var message;
    if (error['message'] != null) {
        try {
            message = JSON.parse(error['message']);
            if (message['return_msg'] != null) {
                error['message'] = message['return_msg'];
            }
        } catch (error) {
            //Ignore
        }
    }
    return error;
}

exports.getObjects = getObjects;
exports.putObjects = putObjects;
exports.postObjects = postObjects;
exports.deleteObjects = deleteObjects;
exports.getObjectsDetails = getObjectsDetails;
exports.getTagValues = getTagValues;
exports.getTagNames = getTagNames;
exports.getChassisIds = getChassisIds;
exports.getServerIPMIInfo = getServerIPMIInfo;
exports.getMonitoringInfoSummary4Servers = getMonitoringInfoSummary4Servers;
exports.getMonitoringInfo4Servers = getMonitoringInfo4Servers;
exports.getInventoryInfo4Servers = getInventoryInfo4Servers;
exports.runInventory = runInventory;
exports.getServerManagerMonitoringConfig = getServerManagerMonitoringConfig;
exports.provision = provision;
exports.reimage = reimage;