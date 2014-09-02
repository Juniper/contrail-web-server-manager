/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var FormInputView = Backbone.View.extend({
        render: function () {
            var inputTemplate = contrail.getTemplate4Id("sm-form-input-template");
            this.$el.html(inputTemplate(this.attributes));
        }
    });

    return FormInputView;
});