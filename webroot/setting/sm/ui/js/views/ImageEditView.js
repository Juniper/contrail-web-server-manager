/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'knockback'
], function (_, Backbone, Knockback) {
    var prefixId = smConstants.IMAGE_PREFIX_ID,
        editTemplate = contrail.getTemplate4Id("sm-edit-form-template"),
        modalId = 'configure-' + prefixId;

    var ImageEditView = Backbone.View.extend({
        render: function (options) {
            var modalId = 'configure-' + prefixId,
                editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                that.model.configure(function () {
                    options['callback']();
                    $('#' + modalId).modal('hide');
                });
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
                smValidation.unbind(that);
                $("#" + modalId).modal('hide');
            }});

            smUtils.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, configureViewConfig, "configureValidation");

            this.model.showErrorAttr(prefixId + '_form', false);
            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smValidation.bind(this);
        },
        renderDeleteImage: function (options) {
            var textTemplate = contrail.getTemplate4Id("sm-delete-image-template"),
                elId = 'deleteImage',
                that = this,
                checkedRows = options['checkedRows'],
                ImageToBeDeleted = {'imageId': [], 'elementId': elId};
            ImageToBeDeleted['imageId'].push(checkedRows['id']);
            smUtils.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': textTemplate(ImageToBeDeleted), 'onSave': function () {
                that.model.deleteImage(modalId, options['checkedRows'], function(){
                    options['callback']();
                    $('#' + modalId).modal('hide');
                });
            }, 'onCancel': function () {
                $("#" + modalId).modal('hide');
            }});

            this.model.showErrorAttr(elId, false);

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
                        {elementId: 'id', view: "FormInputView", viewConfig: {path: "id", dataBindValue: "id", class: "span6"}},
                        {elementId: 'type', view: "FormInputView", viewConfig: {path: "type", dataBindValue: "type", class: "span6"}},
                    ]
                },
                {
                    columns: [
                        {elementId: 'version', view: "FormInputView", viewConfig: {path: 'version', dataBindValue: "version", class: "span6"}},
                        {elementId: 'path', view: "FormInputView", viewConfig: {path: "path", dataBindValue: "path", class: "span6"}}
                    ]
                }
            ]
        }
    };

    return ImageEditView;
});