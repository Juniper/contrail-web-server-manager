/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'setting/sm/ui/js/models/RepoModel',
    'setting/sm/ui/js/views/RepoEditView'
], function (_, Backbone, RepoModel, RepoEditView) {
    var ImagesView = Backbone.View.extend({
        el: $(contentContainer),

        render: function () {
            var directoryTemplate = contrail.getTemplate4Id(smConstants.SM_PREFIX_ID + "-template"),
                gridElId = '#' + smConstants.REPO_PREFIX_ID + '-results',
                headerActionsTemplate = contrail.getTemplate4Id("sm-actions-template"),
                options;

            this.$el.html(directoryTemplate({name: smConstants.REPO_PREFIX_ID}));

            options = {elementId: gridElId, data: [], url:'/sm/objects/details/image?field=image'};
            
            options.gridConfig = {
        		header: {
                    title:{
                        text: smGridConfig.REPOS_GRID_TITLE
                    },
                    customControls: options['customControls'],
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
                                url: options.url
                            }
                        }
                    }
                }
            };
            
            smUtils.renderGrid(options);
        }
    });

    var gridActionCellConfig = [
        smGridConfig.getConfigureAction(function(rowIndex){
            var prefixId = smConstants.REPO_PREFIX_ID,
                dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex),
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
                    "title": "Delete",
                    "onClick": function() {}
                }
            ]
        }
    ];

    return ImagesView;
});