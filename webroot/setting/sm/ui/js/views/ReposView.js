/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'setting/sm/ui/js/models/RepoModel'
], function (_, Backbone, RepoModel) {
    var ImagesView = Backbone.View.extend({
        el: $(contentContainer),

        render: function () {
            var directoryTemplate = contrail.getTemplate4Id(smConstants.SM_PREFIX_ID + "-template"),
                gridElId = '#' + smConstants.REPO_PREFIX_ID + '-results',
                options;

            this.$el.html(directoryTemplate({name: smConstants.REPO_PREFIX_ID}));

            options = {elementId: gridElId, data: [], url:'/sm/objects/details/image?field=image'};
            options['titleText'] = smGridConfig.REPOS_GRID_TITLE;
            options['columns'] = smGridConfig.REPO_COLUMNS;
            options['actions'] = [
                smGridConfig.getConfigureAction(function(rowIndex){
                    var prefixId = smConstants.REPO_PREFIX_ID,
                        dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex),
                        repoModel = new RepoModel(dataItem);

                    smUtils.renderJSONEditor({'prefixId': prefixId, 'className': 'modal-700', 'title': "Configure Repo", 'model': repoModel, 'onSave': function() {
                        repoModel.saveConfig();
                    }});
                })
            ];

            options['customControls'] = [
                '<a title="Add Repo"><i class="icon-plus"></i></a>',
                '<a title="Actions"><i class="icon-cog"></i></a>'
            ];

            smUtils.renderGrid(options);
        }
    });
    return ImagesView;
});