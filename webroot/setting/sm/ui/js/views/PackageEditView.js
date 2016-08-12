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

            var modalConfig = {'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
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
                }
            };

            if(options.viewConfig){
                modalConfig.onBack = function(){
                    var elements = $("#" + modalId).find("#" + prefixId + "-form").children(":first").children(":first")

                    if (typeof elements == 'object') {
                        var path = elements.attr('data-path');
                        var _path = elements.attr('data-path').split('.');
                        var _rootViewPath = elements.attr('data-rootViewPath').split('.');

                        if(_path.length > _rootViewPath.length)
                        {
                            _path.pop();
                            _path.pop();
                            _path.pop();
                            _path.pop();
                            path = _path.join('.');

                            $("#" + modalId).modal('hide');

                            var viewConfigOptions = {
                                path : path,
                                group : "",
                                page : "",
                                element : prefixId,
                                rowIndex: options.rowIndex,
                                formType: 'edit'
                            };

                            viewConfig = vcg.generateViewConfig(viewConfigOptions, schemaModel, 'default', 'form');
                            var dataItem = $("#" + smwl.SM_PACKAGE_GRID_ID).data('contrailGrid')._dataView.getItem(options.rowIndex),
                                checkedRow = [dataItem],
                                title = smwl.TITLE_EDIT_CONFIG + ' ('+ dataItem['id'] +')';

                            var packageEditView = new PackageEditView();
                            packageEditView.model = self.model;

                            packageEditView.renderConfigure({"title": title, checkedRows: checkedRow, rowIndex: options.rowIndex, viewConfig: viewConfig, callback: function () {
                                var dataView = $("#" + smwl.SM_PACKAGE_GRID_ID).data("contrailGrid")._dataView;
                                dataView.refreshData();
                            }});

                            packageEditView.renderView4Config($("#" + modalId).find("#" + prefixId + "-form"), packageEditView.model, viewConfig, smwc.KEY_CONFIGURE_VALIDATION, null, null, function() {
                                packageEditView.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                                Knockback.applyBindings(packageEditView.model, document.getElementById(modalId));
                                kbValidation.bind(packageEditView);
                            });
                        }

                        //update state of back button
                        if(path.split('.').length <= _rootViewPath.length){
                            $('#' + modalId).find('#backBtn').attr("disabled", true);
                        }
                    }
                }
            }
            cowu.createModal(modalConfig);

            var element = $("#" + modalId).find("#" + prefixId + "-form");

            self.renderView4Config(element, this.model, options.viewConfig || configureViewConfig, smwc.KEY_CONFIGURE_VALIDATION, null, null, function() {
                self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                Knockback.applyBindings(self.model, document.getElementById(modalId));
                kbValidation.bind(self);

                if(options.viewConfig){
                    var _path = element.children(":first").children(":first").attr('data-path').split('.');
                    var _rootViewPath = element.children(":first").children(":first").attr('data-rootViewPath').split('.');

                    //update state of back button
                    if(_path.length <= _rootViewPath.length){
                        $('#' + modalId).find('#backBtn').attr("disabled", true);
                    }
                }
            });
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
                            viewConfig: {path: "id", dataBindValue: "id", class: "col-xs-6"}
                        },
                        {
                            elementId: 'type', view: "FormDropdownView",
                            viewConfig: {path: "type", dataBindValue: "type", class: "col-xs-6", elementConfig: { placeholder: smwl.SELECT_TYPE,  data: smwc.PACKAGE_TYPES}}
                        }
                    ]
                },
                {
                    columns: [
                        {
                            elementId: 'version', view: "FormInputView",
                            viewConfig: {path: 'version', dataBindValue: "version", class: "col-xs-6"}
                        },
                        {
                            elementId: 'path', view: "FormInputView",
                            viewConfig: {path: "path", dataBindValue: "path", class: "col-xs-6"}
                        }
                    ]
                }
            ]
        }
    };

    return PackageEditView;
});