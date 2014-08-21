/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'setting/sm/ui/js/models/ServerModel',
    'setting/sm/ui/js/views/ServerEditView'
], function (_, Backbone, ServerModel, ServerEditView) {
    var prefixId = smConstants.SERVER_PREFIX_ID;

    var ServersView = Backbone.View.extend({
        el: $(contentContainer),

        render: function (viewConfig) {
            var smTemplate = contrail.getTemplate4Id(smConstants.SM_PREFIX_ID + "-template"),
                gridElId = '#' + prefixId + '-results';

            this.$el.html(smTemplate({name: prefixId}));

            var gridConfig = {
                header: {
                    title: {
                        text: smLabels.TITLE_SERVERS
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
                                url: smUtils.getObjectUrl(prefixId, prefixId) + viewConfig['queryString']
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
                serverModel = new ServerModel(dataItem),
                serverEditView = new ServerEditView({'model': serverModel});

            serverEditView.renderConfigure({"title": "Configure Server"});
        }),
        smGridConfig.getProvisionAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex),
                serverModel = new ServerModel(dataItem),
                serverEditView = new ServerEditView({'model': serverModel});

            serverEditView.renderProvisionServers({"title": "Provision Server"});
        }),
        smGridConfig.getDeleteAction(function (rowIndex) {
            console.log(rowIndex);
        })
    ];

    var gridTemplateConfig = [
        [
            {
                title: smLabels.TITLE_DETAILS,
                keys: ['id', 'cluster_id', 'host_name', 'email']
            },
            {
                title: smLabels.TITLE_SYSTEM,
                keys: ['domain', 'ip_address', 'power_address', 'gateway', 'subnet_mask', 'mac_address', 'parameters.interface_name']
            },
            {
                title: smLabels.TITLE_TAGS,
                keys: ['tag.datacenter', 'tag.floor', 'tag.hall', 'tag.rack', 'tag.user_tag']
            }
        ],
        [
            {
                title: smLabels.TITLE_STATUS,
                keys: ['status', 'last_update']
            },
            {
                title: smLabels.TITLE_CONFIGURATIONS,
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
                    "iconClass": "icon-cogs",
                    "title": smLabels.TITLE_CONFIGURE,
                    "onClick": function () {
                        var serverEditView = new ServerEditView();

                        serverEditView.renderConfigureServers({"title": "Configure Servers"});
                    }
                },
                {
                    "iconClass": "icon-cloud-upload",
                    "title": smLabels.TITLE_PROVISION,
                    "onClick": function () {
                        var serverEditView = new ServerEditView();

                        serverEditView.renderProvisionServers({"title": "Provision Servers"});
                    }
                },
                {
                    "iconClass": "icon-tags",
                    "title": smLabels.TITLE_TAG,
                    "onClick": function () {
                        var serverEditView = new ServerEditView();

                        serverEditView.renderTagServers({"title": "Tag Servers"});
                    }
                },
                {
                    "iconClass": "icon-trash",
                    "title": smLabels.TITLE_DELETE
                }
            ]
        }
    ];

    return ServersView;
});