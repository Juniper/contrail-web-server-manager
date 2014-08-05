/*
 Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var smapi = module.exports,
    smConfig = require('../../common/api/sm.config'),
    rest = require(smConfig.core_path + '/src/serverroot/common/rest.api'),
    commonUtils = require(smConfig.core_path + '/src/serverroot/utils/common.utils'),
    assert = require('assert'),
    url = require('url'),
    qs = require('querystring');

var smServerIP = smConfig.DFLT_SERVER_IP;
var smServerPort = '9001';

if (smConfig.sm) {
    if (smConfig.sm.server_ip) {
        smServerIP = smConfig.sm.server_ip;
    }
    if (smConfig.sm.server_port) {
        smServerPort = smConfig.sm.server_port;
    }
}

var sm = rest.getAPIServer({
    apiName:smConfig.SM_API_SERVER,
    server: smServerIP,
    port: smServerPort
});

function apiGet(url, callback) {
    sm.api.get(url, function (err, data) {
        callback(err, data);
    });
}

function apiPut(url, putData, appData, callback) {
    sm.api.get(url, putData, function (err, data) {
        callback(err, data);
    });
}

function apiPost(url, postData, appData, callback) {
    sm.api.post(url, postData, function (err, data) {
        callback(err, data);
    });
}

function apiDelete(url, appData, callback) {
    sm.api.delete(url, function (err, data) {
        callback(err, data);
    });
}

function getObjects(req, res) {
    var objectName = req.param('name'),
        fieldName = req.param('field'),
        urlParts = url.parse(req.url, true),
        objectUrl = '/' + objectName,
        qsObj = urlParts.query;

    delete qsObj['field'];
    delete qsObj['_'];

    objectUrl += '?' + qs.stringify(qsObj);

    sm.api.get(objectUrl, function(error, resultJSON) {
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

    sm.api.get(objectUrl, function(error, resultJSON) {
        if(error != null) {
            commonUtils.handleJSONResponse({error: true, errorObj: error}, res);
        } else {
            resultJSON = fieldName != null ? resultJSON[fieldName] : resultJSON;
            if(objectName == 'vns') {
                parseStr2JSON(resultJSON, ['vns_params']);
            } else if (objectName == 'server') {
                parseStr2JSON(resultJSON, ['server_params']);
            }
            commonUtils.handleJSONResponse(null, res, resultJSON);
        }
    });
};

function parseStr2JSON(resultJSON, paramNames) {
    var paramName;
    for(var j = 0 ; j < paramNames.length; j++) {
        paramName = paramNames[j];
        for (var i = 0; i < resultJSON.length; i++) {
            if (resultJSON[i][paramName] != null) {
                var paramValue = resultJSON[i][paramName];
                try {
                    paramValue = paramValue.replace(new RegExp("u'", 'g'), "\"");
                    paramValue = paramValue.replace(new RegExp("'", 'g'), "\"")
                    resultJSON[i][paramName] = JSON.parse(paramValue);
                } catch (error) {
                    resultJSON[i][paramName] = paramValue.replace(new RegExp("u'", 'g'), "'");
                }
            }
        }
    }
}

exports.apiGet = apiGet;
exports.apiPut = apiPut;
exports.apiPost = apiPost;
exports.apiDelete = apiDelete;
exports.getObjects = getObjects;
exports.getObjectsDetails = getObjectsDetails;


