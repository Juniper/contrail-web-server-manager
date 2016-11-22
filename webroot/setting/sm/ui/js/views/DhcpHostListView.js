/*
 * Copyright (c) 2016 Juniper Networks, Inc. All rights reserved.
 */

define([
    "underscore",
    "contrail-view",
    "contrail-list-model",
    "sm-constants",
    "sm-labels",
    "sm-utils"
], function (_, ContrailView, ContrailListModel, smwc, smwl, smwu) {
    var DhcpHostListView = ContrailView.extend({
        el: $(contentContainer),

        render: function () {
            var self = this;

            var listModelConfig = {
                remote: {
                    ajaxConfig: {
                        url: smwu.getObjectUrl(smwc.DHCP_HOST_PREFIX_ID, "filterInDhcpHost")
                    }
                }
            };

            var contrailListModel = new ContrailListModel(listModelConfig);
            self.renderView4Config(this.$el, contrailListModel, getDhcpHostListViewConfig());
        }
    });

    var getDhcpHostListViewConfig = function () {
        return {
            elementId: cowu.formatElementId([smwl.SM_DHCP_HOST_LIST_SECTION_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.SM_DHCP_HOST_GRID_VIEW_ID,
                                title: smwl.TITLE_DHCP_HOST,
                                view: "DhcpHostGridView",
                                app: cowc.APP_CONTRAIL_SM,
                                viewConfig: {pagerOptions: { options: { pageSize: 25, pageSizeSelect: [25, 50, 100] } }}
                            }
                        ]
                    }
                ]
            }
        };
    };

    return DhcpHostListView;
});
