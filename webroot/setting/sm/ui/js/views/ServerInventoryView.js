/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    "underscore",
    "contrail-view",
    "contrail-view-model",
    "sm-constants",
    "sm-labels",
    "sm-grid-config",
    "sm-detail-tmpls"
], function (_, ContrailView, ContrailViewModel, smwc, smwl, smwgc, smwdt) {
    var ServerInventoryView = ContrailView.extend({
        render: function () {
            var self = this, viewConfig = self.attributes.viewConfig,
                serverId = viewConfig.serverId,
                modelMap = contrail.handleIfNull(self.modelMap, {}),
                modelKey = smwc.get(smwc.UMID_SERVER_INVENTORY_UVE, serverId);

            var viewModelConfig = {
                modelKey: modelKey,
                remote: {
                    ajaxConfig: {
                        url: smwc.get(smwc.SM_SERVER_INVENTORY_INFO_URL, "id=" + serverId),
                        type: "GET"
                    },
                    dataParser: function(response) {
                        response = (response != null && response.length > 0) ? response[0] : {};
                        return response;
                    }
                },
                cacheConfig: {
                    ucid: smwc.get(smwc.UCID_SERVER_INVENTORY_UVE, serverId)
                }
            };

            var contrailViewModel = new ContrailViewModel(viewModelConfig);
            modelMap[viewModelConfig.modelKey] = contrailViewModel;
            self.renderView4Config(this.$el, null, getServerInventoryViewConfig(viewConfig, contrailViewModel), null, null, modelMap);
        }
    });

    function getServerInventoryViewConfig(viewConfig, contrailViewModel) {
        var serverId = viewConfig.serverId,
            modelKey = smwc.get(smwc.UMID_SERVER_INVENTORY_UVE, serverId);

        return {
            elementId: smwl.SM_SERVER_INVENTORY_SECTION_ID,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.SM_SERVER_INVENTORY_LEFT_SECTION_ID,
                                view: "SectionView",
                                viewConfig: {
                                    class: "col-xs-6",
                                    rows: [
                                        {
                                            columns: [
                                                {
                                                    elementId: smwl.SM_SERVER_INVENTORY_DETAILS_ID,
                                                    view: "DetailsView",
                                                    viewConfig: {
                                                        ajaxConfig: {
                                                            url: smwc.get(smwc.SM_SERVER_INVENTORY_INFO_URL, "id=" + serverId),
                                                            type: "GET"
                                                        },
                                                        modelKey: modelKey,
                                                        templateConfig: smwdt.getServerInventoryDetailsTemplate(cowc.THEME_DETAIL_WIDGET),
                                                        app: cowc.APP_CONTRAIL_SM
                                                    }
                                                },
                                            ]

                                        }
                                    ]
                                }
                            },
                            {
                                elementId: smwl.SM_SERVER_INVENTORY_RIGHT_SECTION_ID,
                                view: "SectionView",
                                viewConfig: {
                                    class: "col-xs-6",
                                    rows: [
                                        {
                                            columns: [
                                                {
                                                    elementId: smwl.SM_SERVER_INVENTORY_INTERFACE_GRID_ID,
                                                    title: smwl.TITLE_SERVER_INTERFACE_INFO,
                                                    view: "GridView",
                                                    viewConfig: {
                                                        elementConfig: getInterfaceGridConfig(serverId, contrailViewModel)
                                                    }
                                                },
                                                {
                                                    elementId: smwl.SM_SERVER_INVENTORY_FRU_GRID_ID,
                                                    title: smwl.TITLE_SERVER_FRU_INFO,
                                                    view: "GridView",
                                                    viewConfig: {
                                                        elementConfig: getFRUGridConfig(serverId, contrailViewModel)
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

    function getFRUGridConfig(serverId, contrailViewModel) {
        var gridElementConfig = {
            header: {
                title: {
                    text: smwl.TITLE_SERVER_FRU_INFO
                },
                defaultControls: {
                    collapseable: true
                }
            },
            columnHeader: {
                columns: smwgc.SERVER_FRU_COLUMNS
            },
            body: {
                options: {
                    detail: {
                        template: cowu.generateDetailTemplateHTML(smwdt.getFRUDetailsTemplate(), cowc.APP_CONTRAIL_SM)
                    },
                    fixedRowHeight: 30,
                    checkboxSelectable: false
                },
                dataSource: {
                    remote: {
                        ajaxConfig: {
                            url: smwc.get(smwc.SM_SERVER_INVENTORY_INFO_URL, "select=fru_infos&id=" + serverId),
                            type: "GET"
                        },
                        dataParser: function (response) {
                            var serverInventoryInfo = response[0].ServerInventoryInfo;
                            return contrail.checkIfExist(serverInventoryInfo.fru_infos) ? serverInventoryInfo.fru_infos : [];
                        }
                    },
                    /*cacheConfig: {
                        setCachedData2ModelCB: function(contrailListModel) {
                            var status = {isCacheUsed: true, reload: false};

                            if (contrailViewModel.isPrimaryRequestInProgress()) {
                                contrailViewModel.onAllRequestsComplete.subscribe(function() {
                                    var ucid = smwc.get(smwc.UCID_SERVER_INVENTORY_UVE, serverId),
                                        cachedData = cowch.getDataFromCache(ucid);

                                    var viewModel = cachedData["dataObject"]["viewModel"],
                                        serverInventoryInfo = contrail.handleIfNull(viewModel.attributes["ServerInventoryInfo"], {}),
                                        data = contrail.handleIfNull(serverInventoryInfo["fru_infos"], []);

                                    contrailListModel.setData(data);
                                    contrailListModel.loadedFromCache = true;
                                });
                            } else {
                                var ucid = smwc.get(smwc.UCID_SERVER_INVENTORY_UVE, serverId),
                                    cachedData = cowch.getDataFromCache(ucid);

                                var viewModel = cachedData["dataObject"]["viewModel"],
                                    serverInventoryInfo = contrail.handleIfNull(viewModel.attributes["ServerInventoryInfo"], {}),
                                    data = contrail.handleIfNull(serverInventoryInfo["fru_infos"], []);

                                contrailListModel.setData(data);
                                contrailListModel.loadedFromCache = true;
                            }
                            return status;
                        }
                    }*/
                }
            },
            footer: { pager: { options: { pageSize: 10, pageSizeSelect: [10, 20] } } }
        };

        return gridElementConfig;
    }

    function getInterfaceGridConfig(serverId, contrailViewModel) {
        var gridElementConfig = {
            header: {
                title: {
                    text: smwl.TITLE_SERVER_INTERFACE_INFO
                },
                defaultControls: {
                    collapseable: true
                }
            },
            columnHeader: {
                columns: smwgc.SERVER_INTERFACE_INFO_COLUMNS
            },
            body: {
                options: {
                    detail: {
                        template: cowu.generateDetailTemplateHTML(smwdt.getInterfaceDetailsTemplate(), cowc.APP_CONTRAIL_SM)
                    },
                    fixedRowHeight: 30,
                    checkboxSelectable: false
                },
                dataSource: {
                    remote: {
                        ajaxConfig: {
                            url: smwc.get(smwc.SM_SERVER_INVENTORY_INFO_URL, "select=interface_infos&id=" + serverId),
                            type: "GET"
                        },
                        dataParser: function (response) {
                            var serverInventoryInfo = response[0].ServerInventoryInfo;
                            return contrail.checkIfExist(serverInventoryInfo.interface_infos) ? serverInventoryInfo.interface_infos : [];
                        }
                    },
                    /*cacheConfig: {
                        setCachedData2ModelCB: function(contrailListModel) {
                            var status = {isCacheUsed: true, reload: false};

                            if (contrailViewModel.isPrimaryRequestInProgress()) {
                                contrailViewModel.onAllRequestsComplete.subscribe(function() {
                                    var ucid = smwc.get(smwc.UCID_SERVER_INVENTORY_UVE, serverId),
                                        cachedData = cowch.getDataFromCache(ucid);

                                    var viewModel = cachedData["dataObject"]["viewModel"],
                                        serverInventoryInfo = contrail.handleIfNull(viewModel.attributes["ServerInventoryInfo"], {}),
                                        data = contrail.handleIfNull(serverInventoryInfo["interface_infos"], []);
                                    contrailListModel.setData(data);
                                    contrailListModel.loadedFromCache = true;
                                });
                            } else {
                                var ucid = smwc.get(smwc.UCID_SERVER_INVENTORY_UVE, serverId),
                                    cachedData = cowch.getDataFromCache(ucid);

                                var viewModel = cachedData["dataObject"]["viewModel"],
                                    serverInventoryInfo = contrail.handleIfNull(viewModel.attributes["ServerInventoryInfo"], {}),
                                    data = contrail.handleIfNull(serverInventoryInfo["interface_infos"], []);
                                contrailListModel.setData(data);
                                contrailListModel.loadedFromCache = true;
                            }

                            return status;
                        }
                    }*/
                }
            },
            footer: { pager: { options: { pageSize: 10, pageSizeSelect: [10, 20] } } }
        };

        return gridElementConfig;
    }

    return ServerInventoryView;
});
