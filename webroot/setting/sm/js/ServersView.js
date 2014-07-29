/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'text!/setting/sm/templates/sm.html'
], function (_, Backbone, smTemplates) {
    var ServersView = Backbone.View.extend({
        el: $(contentContainer),

        render: function (options) {
            var directoryTemplate = Handlebars.compile($(smTemplates, "#" + smConstants.SM_PREFIX_ID + "-template").html()), // TODO: Cache Template
                gridElId = '#' + smConstants.SERVER_PREFIX_ID + '-results',
                options;

            this.$el.html(directoryTemplate({name: smConstants.SERVER_PREFIX_ID}));

            options = {elementId: gridElId, data: [], url:'/sm/objects/details/server?field=server' + options['queryString']};
            options['titleText'] = smGridConfig.SERVERS_GRID_TITLE;;
            options['columns'] = smGridConfig.SERVER_COLUMNS;
            options['actions'] = smGridConfig.SERVER_ROW_ACTIONS;
            options['customControls'] = smGridConfig.SERVER_GRID_ACTIONS;

            smUtils.renderGrid(options);
        }
    });
    return ServersView;
});