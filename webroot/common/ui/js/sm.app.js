/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var smwc, smwgc, smwdt, smwl, smwm, smwmc, smwu, smwru, smwp, smInitComplete = false;

require.config({
    baseUrl: '/',
    paths: {
        'sm-constants': 'common/ui/js/sm.constants',
        'sm-utils': 'common/ui/js/sm.utils',
        'sm-labels': 'common/ui/js/sm.labels',
        'sm-messages': 'common/ui/js/sm.messages',
        'sm-model-config': 'common/ui/js/sm.model.config',
        'sm-grid-config': 'common/ui/js/sm.grid.config',
        'sm-detail-tmpls': 'common/ui/js/sm.detail.tmpls',
        'sm-render': 'common/ui/js/sm.render',
        'sm-parsers': 'common/ui/js/sm.parsers',
        'sm-init': '/common/ui/js/sm.init'
    },
    waitSeconds: 0
});