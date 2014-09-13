/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    //TODO: Make it generic for any kind of form edit.
    var FormGridView = Backbone.View.extend({
        render: function () {
            var baseUrl = smUtils.getObjectDetailUrl(smConstants.SERVER_PREFIX_ID),
                viewConfig = this.attributes.viewConfig,
                path = viewConfig['path'],
                model = this.model,
                elId = this.attributes.elementId,
                clusterId = (model != null) ? model.getValueByPath(path) : '',
                params = clusterId != '' ? ('?cluster_id=' + clusterId) : '',
                url = baseUrl + params;

            var gridConfig = {
                header: {
                    title: {
                        text: smLabels.TITLE_SERVERS
                    },
                    defaultControls: {
                        exportable: false,
                        refreshable: false,
                        searchable: true
                    },
                    customControls: ['<i class="icon-filter"></i>']
                },
                columnHeader: {
                    columns: smGridConfig.EDIT_SERVERS_ROLES_COLUMNS
                },
                body: {
                    options: {
                        checkboxSelectable: true,
                        detail: false
                    },
                    dataSource: {
                        remote: {
                            ajaxConfig: {
                                url: url
                            }
                        }
                    }
                },
                footer: {
                    pager: {
                        options: {
                            pageSize: 5
                        }

                    }
                }
            };

            smUtils.renderGrid(this.$el, gridConfig);
        }
    });

    return FormGridView;
});