/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */
var ctwu, ctwc, cowch, ctwgc, ctwgrc, ctwl, ctwm, ctwp, ctwvc,
    smwc, smwgc, smwu, smwl, smwm, smwgc, smwmc, smwru, smwdt;

var allTestFiles = [], smTestKarma = window.__karma__;

for (var file in smTestKarma.files) {
    if (/Test\.js$/.test(file)) {
        allTestFiles.push(file);
    }
}

var depArray = [
    'jquery', 'underscore', 'validation', 'core-constants', 'core-utils',
    'core-formatters', 'knockout', 'core-cache', 'contrail-common',

    'text!/base/contrail-web-core/webroot/views/contrail-common.view',
    'text!setting/sm/ui/templates/sm.tmpl',

    'co-test-utils', 'web-utils', 'handlebars-utils', 'slickgrid-utils', 'contrail-elements',
    'topology_api', 'chart-utils', 'qe-utils', 'nvd3-plugin', 'd3-utils', 'analyzer-utils',
    'dashboard-utils', 'joint.contrail', 'text', 'contrail-all-8', 'contrail-all-9'
];

require(['jquery', 'knockout'], function ($, Knockout) {
    window.ko = Knockout;
    loadCommonTemplates();

    require(depArray, function ($, _, validation, CoreConstants, CoreUtils, CoreFormatters, Knockout, Cache, contrailCommon, coreCommonTmpls, smCommonTmpls, CoreTestUtils) {
        cowc = new CoreConstants();
        cowu = new CoreUtils();
        cowf = new CoreFormatters();
        cowch = new Cache();
        kbValidation = validation;
        initBackboneValidation(_);
        initCustomKOBindings(Knockout);
        initDomEvents();

        $("body").addClass('navbar-fixed');
        $("body").append(CoreTestUtils.getPageHeaderHTML());
        $("body").append(CoreTestUtils.getSidebarHTML());
        $("body").append(coreCommonTmpls);
        $("body").append(smCommonTmpls);

        var cssList = CoreTestUtils.getCSSList();

        for (var i = 0; i < cssList.length; i++) {
            $("body").append(cssList[i]);
        }

        requirejs(['text!menu.xml'], function (menuXML) {

            requirejs(['co-test-mockdata', 'co-test-utils', '/base/contrail-web-server-manager/webroot/common/ui/js/sm.app.js'], function (CoreSlickGridMockData, TestUtils) {
                var fakeServer = sinon.fakeServer.create();
                fakeServer.respondWith("GET", TestUtils.getRegExForUrl('/api/admin/webconfig/featurePkg/webController'), [200, {"Content-Type": "application/json"}, JSON.stringify(CoreSlickGridMockData.webControllerMockData)]);
                fakeServer.respondWith("GET", TestUtils.getRegExForUrl('/api/admin/webconfig/features/disabled'), [200, {"Content-Type": "application/json"}, JSON.stringify(CoreSlickGridMockData.disabledFeatureMockData)]);
                fakeServer.respondWith("GET", TestUtils.getRegExForUrl('/api/service/networking/web-server-info'), [200, {"Content-Type": "application/json"}, JSON.stringify(CoreSlickGridMockData.webServerInfoMockData)]);
                fakeServer.respondWith("GET", TestUtils.getRegExForUrl('/menu.xml'), [200, {"Content-Type": "application/xml"}, menuXML]);

                requirejs(['contrail-layout', '/base/contrail-web-server-manager/webroot/setting/sm/ui/js/sm.main.js'], function () {
                    //TODO: Auto Respond = True
                    while (fakeServer.queue.length > 0) {
                        fakeServer.respond();
                    }

                    if (!smInitComplete) {
                        requirejs(['sm-init'], function () {
                            require(allTestFiles, function () {
                                requirejs.config({
                                    deps: allTestFiles,
                                    callback: window.__karma__.start
                                });
                            });
                        });
                    } else {
                        require(allTestFiles, function () {
                            requirejs.config({
                                deps: allTestFiles,
                                callback: window.__karma__.start
                            });
                        });
                    }
                });
            });
        });
    });
});


function loadCommonTemplates() {
    //Set the base URI
    if (document.location.pathname.indexOf('/vcenter') == 0)
        $('head').append('<base href="/vcenter/" />');
    templateLoader = (function ($, host) {
        //Loads external templates from path and injects in to page DOM
        return {
            loadExtTemplate: function (path, deferredObj, containerName) {
                if (deferredObj != null)
                    deferredObj.resolve();
            }
        };
    })(jQuery, document);
};