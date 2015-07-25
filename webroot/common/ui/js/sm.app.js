/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var smwc, smwgc, smwdt, smwl, smwm, smwmc, smwu, smwru, smwp,
    smInitComplete = false;

require.config({
    baseUrl: smBaseDir,
    paths: {
        'sm-basedir': smBaseDir,
        'sm-constants': smBaseDir + '/common/ui/js/sm.constants',
        'sm-utils': smBaseDir + '/common/ui/js/sm.utils',
        'sm-labels': smBaseDir + '/common/ui/js/sm.labels',
        'sm-messages': smBaseDir + '/common/ui/js/sm.messages',
        'sm-model-config': smBaseDir + '/common/ui/js/sm.model.config',
        'sm-grid-config': smBaseDir + '/common/ui/js/sm.grid.config',
        'sm-detail-tmpls': smBaseDir + '/common/ui/js/sm.detail.tmpls',
        'sm-render': smBaseDir + '/common/ui/js/sm.render',
        'sm-parsers': smBaseDir + '/common/ui/js/sm.parsers',
        'sm-init': smBaseDir + '/common/ui/js/sm.init'
    },
    waitSeconds: 0
});

require(['sm-init'], function () {});