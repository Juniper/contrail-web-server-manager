/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    "underscore",
    "contrail-model"
], function (_, ContrailModel) {
    var PackageModel = ContrailModel.extend({

        defaultConfig: smwmc.getImageModel(smwc.CATEGORY_PACKAGE),

        configure: function (callbackObj) {
            var ajaxConfig = {};
            if (this.model().isValid(true, smwc.KEY_CONFIGURE_VALIDATION)) {
                var imageAttrs = this.model().attributes,
                    packageSchema = smwmc.getImageSchema,
                    putData = {}, packageAttrsEdited = [],
                    locks = this.model().attributes.locks.attributes;

                locks["category" + cowc.LOCKED_SUFFIX_ID] = false;
                packageAttrsEdited.push(cowu.getEditConfigObj(imageAttrs, locks, packageSchema, ""));
                putData[smwc.IMAGE_PREFIX_ID] = packageAttrsEdited;

                ajaxConfig.type = "POST";
                ajaxConfig.timeout = smwc.TIMEOUT;
                ajaxConfig.data = JSON.stringify(putData);
                ajaxConfig.url = smwu.getObjectUrl(smwc.IMAGE_PREFIX_ID);

                contrail.ajaxHandler(ajaxConfig, function () {
                    if (contrail.checkIfFunction(callbackObj.init)) {
                        callbackObj.init();
                    }
                }, function () {
                    if (contrail.checkIfFunction(callbackObj.success)) {
                        callbackObj.success();
                    }
                }, function (error) {
                    console.log(error);
                    if (contrail.checkIfFunction(callbackObj.error)) {
                        callbackObj.error(error);
                    }
                });
            } else {
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(this.getFormErrorText(smwc.PACKAGE_PREFIX_ID));
                }
            }
        },
        deletePackage: function (checkedRow, callbackObj){
            var ajaxConfig = {},
                clusterId = checkedRow.id;
            ajaxConfig.type = "DELETE";
            ajaxConfig.url = smwc.URL_OBJ_IMAGE_ID + clusterId;

            contrail.ajaxHandler(ajaxConfig, function () {
                if (contrail.checkIfFunction(callbackObj.init)) {
                    callbackObj.init();
                }
            }, function () {
                if (contrail.checkIfFunction(callbackObj.success)) {
                    callbackObj.success();
                }
            }, function (error) {
                console.log(error);
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(error);
                }
            });
        },
        validations: {
            configureValidation: {
                "id": {
                    required: true,
                    msg: smwm.getRequiredMessage("id")
                },
                "type": {
                    required: true,
                    msg: smwm.getRequiredMessage("type")
                },
                "version": {
                    required: true,
                    msg: smwm.getRequiredMessage("version")
                },
                "path": {
                    required: true,
                    msg: smwm.getRequiredMessage("path")
                }
            }
        },
        goForward : function(rootViewPath, path, prefixId, rowIndex){
            var self = this;
            var modalId = "configure-" + prefixId;
            $("#" + modalId).modal("hide");
            var viewConfigOptions = {
                rootViewPath : rootViewPath,
                path : path,
                group : "",
                page : "",
                element : prefixId,
                rowIndex: rowIndex,
                formType: "edit"
            };
            var viewConfig = vcg.generateViewConfig(viewConfigOptions, schemaModel, "default", "form"),
                dataItem = $("#" + smwl.SM_PACKAGE_GRID_ID).data("contrailGrid")._dataView.getItem(rowIndex),
                checkedRow = [dataItem],
                title = smwl.TITLE_EDIT_CONFIG + " ("+ dataItem.id +")";

            var packageEditView = new PackageEditView();
            packageEditView.model = self;
            packageEditView.renderConfigure({"title": title, checkedRows: checkedRow, rowIndex: rowIndex, viewConfig: viewConfig, callback: function () {
                var dataView = $("#" + smwl.SM_PACKAGE_GRID_ID).data("contrailGrid")._dataView;
                dataView.refreshData();
            }});

            packageEditView.renderView4Config($("#" + modalId).find("#" + prefixId + "-form"), self, viewConfig, smwc.KEY_CONFIGURE_VALIDATION, null, null, function() {
                self.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                Knockback.applyBindings(self, document.getElementById(modalId));
                kbValidation.bind(packageEditView);
            });

        }
    });

    return PackageModel;
});
