/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    "underscore",
    "contrail-view",
    "contrail-list-model"
], function (_, ContrailView, ContrailListModel) {
    var ImageListView = ContrailView.extend({
        el: $(contentContainer),

        render: function () {
            var self = this, prefixId = smwc.IMAGE_PREFIX_ID;

            var listModelConfig = {
                remote: {
                    ajaxConfig: {
                        url: smwu.getObjectDetailUrl(prefixId, "filterInImages")
                    }
                },
                cacheConfig: {
                    ucid: smwc.UCID_ALL_IMAGE_LIST
                }
            };

            var contrailListModel = new ContrailListModel(listModelConfig);
            self.renderView4Config(this.$el, contrailListModel, getImageListViewConfig());
        }
    });

    var getImageListViewConfig = function () {
        return {
            elementId: cowu.formatElementId([smwl.SM_IMAGE_LIST_SECTION_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.SM_IMAGE_GRID_VIEW_ID,
                                title: smwl.TITLE_IMAGES,
                                view: "ImageGridView",
                                app: cowc.APP_CONTRAIL_SM,
                                viewConfig: {pagerOptions: { options: { pageSize: 25, pageSizeSelect: [25, 50, 100] } }}
                            }
                        ]
                    }
                ]
            }
        };
    };

    return ImageListView;
});
