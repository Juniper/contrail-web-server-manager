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
    var DhcpSubnetListView = ContrailView.extend({
        el: $(contentContainer),

        render: function () {
            var self = this;

            var listModelConfig = {
                remote: {
                    ajaxConfig: {
                        url: smwu.getObjectUrl(smwc.DHCP_SUBNET_PREFIX_ID, "filterInDhcpSubnet")
                    }
                }
            };

            var contrailListModel = new ContrailListModel(listModelConfig);
            self.renderView4Config(this.$el, contrailListModel, getDhcpSubnetListViewConfig());
        }
    });

    var getDhcpSubnetListViewConfig = function () {
        return {
            elementId: cowu.formatElementId([smwl.SM_DHCP_SUBNET_LIST_SECTION_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.SM_DHCP_SUBNET_GRID_VIEW_ID,
                                title: smwl.TITLE_DHCP_SUBNET,
                                view: "DhcpSubnetGridView",
                                app: cowc.APP_CONTRAIL_SM,
                                viewConfig: {pagerOptions: { options: { pageSize: 25, pageSizeSelect: [25, 50, 100] } }}
                            }
                        ]
                    }
                ]
            }
        };
    };

    return DhcpSubnetListView;
});
