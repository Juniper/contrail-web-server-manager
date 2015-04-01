/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var cowu, cowc, smwc, smwgc, smwu, smwl, smwv, smwm, smwgc, smwmc, smwru, smwdt, allTestFiles = [];

var smTestKarma = window.__karma__;

for (var file in smTestKarma.files) {
    if (/contrail-test\.js$/.test(file)) {
        allTestFiles.push(file);
    }
}
requirejs.config({
    baseUrl : "/base",
    paths   : {
        "jquery"                    : "assets/jquery/js/jquery-1.8.3.min",
        "jquery.xml2json"           : "assets/jquery/js/jquery.xml2json",
        "jquery.ba-bbq"             : "assets/jquery/js/jquery.ba-bbq.min",
        "jquery.timer"              : "assets/jquery/js/jquery.timer",
        "jquery-ui"                 : "assets/jquery-ui/js/jquery-ui",
        "jquery.ui.touch-punch"     : "assets/jquery/js/jquery.ui.touch-punch.min",
        "bootstrap"                 : "assets/bootstrap/js/bootstrap.min",
        "d3"                        : "assets/d3/js/d3",
        "nv.d3"                     : "assets/nvd3/js/nv.d3",
        "crossfilter"               : "assets/crossfilter/js/crossfilter.min",
        "jsonpath"                  : "assets/jsonpath/js/jsonpath-0.8.0",
        "xdate"                     : "assets/xdate/js/xdate",
        "jquery.validate"           : "assets/jquery/js/jquery.validate",
        "handlebars"                : "assets/handlebars/handlebars-v1.3.0",
        "knockout"                  : "assets/knockout/knockout-3.0.0",
        "select2"                   : "assets/select2/js/select2.min",
        "jquery.event.drag"         : "assets/slickgrid/js/jquery.event.drag-2.2",
        "jquery.json"               : "assets/slickgrid/js/jquery.json-2.3.min",
        "jquery.droppick"           : "assets/slickgrid/js/jquery.dropkick-1.0.0",
        "slick.core"                : "assets/slickgrid/js/slick.core",
        "slick.grid"                : "assets/slickgrid/js/slick.grid",
        "slick.dataview"            : "assets/slickgrid/js/slick.dataview",
        "slick.enhancementpager"    : "assets/slickgrid/js/slick.enhancementpager",
        "jquery.datetimepicker"     : "assets/datetimepicker/js/jquery.datetimepicker",
        "moment"                    : "assets/moment/moment",
        "sprintf"                   : "assets/ip/sprintf",
        "ipv6"                      : "assets/ip/ipv6",
        "jsbn-combined"             : "assets/ip/jsbn-combined",
        "contrail-common"           : "js/contrail-common",
        "handlebars-utils"          : "js/handlebars-utils",
        "handlebars-helpers"        : "common/ui/js/handlebars.helpers",
        "select2-utils"             : "js/select2-utils",
        "slickgrid-utils"           : "js/slickgrid-utils",
        "contrail-elements"         : "js/contrail-elements",
        "topology_api"              : "js/topology_api",
        "chart-utils"               : "js/chart-utils",
        "web-utils"                 : "js/web-utils",
        "contrail-layout"           : "js/contrail-layout",
        "config_global"             : "js/config_global",
        "protocol"                  : "js/protocol",
        "qe-utils"                  : "js/qe-utils",
        "nvd3-plugin"               : "js/nvd3-plugin",
        "d3-utils"                  : "js/d3-utils",
        "analyzer-utils"            : "js/analyzer-utils",
        "dashboard-utils"           : "js/dashboard-utils",
        "jquery.multiselect"        : "assets/jquery-ui/js/jquery.multiselect",
        "jquery.multiselect.filter" : "assets/jquery-ui/js/jquery.multiselect.filter",
        "jquery.steps.min"          : "assets/jquery/js/jquery.steps.min",
        "jquery.tristate"           : "assets/jquery/js/jquery.tristate",
        "joint"                     : "assets/joint/js/joint.clean.min",
        "geometry"                  : "assets/joint/js/geometry",
        "vectorizer"                : "assets/joint/js/vectorizer",
        "joint.layout.DirectedGraph": "assets/joint/js/joint.layout.DirectedGraph",
        "joint.contrail"            : "js/joint.contrail",
        "dagre"                     : "assets/joint/js/dagre",
        "lodash"                    : "assets/joint/js/lodash",
        "jquery.panzoom"            : "assets/jquery/js/jquery.panzoom.min",
        "jquery.ui.position"        : "assets/jquery-contextMenu/js/jquery.ui.position",
        "jquery.contextMenu"        : "assets/jquery-contextMenu/js/jquery.contextMenu",
        "slick.checkboxselectcolumn": "assets/slickgrid/js/slick.checkboxselectcolumn",
        "slick.rowselectionmodel"   : "assets/slickgrid/js/slick.rowselectionmodel",
        "underscore"                : "assets/underscore/underscore-min",
        "backbone"                  : "assets/backbone/backbone-min",
        "knockback"                 : "assets/backbone/knockback.min",
        "validation"                : "assets/backbone/backbone-validation-amd",
        "text"                      : "assets/requirejs/text",
        "core-utils"                : "js/core-utils",
        "contrail-view-model"       : "js/models/ContrailViewModel",
        "contrail-model"            : "js/models/ContrailModel",
        "contrail-list-model"       : "js/models/ContrailListModel",
        'contrail-graph-model'      : 'js/models/ContrailGraphModel',
        "contrail-remote-data-handler": "js/models/ContrailRemoteDataHandler",
        "core-cache"                : "js/core-cache",
        "graph-view"                : 'js/views/GraphView',
        "core-init"                 : "js/core-init",
        "core-constants"            : "js/core-constants",
        "sm-constants"              : "common/ui/js/sm.constants",
        "sm-utils"                  : "common/ui/js/sm.utils",
        "sm-labels"                 : "common/ui/js/sm.labels",
        "sm-messages"               : "common/ui/js/sm.messages",
        "sm-model-config"           : "common/ui/js/sm.model.config",
        "sm-grid-config"            : 'common/ui/js/sm.grid.config',
        "sm-detail-tmpls"           : 'common/ui/js/sm.detail.tmpls',
        "sm-init"                   : "common/ui/js/sm.init",
        "sm-test-init"              : "test/sm.test.init",
        "sm-test-utils"             : "test/common/sm.test.utils",
        "sm-test-mockdata"          : "test/common/sm.test.mockdata",
        "sm-test-slickgrid"         : "test/common/sm.test.slickgrid",
        "sm-test-messages"          : "test/common/sm.test.messages"
    },
    shim    : {
        'jquery.tristate'           : {
            deps: ['jquery', 'jquery-ui']
        },
        'jquery.multiselect'        : {
            deps: ['jquery', 'jquery-ui']
        },
        'jquery.multiselect.filter' : {
            deps: ['jquery', 'jquery.multiselect']
        },
        'jquery.steps.min'          : {
            deps: ['jquery']
        },
        'bootstrap'                 : {
            deps: ["jquery"]
        },
        'd3'                        : {
            deps: ["jquery"]
        },
        'nv.d3'                     : {
            deps: ['d3']
        },
        'crossfilter'               : {
            deps: ['d3']
        },
        'jquery.xml2json'           : {
            deps: ["jquery"]
        },
        "jquery.ba-bbq"             : {
            deps: ['jquery']
        },
        "jquery.timer"              : {
            deps: ['jquery']
        },
        "jquery-ui"                 : {
            deps: ['jquery']
        },
        'jquery.ui.touch-punch'     : {
            deps: ['jquery']
        },
        'jquery.validate'           : {
            deps: ['jquery']
        },
        'select2'                   : {
            deps: ['jquery']
        },
        'jquery.event.drag'         : {
            deps: ['jquery']
        },
        'jquery.json'               : {
            deps: ['jquery']
        },
        'jquery.droppick'           : {
            deps: ['jquery']
        },
        'jquery.datetimepicker'     : {
            deps: ['jquery']
        },
        'slick.core'                : {
            deps: ['jquery']
        },
        'slick.grid'                : {
            deps: ['jquery.event.drag']
        },
        'contrail-common'           : {
            deps: ['jquery']
        },
        'contrail-layout'           : {
            deps: ['jquery.ba-bbq', 'web-utils', 'contrail-elements']
        },
        'slick.enhancementpager'    : {
            deps: ['jquery']
        },
        'slickgrid-utils'           : {
            deps: ['jquery', 'slick.grid', 'slick.dataview']
        },
        'slick.dataview'            : {
            deps: ['jquery', 'slick.grid']
        },
        'contrail-elements'         : {
            deps: ['jquery-ui']
        },
        'chart-utils'               : {
            deps: ['jquery', 'd3']
        },
        'web-utils'                 : {
            deps: ['jquery', 'knockout']
        },
        'qe-utils'                  : {
            deps: ['jquery']
        },
        'handlebars-utils'          : {
            deps: ['jquery', 'handlebars']
        },
        'handlebars-helpers'        : {
            deps: ['jquery', 'handlebars']
        },
        'nvd3-plugin'               : {
            deps: ['nv.d3', 'd3']
        },
        'd3-utils'                  : {
            deps: ['d3']
        },
        'qe-utils'                  : {
            deps: ['jquery']
        },
        'select2-utils'             : {
            deps: ['jquery', 'knockout']
        },
        'ipv6'                      : {
            deps: ['sprintf', 'jsbn-combined']
        },
        'jquery.panzoom'            : {
            deps: ['jquery']
        },
        'jquery.ui.position'        : {
            deps: ['jquery']
        },
        'jquery.contextMenu'        : {
            deps: ['jquery']
        },
        'slick.checkboxselectcolumn': {
            deps: ['jquery', 'slick.grid', 'slick.dataview']
        },
        'slick.rowselectionmodel'   : {
            deps: ['jquery', 'slick.grid', 'slick.dataview']
        },
        'underscore'                : {
            deps: ['jquery']
        },
        'backbone'                  : {
            deps   : ['lodash', 'jquery'],
            exports: 'Backbone'
        },
        'joint'                     : {
            deps   : ['geometry', 'vectorizer', 'jquery', 'lodash', 'backbone'],
            exports: 'joint',
            init   : function (geometry, vectorizer) {
                this.g = geometry;
                this.V = vectorizer;
            }
        },
        'knockout'                  : {
            deps: ['jquery']
        },
        'knockback'                 : {
            deps: ['jquery', 'knockout', 'backbone']
        },
        'validation'                : {
            deps: ['jquery', 'backbone']
        },
        'lodash'                    : {
            deps: ['jquery']
        },
        'joint.layout.DirectedGraph': {
            deps: ['joint']
        },
        'joint.contrail'            : {
            deps: ['joint', 'joint.layout.DirectedGraph']
        },
        'dagre'                     : {
            deps: ['jquery']
        },
        'text'                      : {
            deps: ['jquery']
        },
        'core-utils'                : {
            deps: ['jquery', 'underscore']
        },
        'contrail-model'            : {
            deps: ['jquery', 'underscore', 'backbone', 'knockout', 'knockback']
        },
        'contrail-view-model': {
            deps: ['jquery', 'underscore', 'backbone', 'slick.core']
        },
        'contrail-list-model': {
            deps: ['contrail-remote-data-handler']
        },
        'contrail-graph-model': {
            deps: ['jquery', 'underscore', 'backbone', 'joint.contrail', 'joint.layout.DirectedGraph', 'slick.core']
        },
        'contrail-remote-data-handler': {
            deps: ['jquery', 'underscore']
        },
        'graph-view': {
            deps: ['jquery', 'underscore', 'backbone', 'joint', 'joint.contrail']
        },
        'core-init'                 : {
            deps: ['underscore', 'validation', 'core-utils', 'knockout']
        }
    }
});

