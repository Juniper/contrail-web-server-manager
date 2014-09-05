/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var FormMultiselectView = Backbone.View.extend({
        render: function () {
            var multiselectTemplate = contrail.getTemplate4Id("sm-form-multiselect-template"),
                viewConfig = this.attributes.viewConfig,
                elId = this.attributes.elementId,
                elementConfig = viewConfig['elementConfig'],
                path = viewConfig['path'],
                labelValue = (elId != null) ? smLabels.get(elId) : smLabels.get(path);

            var tmplParameters = {label: labelValue, id: elId, name: elId, dataBindValue: viewConfig['dataBindValue'], class: "span12", elementConfig: elementConfig};

            this.$el.html(multiselectTemplate(tmplParameters));
        }
    });

    return FormMultiselectView;
});