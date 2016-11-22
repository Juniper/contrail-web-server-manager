define([
    "co-test-constants",
    "co-test-runner",
    "sm-test-utils",
    "sm-test-messages",
    "setting/sm/test/ui/views/ServerTabView.mock.data",
    "co-grid-contrail-list-model-test-suite",
    "co-grid-view-test-suite",
    "co-details-view-test-suite",
    "sm-constants",
    "sm-labels",
    "sm-utils"
], function (cotc, cotr, smtu, smtm, ServerTabViewMockData, GridListModelTestSuite, GridViewTestSuite, DetailsViewTestSuite, smwc, smwl, smwu) {

    var moduleId = smtm.SERVER_TAB_VIEW_COMMON_TEST_MODULE;

    var testType = cotc.VIEW_TEST;

    var fakeServerConfig = cotr.getDefaultFakeServerConfig();

    var fakeServerResponsesConfig = function () {
        var responses = [];

        /*
         /sm/server/monitoring/config                 [Done]
         /sm/tags/names                               [Done]
         /sm/objects/details/server?id=a7s12          [Done]
         /sm/server/monitoring/info?id=a7s12          [Done]
         /sm/server/inventory/info?id=a7s12           [Done]
         */

        responses.push(cotr.createFakeServerResponse({
            url: smtu.getRegExForUrl(smwc.URL_TAG_NAMES),
            body: JSON.stringify(ServerTabViewMockData.getTagNamesData())
        }));

        responses.push(cotr.createFakeServerResponse({
            url: smtu.getRegExForUrl(smwu.getObjectDetailUrl("server")),
            body: JSON.stringify(ServerTabViewMockData.getServerDetailsData())
        }));

        responses.push(cotr.createFakeServerResponse({
            url: smtu.getRegExForUrl(smwu.getObjectDetailUrl("server")),
            body: JSON.stringify(ServerTabViewMockData.getServerDetailsData())
        }));

        responses.push(cotr.createFakeServerResponse({
            url: smtu.getRegExForUrl("/sm/server/monitoring/config"),
            body: JSON.stringify(ServerTabViewMockData.getServerMonitoringConfigData())
        }));

        responses.push(cotr.createFakeServerResponse({
            url: smtu.getRegExForUrl("/sm/server/monitoring/info"),
            body: JSON.stringify(ServerTabViewMockData.getServerMonitoringInfoData())
        }));

        responses.push(cotr.createFakeServerResponse({
            url: smtu.getRegExForUrl("/sm/server/inventory/info"),
            body: JSON.stringify(ServerTabViewMockData.getServerInventoryInfoData())
        }));

        return responses;
    };
    fakeServerConfig.getResponsesConfig = fakeServerResponsesConfig;

    var pageConfig = cotr.getDefaultPageConfig();
    pageConfig.hashParams = {
        p: "setting_sm_servers",
        q: {
            server_id : "a7s12"
        }
    };
    pageConfig.loadTimeout = cotc.PAGE_LOAD_TIMEOUT * 5;

    var getTestConfig = function () {
        return {
            rootView: smPageLoader.smView,
            tests: [
                {
                    viewId: smwl.SM_SERVER_TAB_DETAILS_ID,
                    suites: [
                        {
                            class: DetailsViewTestSuite,
                            groups: ["all"],
                            modelConfig: {
                                dataGenerator: smtu.commonDetailsDataGenerator
                            }
                        }
                    ]
                },
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
                            groups: ["all"]
                        }
                    ]
                },
                {
                    viewId: smwl.SM_SERVER_INVENTORY_FRU_GRID_ID
                }
            ]
        };
    };

    var testInitFn = function(defObj) {
        //simulate click on all the tabs
        var serverTabsViewObj = smPageLoader.smView.viewMap[smwl.SM_SERVER_TAB_VIEW_ID],
            serverTabs = serverTabsViewObj.attributes.viewConfig.tabs;

        _.each(serverTabs, function(tab) {
            $("#" + tab.elementId + "-tab-link").trigger("click");
        });
        setTimeout(function() {
                defObj.resolve();
        }, cotc.PAGE_INIT_TIMEOUT);
        return;
    };

    var pageTestConfig = cotr.createPageTestConfig(moduleId, testType, fakeServerConfig, pageConfig, getTestConfig, testInitFn);

    cotr.startTestRunner(pageTestConfig);
});
