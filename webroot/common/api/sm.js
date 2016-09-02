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

function get(url, callback) {
    logutils.logger.debug("TRANSACTION - ACTION - GET - " + url);
    smREST.api.get(url, function (err, data) {
        logutils.logger.info("TRANSACTION - ACTION - GET - RESPONSE: " + JSON.stringify(data));
        callback(err, data);
    });
}

function put(url, putData, appData, callback) {
    logutils.logger.debug("TRANSACTION - ACTION - PUT - " + url + " PUT DATA: " + JSON.stringify(putData));
    smREST.api.put(url, putData, function (err, data) {
        logutils.logger.debug("TRANSACTION - ACTION - PUT - RESPONSE: " + JSON.stringify(data));
        callback(err, data);
    });
}

function post(url, postData, appData, callback) {
    logutils.logger.debug("TRANSACTION - ACTION - POST - " + url + " POST DATA: " + JSON.stringify(postData));
    smREST.api.post(url, postData, function (err, data) {
        logutils.logger.debug("TRANSACTION - ACTION - POST - RESPONSE: " + JSON.stringify(data));
        callback(err, data);
    });
}

function del(url, appData, callback) {
    logutils.logger.debug("TRANSACTION - ACTION - DELETE - " + url);
    smREST.api.delete(url, function (err, data) {
        logutils.logger.debug("TRANSACTION - ACTION - DELETE - RESPONSE: " + JSON.stringify(data));
        callback(err, data);
    });
}

exports.get = get;
exports.put = put;
exports.post = post;
exports.del = del;


