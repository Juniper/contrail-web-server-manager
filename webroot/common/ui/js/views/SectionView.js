/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var SectionView = Backbone.View.extend({
        render: function () {
            var sectionTempl = contrail.getTemplate4Id("sm-section-view-template"),
                viewConfig = this.attributes.viewConfig,
                validation = this.attributes.validation,
                childElId;

            this.$el.html(sectionTempl(viewConfig));

            var rows = viewConfig['rows'],
                columns, childViewObj;

            for (var i = 0; i < rows.length; i++) {
                columns = rows[i].columns;
                for (var j = 0; j < columns.length; j++) {
                    childViewObj = columns[j];
                    childElId = childViewObj['elementId'];
                    smUtils.renderView4Config(this.$el.find("#" + childElId), this.model, childViewObj, validation);
                }
            }
        }
    });

    return SectionView;
});