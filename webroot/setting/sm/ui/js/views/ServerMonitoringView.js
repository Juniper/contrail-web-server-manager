/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'contrail-view-model'
], function (_, Backbone, ContrailViewModel) {
    var ServerMonitoringView = Backbone.View.extend({
        render: function () {
            var self = this, viewConfig = self.attributes.viewConfig,
                serverId = viewConfig['serverId'],
                modelMap = contrail.handleIfNull(self.modelMap, {}),
                modelKey = smwc.get(smwc.UMID_SERVER_MONITORING_UVE, serverId);

            var viewModelConfig = {
                modelKey: modelKey,
                remote: {
                    ajaxConfig: {
                        url: smwc.get(smwc.SM_SERVER_MONITORING_INFO_URL, "&id=" + serverId),
                        type: 'GET'
                    },
                    dataParser: function(response) {
                        response = (response.length > 0) ? response[0] : {};
                        return response;
                    }
                },
                cacheConfig: {
                    ucid: smwc.get(smwc.UCID_SERVER_MONITORING_UVE, serverId)
                }
            };

            var contrailViewModel = new ContrailViewModel(viewModelConfig);
            modelMap[viewModelConfig['modelKey']] = contrailViewModel;
            cowu.renderView4Config(this.$el, null, getServerMonitoringViewConfig(viewConfig, contrailViewModel), null, null, modelMap);
        }
    });

    function getServerMonitoringViewConfig(viewConfig, contrailViewModel) {
        var serverId = viewConfig['serverId'],
            modelKey = smwc.get(smwc.UMID_SERVER_MONITORING_UVE, serverId);

        return {
            elementId: smwl.SM_SERVER_MONITORING_SECTION_ID,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.SM_SERVER_MONITORING_SENSOR_GRID_ID,
                                title: smwl.TITLE_SERVER_SENSORS,
                                view: "GridView",
                                viewConfig: {
                                    class: "span6",
                                    elementConfig: getSensorGridConfig(serverId, contrailViewModel)
                                }
                            },
                            {
                                elementId: smwl.SM_SERVER_MONITORING_DETAILS_ID,
                                view: "DetailsView",
                                viewConfig: {
                                    class: "span6",
                                    ajaxConfig: {
                                        url: smwc.get(smwc.SM_SERVER_MONITORING_INFO_URL, "&id=" + serverId),
                                        type: 'GET'
                                    },
                                    modelKey: modelKey,
                                    templateConfig: smwdt.getServerMonitoringDetailsTemplate(cowc.THEME_DETAIL_WIDGET),
                                    app: cowc.APP_CONTRAIL_SM
                                }
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: smwl.SM_SERVER_MONITORING_DISKUSAGE_GRID_ID,
                                title: smwl.TITLE_SERVER_DISK_USAGE,
                                view: "GridView",
                                viewConfig: {
                                    class: "span6",
                                    elementConfig: getDiskUsageGridConfig(serverId, contrailViewModel)
                                }
                            }
                        ]
                    }
                ]
            }
        }
    };

    function getDiskUsageGridConfig(serverId, contrailViewModel) {
        var gridElementConfig = {
            header: {
                title: {
                    text: smwl.TITLE_SERVER_DISK_USAGE
                },
                defaultControls: {
                    collapseable: true
                }
            },
            columnHeader: {
                columns: smwgc.SERVER_DISKUSAGE_COLUMNS
            },
            body: {
                options: {
                    detail: false,
                    checkboxSelectable: false
                },
                dataSource: {
                    remote: {
                        ajaxConfig: {
                            url: smwc.get(smwc.SM_SERVER_MONITORING_INFO_URL, "&id=" + serverId),
                            type: 'GET'
                        },
                        dataParser: function (response) {
                            return response['ServerMonitoringInfo']['disk_usage_state'];
                        }
                    },
                    cacheConfig: {
                        setCachedData2ModelCB: function(contrailListModel) {
                            var status = {isCacheUsed: true, reload: false};

                            contrailViewModel.onAllRequestsComplete.subscribe(function() {
                                var ucid = smwc.get(smwc.UCID_SERVER_MONITORING_UVE, serverId),
                                    cachedData = cowch.getDataFromCache(ucid);

                                var viewModel = cachedData['dataObject']['viewModel'],
                                    serverMonitoringInfo = contrail.handleIfNull(viewModel.attributes['ServerMonitoringInfo'], {}),
                                    data = contrail.handleIfNull(serverMonitoringInfo['disk_usage_state'], []);
                                contrailListModel.setData(data);
                                contrailListModel.loadedFromCache = true;
                            });

                            return status;
                        }
                    }
                }
            }
        };

        return gridElementConfig;
    };

    function getSensorGridConfig(serverId, contrailViewModel) {
        var gridElementConfig = {
            header: {
                title: {
                    text: smwl.TITLE_SERVER_SENSORS
                },
                defaultControls: {
                    collapseable: true
                }
            },
            columnHeader: {
                columns: smwgc.SERVER_SENSORS_COLUMNS
            },
            body: {
                options: {
                    detail: false,
                    checkboxSelectable: false
                },
                dataSource: {
                    remote: {
                        ajaxConfig: {
                            url: smwc.get(smwc.SM_SERVER_MONITORING_INFO_URL, "&id=" + serverId),
                            type: 'GET'
                        },
                        dataParser: function (response) {
                            return response['ServerMonitoringInfo']['sensor_state'];
                        }
                    },
                    cacheConfig: {
                        setCachedData2ModelCB: function(contrailListModel) {
                            var status = {isCacheUsed: true, reload: false};

                            contrailViewModel.onAllRequestsComplete.subscribe(function() {
                                var ucid = smwc.get(smwc.UCID_SERVER_MONITORING_UVE, serverId),
                                    cachedData = cowch.getDataFromCache(ucid);

                                var viewModel = cachedData['dataObject']['viewModel'],
                                    serverMonitoringInfo = contrail.handleIfNull(viewModel.attributes['ServerMonitoringInfo'], {}),
                                    data = contrail.handleIfNull(serverMonitoringInfo['sensor_state'], []);
                                contrailListModel.setData(data);
                                contrailListModel.loadedFromCache = true;
                            });

                            return status;
                        }
                    }
                }
            },
            footer: { pager: { options: { pageSize: 10, pageSizeSelect: [10, 50, 100] } } }
        };

        return gridElementConfig;
    };

    return ServerMonitoringView;
});