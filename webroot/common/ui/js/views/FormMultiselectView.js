/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var FormMultiselectView = Backbone.View.extend({
        render: function () {
            var multiselectTemplate = contrail.getTemplate4Id("sm-form-multiselect-template");
            this.$el.html(multiselectTemplate(this.attributes));
        }
    });

    return FormMultiselectView;
});