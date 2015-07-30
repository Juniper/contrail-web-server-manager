/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'knockback'
], function (_, ContrailView, Knockback) {
    var prefixId = smwc.PACKAGE_PREFIX_ID,
        editTemplate = contrail.getTemplate4Id(cowc.TMPL_EDIT_FORM),
        modalId = 'configure-' + prefixId;

    var PackageEditView = ContrailView.extend({
        render: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                self = this;

            cowu.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                self.model.configure({
                    init: function () {
                        self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                        cowu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options['callback']();
                        $("#" + modalId).modal('hide');
                    },
                    error: function (error) {
                        cowu.disableModalLoading(modalId, function () {
                            self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, error.responseText);
                        });
                    }
                });
            }, 'onCancel': function () {
                Knockback.release(self.model, document.getElementById(modalId));
                kbValidation.unbind(self);
                $("#" + modalId).modal('hide');
            }});

            self.renderView4Config($("#" + modalId).find("#" + prefixId + "-form"), this.model, configureViewConfig, smwc.KEY_CONFIGURE_VALIDATION);
            self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            kbValidation.bind(this);
        },

        renderDeletePackage: function (options) {
            var textTemplate = contrail.getTemplate4Id(smwc.TMPL_DELETE_PACKAGE),
                elId = 'deletePackage',
                self = this,
                checkedRows = options['checkedRows'],
                packageToBeDeleted = {'packageId': [], 'elementId': elId};
            packageToBeDeleted['packageId'].push(checkedRows['id']);
            cowu.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'btnName': 'Confirm', 'body': textTemplate(packageToBeDeleted), 'onSave': function () {
                self.model.deletePackage(options['checkedRows'],{
                    init: function () {
                        self.model.showErrorAttr(elId, false);
                        cowu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options['callback']();
                        $("#" + modalId).modal('hide');
                    },
                    error: function (error) {
                        cowu.disableModalLoading(modalId, function () {
                            self.model.showErrorAttr(elId, error.responseText);
                        });
                    }
                });
            }, 'onCancel': function () {
                $("#" + modalId).modal('hide');
            }});

            this.model.showErrorAttr(elId, false);
            Knockback.applyBindings(this.model, document.getElementById(modalId));
            kbValidation.bind(this);
        }
    });

    var configureViewConfig = {
        prefixId: prefixId,
        view: "SectionView",
        viewConfig: {
            rows: [
                {
                    columns: [
                        {
                            elementId: 'id', view: "FormInputView",
                            app: cowc.APP_CONTRAIL_SM,
                            viewConfig: {path: "id", dataBindValue: "id", class: "span6"}
                        },
                        {
                            elementId: 'type', view: "FormDropdownView",
                            app: cowc.APP_CONTRAIL_SM,
                            viewConfig: {path: "type", dataBindValue: "type", class: "span6", elementConfig: { placeholder: smwl.SELECT_TYPE,  data: smwc.PACKAGE_TYPES}}
                        }
                    ]
                },
                {
                    columns: [
                        {
                            elementId: 'version', view: "FormInputView",
                            app: cowc.APP_CONTRAIL_SM,
                            viewConfig: {path: 'version', dataBindValue: "version", class: "span6"}
                        },
                        {
                            elementId: 'path', view: "FormInputView",
                            app: cowc.APP_CONTRAIL_SM,
                            viewConfig: {path: "path", dataBindValue: "path", class: "span6"}
                        }
                    ]
                }
            ]
        }
    };

    return PackageEditView;
});