/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'text!setting/sm/templates/sm.html'
], function (_, Backbone, smTemplates) {
    var VNSView = Backbone.View.extend({
        el: $(contentContainer),

        render: function () {
            var directoryTemplate = Handlebars.compile($(smTemplates, "#" + smConstants.SM_PREFIX_ID + "-template").html()), // TODO: Cache Template
                gridElId = '#' + smConstants.VNS_PREFIX_ID + '-results',
                options;

            this.$el.html(directoryTemplate({name: smConstants.VNS_PREFIX_ID}));

            options = {elementId: gridElId, data: [], url:'/sm/objects/details/vns?field=vns'};
            options['titleText'] = smGridConfig.VNS_GRID_TITLE;
            options['columns'] = smGridConfig.VNS_COLUMNS;
            options['actions'] = smGridConfig.VNS_ROW_ACTIONS;
            options['customControls'] = smGridConfig.VNS_GRID_ACTIONS;

            smUtils.renderGrid(options);
        }
    });
    return VNSView;
});