/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var smConstants, smGridConfig, smUtils, smLabels;

require.config({
  baseUrl: '/',
  paths: {
    underscore: 'assets/underscore/underscore-min',
    backbone: 'assets/backbone/backbone-min',
    text: 'assets/requirejs/text',
    knockout: 'assets/knockout/knockout-3.0.0',
    knockback: 'assets/backbone/knockback.min'
  }
});

require([
    'common/ui/js/constants',
    'common/ui/js/grid.config',
    'common/ui/js/utils',
    "common/ui/js/labels"
], function(Constants, GridConfig, Utils, Labels) {
    smConstants = new Constants();
    smUtils = new Utils();
    smLabels = new Labels();
    smGridConfig = new GridConfig();
});