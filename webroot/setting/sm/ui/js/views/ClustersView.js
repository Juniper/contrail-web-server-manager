/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'setting/sm/ui/js/models/ClusterModel',
    'setting/sm/ui/js/views/ClusterEditView'
], function (_, Backbone, ClusterModel, ClusterEditView) {
    var prefixId = smConstants.CLUSTER_PREFIX_ID,
        clusterEditView = new ClusterEditView(),
        gridElId = '#' + prefixId + '-results';

    var ClusterView = Backbone.View.extend({
        el: $(contentContainer),

        render: function (viewConfig) {
            var hashParams = viewConfig['hashParams']
            if (hashParams['cluster_id'] != null) {
                this.renderCluster(hashParams['cluster_id']);
            } else {
                this.renderClustersList();
            }
        },

        renderClustersList: function () {
            var directoryTemplate = contrail.getTemplate4Id(smConstants.SM_PREFIX_ID + "-template");

            this.$el.html(directoryTemplate({name: prefixId}));

            var gridConfig = {
                header: {
                    title: {
                        text: smLabels.TITLE_CLUSTERS
                    },
                    advanceControls: headerActionConfig
                },
                columnHeader: {
                    columns: smGridConfig.CLUSTER_COLUMNS
                },
                body: {
                    options: {
                        actionCell: rowActionConfig,
                        checkboxSelectable: {
                            onNothingChecked: function(e){
                                $('#btnDeleteClusters').addClass('disabled-link');
                            },
                            onSomethingChecked: function(e){
                                $('#btnDeleteClusters').removeClass('disabled-link');
                            }
                        },
                        detail: {
                            template: $('#sm-grid-2-row-group-detail-template').html(),
                            templateConfig: detailTemplateConfig
                        }
                    },
                    dataSource: {
                        remote: {
                            ajaxConfig: {
                                url: smUtils.getObjectDetailUrl(prefixId, smConstants.SERVERS_STATE_PROCESSOR)
                            }
                        }
                    }
                }
            };

            smUtils.renderGrid(gridElId, gridConfig);
        },

        renderCluster: function (clusterId) {
            var detailTemplate = contrail.getTemplate4Id("sm-grid-2-row-group-detail-template"),
                clusterTemplate = contrail.getTemplate4Id("sm-cluster-template"),
                clusterActionTemplate = contrail.getTemplate4Id("sm-cluster-action-template"),
                ajaxConfig = {}, that = this;
            ajaxConfig.type = "GET";
            ajaxConfig.cache = "true";
            ajaxConfig.url = smUtils.getObjectDetailUrl(smConstants.CLUSTER_PREFIX_ID, smConstants.SERVERS_STATE_PROCESSOR) + "&id=" + clusterId;

            that.$el.html(clusterTemplate({cluster_id: clusterId}));
            contrail.ajaxHandler(ajaxConfig, function () {
            }, function (response) {
                var actionConfigItem = null, i = 0;
                $.each(rowActionCallbackConfig, function(rowActionCallbackConfigKey, rowActionCallbackConfigValue) {
                    actionConfigItem = $(clusterActionTemplate(rowActionConfig[i]));
                    that.$el.find("#cluster-actions").append(actionConfigItem);

                    actionConfigItem.on('click', function() {
                        rowActionCallbackConfigValue(response[0]);
                    });
                    i++;
                });

                that.$el.find("#cluster-details").html(detailTemplate({dc: response[0], templateConfig: detailTemplateConfig}));
                requirejs(["/setting/sm/ui/js/views/ServersView.js"], function (ServersView) {
                    var serversView = new ServersView({
                        el: that.$el.find("#cluster-server-list")
                    });
                    serversView.render({serverColumnsType: smConstants.CLUSTER_PREFIX_ID, showAssignRoles: true, hashParams: {"cluster_id": clusterId}});
                });
            }, function () {});
        }
    });

    var rowActionCallbackConfig = {
        renderReimage: function(dataItem) {
            var clusterModel = new ClusterModel(dataItem),
                checkedRow = [dataItem];

            clusterEditView.model = clusterModel;
            clusterEditView.renderReimage({"title": smLabels.TITLE_REIMAGE, checkedRows: checkedRow, callback: function () {
                var dataView = $(gridElId).data("contrailGrid")._dataView;
                dataView.refreshData();
            }});
        },
        renderConfigure: function(dataItem) {
            var clusterModel = new ClusterModel(dataItem),
                checkedRow = [dataItem];

            clusterEditView.model = clusterModel;
            clusterEditView.renderConfigure({"title": smLabels.TITLE_EDIT_CONFIG, checkedRows: checkedRow, callback: function () {
                var dataView = $(gridElId).data("contrailGrid")._dataView;
                dataView.refreshData();
            }});
        },
        renderAddServers: function(dataItem) {
            var clusterModel = new ClusterModel(dataItem);

            clusterEditView.model = clusterModel;
            clusterEditView.renderAddServers({"title": smLabels.TITLE_ADD_SERVERS, callback: function () {
                var dataView = $(gridElId).data("contrailGrid")._dataView;
                dataView.refreshData();
            }});
        },
        renderRemoveServers: function(dataItem) {
            var clusterModel = new ClusterModel(dataItem);

            clusterEditView.model = clusterModel;
            clusterEditView.renderRemoveServers({"title": smLabels.TITLE_REMOVE_SERVERS, callback: function () {
                var dataView = $(gridElId).data("contrailGrid")._dataView;
                dataView.refreshData();
            }});
        },
        renderAssignRoles: function(dataItem) {
            var clusterModel = new ClusterModel(dataItem),
                checkedRow = [dataItem];

            clusterEditView.model = clusterModel;
            clusterEditView.renderAssignRoles({"title": smLabels.TITLE_ASSIGN_ROLES, checkedRows: checkedRow, callback: function () {
                var dataView = $(gridElId).data("contrailGrid")._dataView;
                dataView.refreshData();
            }});
        },
        renderProvision: function(dataItem) {
            clusterModel = new ClusterModel(dataItem),
                checkedRow = [dataItem];

            clusterEditView.model = clusterModel;
            clusterEditView.renderProvision({"title": smLabels.TITLE_PROVISION_CLUSTER, checkedRows: checkedRow, callback: function () {
                var dataView = $(gridElId).data("contrailGrid")._dataView;
                dataView.refreshData();
            }});
        },
        renderDelete: function (dataItem) {
            clusterModel = new ClusterModel(dataItem),
                checkedRow = dataItem;

            clusterEditView.model = clusterModel;
            clusterEditView.renderDeleteCluster({"title": smLabels.TITLE_DEL_CLUSTER, checkedRows: checkedRow, callback: function () {
                var dataView = $(gridElId).data("contrailGrid")._dataView;
                dataView.refreshData();
            }});
        }
    }

    var rowActionConfig = [
        smGridConfig.getReimageAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex);
            rowActionCallbackConfig.renderReimage(dataItem);
        }),
        smGridConfig.getConfigureAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex);
            rowActionCallbackConfig.renderConfigure(dataItem);
        }),
        smGridConfig.getAddServersAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex);
            rowActionCallbackConfig.renderAddServers(dataItem);
        }),
        smGridConfig.getRemoveServersAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex);
            rowActionCallbackConfig.renderRemoveServers(dataItem);
        }),
        smGridConfig.getAssignRoleAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex);
            rowActionCallbackConfig.renderAssignRoles(dataItem)
        }),
        smGridConfig.getProvisionAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex);
            rowActionCallbackConfig.renderProvision(dataItem);
        }),
        smGridConfig.getDeleteAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex);
            rowActionCallbackConfig.renderDelete(dataItem);
        })
    ];

    var detailTemplateConfig = [
        [
            {
                title: smLabels.TITLE_DETAILS,
                keys: ['id', 'email']
            },
            {
                title: smLabels.TITLE_OPENSTACK,
                keys: ['parameters.openstack_mgmt_ip', 'parameters.keystone_tenant', 'parameters.keystone_username']
            },
            {
                title: smLabels.TITLE_CONTRAIL,
                keys: ['parameters.analytics_data_ttl', 'parameters.haproxy', 'parameters.multi_tenancy', 'parameters.use_certificates', 'parameters.external_bgp', 'parameters.encapsulation_priority', 'parameters.router_asn', 'parameters.database_dir']
            }
        ],
        [
            {
                title: smLabels.TITLE_SERVERS_CONFIG,
                keys: ['parameters.domain', 'parameters.gateway', 'parameters.subnet_mask', 'parameters.base_image_id', 'parameters.package_image_id']
            },
            {
                title: smLabels.TITLE_STORAGE,
                keys: ['parameters.uuid', 'parameters.storage_virsh_uuid', 'parameters.storage_fsid']
            },
            {
                title: smLabels.TITLE_STATUS,
                keys: ['ui_added_parameters.servers_status.total_servers', 'ui_added_parameters.servers_status.new_servers', 'ui_added_parameters.servers_status.configured_servers', 'ui_added_parameters.servers_status.inprovision_servers', 'ui_added_parameters.servers_status.provisioned_servers']
            }
        ]
    ];

    var headerActionConfig = [
//        {
//            "type": "link",
//            linkElementId: 'btnDeleteClusters',
//            disabledLink: true,
//            "title": smLabels.TITLE_DEL_CLUSTERS,
//            "iconClass": "icon-trash",
//            "onClick": function () {
//            }
//        },
        {
            "type": "link",
            "title": smLabels.TITLE_ADD_CLUSTER,
            "iconClass": "icon-plus",
            "onClick": function () {
                var clusterModel = new ClusterModel();

                clusterEditView.model = clusterModel;
                clusterEditView.renderAddCluster({"title": smLabels.TITLE_ADD_CLUSTER, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }
        }
    ];
    return ClusterView;
});