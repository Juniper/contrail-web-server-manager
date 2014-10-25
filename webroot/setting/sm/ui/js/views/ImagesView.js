/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'setting/sm/ui/js/models/ImageModel',
    'setting/sm/ui/js/views/ImageEditView'
], function (_, Backbone, ImageModel, ImageEditView) {
    var prefixId = smConstants.IMAGE_PREFIX_ID,
        imageEditView = new ImageEditView(),
        gridElId = '#' + prefixId + '-results';

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
                        checkboxSelectable: {
                            onNothingChecked: function(e){
                                $('#btnDeleteImages').addClass('disabled-link');
                            },
                            onSomethingChecked: function(e){
                                $('#btnDeleteImages').removeClass('disabled-link');
                            }
                        },
                        detail: {
                            template: $('#sm-grid-2-row-group-detail-template').html(),
                            templateConfig: detailTemplateConfig
                        }
                    },
                    dataSource: {
                        remote: {
                            ajaxConfig: {
                                url: smUtils.getObjectDetailUrl(prefixId, 'filterInImages')
                            }
                        }
                    }
                }
            };

            smUtils.renderGrid(gridElId, gridConfig);
        }
    });

    var rowActionConfig = [
        smGridConfig.getDeleteAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex),
                imageModel = new ImageModel(dataItem),
                checkedRow = dataItem,
                _title = smLabels.TITLE_DELETE_IMAGE + ' ('+ dataItem['id'] +')';

            imageEditView.model = imageModel;
            imageEditView.renderDeleteImage({"title": _title, checkedRows: checkedRow, callback: function () {
                var dataView = $(gridElId).data("contrailGrid")._dataView;
                dataView.refreshData();
            }});
        })
    ];

    var headerActionConfig = [
        {
            "type": "link",
            "title": smLabels.TITLE_ADD_IMAGE,
            "iconClass": "icon-plus",
            "onClick": function () {
                var imageModel = new ImageModel();

                imageEditView.model = imageModel;
                imageEditView.render({"title": smLabels.TITLE_ADD_IMAGE, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
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