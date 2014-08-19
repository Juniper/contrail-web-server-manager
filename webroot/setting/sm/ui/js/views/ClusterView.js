/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'setting/sm/ui/js/models/ClusterModel',
    'setting/sm/ui/js/views/ClusterEditView'
], function (_, Backbone, ClusterModel, ClusterEditView) {
    var ClusterView = Backbone.View.extend({
        el: $(contentContainer),

        render: function () {
            var directoryTemplate = contrail.getTemplate4Id(smConstants.SM_PREFIX_ID + "-template"),
                gridElId = '#' + smConstants.CLUSTER_PREFIX_ID + '-results',
                headerActionsTemplate = contrail.getTemplate4Id("sm-actions-template"),
                options;

            this.$el.html(directoryTemplate({name: smConstants.CLUSTER_PREFIX_ID}));

            options = {elementId: gridElId, data: [], url: '/sm/objects/details/cluster?field=cluster'};

            options.gridConfig = {
                header: {
                    title: {
                        text: smGridConfig.CLUSTER_GRID_TITLE
                    },
                    customControls: options['customControls'],
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
                                url: options.url
                            }
                        }
                    }
                }
            };

            smUtils.renderGrid(options);
        }
    });

    var gridActionCellConfig = [
        smGridConfig.getConfigureAction(function (rowIndex) {
            var prefixId = smConstants.CLUSTER_PREFIX_ID,
                dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex),
                clusterModel = new ClusterModel(dataItem),
                clusterEditView = new ClusterEditView({'model': clusterModel});

            clusterEditView.render({"title": "Configure Cluster"});
        }),
        smGridConfig.getAddServersAction(function (rowIndex) {
            console.log(rowIndex);
        }),
        smGridConfig.getReimageAction(function (rowIndex) {
            console.log(rowIndex);
        }),
        smGridConfig.getProvisionAction(function (rowIndex) {
            console.log(rowIndex);
        })
    ];

    var gridTemplateConfig = [
        [
            {
                title: 'Details',
                keys: ['id', 'parameters.uuid', 'parameters.domain', 'email', 'parameters.openstack_mgmt_ip', 'parameters.gateway', 'parameters.subnet_mask']
            }
        ],
        [
            {
                title: 'Configurations',
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

                clusterEditView.render({"title": "Add Cluster"});
            }
        },
        {
            "type": "dropdown",
            "iconClass": "icon-cog",
            "actions": [
                {
                    "iconClass": "icon-upload-alt",
                    "title": "Reimage",
                    "onClick": function () {
                    }
                },
                {
                    "iconClass": "icon-cloud-upload",
                    "title": "Provision",
                    "onClick": function () {
                    }
                },
                {
                    "iconClass": "icon-trash",
                    "title": "Delete",
                    "onClick": function () {
                    }
                }
            ]
        }
    ];
    return ClusterView;
});