/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'co-test-unit',
    'sm-test-utils',
    'sm-test-messages',
    'package-list-view-mock-data',
    'co-grid-contrail-list-model-test-suite',
    'co-grid-view-test-suite'
], function (CUnit, smtu, smtm, PackageListViewMockData, GridListModelTestSuite, GridViewTestSuite) {

    var moduleId = smtm.PACKAGE_LIST_VIEW_COMMON_TEST_MODULE;

    var fakeServerConfig = CUnit.getDefaultFakeServerConfig();

    var fakeServerResponsesConfig = function () {
        var responses = [];

        responses.push(CUnit.createFakeServerResponse({
            url: smtu.getRegExForUrl(smwc.URL_TAG_NAMES),
            body: JSON.stringify(PackageListViewMockData.getTagNamesData())
        }));
        responses.push(CUnit.createFakeServerResponse({
            url: smtu.getRegExForUrl(smwu.getObjectDetailUrl('package')),
            body: JSON.stringify(PackageListViewMockData.getSinglePackageDetailData())
        }));

        return responses;
    };
    fakeServerConfig.getResponsesConfig = fakeServerResponsesConfig;

    var pageConfig = CUnit.getDefaultPageConfig();
    pageConfig.hashParams = {
        p: 'setting_sm_packages'
    };
    pageConfig.loadTimeout = 1000;

    var getTestConfig = function () {
        return {
            rootView: smPageLoader.smView,
            tests: [
                {
                    viewId: smwl.SM_PACKAGE_GRID_ID,
                    suites: [
                        {
                            class: GridViewTestSuite,
                            groups: ['all'],
                            severity: cotc.SEVERITY_LOW
                        },
                        {
                            class: GridListModelTestSuite,
                            groups: ['all'],
                            severity: cotc.SEVERITY_LOW,
                            modelConfig: {
                                dataGenerator: smtu.commonGridDataGenerator,
                                dataParsers: {
                                    mockDataParseFn: smtu.deleteSizeField,
                                    gridDataParseFn: smtu.deleteSizeField
                                }
                            }
                        }
                    ]
                }
            ]
        };
    };

    var pageTestConfig = CUnit.createPageTestConfig(moduleId, fakeServerConfig, pageConfig, getTestConfig);

    CUnit.startTestRunner(pageTestConfig);

});
