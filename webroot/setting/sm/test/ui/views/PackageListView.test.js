/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    "co-test-constants",
    "co-test-runner",
    "sm-test-utils",
    "sm-test-messages",
    "setting/sm/test/ui/views/PackageListView.mock.data",
    "co-grid-contrail-list-model-test-suite",
    "co-grid-view-test-suite",
    "sm-constants",
    "sm-labels",
    "sm-utils"
], function (cotc, cotr, smtu, smtm, PackageListViewMockData, GridListModelTestSuite, GridViewTestSuite, smwc, smwl, smwu) {

    var moduleId = smtm.PACKAGE_LIST_VIEW_COMMON_TEST_MODULE;

    var testType = cotc.VIEW_TEST;

    var fakeServerConfig = cotr.getDefaultFakeServerConfig();

    var fakeServerResponsesConfig = function () {
        var responses = [];

        responses.push(cotr.createFakeServerResponse({
            url: smtu.getRegExForUrl(smwc.URL_TAG_NAMES),
            body: JSON.stringify(PackageListViewMockData.getTagNamesData())
        }));
        responses.push(cotr.createFakeServerResponse({
            url: smtu.getRegExForUrl(smwu.getObjectDetailUrl("package")),
            body: JSON.stringify(PackageListViewMockData.getSinglePackageDetailData())
        }));

        return responses;
    };
    fakeServerConfig.getResponsesConfig = fakeServerResponsesConfig;

    var pageConfig = cotr.getDefaultPageConfig();
    pageConfig.hashParams = {
        p: "setting_sm_packages"
    };
    pageConfig.loadTimeout = cotc.PAGE_LOAD_TIMEOUT;

    var getTestConfig = function () {
        return {
            rootView: smPageLoader.smView,
            tests: [
                {
                    viewId: smwl.SM_PACKAGE_GRID_ID,
                    suites: [
                        {
                            class: GridViewTestSuite,
                            groups: ["all"]
                        },
                        {
                            class: GridListModelTestSuite,
                            groups: ["all"],
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

    var pageTestConfig = cotr.createPageTestConfig(moduleId, testType, fakeServerConfig, pageConfig, getTestConfig);

    cotr.startTestRunner(pageTestConfig);

});
