/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'setting/sm/ui/js/models/PackageModel',
    'setting/sm/ui/js/views/PackageEditView'
], function (_, Backbone, PackageModel, PackageEditView) {
    var prefixId = smConstants.PACKAGE_PREFIX_ID,
        packageEditView = new PackageEditView(),
        gridElId = '#' + prefixId + '-results';

    var PackagesView = Backbone.View.extend({
        el: $(contentContainer),

        render: function () {
            var directoryTemplate = contrail.getTemplate4Id(smConstants.SM_PREFIX_ID + "-template"),
                gridElId = '#' + prefixId + '-results';

            this.$el.html(directoryTemplate({name: prefixId}));

            var gridConfig = {
                header: {
                    title: {
                        text: smLabels.TITLE_PACKAGES
                    },
                    advanceControls: headerActionConfig
                },
                columnHeader: {
                    columns: smGridConfig.REPO_COLUMNS
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
                                url: smUtils.getObjectDetailUrl(smConstants.IMAGE_PREFIX_ID, 'filterInPackages')
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
                packageModel = new PackageModel(dataItem),
                checkedRow = dataItem,
                _title = smLabels.TITLE_DELETE_PACKAGE + ' ('+ dataItem['id'] +')';

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
            "title": smLabels.TITLE_ADD_PACKAGE,
            "iconClass": "icon-plus",
            "onClick": function () {
                var packageModel = new PackageModel();

                packageEditView.model = packageModel;
                packageEditView.render({"title": smLabels.TITLE_ADD_PACKAGE, callback: function () {
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

    return PackagesView;
});