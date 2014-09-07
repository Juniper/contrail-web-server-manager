/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'setting/sm/ui/js/models/ClusterModel',
    'setting/sm/ui/js/views/ClusterEditView'
], function (_, Backbone, ClusterModel, ClusterEditView) {
    var prefixId = smConstants.CLUSTER_PREFIX_ID;

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
            var directoryTemplate = contrail.getTemplate4Id(smConstants.SM_PREFIX_ID + "-template"),
                gridElId = '#' + prefixId + '-results';

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
                        detail: {
                            template: $('#sm-grid-2-row-group-detail-template').html(),
                            templateConfig: detailTemplateConfig
                        }
                    },
                    dataSource: {
                        remote: {
                            ajaxConfig: {
                                url: smUtils.getObjectDetailUrl(prefixId, prefixId)
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
                ajaxConfig = {}, that = this;
            ajaxConfig.type = "GET";
            ajaxConfig.cache = "true";
            ajaxConfig.url = smUtils.getObjectDetailUrl(smConstants.CLUSTER_PREFIX_ID, smConstants.CLUSTER_PREFIX_ID) + "&id=" + clusterId;
            that.$el.html(clusterTemplate());
            contrail.ajaxHandler(ajaxConfig, function () {
            }, function (response) {
                that.$el.find("#cluster-details").html(detailTemplate({dc: response[0], templateConfig: detailTemplateConfig}));
                requirejs(["/setting/sm/ui/js/views/ServersView.js"], function (ServersView) {
                    var serversView = new ServersView({
                        el: that.$el.find("#cluster-server-list")
                    });
                    serversView.render({hashParams: {"cluster_id": clusterId}});
                });
            }, function () {
            });
        }
    });

    var rowActionConfig = [
        smGridConfig.getConfigureAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex),
                clusterModel = new ClusterModel(dataItem),
                clusterEditView = new ClusterEditView({'model': clusterModel});

            clusterEditView.renderConfigure({"title": smLabels.TITLE_CONFIGURE + ' ' + smLabels.TITLE_CLUSTER});
        }),
        smGridConfig.getAddServersAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex),
                clusterModel = new ClusterModel(dataItem),
                clusterEditView = new ClusterEditView({'model': clusterModel});

            clusterEditView.renderAddServers({"title": smLabels.TITLE_ADD_SERVERS});
        }),
        smGridConfig.getProvisionAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex),
                clusterModel = new ClusterModel(dataItem),
                clusterEditView = new ClusterEditView({'model': clusterModel});

            clusterEditView.renderProvision({"title": smLabels.TITLE_PROVISION + ' ' + smLabels.TITLE_CLUSTER});
        }),
        smGridConfig.getDeleteAction(function (rowIndex) {
            console.log(rowIndex);
        })
    ];

    var detailTemplateConfig = [
        [
            {
                title: smLabels.TITLE_DETAILS,
                keys: ['id', 'parameters.uuid', 'parameters.domain', 'email', 'parameters.openstack_mgmt_ip', 'parameters.gateway', 'parameters.subnet_mask']
            }
        ],
        [
            {
                title: smLabels.TITLE_CONFIGURATIONS,
                keys: ['parameters.analytics_data_ttl', 'parameters.keystone_tenant', 'parameters.encapsulation_priority', 'parameters.router_asn', 'parameters.haproxy', 'parameters.multi_tenancy', 'parameters.use_certificates' ]
            }
        ]
    ];

    var headerActionConfig = [
        {
            "type": "dropdown",
            "iconClass": "icon-cog",
            "actions": [
                {
                    "iconClass": "icon-cloud-upload",
                    "title": smLabels.TITLE_PROVISION,
                    "onClick": function () {
                        var clusterModel = new ClusterModel(),
                            clusterEditView = new ClusterEditView({'model': clusterModel});
                        clusterEditView.renderProvision({"title": "Provision Clusters"});
                    }
                },
                {
                    "iconClass": "icon-trash",
                    "title": smLabels.TITLE_DELETE,
                    "onClick": function () {
                    }
                }
            ]
        },
        {
            "type": "link",
            "iconClass": "icon-plus",
            "onClick": function () {
                var clusterModel = new ClusterModel(),
                    clusterEditView = new ClusterEditView({'model': clusterModel});

                clusterEditView.renderConfigure({"title": smLabels.TITLE_ADD + ' ' + smLabels.TITLE_CLUSTER});
            }
        }
    ];
    return ClusterView;
});