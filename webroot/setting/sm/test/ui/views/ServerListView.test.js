define([
    "co-test-constants",
    "co-test-runner",
    "sm-test-utils",
    "sm-test-messages",
    "setting/sm/test/ui/views/ServerListView.mock.data",
    "co-grid-contrail-list-model-test-suite",
    "co-grid-view-test-suite",
    "co-chart-view-zoom-scatter-test-suite",
], function (cotc, cotr, smtu, smtm, ServerListViewMockData, GridListModelTestSuite, GridViewTestSuite, ZoomScatterChartViewTestSuite) {

    var moduleId = smtm.SERVER_LIST_VIEW_COMMON_TEST_MODULE;

    var testType = cotc.VIEW_TEST;

    var fakeServerConfig = cotr.getDefaultFakeServerConfig();

    var fakeServerResponsesConfig = function () {
        var responses = [];

        responses.push(cotr.createFakeServerResponse({
            url: smtu.getRegExForUrl(smwc.URL_TAG_NAMES),
            body: JSON.stringify(ServerListViewMockData.getTagNamesData())
        }));

        responses.push(cotr.createFakeServerResponse({
            url: smtu.getRegExForUrl(smwc.URL_TAG_VALUES),
            body: JSON.stringify(ServerListViewMockData.getTagValuesData())
        }));

        responses.push(cotr.createFakeServerResponse({
            url: smtu.getRegExForUrl(smwu.getObjectDetailUrl("server")),
            body: JSON.stringify(ServerListViewMockData.getSingleServerDetailData())
        }));

        responses.push(cotr.createFakeServerResponse({
            url: smtu.getRegExForUrl("/sm/server/monitoring/config"),
            body: JSON.stringify(ServerListViewMockData.getSingleServerMonitoringConfigData())
        }));

        responses.push(cotr.createFakeServerResponse({
            url: smtu.getRegExForUrl("/sm/server/monitoring/info/summary"),
            body: JSON.stringify(ServerListViewMockData.getSingleServerMonitoringData())
        }));

        return responses;
    };
    fakeServerConfig.getResponsesConfig = fakeServerResponsesConfig;

    var pageConfig = cotr.getDefaultPageConfig();
    pageConfig.hashParams = {
        p: "setting_sm_servers"
    };
    pageConfig.loadTimeout = cotc.PAGE_LOAD_TIMEOUT * 5;

    var getTestConfig = function () {
        return {
            rootView: smPageLoader.smView,
            tests: [
                {
                    viewId: smwl.SM_SERVER_SCATTER_CHART_ID,
                    suites: [
                        {
                            class: ZoomScatterChartViewTestSuite,
                            groups: ["all"]
                        }
                    ]
                },
                {
                    viewId: smwl.SM_SERVER_GRID_ID,
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
                                    gridDataParseFn: smtu.deleteFieldsForServerScatterChart
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
