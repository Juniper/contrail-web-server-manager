/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var smConstants, smGridConfig, smUtils;

require.config({
  baseUrl: '/',
  paths: {
    underscore: 'assets/underscore/underscore-min',
    backbone: 'assets/backbone/backbone-min',
    text: 'assets/requirejs/text'
  }
});

require([
    'common/js/sm.constants',
    'common/js/grid.config',
    'common/js/sm.utils'
], function(SMConstants, GridConfig, SMUtils) {
    smConstants = new SMConstants();
    smUtils = new SMUtils();
    smGridConfig = new GridConfig();
});