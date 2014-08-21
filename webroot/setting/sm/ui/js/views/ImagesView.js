/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'setting/sm/ui/js/models/ImageModel',
    'setting/sm/ui/js/views/ImageEditView'
], function (_, Backbone, ImageModel, ImageEditView) {
    var prefixId = smConstants.IMAGE_PREFIX_ID;

    var ImagesView = Backbone.View.extend({
        el: $(contentContainer),

        render: function () {
            var directoryTemplate = contrail.getTemplate4Id(smConstants.SM_PREFIX_ID + "-template"),
                gridElId = '#' + prefixId + '-results';

            this.$el.html(directoryTemplate({name: prefixId}));

            var gridConfig = {
                header: {
                    title: {
                        text: smLabels.TITLE_IMAGES
                    },
                    advanceControls: headerControlConfig
                },
                columnHeader: {
                    columns: smGridConfig.IMAGE_COLUMNS
                },
                body: {
                    options: {
                        actionCell: gridActionCellConfig
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
                imageModel = new ImageModel(dataItem),
                imageEditView = new ImageEditView({'model': imageModel});

            imageEditView.render({"title": "Configure Image"});
        })
    ];

    var headerControlConfig = [
        {
            "type": "link",
            "title": "Add Image",
            "iconClass": "icon-plus",
            "onClick": function () {
                var imageModel = new ImageModel(),
                    imageEditView = new ImageEditView({'model': imageModel});

                imageEditView.render({"title": "Add Image"});
            }
        },
        {
            "type": "dropdown",
            "iconClass": "icon-cog",
            "actions": [
                {
                    "iconClass": "icon-trash",
                    "title": smLabels.TITLE_DELETE,
                    "onClick": function () {
                    }
                }
            ]
        }
    ];

    return ImagesView;
});