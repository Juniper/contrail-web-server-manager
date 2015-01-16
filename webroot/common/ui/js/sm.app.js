/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var smwc, smwgc, smwl, smwm, smwmc, smwu, smInitComplete = false;

require.config({
    baseUrl: '/',
    paths: {
        'sm-constants': 'common/ui/js/sm.constants',
        'sm-grid-config': 'common/ui/js/sm.grid.config',
        'sm-utils': 'common/ui/js/sm.utils',
        'sm-labels': 'common/ui/js/sm.labels',
        'sm-messages': 'common/ui/js/sm.messages',
        'sm-model-config': 'common/ui/js/sm.model.config',
        'sm-init': '/common/ui/js/sm.init'
    },
    waitSeconds: 0
});