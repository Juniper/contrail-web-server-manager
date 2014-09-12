/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var FormDropdownView = Backbone.View.extend({
        render: function () {
            var dropdownTemplate = contrail.getTemplate4Id("sm-dropdown-view-template"),
                viewConfig = this.attributes.viewConfig,
                elId = this.attributes.elementId,
                elementConfig = viewConfig['elementConfig'],
                path = viewConfig['path'],
                lockEditingByDefault = this.attributes.lockEditingByDefault,
                labelValue = (elId != null) ? smLabels.get(elId) : smLabels.get(path),
                tmplParameters;

            if(lockEditingByDefault == null || !lockEditingByDefault) {
                this.model.unlockAttr4Editing(path)
            }

            tmplParameters = {label: labelValue, id: elId, name: elId, dataBindValue: viewConfig['dataBindValue'], class: "span12", elementConfig: elementConfig};

            this.$el.html(dropdownTemplate(tmplParameters));
        }
    });

    return FormDropdownView;
});