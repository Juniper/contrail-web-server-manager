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

            var queryString = getQueryString4ServersUrl(viewConfig['hashParams'])

            this.$el.html(smTemplate({name: prefixId}));

            var gridConfig = {
                header: {
                    title: {
                        text: smLabels.TITLE_SERVERS + getServerTitleSuffix(viewConfig['hashParams'])
                    },
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
                                url: smUtils.getObjectUrl(prefixId, prefixId) + queryString
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
        smGridConfig.getTagAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex),
                serverModel = new ServerModel(dataItem),
                serverEditView = new ServerEditView({'model': serverModel});

            serverEditView.renderTagServers({"title": "Add Tags"});
        }),
        smGridConfig.getRoleAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex),
                serverModel = new ServerModel(dataItem),
                serverEditView = new ServerEditView({'model': serverModel});

            serverEditView.renderEditRoles({"title": "Edit Roles"});
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
                title: smLabels.TITLE_ROLES,
                keys: ['roles']
            },
            {
                title: smLabels.TITLE_CONFIGURATIONS,
                keys: ['base_image_id', 'package_image_id', 'static_ip', 'parameters.compute_non_mgmt_ip', 'parameters.compute_non_mgmt_gway']
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
                    "title": 'Edit ' + smLabels.TITLE_TAGS,
                    "onClick": function () {
                        var serverEditView = new ServerEditView();
                        serverEditView.renderTagServers({"title": "Add Tags"});
                    }
                },
                {
                    "iconClass": "icon-check",
                    "title": 'Edit ' + smLabels.TITLE_ROLES,
                    "onClick": function () {
                        var serverEditView = new ServerEditView();
                        serverEditView.renderEditRoles({"title": "Edit Roles"});
                    }
                },
                {
                    "iconClass": "icon-trash",
                    "title": smLabels.TITLE_DELETE
                }
            ]
        },
        {
            "type": "link",
            "iconClass": "icon-filter",
            "onClick": function () {
            }
        }
    ];

    return ServersView;

    function getQueryString4ServersUrl(hashParams) {
        var queryString = '', tagKey, tagQueryArray = [];;
        if(hashParams['cluster_id'] != null) {
            queryString += '&cluster_id=' + hashParams['cluster_id'];
        }

        if(hashParams['tag'] != null) {
            for(tagKey in hashParams['tag']) {
                tagQueryArray.push(tagKey + "=" + hashParams['tag'][tagKey]);
            }
            queryString += '&tag=' + tagQueryArray.join(',');
        }
        return queryString;
    };

    function getServerTitleSuffix(hashParams) {
        var titleSuffixArray = [], tagKey;
        if(hashParams['cluster_id'] != null) {
            titleSuffixArray.push(smLabels.TITLE_CLUSTER + ': ' + hashParams['cluster_id']);
        }

        if(hashParams['tag'] != null) {
            for(tagKey in hashParams['tag']) {
                titleSuffixArray.push(smLabels.get(tagKey) + ": " + hashParams['tag'][tagKey]);
            }
        }
        return (titleSuffixArray.length > 0) ? (' (' + titleSuffixArray.join(',') + ') ') : '';
    };
});