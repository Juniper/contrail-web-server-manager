/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'text!/setting/sm/templates/sm.html'
], function (_, Backbone, smTemplates) {
    var ImagesView = Backbone.View.extend({
        el: $(contentContainer),

        render: function () {
            var directoryTemplate = Handlebars.compile($(smTemplates, "#" + smConstants.SM_PREFIX_ID + "-template").html()), // TODO: Cache Template
                gridElId = '#' + smConstants.IMAGE_PREFIX_ID + '-results',
                options;

            this.$el.html(directoryTemplate({name: smConstants.IMAGE_PREFIX_ID}));

            options = {elementId: gridElId, data: [], url:'/sm/objects/details/image?field=image'};
            options['titleText'] = smGridConfig.IMAGES_GRID_TITLE;
            options['columns'] = smGridConfig.IMAGE_COLUMNS;
            options['actions'] = smGridConfig.IMAGE_ROW_ACTIONS;
            options['customControls'] = smGridConfig.IMAGE_GRID_ACTIONS;

            smUtils.renderGrid(options);
        }
    });
    return ImagesView;
});