define([
    'co-test-constants',
    'co-test-runner',
    'sm-test-utils',
    'sm-test-messages',
    'setting/sm/test/ui/views/ImageListView.mock.data',
    'co-grid-contrail-list-model-test-suite',
    'co-grid-view-test-suite'
], function (cotc, cotr, smtu, smtm, ImageListViewMockData, GridListModelTestSuite, GridViewTestSuite) {

    var moduleId = smtm.PACKAGE_LIST_VIEW_COMMON_TEST_MODULE;

    var testType = cotc.VIEW_TEST;

    var fakeServerConfig = cotr.getDefaultFakeServerConfig();

    var fakeServerResponsesConfig = function () {
        var responses = [];

        responses.push(cotr.createFakeServerResponse({
            url: smtu.getRegExForUrl(smwc.URL_TAG_NAMES),
            body: JSON.stringify(ImageListViewMockData.getTagNamesData())
        }));
        responses.push(cotr.createFakeServerResponse({
            url: smtu.getRegExForUrl(smwu.getObjectDetailUrl('image')),
            body: JSON.stringify(ImageListViewMockData.getSingleImageDetailData())
        }));

        return responses;
    };
    fakeServerConfig.getResponsesConfig = fakeServerResponsesConfig;

    var pageConfig = cotr.getDefaultPageConfig();
    pageConfig.hashParams = {
        p: 'setting_sm_images'
    };
    pageConfig.loadTimeout = cotc.PAGE_LOAD_TIMEOUT;

    var getTestConfig = function () {
        return {
            rootView: smPageLoader.smView,
            tests: [
                {
                    viewId: smwl.SM_IMAGE_GRID_ID,
                    suites: [
                        {
                            class: GridViewTestSuite,
                            groups: ['all']
                        },
                        {
                            class: GridListModelTestSuite,
                            groups: ['all'],
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
