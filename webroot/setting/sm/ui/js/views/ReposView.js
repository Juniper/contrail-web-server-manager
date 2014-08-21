/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'setting/sm/ui/js/models/RepoModel',
    'setting/sm/ui/js/views/RepoEditView'
], function (_, Backbone, RepoModel, RepoEditView) {
    var prefixId = smConstants.REPO_PREFIX_ID;

    var ImagesView = Backbone.View.extend({
        el: $(contentContainer),

        render: function () {
            var directoryTemplate = contrail.getTemplate4Id(smConstants.SM_PREFIX_ID + "-template"),
                gridElId = '#' + prefixId + '-results';

            this.$el.html(directoryTemplate({name: prefixId}));

            var gridConfig = {
                header: {
                    title: {
                        text: smLabels.TITLE_REPOS
                    },
                    advanceControls: headerControlConfig
                },
                columnHeader: {
                    columns: smGridConfig.REPO_COLUMNS
                },
                body: {
                    options: {
                        actionCell: gridActionCellConfig
                    },
                    dataSource: {
                        remote: {
                            ajaxConfig: {
                                url: smUtils.getObjectUrl("image", "image")
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
                repoModel = new RepoModel(dataItem),
                repoEditView = new RepoEditView({'model': repoModel});

            repoEditView.render({"title": "Configure Repo"});
        })
    ];

    var headerControlConfig = [
        {
            "type": "link",
            "title": "Add Repo",
            "iconClass": "icon-plus",
            "onClick": function () {
                var repoModel = new RepoModel(),
                    repoEditView = new RepoEditView({'model': repoModel});

                repoEditView.render({"title": "Add Repo"});
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