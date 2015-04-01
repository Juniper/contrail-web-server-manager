/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'contrail-view-model'
], function (_, Backbone, ContrailViewModel) {
    var ServerInventoryView = Backbone.View.extend({
        render: function () {
            var self = this, viewConfig = self.attributes.viewConfig,
                serverId = viewConfig['serverId'],
                modelMap = contrail.handleIfNull(self.modelMap, {}),
                modelKey = smwc.get(smwc.UMID_SERVER_INVENTORY_UVE, serverId);

            var viewModelConfig = {
                modelKey: modelKey,
                remote: {
                    ajaxConfig: {
                        url: smwc.get(smwc.SM_SERVER_INVENTORY_INFO_URL, "&id=" + serverId),
                        type: 'GET'
                    },
                    dataParser: function(response) {
                        response = (response.length > 0) ? response[0] : {};
                        return response;
                    }
                },
                cacheConfig: {
                    ucid: smwc.get(smwc.UCID_SERVER_INVENTORY_UVE, serverId)
                }
            };

            var contrailViewModel = new ContrailViewModel(viewModelConfig);
            modelMap[viewModelConfig['modelKey']] = contrailViewModel;
            cowu.renderView4Config(this.$el, null, getServerInventoryViewConfig(viewConfig, contrailViewModel), null, null, modelMap);
        }
    });

    function getServerInventoryViewConfig(viewConfig, contrailViewModel) {
        var serverId = viewConfig['serverId'],
            modelKey = smwc.get(smwc.UMID_SERVER_INVENTORY_UVE, serverId);

        return {
            elementId: smwl.SM_SERVER_INVENTORY_SECTION_ID,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.SM_SERVER_INVENTORY_DETAILS_ID,
                                view: "DetailsView",
                                viewConfig: {
                                    ajaxConfig: {
                                        url: smwc.get(smwc.SM_SERVER_INVENTORY_INFO_URL, "&id=" + serverId),
                                        type: 'GET'
                                    },
                                    modelKey: modelKey,
                                    templateConfig: smwdt.getServerInventoryDetailsTemplate(cowc.THEME_DETAIL_WIDGET),
                                    app: cowc.APP_CONTRAIL_SM
                                }
                            },
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: smwl.SM_SERVER_INVENTORY_INTERFACE_GRID_ID,
                                title: smwl.TITLE_SERVER_INTERFACE_INFO,
                                view: "GridView",
                                viewConfig: {
                                    elementConfig: getInterfaceGridConfig(serverId, contrailViewModel)
                                }
                            }
                        ]
                    },
                    {
                        columns: [
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
    };

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
                    checkboxSelectable: false
                },
                dataSource: {
                    remote: {
                        ajaxConfig: {
                            url: smwc.get(smwc.SM_SERVER_INVENTORY_INFO_URL, "&id=" + serverId),
                            type: 'GET'
                        },
                        dataParser: function (response) {
                            return response['ServerInventoryInfo']['fru_infos'];
                        }
                    },
                    cacheConfig: {
                        setCachedData2ModelCB: function(contrailListModel) {
                            var status = {isCacheUsed: true, reload: false};

                            contrailViewModel.onAllRequestsComplete.subscribe(function() {
                                var ucid = smwc.get(smwc.UCID_SERVER_INVENTORY_UVE, serverId),
                                    cachedData = cowch.getDataFromCache(ucid);

                                var viewModel = cachedData['dataObject']['viewModel'],
                                    serverInventoryInfo = contrail.handleIfNull(viewModel.attributes['ServerInventoryInfo'], {}),
                                    data = contrail.handleIfNull(serverInventoryInfo['fru_infos'], []);

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
                columns: smwgc.SERVER_INTERFACE_COLUMNS
            },
            body: {
                options: {
                    detail: false,
                    checkboxSelectable: false
                },
                dataSource: {
                    remote: {
                        ajaxConfig: {
                            url: smwc.get(smwc.SM_SERVER_INVENTORY_INFO_URL, "&id=" + serverId),
                            type: 'GET'
                        },
                        dataParser: function (response) {
                            return response['ServerInventoryInfo']['interface_infos'];
                        }
                    },
                    cacheConfig: {
                        setCachedData2ModelCB: function(contrailListModel) {
                            var status = {isCacheUsed: true, reload: false};

                            contrailViewModel.onAllRequestsComplete.subscribe(function() {
                                var ucid = smwc.get(smwc.UCID_SERVER_INVENTORY_UVE, serverId),
                                    cachedData = cowch.getDataFromCache(ucid);

                                var viewModel = cachedData['dataObject']['viewModel'],
                                    serverInventoryInfo = contrail.handleIfNull(viewModel.attributes['ServerInventoryInfo'], {}),
                                    data = contrail.handleIfNull(serverInventoryInfo['interface_infos'], []);
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

    return ServerInventoryView;
});