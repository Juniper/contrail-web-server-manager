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
    initSMWebCache();
});

function initSMWebCache() {
    var ajaxConfig = {type: "GET", cache: "true", url: smwc.URL_TAG_NAMES};
    contrail.ajaxHandler(ajaxConfig, function () {}, function (response) {
        for (var i = 0; response != null && i < response.length; i++) {
            smwc.CACHED_TAG_COLORS[response[i]] = i;
        }
    });
};
