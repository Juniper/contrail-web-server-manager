/*
 Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var commonUtils = require(process.mainModule.exports["corePath"] + '/src/serverroot/utils/common.utils'),
    config = require(process.mainModule.exports["corePath"] + '/config/config.global.js'),
    logutils = require(process.mainModule.exports["corePath"] + '/src/serverroot/utils/log.utils'),
    global = require(process.mainModule.exports["corePath"] + '/src/serverroot/common/global');

var sm = require('../../common/api/sm'),
    constants = require('../../common/api/sm.constants')
url = require('url'),
    qs = require('querystring');

var redis = require("redis"),
    redisServerPort = (config.redis_server_port) ? config.redis_server_port : global.DFLT_REDIS_SERVER_PORT,
    redisServerIP = (config.redis_server_ip) ? config.redis_server_ip : global.DFLT_REDIS_SERVER_IP,
    redisClient = redis.createClient(redisServerPort, redisServerIP);

redisClient.select(global.SM_DFLT_REDIS_DB, function (error) {
    if (error) {
        logutils.logger.error('Redis DB ' + global.SM_DFLT_REDIS_DB + ' Select Error:' + error);
    }
});

function getObjects(req, res) {
    var objectName = req.param('name'),
        fieldName = req.param('field'),
        urlParts = url.parse(req.url, true),
        objectUrl = '/' + objectName,
        qsObj = urlParts.query;

    delete qsObj['field'];
    delete qsObj['_'];

    objectUrl += '?' + qs.stringify(qsObj);

    sm.get(objectUrl, function (error, resultJSON) {
        if (error != null) {
            commonUtils.handleJSONResponse({error: true, errorObj: error}, res);
        } else {
            resultJSON = fieldName != null ? resultJSON[fieldName] : resultJSON;
            commonUtils.handleJSONResponse(null, res, resultJSON);
        }
    });
};

function getObjectsDetails(req, res) {
    var objectName = req.param('name'),
        fieldName = req.param('field'),
        urlParts = url.parse(req.url, true),
        objectUrl = '/' + objectName,
        qsObj = urlParts.query;

    delete qsObj['field'];
    delete qsObj['_'];

    objectUrl += '?detail&' + qs.stringify(qsObj);

    sm.get(objectUrl, function (error, resultJSON) {
        if (error != null) {
            commonUtils.handleJSONResponse({error: true, errorObj: error}, res);
        } else {
            resultJSON = fieldName != null ? resultJSON[fieldName] : resultJSON;
            commonUtils.handleJSONResponse(null, res, resultJSON);
        }
    });
};

function putObjects(req, res, appdata) {
    var objectName = req.param('name'),
        objectUrl = '/' + objectName,
        postData = req.body;

    sm.put(objectUrl, postData, appdata, function (error, resultJSON) {
        if (error != null) {
            commonUtils.handleJSONResponse({error: true, errorObj: error}, res);
        } else {
            ;
            commonUtils.handleJSONResponse(null, res, resultJSON);
        }
    });
};

function postObjects(req, res, appdata) {
    var objectName = req.param('name'),
        objectUrl = '/' + objectName,
        postData = req.body;

    sm.post(objectUrl, postData, appdata, function (error, resultJSON) {
        if (error != null) {
            commonUtils.handleJSONResponse({error: true, errorObj: error}, res);
        } else {
            commonUtils.handleJSONResponse(null, res, resultJSON);
        }
    });
};

function getTagValues(req, res) {
    var tagName = req.param('name'),
        objectUrl = '/server?detail',
        responseJSON = {}, tagValues = {},
        redisKey;

    redisKey = constants.REDIS_TAG_VALUES;

    redisClient.get(redisKey, function (error, tagValuesStr) {
        if (error) {
            logutils.logger.error(error.stack);
            commonUtils.handleJSONResponse(error, res, null);
        } else if (tagValuesStr == null) {
            sm.get(objectUrl, function (error, resultJSON) {
                var keyValue, key, tags, servers;
                if (error != null) {
                    commonUtils.handleJSONResponse({error: true, errorObj: error}, res);
                } else {
                    servers = resultJSON['server'];
                    for (var i = 0; i < servers.length; i++) {
                        tags = servers[i]['tag'];
                        for (key in tags) {
                            if (tagValues[key] == null) {
                                tagValues[key] = [];
                            }
                            keyValue = tags[key];
                            if (tagValues[key].indexOf(keyValue) == -1) {
                                tagValues[key].push(keyValue);
                            }
                        }
                    }
                }
                responseJSON = (tagName != null) ? (tagValues[tagName] != null ? tagValues[tagName] : []) : tagValues;
                commonUtils.handleJSONResponse(null, res, responseJSON);
                redisClient.setex(redisKey, constants.REDIS_CACHE_EXPIRE, JSON.stringify(tagValues));

            });
        } else {
            tagValues = JSON.parse(tagValuesStr);
            responseJSON = (tagName != null) ? (tagValues[tagName] != null ? tagValues[tagName] : []) : tagValues;
            commonUtils.handleJSONResponse(null, res, responseJSON);
        }
    });
};

exports.getObjects = getObjects;
exports.putObjects = putObjects;
exports.postObjects = postObjects;
exports.getObjectsDetails = getObjectsDetails;
exports.getTagValues = getTagValues;