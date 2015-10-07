define([
    'co-test-unit',
    'sm-test-utils',
    'sm-test-messages',
    'server-tab-view-mock-data',
    'co-grid-contrail-list-model-test-suite',
    'co-grid-view-test-suite'
], function (CUnit, smtu, smtm, ServerTabViewMockData, GridListModelTestSuite, GridViewTestSuite) {

    var moduleId = smtm.SERVER_TAB_VIEW_COMMON_TEST_MODULE;

    var fakeServerConfig = CUnit.getDefaultFakeServerConfig();

    var fakeServerResponsesConfig = function () {
        var responses = [];

        /*
         /sm/server/monitoring/config                 [Done]
         /sm/tags/names                               [Done]
         /sm/objects/details/server?id=a7s12          [Done]
         /sm/server/monitoring/info?id=a7s12          [Done]
         /sm/server/inventory/info?id=a7s12           [Done]
         */

        responses.push(CUnit.createFakeServerResponse({
            url: smtu.getRegExForUrl(smwc.URL_TAG_NAMES),
            body: JSON.stringify(ServerTabViewMockData.getTagNamesData())
        }));

        responses.push(CUnit.createFakeServerResponse({
            url: smtu.getRegExForUrl(smwu.getObjectDetailUrl('server')),
            body: JSON.stringify(ServerTabViewMockData.getServerDetailsData())
        }));

        responses.push(CUnit.createFakeServerResponse({
            url: smtu.getRegExForUrl(smwu.getObjectDetailUrl('server')),
            body: JSON.stringify(ServerTabViewMockData.getServerDetailsData())
        }));

        responses.push(CUnit.createFakeServerResponse({
            url: smtu.getRegExForUrl('/sm/server/monitoring/config'),
            body: JSON.stringify(ServerTabViewMockData.getServerMonitoringConfigData())
        }));

        responses.push(CUnit.createFakeServerResponse({
            url: smtu.getRegExForUrl('/sm/server/monitoring/info'),
            body: JSON.stringify(ServerTabViewMockData.getServerMonitoringInfoData())
        }));

        responses.push(CUnit.createFakeServerResponse({
            url: smtu.getRegExForUrl('/sm/server/inventory/info'),
            body: JSON.stringify(ServerTabViewMockData.getServerInventoryInfoData())
        }));

        return responses;
    };
    fakeServerConfig.getResponsesConfig = fakeServerResponsesConfig;

    var pageConfig = CUnit.getDefaultPageConfig();
    pageConfig.hashParams = {
        p: 'setting_sm_servers',
        q: {
            server_id : "a7s12"
        }
    };
    pageConfig.loadTimeout = 5000;

    var getTestConfig = function () {
        return {
            rootView: smPageLoader.smView,
            tests: [
                {
                    viewId: smwl.SM_SERVER_MONITORING_RESOURCE_INFO_ID,
                },
                {
                    viewId: smwl.SM_SERVER_CHASSIS_DETAILS_ID
                },
                {
                    viewId: smwl.SM_SERVER_MONITORING_SENSOR_GRID_ID
                },
                {
                    viewId: smwl.SM_SERVER_MONITORING_INTERFACE_GRID_ID
                },
                {
                    viewId: smwl.SM_SERVER_MONITORING_FILESYSTEM_GRID_ID
                },
                {
                    viewId: smwl.SM_SERVER_MONITORING_DISKUSAGE_GRID_ID
                },
                // Inventory
                {
                    viewId: smwl.SM_SERVER_INVENTORY_DETAILS_ID
                },
                {
                    viewId: smwl.SM_SERVER_INVENTORY_INTERFACE_GRID_ID,
                    suites: [
                        {
                            class: GridViewTestSuite,
                            groups: ['all'],
                            severity: cotc.SEVERITY_LOW
                        }
                    ]
                },
                {
                    viewId: smwl.SM_SERVER_INVENTORY_FRU_GRID_ID
                }
            ]
        };
    };

    var testInitFn = function() {
        //simulate click on all the tabs
        var serverTabsViewObj = smPageLoader.smView.viewMap[smwl.SM_SERVER_TAB_VIEW_ID],
            serverTabs = serverTabsViewObj.attributes.viewConfig.tabs;

        _.each(serverTabs, function(tab) {
            $("#" + tab.elementId + "-tab-link").trigger("click");
        });

        return;
    };

    var pageTestConfig = CUnit.createPageTestConfig(moduleId, fakeServerConfig, pageConfig, getTestConfig, testInitFn);

    CUnit.startTestRunner(pageTestConfig);
});