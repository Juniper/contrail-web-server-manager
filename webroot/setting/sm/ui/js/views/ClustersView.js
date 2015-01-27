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
        gridElId = '#' + prefixId + smwc.RESULTS_SUFFIX_ID;

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
            var directoryTemplate = contrail.getTemplate4Id(smwc.SM_PREFIX_ID + smwc.TMPL_SUFFIX_ID);

            this.$el.html(directoryTemplate({name: prefixId}));

            var gridConfig = {
                header: {
                    title: {
                        text: smwl.TITLE_CLUSTERS
                    },
                    advanceControls: headerActionConfig
                },
                columnHeader: {
                    columns: smwgc.CLUSTER_COLUMNS
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
                            template: $('#' + smwc.TMPL_2ROW_GROUP_DETAIL).html(),
                            templateConfig: detailTemplateConfig
                        }
                    },
                    dataSource: {
                        remote: {
                            ajaxConfig: {
                                url: smwu.getObjectDetailUrl(prefixId, smwc.SERVERS_STATE_PROCESSOR)
                            }
                        }
                    }
                }
            };

            smwu.renderGrid(gridElId, gridConfig);
        },

        renderCluster: function (clusterId) {
            var detailTemplate = contrail.getTemplate4Id(smwc.TMPL_2ROW_GROUP_DETAIL),
                clusterTemplate = contrail.getTemplate4Id(smwc.TMPL_DETAIL_PAGE),
                clusterActionTemplate = contrail.getTemplate4Id(smwc.TMPL_DETAIL_PAGE_ACTION),
                ajaxConfig = {}, that = this;
            ajaxConfig.type = "GET";
            ajaxConfig.cache = "true";
            ajaxConfig.url = smwu.getObjectDetailUrl(smwc.CLUSTER_PREFIX_ID, smwc.SERVERS_STATE_PROCESSOR) + "&id=" + clusterId;

            that.$el.html(clusterTemplate({prefix: 'cluster', prefixId: clusterId}));
            contrail.ajaxHandler(ajaxConfig, function () {}, function (response) {
                var actionConfigItem = null;
                $.each(detailActionConfig, function(detailActionConfigKey, detailActionConfigValue) {
                    actionConfigItem = $(clusterActionTemplate(detailActionConfigValue));
                    $("#cluster-actions").find('.dropdown-menu').append(actionConfigItem);

                    $(actionConfigItem).on('click', function(){
                        detailActionConfigValue.onClick(response[0])
                    });
                });

                that.$el.find("#cluster-details").html(detailTemplate({dc: response[0], templateConfig: detailTemplateConfig, advancedViewOptions: false}));
                requirejs(["/setting/sm/ui/js/views/ServersView.js"], function (ServersView) {
                    var serversView = new ServersView({
                        el: that.$el.find("#cluster-server-list")
                    });
                    serversView.render({serverColumnsType: smwc.CLUSTER_PREFIX_ID, showAssignRoles: true, hashParams: {"cluster_id": clusterId}});
                });
            }, function () {});
        }
    });

    var detailActionConfig = [
        smwgc.getAddServersAction(function (dataItem) {
            var clusterModel = new ClusterModel(dataItem),
                title = smwl.TITLE_ADD_SERVERS + ' ('+ dataItem['id'] +')';

            clusterEditView.model = clusterModel;
            clusterEditView.renderAddServers({"title": title, callback: function () {
                loadFeature({p: smwc.URL_HASH_SM_CLUSTERS, q: {cluster_id: dataItem['id']}});
            }});
        }),
        smwgc.getRemoveServersAction(function (dataItem) {
            var clusterModel = new ClusterModel(dataItem),
                title = smwl.TITLE_REMOVE_SERVERS + ' ('+ dataItem['id'] +')';

            clusterEditView.model = clusterModel;
            clusterEditView.renderRemoveServers({"title": title, callback: function () {
                loadFeature({p: smwc.URL_HASH_SM_CLUSTERS, q: {cluster_id: dataItem['id']}});
            }});
        }),
        smwgc.getAssignRoleAction(function (dataItem) {
            var clusterModel = new ClusterModel(dataItem),
                title = smwl.TITLE_ASSIGN_ROLES + ' ('+ dataItem['id'] +')';

            clusterEditView.model = clusterModel;
            clusterEditView.renderAssignRoles({"title": title, callback: function () {
                loadFeature({p: smwc.URL_HASH_SM_CLUSTERS, q: {cluster_id: dataItem['id']}});
            }});
        }),
        smwgc.getConfigureAction(function (dataItem) {
            var clusterModel = new ClusterModel(dataItem),
                title = smwl.TITLE_EDIT_CONFIG + ' ('+ dataItem['id'] +')';

            clusterEditView.model = clusterModel;
            clusterEditView.renderConfigure({"title": title, callback: function () {
                loadFeature({p: smwc.URL_HASH_SM_CLUSTERS, q: {cluster_id: dataItem['id']}});
            }});
        }),
        smwgc.getReimageAction(function (dataItem) {
            var clusterModel = new ClusterModel(dataItem),
                title = smwl.TITLE_REIMAGE + ' ('+ dataItem['id'] +')';

            clusterEditView.model = clusterModel;
            clusterEditView.renderReimage({"title": title, callback: function () {
                loadFeature({p: smwc.URL_HASH_SM_CLUSTERS, q: {cluster_id: dataItem['id']}});
            }});
        }, true),
        smwgc.getProvisionAction(function (dataItem) {
            var clusterModel = new ClusterModel(dataItem),
                title = smwl.TITLE_PROVISION_CLUSTER + ' ('+ dataItem['id'] +')';

            clusterEditView.model = clusterModel;
            clusterEditView.renderProvision({"title": title, callback: function () {
                loadFeature({p: smwc.URL_HASH_SM_CLUSTERS, q: {cluster_id: dataItem['id']}});
            }});
        }),
        smwgc.getDeleteAction(function (dataItem) {
            var clusterModel = new ClusterModel(dataItem),
                checkedRow = dataItem
                title = smwl.TITLE_DEL_CLUSTER + ' ('+ dataItem['id'] +')';

            clusterEditView.model = clusterModel;
            clusterEditView.renderDeleteCluster({"title": title, checkedRows: checkedRow, callback: function () {
                loadFeature({p: smwc.URL_HASH_SM_CLUSTERS, q: {}});
            }});
        }, true)
    ];

    var rowActionConfig = [
        smwgc.getAddServersAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + smwc.RESULTS_SUFFIX_ID).data('contrailGrid')._dataView.getItem(rowIndex),
                clusterModel = new ClusterModel(dataItem),
                title = smwl.TITLE_ADD_SERVERS + ' ('+ dataItem['id'] +')';

            clusterEditView.model = clusterModel;
            clusterEditView.renderAddServers({"title": title, callback: function () {
                var dataView = $(gridElId).data("contrailGrid")._dataView;
                dataView.refreshData();
            }});
        }),
        smwgc.getRemoveServersAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + smwc.RESULTS_SUFFIX_ID).data('contrailGrid')._dataView.getItem(rowIndex),
                clusterModel = new ClusterModel(dataItem),
                title = smwl.TITLE_REMOVE_SERVERS + ' ('+ dataItem['id'] +')';

            clusterEditView.model = clusterModel;
            clusterEditView.renderRemoveServers({"title": title, callback: function () {
                var dataView = $(gridElId).data("contrailGrid")._dataView;
                dataView.refreshData();
            }});
        }),
        smwgc.getAssignRoleAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + smwc.RESULTS_SUFFIX_ID).data('contrailGrid')._dataView.getItem(rowIndex),
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
            var dataItem = $('#' + prefixId + smwc.RESULTS_SUFFIX_ID).data('contrailGrid')._dataView.getItem(rowIndex),
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
            var dataItem = $('#' + prefixId + smwc.RESULTS_SUFFIX_ID).data('contrailGrid')._dataView.getItem(rowIndex),
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
            var dataItem = $('#' + prefixId + smwc.RESULTS_SUFFIX_ID).data('contrailGrid')._dataView.getItem(rowIndex),
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
            var dataItem = $('#' + prefixId + smwc.RESULTS_SUFFIX_ID).data('contrailGrid')._dataView.getItem(rowIndex),
                clusterModel = new ClusterModel(dataItem),
                checkedRow = dataItem,
                title = smwl.TITLE_DEL_CLUSTER + ' ('+ dataItem['id'] +')';

            clusterEditView.model = clusterModel;
            clusterEditView.renderDeleteCluster({"title": title, checkedRows: checkedRow, callback: function () {
                var dataView = $(gridElId).data("contrailGrid")._dataView;
                dataView.refreshData();
            }});
        }, true)
    ];

    var detailTemplateConfig = [
        [
            {
                title: smwl.TITLE_DETAILS,
                keys: ['id', 'email']
            },
            {
                title: smwl.TITLE_OPENSTACK,
                keys: ['parameters.openstack_mgmt_ip', 'parameters.keystone_tenant', 'parameters.keystone_username']
            },
            {
                title: smwl.TITLE_SERVERS_CONFIG,
                keys: ['parameters.domain', 'parameters.gateway', 'parameters.subnet_mask', 'base_image_id', 'package_image_id']
            },
            {
                title: smwl.TITLE_CONTRAIL_CONTROLLER,
                keys: ['parameters.analytics_data_ttl', 'parameters.haproxy', 'parameters.multi_tenancy', 'parameters.use_certificates', 'parameters.external_bgp', 'parameters.encapsulation_priority', 'parameters.router_asn', 'parameters.database_dir']
            },
            {
                title: smwl.TITLE_CONTRAIL_STORAGE,
                keys: ['parameters.storage_mon_secret', 'parameters.osd_bootstrap_key', 'parameters.admin_key']
            }
        ],
        [
            {
                title: smwl.TITLE_STATUS,
                keys: ['ui_added_parameters.servers_status.total_servers', 'ui_added_parameters.servers_status.new_servers', 'ui_added_parameters.servers_status.configured_servers', 'ui_added_parameters.servers_status.inreimage_servers', 'ui_added_parameters.servers_status.reimaged_servers', 'ui_added_parameters.servers_status.inprovision_servers', 'ui_added_parameters.servers_status.provisioned_servers']
            },
            {
                title: smwl.TITLE_HA_CONFIG,
                keys: ['parameters.internal_vip', 'parameters.external_vip', 'parameters.contrail_internal_vip', 'parameters.contrail_external_vip', 'parameters.nfs_server', 'parameters.nfs_glance_path']
            },
            {
                title: smwl.TITLE_STORAGE,
                keys: ['parameters.uuid', 'parameters.storage_virsh_uuid', 'parameters.storage_fsid']
            },
        ]
    ];

    var headerActionConfig = [
        /*
        {
            "type": "link",
            linkElementId: 'btnDeleteClusters',
            disabledLink: true,
            "title": smLabels.TITLE_DEL_CLUSTERS,
            "iconClass": "icon-trash",
            "onClick": function () {
            }
        },
        */
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
    return ClusterView;
});
