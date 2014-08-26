/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var FormMultiselectView = Backbone.View.extend({
        render: function() {
            var multiselectTemplate = contrail.getTemplate4Id("sm-form-multiselect-template"),
                elementConfig = this.attributes.elementConfig,
                elementId = "#" + this.attributes.id,
                elementValue = this.attributes.value,
                multiSelect;

            this.$el.html(multiselectTemplate(this.attributes));
            multiSelect = this.$el.find(elementId).contrailMultiselect(elementConfig).data('contrailMultiselect');
            multiSelect.value(elementValue);
        }
    });

    return FormMultiselectView;
});