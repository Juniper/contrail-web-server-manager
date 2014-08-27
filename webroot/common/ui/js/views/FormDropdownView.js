/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var FormDropdownView = Backbone.View.extend({
        render: function () {
            var dropdownTemplate = contrail.getTemplate4Id("sm-form-dropdown-template"),
                elementConfig = this.attributes.elementConfig,
                elementId = "#" + this.attributes.id,
                elementValue = this.attributes.value,
                dropdown;

            this.$el.html(dropdownTemplate(this.attributes));
            dropdown = this.$el.find(elementId).contrailDropdown(elementConfig).data('contrailDropdown');
            dropdown.value(elementValue);
        }
    });

    return FormDropdownView;
});