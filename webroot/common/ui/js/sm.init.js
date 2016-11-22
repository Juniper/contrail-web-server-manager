/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    "underscore",
    "sm-constants",
    "sm-utils",
    "sm-labels",
    "sm-messages",
    "sm-model-config",
    "sm-handlebars-helpers"
], function (_, smwc, SMUtils, Labels, Messages, DefaultModelConfig) {
    initSMWebCache();
    smwl = Labels;
    smwm = Messages;
    smwu = SMUtils;
    smwmc = DefaultModelConfig;
    //smwgc = GridConfig;
    //smwdt = new DetailTemplates();
    //smwp = new Parsers();
    var deferredObj;

    if(globalObj.initFeatureAppDefObjMap != null) {
        deferredObj = globalObj.initFeatureAppDefObjMap[FEATURE_PCK_WEB_SERVER_MANAGER];
    } else {
        deferredObj = contentHandler.initFeatureAppDefObjMap[FEATURE_PCK_WEB_SERVER_MANAGER];
    }

    if(contrail.checkIfExist(deferredObj)) {
        deferredObj.resolve();
    }

    function initSMWebCache() {
        var tagAjaxConfig = {type: "GET", cache: "true", url: smwc.SM_SERVER_MONITORING_CONFIG_URL};
        contrail.ajaxHandler(tagAjaxConfig, function () {}, function (response) {
            if(response != null && response.length > 0) {
                smwc.MONITORING_CONFIG = response[0]["config"];
            }
        });

        var smMonAjaxConfig = {type: "GET", cache: "true", url: smwc.URL_TAG_NAMES};
        contrail.ajaxHandler(smMonAjaxConfig, function () {}, function (response) {
            for (var i = 0; response != null && i < response.length; i++) {
                smwc.CACHED_TAG_COLORS[response[i]] = i;
            }
        });
    }
});
