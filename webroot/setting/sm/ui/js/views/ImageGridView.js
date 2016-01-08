/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'sm-basedir/setting/sm/ui/js/models/ImageModel',
    'sm-basedir/setting/sm/ui/js/views/ImageEditView'
], function (_, ContrailView, ImageModel, ImageEditView) {
    var prefixId = smwc.IMAGE_PREFIX_ID,
        gridElId = "#" + smwl.SM_IMAGE_GRID_ID;

    var ImageGridView = ContrailView.extend({
        render: function () {
            var self = this,
                viewConfig = this.attributes.viewConfig,
                pagerOptions = viewConfig['pagerOptions'];

            self.renderView4Config(self.$el, self.model, getImageGridViewConfig(pagerOptions));
        }
    });

    function getImageGridViewConfig(pagerOptions) {
        return {
            elementId: cowu.formatElementId([smwl.SM_IMAGE_GRID_SECTION_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.SM_IMAGE_GRID_ID,
                                title: smwl.TITLE_IMAGES,
                                view: "GridView",
                                viewConfig: {
                                    elementConfig: getImageGridConfig(pagerOptions)
                                }
                            }
                        ]
                    }
                ]
            }
        }
    };

    function getRowActionConfig() {
        return [
            smwgc.getDeleteAction(function (rowIndex) {
                var dataItem = $(gridElId).data('contrailGrid')._dataView.getItem(rowIndex),
                    imageModel = new ImageModel(dataItem),
                    checkedRow = dataItem,
                    title = smwl.TITLE_DELETE_IMAGE + ' (' + dataItem['id'] + ')',
                    imageEditView = new ImageEditView();

                imageEditView.model = imageModel;
                imageEditView.renderDeleteImage({
                    "title": title, checkedRows: checkedRow, callback: function () {
                        var dataView = $(gridElId).data("contrailGrid")._dataView;
                        dataView.refreshData();
                    }
                });
            })
        ];
    };

    function getHeaderActionConfig() {
        return [
            {
                "type": "link",
                "title": smwl.TITLE_ADD_IMAGE,
                "iconClass": "icon-plus",
                "onClick": function () {
                    var imageModel = new ImageModel(),
                        imageEditView = new ImageEditView();

                    imageEditView.model = imageModel;
                    imageEditView.render({
                        "title": smwl.TITLE_ADD_IMAGE, callback: function () {
                            var dataView = $(gridElId).data("contrailGrid")._dataView;
                            dataView.refreshData();
                        }
                    });
                }
            }
        ];
    };

    function getImageGridConfig(pagerOptions) {
        var gridElementConfig = {
            header: {
                title: {
                    text: smwl.TITLE_IMAGES
                },
                advanceControls: getHeaderActionConfig()
            },
            columnHeader: {
                columns: smwgc.IMAGE_COLUMNS
            },
            body: {
                options: {
                    actionCell: getRowActionConfig(),
                    checkboxSelectable: {
                        onNothingChecked: function (e) {
                            $('#btnDeleteImages').addClass('disabled-link');
                        },
                        onSomethingChecked: function (e) {
                            $('#btnDeleteImages').removeClass('disabled-link');
                        }
                    },
                    fixedRowHeight: 30,
                    detail: {
                        template: cowu.generateDetailTemplateHTML(smwdt.getImageDetailsTemplate(), cowc.APP_CONTRAIL_SM)
                    }
                },
                dataSource: {
                    remote: {
                        ajaxConfig: {
                            url: smwu.getObjectDetailUrl(prefixId, 'filterInImages')
                        }
                    },
                    cacheConfig: {
                        ucid: smwc.UCID_ALL_IMAGE_LIST
                    }
                }
            },
            footer: {
                pager: contrail.handleIfNull(pagerOptions, {
                    options: {
                        pageSize: 5,
                        pageSizeSelect: [5, 10, 50, 100]
                    }
                })
            }
        };

        return gridElementConfig;
    };

    return ImageGridView;
});