/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var AccordianView = Backbone.View.extend({
        render: function () {
            var accordianTempl = contrail.getTemplate4Id("sm-accordian-view-template"),
                viewConfig = this.attributes.viewConfig,
                elId = this.attributes.elementId,
                validation = this.attributes.validation,
                lockEditingByDefault = this.attributes.lockEditingByDefault,
                childViewObj, childElId;

            this.$el.html(accordianTempl({viewConfig: viewConfig, elementId: elId}));

            for (var i = 0; i < viewConfig.length; i++) {
                childViewObj = viewConfig[i];
                childElId = childViewObj['elementId'];
                smUtils.renderView4Config(this.$el.find("#" + childElId), this.model, childViewObj, validation, lockEditingByDefault);
            }

            this.$el.find("#" + elId).accordion({
                heightStyle: "content",
                collapsible: true
            });
        }
    });

    return AccordianView;
});