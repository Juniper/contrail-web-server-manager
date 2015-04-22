/*
 Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */


var  rest = require(process.mainModule.exports["corePath"] + '/src/serverroot/common/rest.json.api');

var smConfig = require('../../common/api/sm.config'),
    smConstants = require('../../common/api/sm.constants'),
    assert = require('assert');
    sm = module.exports;

var smServerIP = smConfig.sm.server_ip,
    smServerPort = smConfig.sm.server_port;

var smREST = rest.getAPIServer({
    apiName: smConstants.SM_API_SERVER,
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


