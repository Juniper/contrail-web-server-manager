/*
 Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var sm = module.exports,
    smConfig = require('../../common/api/sm.config'),
    rest = require(process.mainModule.exports["corePath"] + '/src/serverroot/common/rest.api'),
    assert = require('assert');

var smServerIP = smConfig.DFLT_SERVER_IP,
    smServerPort = smConfig.DFLT_SERVER_PORT;

if (smConfig.sm) {
    if (smConfig.sm.server_ip) {
        smServerIP = smConfig.sm.server_ip;
    }
    if (smConfig.sm.server_port) {
        smServerPort = smConfig.sm.server_port;
    }
}

var smREST = rest.getAPIServer({
    apiName: smConfig.SM_API_SERVER,
    server: smServerIP,
    port: smServerPort
});

function get(url, callback) {
    smREST.api.get(url, function (err, data) {
        callback(err, data);
    });
}

function put(url, putData, appData, callback) {
    smREST.api.put(url, putData, function (err, data) {
        callback(err, data);
    });
}

function post(url, postData, appData, callback) {
    smREST.api.post(url, postData, function (err, data) {
        callback(err, data);
    });
}

function del(url, appData, callback) {
    smREST.api.delete(url, function (err, data) {
        callback(err, data);
    });
}

exports.get = get;
exports.put = put;
exports.post = post;
exports.del = del;