var depArray = [
    'jquery',
    'underscore',
    'validation',
    'core-utils',
    'core-constants',
    'knockout',
    'core-cache',
    'contrail-common',
    'sm-constants',
    'sm-utils',
    'sm-labels',
    'sm-messages',
    'sm-model-config',
    'sm-grid-config',
    'sm-detail-tmpls',
    'text!views/contrail-common.view', 'text!setting/sm/ui/templates/sm.tmpl',
    'sm-test-utils', 'sm-test-mockdata', 'sm-test-slickgrid', 'sm-test-messages',
    'jquery-ui', 'jquery.xml2json', 'jquery.ba-bbq', 'jquery.timer',
    'bootstrap', 'd3', 'nv.d3', 'crossfilter', 'jsonpath', 'xdate', 'jquery.validate',
    'handlebars', 'select2', 'jquery.event.drag', 'jquery.json', 'jquery.droppick', 'slick.core',
    'slick.grid', 'slick.enhancementpager', 'jquery.datetimepicker', 'moment',
    'handlebars-utils', 'select2-utils', 'slickgrid-utils', 'contrail-elements',
    'topology_api', 'chart-utils', 'web-utils', 'contrail-layout', 'config_global', 'protocol',
    'qe-utils', 'nvd3-plugin', 'd3-utils', 'analyzer-utils', 'dashboard-utils', 'ipv6',
    'jquery.tristate', 'jquery.multiselect', 'jquery.multiselect.filter', 'jquery.steps.min', 'slick.dataview',
    'slick.checkboxselectcolumn', 'slick.rowselectionmodel', 'handlebars-helpers', 'contrail-model'
];

