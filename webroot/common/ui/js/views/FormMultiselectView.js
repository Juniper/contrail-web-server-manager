/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var FormMultiselectView = Backbone.View.extend({
        render: function () {
            var multiselectTemplate = contrail.getTemplate4Id("sm-multiselect-view-template"),
                viewConfig = this.attributes.viewConfig,
                elId = this.attributes.elementId,
                elementConfig = viewConfig['elementConfig'],
                path = viewConfig['path'],
                lockEditingByDefault = this.attributes.lockEditingByDefault,
                labelValue = (elId != null) ? smLabels.get(elId) : smLabels.get(path),
                tmplParameters;

            if(contrail.checkIfExist(lockEditingByDefault) && lockEditingByDefault) {
                this.model.initLockAttr(path)
            }
            else{
                lockEditingByDefault = false;
            }

            tmplParameters = {
                label: labelValue, id: elId, name: elId,
                lockAttr: lockEditingByDefault,
                dataBindValue: viewConfig['dataBindValue'],
                class: "span12", elementConfig: elementConfig
            };

            this.$el.html(multiselectTemplate(tmplParameters));
        }
    });

    return FormMultiselectView;
});