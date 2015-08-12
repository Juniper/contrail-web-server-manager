define([
    'co-unit-test',
    'sm-test-utils',
    'sm-test-messages',
    'image-list-view-mockdata',
    'co-test-grid-listmodel',
    'co-test-grid-gridview'
], function (CUnit, smtu, smtm, ImageListViewMockData, GridListModelTestSuite, GridViewTestSuite) {

    var moduleId = smtm.PACKAGE_LIST_VIEW_COMMON_TEST_MODULE;

    var fakeServerConfig = CUnit.getDefaultFakeServerConfig();

    var fakeServerResponsesConfig = function () {
        var responses = [];

        responses.push(CUnit.createFakeServerResponse({
            url: smtu.getRegExForUrl(smwc.URL_TAG_NAMES),
            body: JSON.stringify(ImageListViewMockData.getTagNamesData())
        }));
        responses.push(CUnit.createFakeServerResponse({
            url: smtu.getRegExForUrl(smwu.getObjectDetailUrl('image')),
            body: JSON.stringify(ImageListViewMockData.getSingleImageDetailData())
        }));

        return responses;
    };
    fakeServerConfig.getResponsesConfig = fakeServerResponsesConfig;

    var pageConfig = CUnit.getDefaultPageConfig();
    pageConfig.hashParams = {
        p: 'setting_sm_images'
    };
    pageConfig.loadTimeout = 1000;

    var getTestConfig = function () {
        return {
            rootView: smPageLoader.smView,
            tests: [
                {
                    viewId: smwl.SM_IMAGE_GRID_ID,
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

    CUnit.testRunnerStart(pageTestConfig);

});