require(['jquery', 'knockout'], function ($, Knockout) {
    window.ko = Knockout;
    require(depArray, function ($, _, validation, CoreUtils, CoreConstants, Knockout, Cache, cc, SMConstants, SMUtils, Labels, Messages, DeafultModelConfig, GridConfig, DetailTemplates, ccView, smView, SMTestUtils, SMTestMockData, SMTestSlickGrid, SMTestMessages) {
        cowu = new CoreUtils();
        cowc = new CoreConstants();
        cowch = new Cache();
        kbValidation = validation;
        initBackboneValidation(_);
        initCustomKOBindings(Knockout);
        initDomEvents();
        smwc = new SMConstants();
        smwu = new SMUtils();
        smwl = new Labels();
        smwm = new Messages();
        smwmc = new DeafultModelConfig();
        smwgc = new GridConfig();
        smwdt = new DetailTemplates();

        window.smtu = new SMTestUtils();
        window.smtMockData = new SMTestMockData();
        window.smtSlickGrid = new SMTestSlickGrid();
        window.smtMessages = new SMTestMessages();

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

        requirejs(['common/ui/js/sm.render'], function(SMRenderUtils) {
            smwru = new SMRenderUtils();
            smInitComplete = true;
            require(allTestFiles, function () {
                requirejs.config({
                    // dynamically load all test files
                    deps: allTestFiles,
                    callback: window.__karma__.start
                });
            });
        });

    });
});

