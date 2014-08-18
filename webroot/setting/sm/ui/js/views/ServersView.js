/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'setting/sm/ui/js/models/ServerModel',
    'setting/sm/ui/js/views/ServerEditView'
], function (_, Backbone, ServerModel, ServerEditView) {
    var ServersView = Backbone.View.extend({
        el: $(contentContainer),

        render: function (options) {
            var smTemplate = contrail.getTemplate4Id(smConstants.SM_PREFIX_ID + "-template"),
                gridElId = '#' + smConstants.SERVER_PREFIX_ID + '-results',
                options;

            this.$el.html(smTemplate({name: smConstants.SERVER_PREFIX_ID}));

            options = {elementId: gridElId, data: [], url: '/sm/objects/details/server?field=server' + options['queryString']};

            options.gridConfig = {
                header: {
                    title: {
                        text: smGridConfig.SERVERS_GRID_TITLE
                    },
                    customControls: ['<i class="icon-filter"></i>'],
                    advanceControls: headerControlConfig
                },
                columnHeader: {
                    columns: smGridConfig.SERVER_COLUMNS
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
            var prefixId = smConstants.SERVER_PREFIX_ID,
                dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex),
                serverModel = new ServerModel(dataItem),
                serverEditView = new ServerEditView({'model': serverModel});

            serverEditView.renderConfigureServer({"title": "Configure Server"});
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
                keys: ['id', 'cluster_id', 'host_name', 'email']
            },
            {
                title: 'System',
                keys: ['domain', 'ip_address', 'power_address', 'gateway', 'subnet_mask', 'mac_address', 'parameters.interface_name']
            },
            {
                title: 'Tags',
                keys: ['tag.datacenter', 'tag.floor', 'tag.hall', 'tag.rack', 'tag.user_tag']
            }
        ],
        [
            {
                title: 'Status',
                keys: ['status', 'last_update']
            },
            {
                title: 'Configurations',
                keys: ['base_image_id', 'package_image_id', 'roles', 'static_ip', 'parameters.compute_non_mgmt_ip', 'parameters.compute_non_mgmt_gway']
            }
        ]
    ];

    var headerControlConfig = [
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
                    "iconClass": "icon-tags",
                    "title": "Tag",
                    "onClick": function () {
                        var prefixId = smConstants.SERVER_PREFIX_ID,
                            serverEditView = new ServerEditView();

                        serverEditView.renderTagServers({"title": "Tag Servers"});
                    }
                },
                {
                    "iconClass": "icon-trash",
                    "title": "Delete"
                }
            ]
        }
    ];

    return ServersView;
});