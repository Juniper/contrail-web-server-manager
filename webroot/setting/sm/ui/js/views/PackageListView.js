/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'contrail-list-model'
], function (_, Backbone, ContrailListModel) {
    var PackageListView = Backbone.View.extend({
        el: $(contentContainer),

        render: function () {
            var self = this;

            var listModelConfig = {
                remote: {
                    ajaxConfig: {
                        url: smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, 'filterInPackages')
                    }
                },
                cacheConfig: {
                    ucid: smwc.UCID_ALL_PACKAGE_LIST
                }
            };

            var contrailListModel = new ContrailListModel(listModelConfig);
            cowu.renderView4Config(this.$el, contrailListModel, getPackageListViewConfig());
        }
    });

    var getPackageListViewConfig = function () {
        return {
            elementId: cowu.formatElementId([smwl.SM_PACKAGE_LIST_SECTION_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.SM_PACKAGE_GRID_VIEW_ID,
                                title: smwl.TITLE_PACKAGES,
                                view: "PackageGridView",
                                app: cowc.APP_CONTRAIL_SM,
                                viewConfig: {pagerOptions: { options: { pageSize: 25, pageSizeSelect: [25, 50, 100] } }}
                            }
                        ]
                    }
                ]
            }
        }
    };

    return PackageListView;
});