define([
    'co-test-runner',
    'sm-test-utils',
    'sm-test-messages',
    'cluster-list-view-mock-data',
    'co-grid-contrail-list-model-test-suite',
    'co-grid-view-test-suite',
    'co-chart-view-zoom-scatter-test-suite',
], function (cotr, smtu, smtm, ClusterListViewMockData, GridListModelTestSuite, GridViewTestSuite, ZoomScatterChartViewTestSuite) {

    var moduleId = smtm.CLUSTER_LIST_VIEW_COMMON_TEST_MODULE;

    var testType = cotc.VIEW_TEST;

    var fakeServerConfig = cotr.getDefaultFakeServerConfig();

    var fakeServerResponsesConfig = function () {
        var responses = [];

        responses.push(cotr.createFakeServerResponse({
            url: smtu.getRegExForUrl(smwc.URL_TAG_NAMES),
            body: JSON.stringify(ClusterListViewMockData.getTagNamesData())
        }));

        responses.push(cotr.createFakeServerResponse({
            url: smtu.getRegExForUrl(smwu.getObjectDetailUrl('cluster')),
            body: JSON.stringify(ClusterListViewMockData.getSingleClusterDetailData())
        }));

        responses.push(cotr.createFakeServerResponse({
            url: smtu.getRegExForUrl('/sm/server/monitoring/config'),
            body: JSON.stringify(ClusterListViewMockData.getSingleClusterMonitoringConfigData())
        }));

        responses.push(cotr.createFakeServerResponse({
            url: smtu.getRegExForUrl('/sm/server/monitoring/info/summary'),
            body: JSON.stringify(ClusterListViewMockData.getSingleClusterMonitoringData())
        }));

        return responses;
    };
    fakeServerConfig.getResponsesConfig = fakeServerResponsesConfig;

    var pageConfig = cotr.getDefaultPageConfig();
    pageConfig.hashParams = {
        p: 'setting_sm_clusters'
    };
    pageConfig.loadTimeout = 3000;

    var getTestConfig = function () {
        return {
            rootView: smPageLoader.smView,
            tests: [
            {
                viewId: smwl.SM_CLUSTER_SCATTER_CHART_ID,
                suites: [
                    {
                        class: ZoomScatterChartViewTestSuite,
                        groups: ['all'],
                        severity: cotc.SEVERITY_LOW
                    }
                ]
            },
            {
                    viewId: smwl.SM_CLUSTER_GRID_ID,
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
                                    gridDataParseFn: smtu.deleteFieldsForClusterScatterChart
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