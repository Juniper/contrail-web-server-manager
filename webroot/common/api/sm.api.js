/*
 Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var commonUtils = require(process.mainModule.exports["corePath"] + '/src/serverroot/utils/common.utils'),
    config = require(process.mainModule.exports["corePath"] + '/config/config.global.js'),
    logutils = require(process.mainModule.exports["corePath"] + '/src/serverroot/utils/log.utils'),
    global = require(process.mainModule.exports["corePath"] + '/src/serverroot/common/global');

var sm = require('../../common/api/sm'),
    url = require('url'),
    qs = require('querystring');

var redis = require("redis"),
    redisServerPort = (config.redis_server_port) ? config.redis_server_port : global.DFLT_REDIS_SERVER_PORT,
    redisServerIP = (config.redis_server_ip) ? config.redis_server_ip : global.DFLT_REDIS_SERVER_IP,
    redisClient = redis.createClient(redisServerPort, redisServerIP);

redisClient.select(global.SM_DFLT_REDIS_DB, function(error) {
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

    sm.get(objectUrl, function(error, resultJSON) {
        if(error != null) {
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

    sm.get(objectUrl, function(error, resultJSON) {
        if(error != null) {
            commonUtils.handleJSONResponse({error: true, errorObj: error}, res);
        } else {
            resultJSON = fieldName != null ? resultJSON[fieldName] : resultJSON;
            commonUtils.handleJSONResponse(null, res, resultJSON);
        }
    });
};

exports.getObjects = getObjects;
exports.getObjectsDetails = getObjectsDetails;