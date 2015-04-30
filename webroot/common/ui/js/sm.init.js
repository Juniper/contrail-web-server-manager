/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'sm-constants',
    'sm-utils',
    'sm-labels',
    'sm-messages',
    'sm-model-config',
    'sm-grid-config',
    'sm-detail-tmpls',
    'sm-parsers'
], function (_, Constants, SMUtils, Labels, Messages, DeafultModelConfig, GridConfig, DetailTemplates, Parsers) {
    smwc = new Constants();
    initSMWebCache();
    smwl = new Labels();
    smwm = new Messages();
    smwu = new SMUtils();
    smwmc = new DeafultModelConfig();
    smwgc = new GridConfig();
    smwdt = new DetailTemplates();
    smwp = new Parsers();
    requirejs(['sm-render'], function(SMRenderUtils) {
        smwru = new SMRenderUtils();
        smInitComplete = true;
    });
});

function initSMWebCache() {
    var tagAjaxConfig = {type: "GET", cache: "true", url: smwc.SM_SERVER_MONITORING_CONFIG_URL};
    contrail.ajaxHandler(tagAjaxConfig, function () {}, function (response) {
        if(response != null && response.length > 0) {
            smwc.MONITORING_CONFIG = response[0]['config'];
        }
    });

    var smMonAjaxConfig = {type: "GET", cache: "true", url: smwc.URL_TAG_NAMES};
    contrail.ajaxHandler(smMonAjaxConfig, function () {}, function (response) {
        for (var i = 0; response != null && i < response.length; i++) {
            smwc.CACHED_TAG_COLORS[response[i]] = i;
        }
    });
};
