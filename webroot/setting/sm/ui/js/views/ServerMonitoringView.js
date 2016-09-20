/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    "underscore",
    "contrail-view",
    "contrail-view-model"
], function (_, ContrailView, ContrailViewModel) {
    var ServerMonitoringView = ContrailView.extend({
        render: function () {
            var self = this, viewConfig = self.attributes.viewConfig,
                serverId = viewConfig.serverId,
                modelMap = contrail.handleIfNull(self.modelMap, {}),
                modelKey = smwc.get(smwc.UMID_SERVER_MONITORING_UVE, serverId);

            var viewModelConfig = {
                modelKey: modelKey,
                remote: {
                    ajaxConfig: {
                        url: smwc.get(smwc.SM_SERVER_MONITORING_INFO_URL, "id=" + serverId),
                        type: "GET"
                    },
                    dataParser: function(response) {
                        response = (response != null && response.length > 0) ? response[0] : {};
                        return response;
                    }
                },
                cacheConfig: {
                    ucid: smwc.get(smwc.UCID_SERVER_MONITORING_UVE, serverId)
                }
            };

            var contrailViewModel = new ContrailViewModel(viewModelConfig);
            modelMap[viewModelConfig.modelKey] = contrailViewModel;

            self.renderView4Config(this.$el, null, getServerMonitoringViewConfig(viewConfig, contrailViewModel), null, null, modelMap);
        }
    });

    function getServerMonitoringViewConfig(viewConfig, contrailViewModel) {
        var serverId = viewConfig.serverId,
            modelKey = smwc.get(smwc.UMID_SERVER_MONITORING_UVE, serverId);

        return {
            elementId: smwl.SM_SERVER_MONITORING_SECTION_ID,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {

                                elementId: smwl.SM_SERVER_MONITORING_INNER_LEFT_SECTION_ID,
                                view: "SectionView",
                                viewConfig: {
                                    class: "col-xs-6",
                                    rows: [
                                        {
                                            columns: [
                                                {
                                                    elementId: smwl.SM_SERVER_MONITORING_RESOURCE_INFO_ID,
                                                    view: "DetailsView",
                                                    viewConfig: {
                                                        ajaxConfig: {
                                                            url: smwc.get(smwc.SM_SERVER_MONITORING_INFO_URL, "select=resource_info_stats&id=" + serverId),
                                                            type: "GET"
                                                        },
                                                        modelKey: modelKey,
                                                        templateConfig: smwdt.getServerCPUMemDetailsTemplate(cowc.THEME_DETAIL_WIDGET),
                                                        app: cowc.APP_CONTRAIL_SM
                                                    }
                                                },
                                                {
                                                    elementId: smwl.SM_SERVER_CHASSIS_DETAILS_ID,
                                                    view: "DetailsView",
                                                    viewConfig: {
                                                        ajaxConfig: {
                                                            url: smwc.get(smwc.SM_SERVER_MONITORING_INFO_URL, "select=chassis_state&id=" + serverId),
                                                            type: "GET"
                                                        },
                                                        modelKey: modelKey,
                                                        templateConfig: smwdt.getServerChassisDetailsTemplate(cowc.THEME_DETAIL_WIDGET),
                                                        app: cowc.APP_CONTRAIL_SM
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            },
                            {
                                elementId: smwl.SM_SERVER_MONITORING_INNER_RIGHT_SECTION_ID,
                                view: "SectionView",
                                viewConfig: {
                                    class: "col-xs-6",
                                    rows: [
                                        {
                                            columns: [
                                                {
                                                    elementId: smwl.SM_SERVER_MONITORING_SENSOR_GRID_ID,
                                                    title: smwl.TITLE_SERVER_SENSORS,
                                                    view: "GridView",
                                                    viewConfig: {
                                                        elementConfig: getSensorGridConfig(serverId, contrailViewModel)
                                                    }
                                                },
                                                {
                                                    elementId: smwl.SM_SERVER_MONITORING_INTERFACE_GRID_ID,
                                                    title: smwl.TITLE_SERVER_MONITORING_INTERFACE,
                                                    view: "GridView",
                                                    viewConfig: {
                                                        elementConfig: getMonitoringInterfaceGridConfig(serverId, contrailViewModel)
                                                    }
                                                },
                                                {
                                                    elementId: smwl.SM_SERVER_MONITORING_FILESYSTEM_GRID_ID,
                                                    title: smwl.TITLE_SERVER_FILE_SYSTEM,
                                                    view: "GridView",
                                                    viewConfig: {
                                                        elementConfig: getFileSystemGridConfig(serverId, contrailViewModel)
                                                    }
                                                },
                                                {
                                                    elementId: smwl.SM_SERVER_MONITORING_DISKUSAGE_GRID_ID,
                                                    title: smwl.TITLE_SERVER_DISK_USAGE,
                                                    view: "GridView",
                                                    viewConfig: {
                                                        elementConfig: getDiskUsageGridConfig(serverId, contrailViewModel)
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                ]
            }
        };
    }

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
                            url: smwc.get(smwc.SM_SERVER_MONITORING_INFO_URL, "select=disk_usage_totals&id=" + serverId),
                            type: "GET"
                        },
                        dataParser: function (response) {
                            var serverMonitoringInfo = response[0].ServerMonitoringInfo;
                            return contrail.checkIfExist(serverMonitoringInfo.disk_usage_totals) ? serverMonitoringInfo.disk_usage_totals : [];
                        }
                    },
                    /*cacheConfig: {
                        setCachedData2ModelCB: function(contrailListModel) {
                            var status = {isCacheUsed: true, reload: false};

                            if (contrailViewModel.isPrimaryRequestInProgress()) {
                                contrailViewModel.onAllRequestsComplete.subscribe(function() {
                                    var ucid = smwc.get(smwc.UCID_SERVER_MONITORING_UVE, serverId),
                                        cachedData = cowch.getDataFromCache(ucid);

                                    var viewModel = cachedData["dataObject"]["viewModel"],
                                        serverMonitoringInfo = contrail.handleIfNull(viewModel.attributes["ServerMonitoringInfo"], {}),
                                        data = contrail.handleIfNull(serverMonitoringInfo["disk_usage_totals"], []);
                                    contrailListModel.setData(data);
                                    contrailListModel.loadedFromCache = true;
                                });
                            } else {
                                var ucid = smwc.get(smwc.UCID_SERVER_MONITORING_UVE, serverId),
                                    cachedData = cowch.getDataFromCache(ucid);

                                var viewModel = cachedData["dataObject"]["viewModel"],
                                    serverMonitoringInfo = contrail.handleIfNull(viewModel.attributes["ServerMonitoringInfo"], {}),
                                    data = contrail.handleIfNull(serverMonitoringInfo["disk_usage_totals"], []);
                                contrailListModel.setData(data);
                                contrailListModel.loadedFromCache = true;
                            }

                            return status;
                        }
                    }*/
                }
            },
            footer: { pager: { options: { pageSize: 5, pageSizeSelect: [5, 10] } } }
        };

        return gridElementConfig;
    }

    function getFileSystemGridConfig(serverId, contrailViewModel) {
        var gridElementConfig = {
            header: {
                title: {
                    text: smwl.TITLE_SERVER_FILE_SYSTEM
                },
                defaultControls: {
                    collapseable: true
                }
            },
            columnHeader: {
                columns: smwgc.SERVER_FILESYSTEM_COLUMNS
            },
            body: {
                options: {
                    checkboxSelectable: false,
                    fixedRowHeight: 30,
                    detail: {
                        template: cowu.generateDetailTemplateHTML(smwdt.getServerFileSystemDetailsTemplate(), cowc.APP_CONTRAIL_SM)
                    }
                },
                dataSource: {
                    remote: {
                        ajaxConfig: {
                            url: smwc.get(smwc.SM_SERVER_MONITORING_INFO_URL, "select=file_system_view_stats&id=" + serverId),
                            type: "GET"
                        },
                        dataParser: function (response) {
                            var serverMonitoringInfo = response[0].ServerMonitoringInfo;
                            return contrail.checkIfExist(serverMonitoringInfo.file_system_view_stats) ? serverMonitoringInfo.file_system_view_stats : [];
                        }
                    },
                    /*cacheConfig: {
                        setCachedData2ModelCB: function(contrailListModel) {
                            var status = {isCacheUsed: true, reload: false};

                            if (contrailViewModel.isPrimaryRequestInProgress()) {
                                contrailViewModel.onAllRequestsComplete.subscribe(function() {
                                    var ucid = smwc.get(smwc.UCID_SERVER_MONITORING_UVE, serverId),
                                        cachedData = cowch.getDataFromCache(ucid);

                                    var viewModel = cachedData["dataObject"]["viewModel"],
                                        serverMonitoringInfo = contrail.handleIfNull(viewModel.attributes["ServerMonitoringInfo"], {}),
                                        data = contrail.handleIfNull(serverMonitoringInfo["file_system_view_stats"], []);
                                    contrailListModel.setData(data);
                                    contrailListModel.loadedFromCache = true;
                                });
                            } else {
                                var ucid = smwc.get(smwc.UCID_SERVER_MONITORING_UVE, serverId),
                                    cachedData = cowch.getDataFromCache(ucid);

                                var viewModel = cachedData["dataObject"]["viewModel"],
                                    serverMonitoringInfo = contrail.handleIfNull(viewModel.attributes["ServerMonitoringInfo"], {}),
                                    data = contrail.handleIfNull(serverMonitoringInfo["file_system_view_stats"], []);
                                contrailListModel.setData(data);
                                contrailListModel.loadedFromCache = true;
                            }

                            return status;
                        }
                    }*/
                }
            },
            footer: { pager: { options: { pageSize: 5, pageSizeSelect: [5, 10] } } }
        };

        return gridElementConfig;
    }

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
                            url: smwc.get(smwc.SM_SERVER_MONITORING_INFO_URL, "select=sensor_stats&id=" + serverId),
                            type: "GET"
                        },
                        dataParser: function (response) {
                            var serverMonitoringInfo = response[0].ServerMonitoringInfo;
                            return contrail.checkIfExist(serverMonitoringInfo.sensor_stats) ? serverMonitoringInfo.sensor_stats : [];
                        }
                    },
                    /*cacheConfig: {
                        setCachedData2ModelCB: function(contrailListModel) {
                            var status = {isCacheUsed: true, reload: false};

                            if (contrailViewModel.isPrimaryRequestInProgress()) {
                                contrailViewModel.onAllRequestsComplete.subscribe(function() {
                                    var ucid = smwc.get(smwc.UCID_SERVER_MONITORING_UVE, serverId),
                                        cachedData = cowch.getDataFromCache(ucid);

                                    var viewModel = cachedData["dataObject"]["viewModel"],
                                        serverMonitoringInfo = contrail.handleIfNull(viewModel.attributes["ServerMonitoringInfo"], {}),
                                        data = contrail.handleIfNull(serverMonitoringInfo["sensor_stats"], []);
                                    contrailListModel.setData(data);
                                    contrailListModel.loadedFromCache = true;
                                });
                            } else {
                                var ucid = smwc.get(smwc.UCID_SERVER_MONITORING_UVE, serverId),
                                    cachedData = cowch.getDataFromCache(ucid);

                                var viewModel = cachedData["dataObject"]["viewModel"],
                                    serverMonitoringInfo = contrail.handleIfNull(viewModel.attributes["ServerMonitoringInfo"], {}),
                                    data = contrail.handleIfNull(serverMonitoringInfo["sensor_stats"], []);
                                contrailListModel.setData(data);
                                contrailListModel.loadedFromCache = true;
                            }

                            return status;
                        }
                    }*/
                }
            },
            footer: {pager: {options: {pageSize: 5, pageSizeSelect: [5, 10, 20] }}}
        };

        return gridElementConfig;
    }

    function getMonitoringInterfaceGridConfig(serverId, contrailViewModel) {
        var gridElementConfig = {
            header: {
                title: {
                    text: smwl.TITLE_SERVER_MONITORING_INTERFACE
                },
                defaultControls: {
                    collapseable: true
                }
            },
            columnHeader: {
                columns: smwgc.SERVER_MONITORING_INTERFACE_COLUMNS
            },
            body: {
                options: {
                    detail: false,
                    checkboxSelectable: false
                },
                dataSource: {
                    remote: {
                        ajaxConfig: {
                            url: smwc.get(smwc.SM_SERVER_MONITORING_INFO_URL, "select=network_info_totals&id=" + serverId),
                            type: "GET"
                        },
                        dataParser: function (response) {
                            var serverMonitoringInfo = response[0].ServerMonitoringInfo;
                            return contrail.checkIfExist(serverMonitoringInfo.network_info_totals) ? serverMonitoringInfo.network_info_totals : [];
                        }
                    },
                    /*cacheConfig: {
                        setCachedData2ModelCB: function(contrailListModel) {
                            var status = {isCacheUsed: true, reload: false};

                            if (contrailViewModel.isPrimaryRequestInProgress()) {
                                contrailViewModel.onAllRequestsComplete.subscribe(function() {
                                    var ucid = smwc.get(smwc.UCID_SERVER_MONITORING_UVE, serverId),
                                        cachedData = cowch.getDataFromCache(ucid);

                                    var viewModel = cachedData["dataObject"]["viewModel"],
                                        serverMonitoringInfo = contrail.handleIfNull(viewModel.attributes["ServerMonitoringInfo"], {}),
                                        data = contrail.handleIfNull(serverMonitoringInfo["network_info_totals"], []);
                                    contrailListModel.setData(data);
                                    contrailListModel.loadedFromCache = true;
                                });
                            } else {
                                var ucid = smwc.get(smwc.UCID_SERVER_MONITORING_UVE, serverId),
                                    cachedData = cowch.getDataFromCache(ucid);

                                var viewModel = cachedData["dataObject"]["viewModel"],
                                    serverMonitoringInfo = contrail.handleIfNull(viewModel.attributes["ServerMonitoringInfo"], {}),
                                    data = contrail.handleIfNull(serverMonitoringInfo["network_info_totals"], []);
                                contrailListModel.setData(data);
                                contrailListModel.loadedFromCache = true;
                            }

                            return status;
                        }
                    }*/
                }
            },
            footer: { pager: { options: { pageSize: 5, pageSizeSelect: [5, 10] } } }
        };

        return gridElementConfig;
    }

    return ServerMonitoringView;
});
