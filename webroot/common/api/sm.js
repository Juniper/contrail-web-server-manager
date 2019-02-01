/*
 Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */


var rest = require(process.mainModule.exports.corePath + "/src/serverroot/common/rest.json.api"),
    logutils = require(process.mainModule.exports.corePath + "/src/serverroot/utils/log.utils");

var smConfig = require("../../common/api/sm.config"),
    smConstants = require("../../common/api/sm.constants"),
    sm = module.exports;

var smServerIP = smConfig.sm.server_ip,
    smServerPort = smConfig.sm.server_port;

var smREST = rest.getAPIServer({
    apiName: smConstants.SM_API_SERVER,
    server: smServerIP,
    port: smServerPort
});

var SANITIZE_KEYS = [
    "impi_password",
    "adminPass",
    "admin_pass",
    "password",
    "admin_password",
    "admin_key",
    "storage_mon_secret",
    "keystone_password"
];
var SANITIZE_PATTERNS = [];

function patternStr(key) {
    return '"(.*?' + key + ')":"([^"]*)"';
};

for (var i = 0, iLen = SANITIZE_KEYS.length; i < iLen; i++) {
    SANITIZE_PATTERNS.push(new RegExp(patternStr(SANITIZE_KEYS[i]), "img"));
}

function sanitizedDataString(data) {
    return SANITIZE_PATTERNS.reduce(function (prevDataStr, pattern) {
        return prevDataStr.replace(pattern, function (_, key) {
            return ['"', key, '":"<hidden from log>"'].join();
        });
    }, JSON.stringify(data));
}

function get(url, callback) {
    logutils.logger.debug("TRANSACTION - ACTION - GET - " + url);
    smREST.api.get(url, function (err, data) {
        logutils.logger.info("TRANSACTION - ACTION - GET - RESPONSE: " + sanitizedDataString(data));
        callback(err, data);
    });
}

function put(url, putData, appData, callback) {
    logutils.logger.debug("TRANSACTION - ACTION - PUT - " + url + " PUT DATA: " + sanitizedDataString(putData));
    smREST.api.put(url, putData, function (err, data) {
        logutils.logger.debug("TRANSACTION - ACTION - PUT - RESPONSE: " + sanitizedDataString(data));
        callback(err, data);
    });
}

function post(url, postData, appData, callback) {
    logutils.logger.debug("TRANSACTION - ACTION - POST - " + url + " POST DATA: " + sanitizedDataString(postData));
    smREST.api.post(url, postData, function (err, data) {
        logutils.logger.debug("TRANSACTION - ACTION - POST - RESPONSE: " + sanitizedDataString(data));
        callback(err, data);
    });
}

function del(url, appData, callback) {
    logutils.logger.debug("TRANSACTION - ACTION - DELETE - " + url);
    smREST.api.delete(url, function (err, data) {
        logutils.logger.debug("TRANSACTION - ACTION - DELETE - RESPONSE: " + sanitizedDataString(data));
        callback(err, data);
    });
}

exports.get = get;
exports.put = put;
exports.post = post;
exports.del = del;