function initBackboneValidation (_) {
    _.extend(kbValidation.callbacks, {
        valid  : function (view, attr, selector) {
            /*
             var $el = $(view.modalElementId).find('[name=' + attr + ']'),
             $group = $el.closest('.form-element');

             $group.removeClass('has-error');
             $group.find('.help-block').html('').addClass('hidden');
             */
        },
        invalid: function (view, attr, error, selector, validation) {
            var model = view.model;
            model.validateAttr(attr, validation);
            /*
             var $el = $(view.modalElementId).find('[name=' + attr + ']'),
             $group = $el.closest('.form-element');
             $group.addClass('has-error');
             $group.find('.help-block').html(error).removeClass('hidden');
             */
        }
    });
};

function initCustomKOBindings (Knockout) {
    Knockout.bindingHandlers.contrailDropdown = {
        init  : function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var valueObj = valueAccessor(),
                allBindings = allBindingsAccessor(),
                dropDown = $(element).contrailDropdown(valueObj).data('contrailDropdown');

            if (allBindings.value) {
                var value = Knockout.utils.unwrapObservable(allBindings.value);
                if (typeof value === 'function') {
                    dropDown.value(value());
                } else {
                    dropDown.value(value);
                }
            }
            else {
                dropDown.value('');
            }

            Knockout.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).select2('destroy');
            });
        },
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            $(element).trigger('change');
        }
    };

    Knockout.bindingHandlers.contrailMultiselect = {
        init  : function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var valueObj = valueAccessor(),
                allBindings = allBindingsAccessor(),
                lookupKey = allBindings.lookupKey,
                multiselect = $(element).contrailMultiselect(valueObj).data('contrailMultiselect');

            if (allBindings.value) {
                var value = Knockout.utils.unwrapObservable(allBindings.value);
                if (typeof value === 'function') {
                    multiselect.value(value());
                } else {
                    multiselect.value(value);
                }
            }

            Knockout.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).select2('destroy');
            });
        },
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            $(element).trigger('change');
        }
    };

    Knockout.bindingHandlers.select2 = {
        init: function (element, valueAccessor) {
            var options = Knockout.toJS(valueAccessor()) || {};
            setTimeout(function () {
                $(element).select2(options);
            }, 0);
        }
    };

    var updateSelect2 = function (element) {
        var el = $(element);
        if (el.data('select2')) {
            el.trigger('change');
        }
    }
    var updateSelect2Options = Knockout.bindingHandlers['options']['update'];

    Knockout.bindingHandlers['options']['update'] = function (element) {
        var r = updateSelect2Options.apply(null, arguments);
        updateSelect2(element);
        return r;
    };

    var updateSelect2SelectedOptions = Knockout.bindingHandlers['selectedOptions']['update'];

    Knockout.bindingHandlers['selectedOptions']['update'] = function (element) {
        var r = updateSelect2SelectedOptions.apply(null, arguments);
        updateSelect2(element);
        return r;
    };
};

function initDomEvents () {
    $(document)
        .off('click', '.group-detail-action-item')
        .on('click', '.group-detail-action-item', function (event) {
            if (!$(this).hasClass('selected')) {
                var thisParent = $(this).parents('.group-detail-container'),
                    newSelectedView = $(this).data('view');

                thisParent.find('.group-detail-item').hide();
                thisParent.find('.group-detail-' + newSelectedView).show();

                thisParent.find('.group-detail-action-item').removeClass('selected');
                $(this).addClass('selected');

                if (contrail.checkIfExist($(this).parents('.slick-row-detail').data('cgrid'))) {
                    $(this).parents('.contrail-grid').data('contrailGrid').adjustDetailRowHeight($(this).parents('.slick-row-detail').data('cgrid'));
                }
            }
        });

    $(document)
        .off('click', '.input-type-toggle-action')
        .on('click', '.input-type-toggle-action', function (event) {
            var input = $(this).parent().find('input');
            if (input.prop('type') == 'text') {
                input.prop('type', 'password');
                $(this).removeClass('blue');
            } else {
                input.prop('type', 'text');
                $(this).addClass('blue');
            }
        });
};

