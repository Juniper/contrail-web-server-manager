/*
 Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */


var rest = require(process.mainModule.exports["corePath"] + "/src/serverroot/common/rest.api");

var smConfig = require("../../common/api/sm.config"),
    smConstants = require("../../common/api/sm.constants"),
    introspect = module.exports;

var smIntrospectIP = smConfig.sm.introspect_ip,
    smIntrospectPort = smConfig.sm.introspect_port;

var xml2jsSettings = {
    normalizeTags: true,
    ignoreAttrs: true,
    mergeAttrs: true,
    explicitArray:false
};

var smIntrospect = rest.getAPIServer({
    apiName: smConstants.SM_INTROSPECT_SERVER,
    server: smIntrospectIP,
    port: smIntrospectPort,
    xml2jsSettings: xml2jsSettings
});

function get(url, callback) {
    smIntrospect.api.get(url, function (err, data) {
        callback(err, data);
    });
}

exports.get = get;


