/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'sm-constants',
    'sm-utils',
    'sm-grid-config',
    'sm-labels',
    'sm-messages',
    'sm-model-config'
], function (_, Constants, SMUtils, GridConfig, Labels, Messages, DeafultModelConfig) {
    smwc = new Constants();
    smwu = new SMUtils();
    smwl = new Labels();
    smwm = new Messages();
    smwgc = new GridConfig();
    smwmc = new DeafultModelConfig();
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
