/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'knockback',
    'knockout',
    'common/ui/js/models/ContrailModel'
], function (_, Knockback, Knockout, ContrailModel) {
    var ImageModel = ContrailModel.extend({
        defaultConfig: {
            'id': null,
            'version': null,
            'path': null,
            'type': null,
            'parameters': {}
        },
        configure: function (callbackObj) {
            var ajaxConfig = {};
            if (this.model().isValid(true, smwc.KEY_CONFIGURE_VALIDATION)) {
                var imageAttrs = this.model().attributes,
                    putData = {}, images = [],
                    that = this;

                images.push({
                    'id': imageAttrs['id'],
                    'version': imageAttrs['version'],
                    'path': imageAttrs['path'],
                    'type': imageAttrs['type']
                });
                putData[smwc.IMAGE_PREFIX_ID] = images;

                ajaxConfig.type = "POST";
                ajaxConfig.data = JSON.stringify(putData);
                ajaxConfig.url = smwu.getObjectUrl(smwc.IMAGE_PREFIX_ID);

                contrail.ajaxHandler(ajaxConfig, function () {
                    if (contrail.checkIfFunction(callbackObj.init)) {
                        callbackObj.init();
                    }
                }, function (response) {
                    console.log(response);
                    if (contrail.checkIfFunction(callbackObj.success)) {
                        callbackObj.success();
                    }
                }, function (error) {
                    console.log(error);
                    if (contrail.checkIfFunction(callbackObj.error)) {
                        callbackObj.error(error);
                    }
                });
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
                console.log(response);
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
