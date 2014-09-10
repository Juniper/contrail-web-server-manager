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
                    advanceControls: headerActionConfig
                },
                columnHeader: {
                    columns: smGridConfig.IMAGE_COLUMNS
                },
                body: {
                    options: {
                        actionCell: rowActionConfig,
                        detail: {
                            template: $('#sm-grid-2-row-group-detail-template').html(),
                            templateConfig: detailTemplateConfig
                        }
                    },
                    dataSource: {
                        remote: {
                            ajaxConfig: {
                                url: smUtils.getObjectDetailUrl(prefixId, prefixId)
                            }
                        }
                    }
                }
            };

            smUtils.renderGrid(gridElId, gridConfig);
        }
    });

    var rowActionConfig = [
        smGridConfig.getConfigureAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex),
                imageModel = new ImageModel(dataItem),
                imageEditView = new ImageEditView({'model': imageModel});

            imageEditView.render({"title": smLabels.TITLE_EDIT_CONFIG});
        })
    ];

    var headerActionConfig = [
        {
            "type": "link",
            "title": smLabels.TITLE_DELETE,
            "iconClass": "icon-trash",
            "onClick": function () {}
        },
        {
            "type": "link",
            "title": smLabels.TITLE_ADD_IMAGE,
            "iconClass": "icon-plus",
            "onClick": function () {
                var imageModel = new ImageModel(),
                    imageEditView = new ImageEditView({'model': imageModel});

                imageEditView.render({"title": smLabels.TITLE_ADD_IMAGE});
            }
        }
    ];

    var detailTemplateConfig = [
        [
            {
                title: smLabels.TITLE_DETAILS,
                keys: ['id', 'type', 'version', 'path']
            }
        ]
    ];

    return ImagesView;
});