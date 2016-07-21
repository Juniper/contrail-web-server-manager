/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'sm-basedir/setting/sm/ui/js/models/ServerModel',
    'sm-basedir/setting/sm/ui/js/views/ServerEditView'
], function (_, ContrailView, ServerModel, ServerEditView) {
    var serverEditView = new ServerEditView();

    var ServerTabView = ContrailView.extend({
        render: function () {
            var self = this, viewConfig = this.attributes.viewConfig;
            self.renderView4Config(self.$el, null, getServerTabViewConfig(viewConfig));
        }
    });

    var getServerTabViewConfig = function (viewConfig) {
        var serverId = viewConfig['serverId'];

        return {
            elementId: smwl.SM_SERVER_TAB_SECTION_ID,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.SM_SERVER_TAB_ID,
                                view: "TabsView",
                                viewConfig: {
                                    theme: 'overcast',
                                    active: 1,
                                    activate: function (e, ui) {
                                        var selTab = $(ui.newTab.context).text();
                                        if (selTab == smwl.TITLE_INVENTORY) {

                                            cowu.checkAndRefreshContrailGrids([
                                                $('#' + smwl.SM_SERVER_INVENTORY_INTERFACE_GRID_ID),
                                                $('#' + smwl.SM_SERVER_INVENTORY_FRU_GRID_ID)
                                            ]);
                                        } else if (selTab == smwl.TITLE_MONITORING) {
                                            cowu.checkAndRefreshContrailGrids([
                                                $('#' + smwl.SM_SERVER_MONITORING_DISKUSAGE_GRID_ID),
                                                $('#' + smwl.SM_SERVER_MONITORING_SENSOR_GRID_ID),
                                                $('#' + smwl.SM_SERVER_MONITORING_INTERFACE_GRID_ID),
                                                $('#' + smwl.SM_SERVER_MONITORING_FILESYSTEM_GRID_ID)
                                            ]);
                                        }
                                    },
                                    tabs: [
                                        {
                                            elementId: smwl.SM_SERVER_TAB_DETAILS_ID,
                                            title: smwl.TITLE_DETAILS,
                                            view: "DetailsView",
                                            viewConfig: {
                                                ajaxConfig: {
                                                    url: smwu.getObjectDetailUrl(smwc.SERVER_PREFIX_ID) + "?id=" + serverId,
                                                    type: 'GET'
                                                },
                                                templateConfig: smwdt.getServerDetailsTemplate(cowc.THEME_DETAIL_WIDGET, getDetailActionConfig(false)),
                                                app: cowc.APP_CONTRAIL_SM,
                                                dataParser: function (response) {
                                                    return (response.length != 0) ? response[0] : {};
                                                }
                                            },
                                            tabConfig: {
                                                renderOnActivate: true
                                            }
                                        },
                                        {
                                            elementId: smwl.SM_SERVER_TAB_MONITORING_ID,
                                            title: smwl.TITLE_MONITORING,
                                            app: cowc.APP_CONTRAIL_SM,
                                            view: "ServerMonitoringView",
                                            viewConfig: {serverId: serverId},
                                            tabConfig: {
                                                renderOnActivate: true
                                            }
                                        },
                                        {
                                            elementId: smwl.SM_SERVER_TAB_INVENTORY_ID,
                                            title: smwl.TITLE_INVENTORY,
                                            app: cowc.APP_CONTRAIL_SM,
                                            view: "ServerInventoryView",
                                            viewConfig: {serverId: serverId},
                                            tabConfig: {
                                                renderOnActivate: true
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                ]
            }
        }
    };

    var getDetailActionConfig = function(showAssignRoles) {
        var rowActionConfig = [
            smwgc.getConfigureAction(function (dataItem) {
                var serverModel = new ServerModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_EDIT_CONFIG + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderConfigure({"title": title, checkedRows: checkedRow, callback: function () {
                    loadFeature({p: smwc.URL_HASH_SM_SERVERS, q: {server_id: dataItem['id']}});
                }});
            }),
            smwgc.getTagAction(function (dataItem) {
                var serverModel = new ServerModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_EDIT_TAGS + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderTagServers({
                    title: title,
                    checkedRows: checkedRow,
                    callback: function () {
                        loadFeature({p: smwc.URL_HASH_SM_SERVERS, q: {server_id: dataItem['id']}});
                    },
                    lockEditingByDefault: false
                });
            })
        ];

        if (showAssignRoles) {
            rowActionConfig.push(smwgc.getAssignRoleAction(function (dataItem) {
                var serverModel = new ServerModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_ASSIGN_ROLES + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderAssignRoles({"title": title, checkedRows: checkedRow, callback: function () {
                    loadFeature({p: smwc.URL_HASH_SM_SERVERS, q: {server_id: dataItem['id']}});
                }});
            }));
        }

        rowActionConfig = rowActionConfig.concat([
            smwgc.getReimageAction(function (dataItem) {
                var serverModel = new ServerModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_REIMAGE + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderReimage({"title": title, checkedRows: checkedRow, callback: function () {
                    loadFeature({p: smwc.URL_HASH_SM_SERVERS, q: {server_id: dataItem['id']}});
                }});
            }, true),
            smwgc.getProvisionAction(function (dataItem) {
                var serverModel = new ServerModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_PROVISION_SERVER + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderProvisionServers({"title": title, checkedRows: checkedRow, callback: function () {
                    loadFeature({p: smwc.URL_HASH_SM_SERVERS, q: {server_id: dataItem['id']}});
                }});
            }),
            smwgc.getRunInventoryAction(function (dataItem) {
                var serverModel = new ServerModel(dataItem),
                    checkedRow = dataItem,
                    title = smwl.TITLE_REFRESH_INVENTORY + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderRunInventory({"title": title, checkedRows: checkedRow, callback: function () {
                    loadFeature({p: smwc.URL_HASH_SM_SERVERS, q: {server_id: dataItem['id']}});
                }});
            }),
            smwgc.getDeleteAction(function (dataItem) {
                var serverModel = new ServerModel(dataItem),
                    checkedRow = dataItem,
                    title = smwl.TITLE_DEL_SERVER + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderDeleteServer({"title": title, checkedRows: checkedRow, callback: function () {
                    loadFeature({p: smwc.URL_HASH_SM_SERVERS});
                }});
            }, true)
        ]);

        return [
            {
                title: smwl.TITLE_EDIT_SERVER_CONFIG,
                iconClass: 'icon-cog',
                type: 'dropdown',
                optionList: rowActionConfig
            }
        ];
    };

    return ServerTabView;
});
