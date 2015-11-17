/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'co-test-utils',
    'co-test-constants',
    'co-test-runner',
    'sm-test-messages',
], function (_, cotu, cotc, cotr, smtm) {
    var testSuiteClass = function (viewObj, suiteConfig) {

        var viewConfig = cotu.getViewConfigObj(viewObj),
            el = viewObj.el,
            gridData = $(el).data('contrailGrid'),
            gridItems = gridData._dataView.getItems();

        module(cotu.formatTestModuleMessage(smtm.CLUSTER_LIST_VIEW_CUSTOM_TEST_MODULE, el.id));

        var gridViewCustomTestSuite = cotr.createTestSuite('GridViewCustomTestSuite');

        /**
         * Grid Body group Custom test cases
         */

        var bodyTestGroup = gridViewCustomTestSuite.createTestGroup('body');

        bodyTestGroup.registerTest(cotr.test("Test number of bubbles with filter on grid", function(assert) {
            expect(2);

            var inputBox = $(el).find('.input-grid-search');
            inputBox.val('main');
            inputBox.keyup();

            var isDone1 = assert.async();

            setTimeout(function(){
                equal($('#cluster-scatter-chart').find('.zoom-scatter-chart').find('circle').length, 1,
                    "Number of bubbles in chart should be equal to the chart data");

                // filter with a non-existing key and check zero bubbles
                inputBox.val('abc');
                inputBox.keyup();
                var isDone2 = assert.async();
                setTimeout(function(){
                    equal($('#cluster-scatter-chart').find('.zoom-scatter-chart').find('circle').length, 0,
                        "Number of bubbles in chart should be equal to the chart data");
                    isDone2();
                }, cotc.ASSERT_TIMEOUT);
                isDone1();
            }, cotc.ASSERT_TIMEOUT);

        }, cotc.SEVERITY_MEDIUM));

        gridViewCustomTestSuite.run(suiteConfig.groups, suiteConfig.severity);

    };

    return testSuiteClass;
});