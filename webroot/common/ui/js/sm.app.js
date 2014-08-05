/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var smConstants, smGridConfig, smUtils, smLabels;

require.config({
  baseUrl: '/',
  paths: {
    underscore: 'assets/underscore/underscore-min',
    backbone: 'assets/backbone/backbone-min',
    text: 'assets/requirejs/text'
  }
});

require([
    'common/ui/js/sm.constants',
    'common/ui/js/grid.config',
    'common/ui/js/sm.utils',
    "common/ui/js/labels"
], function(SMConstants, GridConfig, SMUtils, Labels) {
    smConstants = new SMConstants();
    smUtils = new SMUtils();
    smGridConfig = new GridConfig();
    smLabels = new Labels();
});