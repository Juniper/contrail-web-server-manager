/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-model'
], function (_, ContrailModel) {
    var ImageModel = ContrailModel.extend({

        defaultConfig: smwmc.getImageModel(smwc.CATEGORY_IMAGE),

        configure: function (callbackObj) {
            var ajaxConfig = {};
            if (this.model().isValid(true, smwc.KEY_CONFIGURE_VALIDATION)) {
                var imageAttrs = this.model().attributes,
                    imageSchema = smwmc.getImageSchema,
                    putData = {}, imageAttrsEdited = [],
                    locks = this.model().attributes.locks.attributes;

                locks['category' + cowc.LOCKED_SUFFIX_ID] = false;
                imageAttrsEdited.push(cowu.getEditConfigObj(imageAttrs, locks, imageSchema, ''));
                putData[smwc.IMAGE_PREFIX_ID] = imageAttrsEdited;

                ajaxConfig.type = "POST";
                ajaxConfig.data = JSON.stringify(putData);
                ajaxConfig.timeout = smwc.TIMEOUT;
                ajaxConfig.url = smwu.getObjectUrl(smwc.IMAGE_PREFIX_ID);

                contrail.ajaxHandler(ajaxConfig, function () {
                    if (contrail.checkIfFunction(callbackObj.init)) {
                        callbackObj.init();
                    }
                }, function (response) {
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
                    callbackObj.error(this.getFormErrorText(smwc.IMAGE_PREFIX_ID));
                }
            }
        },
        deleteImage: function (checkedRow, callbackObj) {
            var ajaxConfig = {}, that = this,
                clusterId = checkedRow['id'];
            ajaxConfig.type = "DELETE";
            ajaxConfig.url = smwc.URL_OBJ_IMAGE_ID + clusterId;

            contrail.ajaxHandler(ajaxConfig, function () {
                if (contrail.checkIfFunction(callbackObj.init)) {
                    callbackObj.init();
                }
            }, function (response) {
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
                'id': {
                    required: true,
                    msg: smwm.getRequiredMessage('id')
                },
                'type': {
                    required: true,
                    msg: smwm.getRequiredMessage('type')
                },
                'version': {
                    required: true,
                    msg: smwm.getRequiredMessage('version')
                },
                'path': {
                    required: true,
                    msg: smwm.getRequiredMessage('path')
                }
            }
        }
    });

    return ImageModel;
});
