/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'setting/sm/ui/js/models/ClusterModel',
    'setting/sm/ui/js/views/ClusterEditView'
], function (_, Backbone, ClusterModel, ClusterEditView) {
    var prefixId = smwc.CLUSTER_PREFIX_ID,
        clusterEditView = new ClusterEditView(),
        gridElId = "#" + smwl.SM_CLUSTER_GRID_ID;

    var ClusterGridView = Backbone.View.extend({
        render: function () {
            var self = this,
                viewConfig = this.attributes.viewConfig,
                pagerOptions = viewConfig['pagerOptions'];

            cowu.renderView4Config(self.$el, self.model, getClusterGridViewConfig(pagerOptions));
        }
    });

    function getHeaderActionConfig(gridElId) {
        return [
            {
                "type": "link",
                "title": smwl.TITLE_ADD_CLUSTER,
                "iconClass": "icon-plus",
                "onClick": function () {
                    var clusterModel = new ClusterModel();

                    clusterEditView.model = clusterModel;
                    clusterEditView.renderAddCluster({"title": smwl.TITLE_ADD_CLUSTER, callback: function () {
                        var dataView = $(gridElId).data("contrailGrid")._dataView;
                        dataView.refreshData();
                    }});
                }
            }
        ];
    };

    function getRowActionConfig(gridElId) {
        return [
            smwgc.getAddServersAction(function (rowIndex) {
                var dataItem = $(gridElId).data('contrailGrid')._dataView.getItem(rowIndex),
                    clusterModel = new ClusterModel(dataItem),
                    title = smwl.TITLE_ADD_SERVERS + ' ('+ dataItem['id'] +')';

                clusterEditView.model = clusterModel;
                clusterEditView.renderAddServers({"title": title, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }),
            smwgc.getRemoveServersAction(function (rowIndex) {
                var dataItem = $(gridElId).data('contrailGrid')._dataView.getItem(rowIndex),
                    clusterModel = new ClusterModel(dataItem),
                    title = smwl.TITLE_REMOVE_SERVERS + ' ('+ dataItem['id'] +')';

                clusterEditView.model = clusterModel;
                clusterEditView.renderRemoveServers({"title": title, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }),
            smwgc.getAssignRoleAction(function (rowIndex) {
                var dataItem = $(gridElId).data('contrailGrid')._dataView.getItem(rowIndex),
                    clusterModel = new ClusterModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_ASSIGN_ROLES + ' ('+ dataItem['id'] +')';

                clusterEditView.model = clusterModel;
                clusterEditView.renderAssignRoles({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }),
            smwgc.getConfigureAction(function (rowIndex) {
                var dataItem = $(gridElId).data('contrailGrid')._dataView.getItem(rowIndex),
                    clusterModel = new ClusterModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_EDIT_CONFIG + ' ('+ dataItem['id'] +')';

                clusterEditView.model = clusterModel;
                clusterEditView.renderConfigure({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }),
            smwgc.getReimageAction(function (rowIndex) {
                var dataItem = $(gridElId).data('contrailGrid')._dataView.getItem(rowIndex),
                    clusterModel = new ClusterModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_REIMAGE + ' ('+ dataItem['id'] +')';

                clusterEditView.model = clusterModel;
                clusterEditView.renderReimage({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }, true),
            smwgc.getProvisionAction(function (rowIndex) {
                var dataItem = $(gridElId).data('contrailGrid')._dataView.getItem(rowIndex),
                    clusterModel = new ClusterModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_PROVISION_CLUSTER + ' ('+ dataItem['id'] +')';

                clusterEditView.model = clusterModel;
                clusterEditView.renderProvision({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }),
            smwgc.getDeleteAction(function (rowIndex) {
                var dataItem = $(gridElId).data('contrailGrid')._dataView.getItem(rowIndex),
                    clusterModel = new ClusterModel(dataItem),
                    checkedRow = dataItem,
                    title = smwl.TITLE_DEL_CLUSTER + ' ('+ dataItem['id'] +')';

                clusterEditView.model = clusterModel;
                clusterEditView.renderDeleteCluster({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }, true)
        ]
    };

    function getClusterGridViewConfig(pagerOptions) {
        return {
            elementId: cowu.formatElementId([smwl.SM_CLUSTER_GRID_SECTION_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.SM_CLUSTER_GRID_ID,
                                title: smwl.TITLE_CLUSTERS,
                                view: "GridView",
                                viewConfig: {
                                    elementConfig: getClusterGridConfig(pagerOptions)
                                }
                            }
                        ]
                    }
                ]
            }
        }
    };

    function getClusterGridConfig(pagerOptions) {
        var gridElementConfig = {
            header: {
                title: {
                    text: smwl.TITLE_CLUSTERS

                },
                advanceControls: getHeaderActionConfig(gridElId)
            },
            columnHeader: {
                columns: smwgc.CLUSTER_COLUMNS
            },
            body: {
                options: {
                    actionCell: getRowActionConfig(gridElId),
                    checkboxSelectable: {
                        onNothingChecked: function(e){
                            $('#btnDeleteClusters').addClass('disabled-link');
                        },
                        onSomethingChecked: function(e){
                            $('#btnDeleteClusters').removeClass('disabled-link');
                        }
                    },
                    detail: {
                        template: cowu.generateDetailTemplateHTML(smwdt.getClusterDetailsTemplate(), cowc.APP_CONTRAIL_SM)
                    }
                },
                dataSource: {
                    remote: {
                        ajaxConfig: {
                            url: smwu.getObjectDetailUrl(prefixId, smwc.SERVERS_STATE_PROCESSOR)
                        }
                    },
                    cacheConfig: {
                        ucid: smwc.UCID_ALL_CLUSTER_LIST
                    }
                }
            },
            footer: {
                pager: contrail.handleIfNull(pagerOptions, { options: { pageSize: 5, pageSizeSelect: [5, 10, 50, 100] } })
            }
        };
        return gridElementConfig;
    };

    return ClusterGridView;
});