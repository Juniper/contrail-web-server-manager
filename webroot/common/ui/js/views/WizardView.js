/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var SectionView = Backbone.View.extend({
        render: function () {
            var wizardTempl = contrail.getTemplate4Id("sm-wizard-view-template"),
                viewConfig = this.attributes.viewConfig,
                elId = this.attributes.elementId,
                validation = this.attributes.validation,
                childViewObj, childElId, steps;

            this.$el.html(wizardTempl({viewConfig: viewConfig, elementId: elId}));
            steps = viewConfig['steps'];

            for (var i = 0; i < steps.length; i++) {
                childViewObj = steps[i];
                childElId = childViewObj['elementId'];
                smUtils.renderView4Config(this.$el.find("#" + childElId), this.model, childViewObj, validation);
            }

            this.$el.find("#" + elId).steps({
                headerTag: "h2",
                bodyTag: "section",
                transitionEffect: "slideLeft"
            });
        }
    });

    return SectionView;
});