/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'setting/sm/ui/js/models/ImageModel',
    'setting/sm/ui/js/views/ImageEditView'
], function (_, Backbone, ImageModel, ImageEditView) {
    var prefixId = smwc.IMAGE_PREFIX_ID,
        imageEditView = new ImageEditView(),
        gridElId = '#' + prefixId + smwc.RESULTS_SUFFIX_ID;

    var ImagesView = Backbone.View.extend({
        el: $(contentContainer),

        render: function () {
            var directoryTemplate = contrail.getTemplate4Id(smwc.SM_PREFIX_ID + smwc.TMPL_SUFFIX_ID);

            this.$el.html(directoryTemplate({name: prefixId}));

            var gridConfig = {
                header: {
                    title: {
                        text: smwl.TITLE_IMAGES
                    },
                    advanceControls: headerActionConfig
                },
                columnHeader: {
                    columns: smwgc.IMAGE_COLUMNS
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
                                url: smwu.getObjectDetailUrl(prefixId, 'filterInImages')
                            }
                        }
                    }
                }
            };

            smwu.renderGrid(gridElId, gridConfig);
        }
    });

    var rowActionConfig = [
        smwgc.getDeleteAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + smwc.RESULTS_SUFFIX_ID).data('contrailGrid')._dataView.getItem(rowIndex),
                imageModel = new ImageModel(dataItem),
                checkedRow = dataItem,
                _title = smwl.TITLE_DELETE_IMAGE + ' ('+ dataItem['id'] +')';

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
            "title": smwl.TITLE_ADD_IMAGE,
            "iconClass": "icon-plus",
            "onClick": function () {
                var imageModel = new ImageModel();

                imageEditView.model = imageModel;
                imageEditView.render({"title": smwl.TITLE_ADD_IMAGE, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }
        }
    ];

    var detailTemplateConfig = [
        [
            {
                title: smwl.TITLE_DETAILS,
                keys: ['id', 'type', 'version', 'path']
            }
        ]
    ];

    return ImagesView;
});