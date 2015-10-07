define([
    'co-test-unit',
    'sm-test-utils',
    'sm-test-messages',
    'cluster-tab-view-mock-data',
    'co-grid-contrail-list-model-test-suite',
    'co-grid-view-test-suite'
], function (CUnit, smtu, smtm, ClusterTabViewMockData, GridListModelTestSuite, GridViewTestSuite) {

    var moduleId = smtm.CLUSTER_TAB_VIEW_COMMON_TEST_MODULE;

    var fakeServerConfig = CUnit.getDefaultFakeServerConfig();

    var fakeServerResponsesConfig = function () {
        var responses = [];

        responses.push(CUnit.createFakeServerResponse({
            url: smtu.getRegExForUrl(smwc.URL_TAG_NAMES),
            body: JSON.stringify(ClusterTabViewMockData.getTagNamesData())
        }));

        responses.push(CUnit.createFakeServerResponse({
            url: smtu.getRegExForUrl(smwu.getObjectDetailUrl('cluster')),
            body: JSON.stringify(ClusterTabViewMockData.getSingleClusterDetailData())
        }));

        responses.push(CUnit.createFakeServerResponse({
            url: smtu.getRegExForUrl(smwu.getObjectDetailUrl('server')),
            body: JSON.stringify(ClusterTabViewMockData.getServerDetailsData())
        }));

        responses.push(CUnit.createFakeServerResponse({
            url: smtu.getRegExForUrl('/sm/server/monitoring/config'),
            body: JSON.stringify(ClusterTabViewMockData.getSingleClusterMonitoringConfigData())
        }));

        responses.push(CUnit.createFakeServerResponse({
            url: smtu.getRegExForUrl('/sm/server/monitoring/info/summary'),
            body: JSON.stringify(ClusterTabViewMockData.getSingleClusterMonitoringData())
        }));

        return responses;
    };
    fakeServerConfig.getResponsesConfig = fakeServerResponsesConfig;

    var pageConfig = CUnit.getDefaultPageConfig();
    pageConfig.hashParams = {
        p: 'setting_sm_clusters',
        q: {
            cluster_id : "r22_cluster"
        }
    };
    pageConfig.loadTimeout = 5000;

    var getTestConfig = function () {
        return {
            rootView: smPageLoader.smView,
            tests: [
                {
                    viewId: smwl.SM_SERVER_GRID_ID,
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
                                    gridDataParseFn: smtu.deleteFieldsForServerScatterChart
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