/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */
var depArray = [
    'jquery', 'underscore', 'text!views/contrail-common.view', 'text!setting/sm/ui/views/sm.view',
    'sm-test-utils', 'sm-test-mockdata',
    'validation', 'sm-constants', 'core-constants',
    'sm-grid-config', 'sm-utils', 'sm-labels',
    'sm-messages', 'sm-model-config', 'knockout',
    'contrail-common', 'jquery-ui', 'jquery.xml2json', 'jquery.ba-bbq', 'jquery.timer',
    'bootstrap', 'd3', 'nv.d3', 'crossfilter', 'jsonpath', 'xdate', 'jquery.validate',
    'handlebars', 'select2', 'jquery.event.drag', 'jquery.json', 'jquery.droppick', 'slick.core',
    'slick.grid', 'slick.enhancementpager', 'jquery.datetimepicker', 'moment',
    'contrail-common', 'handlebars-utils', 'select2-utils', 'slickgrid-utils', 'contrail-elements',
    'topology_api', 'chart-utils', 'web-utils', 'contrail-layout', 'config_global', 'protocol',
    'qe-utils', 'nvd3-plugin', 'd3-utils', 'analyzer-utils', 'dashboard-utils', 'ipv6',
    'jquery.tristate', 'jquery.multiselect', 'jquery.multiselect.filter', 'jquery.steps.min', 'slick.dataview',
    'slick.checkboxselectcolumn', 'slick.rowselectionmodel', 'handlebars-helpers', 'contrail-model'
];

define(depArray, function ($, _, ccView, smView, SMTestUtils, SMTestMockData) {

    window.smtu = new SMTestUtils();
    window.smtMockData = new SMTestMockData();

    $('body').append('<div id="content-container"></div>');
    $("body").append(ccView);
    $("body").append(smView);

    $("body").append('<link rel="stylesheet" href="/base/assets/bootstrap/css/bootstrap.min.css/>');
    $("body").append('<link rel="stylesheet" href="/base/assets/bootstrap/css/bootstrap-responsive.min.css/>');
    $("body").append('<link rel="stylesheet" href="/base/assets/jquery-ui/css/jquery-ui.css/>');
    $("body").append('<link rel="stylesheet" href="/base/css/contrail.jquery.ui.css"/>');
    $("body").append('<link rel="stylesheet" href="/base/assets/font-awesome/css/font-awesome.min.css/>');
    $("body").append('<link rel="stylesheet" href="/base/assets/jquery/css/jquery.steps.css/>');
    $("body").append('<link rel="stylesheet" href="/base/assets/nvd3/css/nv.d3.css/>');
    $("body").append('<link rel="stylesheet" href="/base/assets/select2/styles/select2.css/>');
    $("body").append('<link rel="stylesheet" href="/base/assets/datetimepicker/styles/jquery.datetimepicker.css/>');
    $("body").append('<link rel="stylesheet" href="/base/assets/slickgrid/styles/slick.grid.css/>');
    $("body").append('<link rel="stylesheet" href="/base/assets/jquery-contextMenu/css/jquery.contextMenu.css/>');

    $("body").append('<link rel="stylesheet" href="/base/css/contrail-all.css" />');

    $("body").append('<link rel="stylesheet" href="/base/css/contrail.layout.css" />');
    $("body").append('<link rel="stylesheet" href="/base/css/contrail.elements.css" />');
    $("body").append('<link rel="stylesheet" href="/base/css/contrail.responsive.css" />');
    $("body").append('<link rel="stylesheet" href="/base/css/contrail.custom.css" />');
    $("body").append('<link rel="stylesheet" href="/base/css/contrail.font.css" />');
});
