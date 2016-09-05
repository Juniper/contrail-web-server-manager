/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    "underscore",
    "contrail-view",
    "sm-basedir/setting/sm/ui/js/models/ClusterModel",
    "sm-basedir/setting/sm/ui/js/views/ClusterEditView"
], function (_, ContrailView, ClusterModel, ClusterEditView) {
    var clusterEditView = new ClusterEditView();

    var ClusterTabView = ContrailView.extend({
        render: function () {
            var self = this, viewConfig = this.attributes.viewConfig;
            self.renderView4Config(self.$el, null, getClusterTabViewConfig(viewConfig));
        }
    });

    var getClusterTabViewConfig = function (viewConfig) {
        var clusterId = viewConfig.clusterId;

        return {
            elementId: smwl.SM_CLUSTER_TAB_SECTION_ID,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.SM_CLUSTER_TAB_ID,
                                view: "TabsView",
                                viewConfig: {
                                    theme: "overcast",
                                    active: 0,
                                    activate: function (e, ui) {
                                        var selTab = $(ui.newTab.context).text();
                                        if (selTab == smwl.TITLE_SERVERS) {
                                            $("#" + smwl.SM_SERVER_GRID_ID).data("contrailGrid").refreshView();
                                            $("#" + smwl.SM_SERVER_SCATTER_CHART_ID).trigger("refresh");
                                        }
                                    },
                                    tabs: [
                                        {
                                            elementId: smwl.SM_CLUSTER_TAB_DETAILS_ID,
                                            title: smwl.TITLE_DETAILS,
                                            view: "DetailsView",
                                            viewConfig: {
                                                ajaxConfig: {
                                                    url: smwu.getObjectDetailUrl(smwc.CLUSTER_PREFIX_ID, smwc.SERVERS_STATE_PROCESSOR) + "&id=" + clusterId,
                                                    type: "GET"
                                                },
                                                templateConfig: smwdt.getClusterDetailsTemplate(cowc.THEME_DETAIL_WIDGET, getDetailActionConfig()),
                                                app: cowc.APP_CONTRAIL_SM,
                                                dataParser: function (response) {
                                                    return (response.length != 0) ? response[0] : {};
                                                }
                                            }
                                        },
                                        {
                                            elementId: smwl.SM_CLUSTER_TAB_SERVERS_ID,
                                            title: smwl.TITLE_SERVERS,
                                            app: cowc.APP_CONTRAIL_SM,
                                            view: "ServerListView",
                                            viewConfig: {serverColumnsType: smwc.CLUSTER_PREFIX_ID, showAssignRoles: true, hashParams: {"cluster_id": clusterId}}
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                ]
            }
        };
    };

    var getDetailActionConfig = function() {
        var rowActionConfig = [
            smwgc.getAddServersAction(function (dataItem) {
                var clusterModel = new ClusterModel(dataItem),
                    title = smwl.TITLE_ADD_SERVERS + " (" + dataItem.id + ")";

                clusterEditView.model = clusterModel;
                clusterEditView.renderAddServers({
                    "title": title, callback: function () {
                        loadFeature({p: smwc.URL_HASH_SM_CLUSTERS, q: {cluster_id: dataItem.id}});
                    }
                });
            }),
            smwgc.getRemoveServersAction(function (dataItem) {
                var clusterModel = new ClusterModel(dataItem),
                    title = smwl.TITLE_REMOVE_SERVERS + " (" + dataItem.id + ")";

                clusterEditView.model = clusterModel;
                clusterEditView.renderRemoveServers({
                    "title": title, callback: function () {
                        loadFeature({p: smwc.URL_HASH_SM_CLUSTERS, q: {cluster_id: dataItem.id}});
                    }
                });
            }),
            smwgc.getAssignRoleAction(function (dataItem) {
                var clusterModel = new ClusterModel(dataItem),
                    title = smwl.TITLE_ASSIGN_ROLES + " (" + dataItem.id + ")";

                clusterEditView.model = clusterModel;
                clusterEditView.renderAssignRoles({
                    "title": title, callback: function () {
                        loadFeature({p: smwc.URL_HASH_SM_CLUSTERS, q: {cluster_id: dataItem.id}});
                    }
                });
            }),
            smwgc.getConfigureAction(function (dataItem) {
                var clusterModel = new ClusterModel(dataItem),
                    title = smwl.TITLE_EDIT_CONFIG + " (" + dataItem.id + ")";

                clusterEditView.model = clusterModel;
                clusterEditView.renderConfigure({
                    "title": title, callback: function () {
                        loadFeature({p: smwc.URL_HASH_SM_CLUSTERS, q: {cluster_id: dataItem.id}});
                    }
                });
            }),
            smwgc.getReimageAction(function (dataItem) {
                var clusterModel = new ClusterModel(dataItem),
                    title = smwl.TITLE_REIMAGE + " (" + dataItem.id + ")";

                clusterEditView.model = clusterModel;
                clusterEditView.renderReimage({
                    "title": title, callback: function () {
                        loadFeature({p: smwc.URL_HASH_SM_CLUSTERS, q: {cluster_id: dataItem.id}});
                    }
                });
            }, true),
            smwgc.getProvisionAction(function (dataItem) {
                var clusterModel = new ClusterModel(dataItem),
                    title = smwl.TITLE_PROVISION_CLUSTER + " (" + dataItem.id + ")";

                clusterEditView.model = clusterModel;
                clusterEditView.renderProvision({
                    "title": title, callback: function () {
                        loadFeature({p: smwc.URL_HASH_SM_CLUSTERS, q: {cluster_id: dataItem.id}});
                    }
                });
            }),
            smwgc.getRunInventoryAction(function (dataItem) {
                var clusterModel = new ClusterModel(dataItem),
                    checkedRow = dataItem,
                    title = smwl.TITLE_REFRESH_INVENTORY + " (" + dataItem.id + ")";

                clusterEditView.model = clusterModel;
                clusterEditView.renderRunInventory({
                    "title": title, checkedRows: checkedRow, callback: function () {
                        loadFeature({p: smwc.URL_HASH_SM_CLUSTERS, q: {}});
                    }
                });
            }),
            smwgc.getDeleteAction(function (dataItem) {
                var clusterModel = new ClusterModel(dataItem),
                    checkedRow = dataItem,
                    title = smwl.TITLE_DEL_CLUSTER + " (" + dataItem.id + ")";

                clusterEditView.model = clusterModel;
                clusterEditView.renderDeleteCluster({
                    "title": title, checkedRows: checkedRow, callback: function () {
                        loadFeature({p: smwc.URL_HASH_SM_CLUSTERS, q: {}});
                    }
                });
            }, true)
        ];

        return [
            {
                title: smwl.TITLE_EDIT_CLUSTER_CONFIG,
                iconClass: "fa fa-cog",
                type: "dropdown",
                optionList: rowActionConfig
            }
        ];
    };

    return ClusterTabView;
});
