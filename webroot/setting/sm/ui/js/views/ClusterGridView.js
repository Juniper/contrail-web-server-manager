/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    "underscore",
    "contrail-view",
    "sm-basedir/setting/sm/ui/js/models/ClusterModel",
    "sm-basedir/setting/sm/ui/js/views/ClusterEditView",
    "json-model", "json-edit-view", "text!sm-basedir/setting/sm/ui/js/schemas/cluster.json",
    "schema-model",
    "sm-cluster-ui-schema",
    "sm-cluster-custom-ui-schema",
    "view-config-generator"
], function (_, ContrailView, ClusterModel, ClusterEditView, JsonModel, JsonEditView, clusterSchema, UISchemaModel, stSchema, customSchema, VCG) {

    clusterSchema = JSON.parse(clusterSchema);
    var prefixId = smwc.CLUSTER_PREFIX_ID,
        gridElId = "#" + smwl.SM_CLUSTER_GRID_ID;

    var schemaModel = new UISchemaModel(clusterSchema, stSchema, customSchema).schema;
    var vcg = new VCG(prefixId, smwmc.getClusterModel());

    var ClusterGridView = ContrailView.extend({
        render: function () {
            var self = this,
                viewConfig = this.attributes.viewConfig,
                pagerOptions = viewConfig["pagerOptions"];

            self.renderView4Config(self.$el, self.model, getClusterGridViewConfig(pagerOptions));
        }
    });

    function getHeaderActionConfig(gridElId) {
        return [
            {
                "type": "link",
                "title": smwl.TITLE_ADD_CLUSTER,
                "iconClass": "fa fa-plus",
                "onClick": function () {
                    var clusterModel = new ClusterModel(),
                        clusterEditView = new ClusterEditView();

                    clusterEditView.model = clusterModel;
                    clusterEditView.renderAddCluster({"title": smwl.TITLE_ADD_CLUSTER, callback: function () {
                        var dataView = $(gridElId).data("contrailGrid")._dataView;
                        dataView.refreshData();
                    }});
                }
            }
        ];
    }

    function getRowActionConfig(gridElId) {
        return [
            smwgc.getAddServersAction(function (rowIndex) {
                var dataItem = $(gridElId).data("contrailGrid")._dataView.getItem(rowIndex),
                    clusterModel = new ClusterModel(dataItem),
                    title = smwl.TITLE_ADD_SERVERS + " ("+ dataItem["id"] +")",
                    clusterEditView = new ClusterEditView();

                clusterEditView.model = clusterModel;
                clusterEditView.renderAddServers({"title": title, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }),
            smwgc.getRemoveServersAction(function (rowIndex) {
                var dataItem = $(gridElId).data("contrailGrid")._dataView.getItem(rowIndex),
                    clusterModel = new ClusterModel(dataItem),
                    title = smwl.TITLE_REMOVE_SERVERS + " ("+ dataItem["id"] +")",
                    clusterEditView = new ClusterEditView();

                clusterEditView.model = clusterModel;
                clusterEditView.renderRemoveServers({"title": title, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }),
            smwgc.getAssignRoleAction(function (rowIndex) {
                var dataItem = $(gridElId).data("contrailGrid")._dataView.getItem(rowIndex),
                    clusterModel = new ClusterModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_ASSIGN_ROLES + " ("+ dataItem["id"] +")",
                    clusterEditView = new ClusterEditView();

                clusterEditView.model = clusterModel;
                clusterEditView.renderAssignRoles({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }),
            smwgc.getConfigureAction(function (rowIndex) {
                var dataItem = $(gridElId).data("contrailGrid")._dataView.getItem(rowIndex),
                    clusterModel = new ClusterModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_EDIT_CONFIG + " ("+ dataItem["id"] +")",
                    clusterEditView = new ClusterEditView();

                clusterEditView.model = clusterModel;
                clusterEditView.renderConfigure({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }),
            // smwgc.getConfigureAction(function (rowIndex) {
            //     var viewConfigOptions = {
            //         rootViewPath: "",
            //         path : "",
            //         group : "",
            //         page : "",
            //         element : prefixId,
            //         rowIndex: rowIndex,
            //         formType: 'edit'
            //     };
            //     var viewConfig = vcg.generateViewConfig(viewConfigOptions, schemaModel, 'default', 'form');
            //     var dataItem = $(gridElId).data('contrailGrid')._dataView.getItem(rowIndex),
            //         clusterModel = new ClusterModel(dataItem),
            //         checkedRow = [dataItem],
            //         title = smwl.TITLE_EDIT_CONFIG + ' ('+ dataItem['id'] +')',
            //         clusterEditView = new ClusterEditView();
            //
            //     clusterEditView.model = clusterModel;
            //     clusterEditView.renderConfigure({"title": title, viewConfig: viewConfig, checkedRows: checkedRow, rowIndex: rowIndex, callback: function () {
            //         var dataView = $(gridElId).data("contrailGrid")._dataView;
            //         dataView.refreshData();
            //     }});
            // }),
            smwgc.getConfigureJSONAction(function (rowIndex) {
                var dataItem = $(gridElId).data("contrailGrid")._dataView.getItem(rowIndex);
                var oAttributes = cowu.getAttributes4Schema(dataItem, clusterSchema),
                    jsonModel = new JsonModel({json : oAttributes, schema : clusterSchema}),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_EDIT_JSON + " ("+ dataItem["id"] +")",
                    jsonEditView = new JsonEditView();
                jsonEditView.model = jsonModel;
                jsonEditView.renderEditor({
                    title: title,
                    type : smwc.CLUSTER_PREFIX_ID,
                    checkedRows: checkedRow,
                    callback: function () {
                        var dataView = $(gridElId).data("contrailGrid")._dataView;
                        dataView.refreshData();
                    }});
            }),
            smwgc.getReimageAction(function (rowIndex) {
                var dataItem = $(gridElId).data("contrailGrid")._dataView.getItem(rowIndex),
                    clusterModel = new ClusterModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_REIMAGE + " ("+ dataItem["id"] +")",
                    clusterEditView = new ClusterEditView();

                clusterEditView.model = clusterModel;
                clusterEditView.renderReimage({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }, true),
            smwgc.getProvisionAction(function (rowIndex) {
                var dataItem = $(gridElId).data("contrailGrid")._dataView.getItem(rowIndex),
                    clusterModel = new ClusterModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_PROVISION_CLUSTER + " ("+ dataItem["id"] +")",
                    clusterEditView = new ClusterEditView();

                clusterEditView.model = clusterModel;
                clusterEditView.renderProvision({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }),
            smwgc.getRunInventoryAction(function (rowIndex) {
                var dataItem = $(gridElId).data("contrailGrid")._dataView.getItem(rowIndex),
                    clusterModel = new ClusterModel(dataItem),
                    checkedRow = dataItem,
                    title = smwl.TITLE_REFRESH_INVENTORY + " ("+ dataItem["id"] +")",
                    clusterEditView = new ClusterEditView();

                clusterEditView.model = clusterModel;
                clusterEditView.renderRunInventory({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }, true),
            smwgc.getDeleteAction(function (rowIndex) {
                var dataItem = $(gridElId).data("contrailGrid")._dataView.getItem(rowIndex),
                    clusterModel = new ClusterModel(dataItem),
                    checkedRow = dataItem,
                    title = smwl.TITLE_DEL_CLUSTER + " ("+ dataItem["id"] +")",
                    clusterEditView = new ClusterEditView();

                clusterEditView.model = clusterModel;
                clusterEditView.renderDeleteCluster({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }, true)
        ];
    }

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
        };
    }

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
                            $("#btnDeleteClusters").addClass("disabled-link");
                        },
                        onSomethingChecked: function(e){
                            $("#btnDeleteClusters").removeClass("disabled-link");
                        }
                    },
                    fixedRowHeight: 30,
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
    }

    return ClusterGridView;
});
