/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var FormInputView = Backbone.View.extend({
        render: function () {
            var inputTemplate = contrail.getTemplate4Id("sm-input-view-template"),
                viewConfig = this.attributes.viewConfig,
                elId = this.attributes.elementId,
                validation = this.attributes.validation,
                path = viewConfig['path'],
                lockEditingByDefault = this.attributes.lockEditingByDefault,
                labelValue = (elId != null) ? smLabels.get(elId) : smLabels.get(path),
                tmplParameters;

            if (!(contrail.checkIfExist(lockEditingByDefault) && lockEditingByDefault)) {
                lockEditingByDefault = false;
            }
            this.model.initLockAttr(path, lockEditingByDefault);

            tmplParameters = {
                label: labelValue, id: elId, name: elId, disabled: viewConfig['disabled'],
                dataBindValue: viewConfig['dataBindValue'],
                lockAttr: lockEditingByDefault,
                class: "span12", path: path, validation: validation
            };

            this.$el.html(inputTemplate(tmplParameters));
        }
    });

    return FormInputView;
});