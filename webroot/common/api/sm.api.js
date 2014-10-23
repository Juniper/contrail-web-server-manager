/*
 Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var commonUtils = require(process.mainModule.exports["corePath"] + '/src/serverroot/utils/common.utils'),
    logutils = require(process.mainModule.exports["corePath"] + '/src/serverroot/utils/log.utils');

var sm = require('../../common/api/sm'),
    constants = require('../../common/api/sm.constants'),
    cache = require('../../common/api/sm.cache'),
    messages = require('../../common/api/sm.messages'),
    url = require('url'),
    qs = require('querystring'),
    async = require('async'),
    _ = require('underscore');

function getObjects(req, res) {
    var objectName = req.param(constants.KEY_NAME),
        urlParts = url.parse(req.url, true),
        filterInNull = req.param(constants.KEY_FILTER_IN_NULL),
        objectUrl = '/' + objectName,
        qsObj = urlParts.query,
        responseArray, resultArray;

    filterInAllowedParams(qsObj);
    objectUrl += '?' + qs.stringify(qsObj);

    sm.get(objectUrl, function (error, responseJSON) {
        if (error != null) {
            commonUtils.handleJSONResponse(error, res);
        } else {
            responseArray = responseJSON[objectName];
            resultArray = filterObjectsDetails(responseArray, filterInNull);
            commonUtils.handleJSONResponse(null, res, responseArray);
        }
    });
};

function getObjectsDetails(req, res) {
    var objectName = req.param(constants.KEY_NAME),
        filterInNull = req.param(constants.KEY_FILTER_IN_NULL),
        postProcessor = req.param(constants.KEY_POST_PROCESSOR),
        urlParts = url.parse(req.url, true),
        objectUrl = '/' + objectName,
        qsObj = urlParts.query,
        responseArray, filteredResponseArray, resultArray;

    filterInAllowedParams(qsObj);
    objectUrl += '?detail&' + qs.stringify(qsObj);

    sm.get(objectUrl, function (error, responseJSON) {
        if (error != null) {
            commonUtils.handleJSONResponse(error, res);
        } else {
            responseArray = responseJSON[objectName];
            filteredResponseArray = filterObjectsDetails(responseArray, filterInNull);
            resultArray = processResultsCB(res, filteredResponseArray, postProcessor);
        }
    });
};

function processResultsCB(res, filteredResponseArray, postProcessor) {
    switch (postProcessor) {
        case constants.FUNC_COMPUTE_SERVER_STATES:
            computeServerStates(res, filteredResponseArray);
            break;

        case constants.FUNC_FILTER_IN_IMAGES:
            filterImagesPackages(res, filteredResponseArray, constants.IMAGE_TYPES);
            break;

        case constants.FUNC_FILTER_IN_PACKAGES:
            filterImagesPackages(res, filteredResponseArray, constants.PACKAGE_TYPES);
            break;

        default:
            commonUtils.handleJSONResponse(null, res, filteredResponseArray);
    }
};

function computeServerStates(res, filteredResponseArray) {
    var objectUrl = constants.URL_SERVERS_DETAILS,
        responseArray;

    sm.get(objectUrl, function (error, responseJSON) {
        var clusterStatusMap = {}, clusterId, serverStatus,
            cluster, clusterStatus, totalServers;

        if (error != null) {
            commonUtils.handleJSONResponse(error, res);
        } else {
            responseArray = responseJSON[constants.KEY_SERVER];
            for (var i = 0; i < responseArray.length; i++) {
                clusterId = responseArray[i][constants.KEY_CLUSTER_ID];
                serverStatus = responseArray[i][constants.KEY_STATUS];

                if (clusterId == null || clusterId == '') {
                    clusterId = constants.KEY_EMPTY_CLUSTER;
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
                clusterId = cluster[constants.KEY_ID];
                clusterStatus = clusterStatusMap[clusterId];
                if (clusterStatus != null) {
                    clusterStatus['total_servers'] = getTotalServers4Cluster(clusterStatus);
                    clusterStatus['new_servers'] = getNewServers4Cluster(clusterStatus);
                    clusterStatus['configured_servers'] = getConfiguredServers4Cluster(clusterStatus);
                    clusterStatus['provisioned_servers'] = getProvisionedServers4Cluster(clusterStatus);
                    clusterStatus['inprovision_servers'] = clusterStatus['total_servers'] - clusterStatus['new_servers'] - clusterStatus['configured_servers'] - clusterStatus['provisioned_servers'];
                    filteredResponseArray[j] = _.extend(cluster, {ui_added_parameters: {servers_status: clusterStatus}});
                } else {
                    filteredResponseArray[j] = _.extend(cluster, {ui_added_parameters: {servers_status: {total_servers: 0, new_servers: 0, configured_servers: 0, provisioned_servers: 0, inprovision_servers: 0}}});
                }
            }
            commonUtils.handleJSONResponse(null, res, filteredResponseArray);
        }
    });
};

function getNewServers4Cluster(clusterStatus) {
    var newServers = 0;
    if (clusterStatus['server_discovered'] != null) {
        newServers = clusterStatus['server_discovered'];
    }
    return newServers;
};

function getConfiguredServers4Cluster(clusterStatus) {
    var configuredServers = 0;
    if (clusterStatus['server_added'] != null) {
        configuredServers = clusterStatus['server_added'];
    }
    return configuredServers;
};

function getProvisionedServers4Cluster(clusterStatus) {
    var provisionedServers = 0;
    if (clusterStatus['provision_completed'] != null) {
        provisionedServers = clusterStatus['provision_completed'];
    }
    return provisionedServers;
};

function getTotalServers4Cluster(clusterStatus) {
    var totalServers = 0;
    for (var key in clusterStatus) {
        totalServers += clusterStatus[key];
    }
    return totalServers;
};

function filterImagesPackages(res, filteredResponseArray, types) {
    var image, type, responseArray = [];
    for (var i = 0; i < filteredResponseArray.length; i++) {
        image = filteredResponseArray[i];
        type = image['type'];
        if (types.indexOf(type) != -1) {
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
    var objectName = req.param(constants.KEY_NAME),
        objectUrl = '/' + objectName,
        postData = req.body;

    sm.put(objectUrl, postData, appdata, function (error, resultJSON) {
        if (error != null) {
            commonUtils.handleJSONResponse(error, res);
        } else {
            commonUtils.handleJSONResponse(null, res, resultJSON);
        }
    });

    cache.deleteRedisCache(constants.REDIS_TAG_VALUES);
};

// POST method of web-server api should be used only to create new objects; it checks for duplicate id.
// To create objects use PUT method of web-server api.
function postObjects(req, res, appdata) {
    var objectName = req.param(constants.KEY_NAME),
        objectUrl = '/' + objectName,
        postData = req.body;

    check4DuplicateId(res, objectName, postData[objectName][0]['id'], function () {
        sm.put(objectUrl, postData, appdata, function (error, resultJSON) {
            if (error != null) {
                commonUtils.handleJSONResponse(error, res);
            } else {
                commonUtils.handleJSONResponse(null, res, resultJSON);
            }
        });
    });
};

function deleteObjects(req, res, appdata) {
    var objectName = req.param(constants.KEY_NAME),
        urlParts = url.parse(req.url, true),
        objectUrl = '/' + objectName,
        qsObj = urlParts.query,
        responseArray, resultArray;

    filterInAllowedParams(qsObj);
    objectUrl += '?' + qs.stringify(qsObj);

    sm.del(objectUrl, appdata, function (error, responseJSON) {
        if (error != null) {
            commonUtils.handleJSONResponse(error, res);
        } else {
            commonUtils.handleJSONResponse(null, res, responseArray);
        }
    });
};

function provision(req, res, appdata) {
    var provisionUrl = '/server/provision',
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
                commonUtils.handleJSONResponse(error, res);
            } else {
                commonUtils.handleJSONResponse(null, res, results);
            }
        });
    } else {
        commonUtils.handleJSONResponse({"custom": true, "responseCode": global.HTTP_STATUS_BAD_REQUEST, "message": messages.ERROR_POST_DATA_NULL}, res);
    }
};

function reimage(req, res, appdata) {
    var provisionUrl = '/server/reimage',
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
                commonUtils.handleJSONResponse(error, res);
            } else {
                commonUtils.handleJSONResponse(null, res, results);
            }
        });
    } else {
        commonUtils.handleJSONResponse({"custom": true, "responseCode": global.HTTP_STATUS_BAD_REQUEST, "message": messages.ERROR_POST_DATA_NULL}, res);
    }
};

function getTagValues(req, res) {
    var tagName = req.param(constants.KEY_NAME),
        objectUrl = constants.URL_SERVERS_DETAILS,
        urlParts = url.parse(req.url, true),
        qsObj = urlParts.query;

    filterInAllowedParams(qsObj);
    objectUrl += '&' + qs.stringify(qsObj);

    cache.handleTagValues(res, objectUrl, tagName);
};

function getTagNames(req, res) {
    if (cache.TAG_NAMES.length == 0) {
        cache.initTagNamesCache(function () {
            commonUtils.handleJSONResponse(null, res, cache.TAG_NAMES);
        });
    } else {
        commonUtils.handleJSONResponse(null, res, cache.TAG_NAMES);
    }
};

function filterInAllowedParams(qsObj) {
    for (var key in qsObj) {
        if (constants.ALLOWED_FORWARDING_PARAMS.indexOf(key) == -1) {
            delete qsObj[key];
        }
    }
};

function check4DuplicateId(res, objectName, id, callback) {
    var objectUrl = '/' + objectName + '?id=' + id;

    sm.get(objectUrl, function (error, responseJSON) {
        if (error != null) {
            logutils.logger.error(error.stack);
            commonUtils.handleJSONResponse(error, res);
        } else if (responseJSON[objectName] && responseJSON[objectName].length == 0) {
            callback();
        } else {
            commonUtils.handleJSONResponse({"custom": true, "responseCode": global.HTTP_STATUS_BAD_REQUEST, "message": messages.ERROR_DUPLICATE_OBJ_ID}, res);
        }
    });
};

exports.getObjects = getObjects;
exports.putObjects = putObjects;
exports.postObjects = postObjects;
exports.deleteObjects = deleteObjects;
exports.getObjectsDetails = getObjectsDetails;
exports.getTagValues = getTagValues;
exports.getTagNames = getTagNames;
exports.provision = provision;
exports.reimage = reimage;