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

        render: function () {
            var directoryTemplate = contrail.getTemplate4Id(smConstants.SM_PREFIX_ID + "-template"),
                gridElId = '#' + prefixId + '-results';

            this.$el.html(directoryTemplate({name: prefixId}));

            var gridConfig = {
                header: {
                    title: {
                        text: smLabels.TITLE_CLUSTERS
                    },
                    advanceControls: headerControlConfig
                },
                columnHeader: {
                    columns: smGridConfig.CLUSTER_COLUMNS
                },
                body: {
                    options: {
                        actionCell: gridActionCellConfig,
                        detail: {
                            template: $('#sm-grid-2-row-group-detail-template').html(),
                            templateConfig: gridTemplateConfig
                        }
                    },
                    dataSource: {
                        remote: {
                            ajaxConfig: {
                                url: smUtils.getObjectUrl(prefixId, prefixId)
                            }
                        }
                    }
                }
            };

            smUtils.renderGrid(gridElId, gridConfig);
        }
    });

    var gridActionCellConfig = [
        smGridConfig.getConfigureAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex),
                clusterModel = new ClusterModel(dataItem),
                clusterEditView = new ClusterEditView({'model': clusterModel});

            clusterEditView.renderConfigure({"title": "Configure Cluster"});
        }),
        smGridConfig.getAddServersAction(function (rowIndex) {
            console.log(rowIndex);
        }),
        smGridConfig.getProvisionAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex),
                clusterModel = new ClusterModel(dataItem),
                clusterEditView = new ClusterEditView({'model': clusterModel});

            clusterEditView.renderProvision({"title": "Provision Cluster"});
        }),
        smGridConfig.getDeleteAction(function (rowIndex) {
            console.log(rowIndex);
        })
    ];

    var gridTemplateConfig = [
        [
            {
                title: smLabels.TITLE_DETAILS,
                keys: ['id', 'parameters.uuid', 'parameters.domain', 'email', 'parameters.openstack_mgmt_ip', 'parameters.gateway', 'parameters.subnet_mask']
            }
        ],
        [
            {
                title: smLabels.TITLE_CONFIGURATIONS,
                keys: ['parameters.keystone_tenant', 'parameters.encapsulation_priority', 'parameters.router_asn', 'parameters.haproxy', 'parameters.multi_tenancy', 'parameters.use_certificates' ]
            }
        ]
    ];

    var headerControlConfig = [
        {
            "type": "link",
            "iconClass": "icon-plus",
            "onClick": function () {
                var clusterModel = new ClusterModel(),
                    clusterEditView = new ClusterEditView({'model': clusterModel});

                clusterEditView.renderConfigure({"title": "Add Cluster"});
            }
        },
        {
            "type": "dropdown",
            "iconClass": "icon-cog",
            "actions": [
                {
                    "iconClass": "icon-cloud-upload",
                    "title": smLabels.TITLE_PROVISION,
                    "onClick": function () {
                        var clusterModel, clusterEditView = new ClusterEditView({'model': clusterModel});
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
        }
    ];
    return ClusterView;
});