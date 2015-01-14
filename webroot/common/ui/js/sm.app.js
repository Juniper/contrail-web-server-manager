/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var smwc, smwgc, smwu, smwl, smwv, smwm, smwmc, smInitComplete = false;

require.config({
    baseUrl: '/',
    paths: {
        'knockback': 'assets/backbone/knockback.min',
        'validation': 'assets/backbone/backbone-validation-amd',
        'constants': 'common/ui/js/constants',
        'grid-config': 'common/ui/js/grid.config',
        'utils': 'common/ui/js/utils',
        'labels': 'common/ui/js/labels',
        'messages': 'common/ui/js/messages',
        'model-config': 'common/ui/js/model.config',
        'sm-init': '/common/ui/js/sm.init'
    },
    waitSeconds: 0
});