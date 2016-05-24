define([
    'co-test-constants',
    'co-test-runner',
    'sm-test-utils',
    'sm-test-messages',
    'setting/sm/test/ui/views/ClusterTabView.mock.data',
    'co-grid-contrail-list-model-test-suite',
    'co-grid-view-test-suite',
    'co-details-view-test-suite'
], function (cotc, cotr, smtu, smtm, ClusterTabViewMockData, GridListModelTestSuite, GridViewTestSuite, DetailsViewTestSuite) {

    var moduleId = smtm.CLUSTER_TAB_VIEW_COMMON_TEST_MODULE;

    var testType = cotc.VIEW_TEST;

    var fakeServerConfig = cotr.getDefaultFakeServerConfig();

    var fakeServerResponsesConfig = function () {
        var responses = [];

        responses.push(cotr.createFakeServerResponse({
            url: smtu.getRegExForUrl(smwc.URL_TAG_NAMES),
            body: JSON.stringify(ClusterTabViewMockData.getTagNamesData())
        }));

        responses.push(cotr.createFakeServerResponse({
            url: smtu.getRegExForUrl(smwu.getObjectDetailUrl('cluster')),
            body: JSON.stringify(ClusterTabViewMockData.getSingleClusterDetailData())
        }));

        responses.push(cotr.createFakeServerResponse({
            url: smtu.getRegExForUrl(smwu.getObjectDetailUrl('server')),
            body: JSON.stringify(ClusterTabViewMockData.getServerDetailsData())
        }));

        responses.push(cotr.createFakeServerResponse({
            url: smtu.getRegExForUrl('/sm/server/monitoring/config'),
            body: JSON.stringify(ClusterTabViewMockData.getSingleClusterMonitoringConfigData())
        }));

        responses.push(cotr.createFakeServerResponse({
            url: smtu.getRegExForUrl('/sm/server/monitoring/info/summary'),
            body: JSON.stringify(ClusterTabViewMockData.getSingleClusterMonitoringData())
        }));

        return responses;
    };
    fakeServerConfig.getResponsesConfig = fakeServerResponsesConfig;

    var pageConfig = cotr.getDefaultPageConfig();
    pageConfig.hashParams = {
        p: 'setting_sm_clusters',
        q: {
            cluster_id : "r22_cluster"
        }
    };
    pageConfig.loadTimeout = cotc.PAGE_LOAD_TIMEOUT * 2;

    var getTestConfig = function () {
        return {
            rootView: smPageLoader.smView,
            tests: [
                {
                    viewId: smwl.SM_CLUSTER_TAB_DETAILS_ID,
                    suites: [
                        {
                            class: DetailsViewTestSuite,
                            groups: ['all'],
                            modelConfig: {
                                dataGenerator: smtu.commonDetailsDataGenerator
                            }
                        }
                    ]
                },
                {
                    viewId: smwl.SM_SERVER_GRID_ID,
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
