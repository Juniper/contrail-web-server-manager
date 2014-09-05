/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'knockback'
], function (_, Backbone, Knockback) {
    var prefixId = smConstants.IMAGE_PREFIX_ID,
        editTemplate = contrail.getTemplate4Id("sm-edit-layout-template");

    var ImageEditView = Backbone.View.extend({
        render: function (options) {
            var modalId = 'configure-' + prefixId,
                editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                that.model.configure(modalId); // TODO: Release binding on successful configure
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
                smValidation.unbind(that);
                $("#" + modalId).modal('hide');
            }});

            smUtils.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, configureViewConfig);

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smValidation.bind(this);
        }
    });

    var configureViewConfig = {
        prefixId: prefixId,
        view: "SectionView",
        viewConfig: {
            rows: [
                {
                    columns: [
                        {elementId: 'type', view: "FormInputView", viewConfig: {path: "type", dataBindValue: "type", class: "span6"}},
                        {elementId: 'version', view: "FormInputView", viewConfig: {path: 'version', dataBindValue: "version", class: "span6"}}
                    ]
                },
                {
                    columns: [
                        {elementId: 'path', view: "FormInputView", viewConfig: {path: "path", dataBindValue: "path", class: "span12"}}
                    ]
                }
            ]
        }
    };

    return ImageEditView;
});