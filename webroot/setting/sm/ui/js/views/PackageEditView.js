/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'knockback'
], function (_, Backbone, Knockback) {
    var prefixId = smwc.PACKAGE_PREFIX_ID,
        editTemplate = contrail.getTemplate4Id(smwc.TMPL_EDIT_FORM),
        modalId = 'configure-' + prefixId;

    var PackageEditView = Backbone.View.extend({
        render: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smwu.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                that.model.configure({
                    init: function () {
                        that.model.showErrorAttr(prefixId + smwc.FORM_SUFFIX_ID, false);
                        smwu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options['callback']();
                        $("#" + modalId).modal('hide');
                    },
                    error: function (error) {
                        smwu.disableModalLoading(modalId, function () {
                            that.model.showErrorAttr(prefixId + smwc.FORM_SUFFIX_ID, error.responseText);
                        });
                    }
                });
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
                smwv.unbind(that);
                $("#" + modalId).modal('hide');
            }});

            smwu.renderView4Config($("#" + modalId).find("#sm-" + prefixId + smwc.FORM_SUFFIX_ID), this.model, configureViewConfig, smwc.KEY_CONFIGURE_VALIDATION);
            this.model.showErrorAttr(prefixId + smwc.FORM_SUFFIX_ID, false);
            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smwv.bind(this);
        },
        renderDeletePackage: function (options) {
            var textTemplate = contrail.getTemplate4Id(smwc.TMPL_DELETE_PACKAGE),
                elId = 'deletePackage',
                that = this,
                checkedRows = options['checkedRows'],
                packageToBeDeleted = {'packageId': [], 'elementId': elId};
            packageToBeDeleted['packageId'].push(checkedRows['id']);
            smwu.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'btnName': 'Confirm', 'body': textTemplate(packageToBeDeleted), 'onSave': function () {
                that.model.deletePackage(options['checkedRows'],{
                    init: function () {
                        that.model.showErrorAttr(elId, false);
                        smwu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options['callback']();
                        $("#" + modalId).modal('hide');
                    },
                    error: function (error) {
                        smwu.disableModalLoading(modalId, function () {
                            that.model.showErrorAttr(elId, error.responseText);
                        });
                    }
                });
            }, 'onCancel': function () {
                $("#" + modalId).modal('hide');
            }});

            this.model.showErrorAttr(elId, false);
            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smwv.bind(this);
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

    return PackageEditView;
});