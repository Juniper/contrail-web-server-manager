/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'setting/sm/ui/js/models/PackageModel',
    'setting/sm/ui/js/views/PackageEditView'
], function (_, Backbone, PackageModel, PackageEditView) {
    var prefixId = smwc.PACKAGE_PREFIX_ID,
        packageEditView = new PackageEditView(),
        gridElId = '#' + prefixId + smwc.RESULTS_SUFFIX_ID;

    var PackagesView = Backbone.View.extend({
        el: $(contentContainer),

        render: function () {
            var directoryTemplate = contrail.getTemplate4Id(smwc.SM_PREFIX_ID + smwc.TMPL_SUFFIX_ID);

            this.$el.html(directoryTemplate({name: prefixId}));

            var gridConfig = {
                header: {
                    title: {
                        text: smwl.TITLE_PACKAGES
                    },
                    advanceControls: headerActionConfig
                },
                columnHeader: {
                    columns: smwgc.REPO_COLUMNS
                },
                body: {
                    options: {
                        actionCell: rowActionConfig,
                        checkboxSelectable: {
                            onNothingChecked: function(e){
                                $('#btnDeleteRepos').addClass('disabled-link');
                            },
                            onSomethingChecked: function(e){
                                $('#btnDeleteRepos').removeClass('disabled-link');
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
                                url: smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, 'filterInPackages')
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
                packageModel = new PackageModel(dataItem),
                checkedRow = dataItem,
                _title = smwl.TITLE_DELETE_PACKAGE + ' ('+ dataItem['id'] +')';

            packageEditView.model = packageModel;
            packageEditView.renderDeletePackage({"title": _title, checkedRows: checkedRow, callback: function () {
                var dataView = $(gridElId).data("contrailGrid")._dataView;
                dataView.refreshData();
            }});
        })
    ];

    var headerActionConfig = [
        {
            "type": "link",
            "title": smwl.TITLE_ADD_PACKAGE,
            "iconClass": "icon-plus",
            "onClick": function () {
                var packageModel = new PackageModel();

                packageEditView.model = packageModel;
                packageEditView.render({"title": smwl.TITLE_ADD_PACKAGE, callback: function () {
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

    return PackagesView;
});