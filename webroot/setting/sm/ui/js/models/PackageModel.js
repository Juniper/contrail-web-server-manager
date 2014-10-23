/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'knockback',
    'knockout',
    'common/ui/js/models/ContrailModel'
], function (_, Knockback, Knockout, ContrailModel) {
    var PackageModel = ContrailModel.extend({
        defaultConfig: {
            'id': null,
            'version': null,
            'path': null,
            'type': null,
            'parameters': {}
        },
        configure: function (callback) {
            var ajaxConfig = {};
            if (this.model().isValid(true, "configureValidation")) {
                if (true) {
                    var imageAttrs = this.model().attributes,
                        putData = {}, images = [],
                        that = this;

                    images.push({
                        'id'     : imageAttrs['id'],
                        'version': imageAttrs['version'],
                        'path'   : imageAttrs['path'],
                        'type'   : imageAttrs['type']
                    });
                    putData[smConstants.IMAGE_PREFIX_ID] = images;

                    ajaxConfig.type = "POST";
                    ajaxConfig.data = JSON.stringify(putData);
                    ajaxConfig.url = smUtils.getObjectUrl(smConstants.IMAGE_PREFIX_ID);

                    contrail.ajaxHandler(ajaxConfig, function () {
                    }, function (response) {
                        console.log(response);
                        if (contrail.checkIfFunction(callback)) {
                            callback();
                        }
                    }, function (error) {
                        console.log(error);
                        that.showErrorAttr(smConstants.PACKAGE_PREFIX_ID + '_form', error['responseText']);
                    });

                } else {
                    // TODO: Show form-level error message if any
                }
            }
        },
        deletePackage: function (modalId, checkedRow, callback){
            var ajaxConfig = {}, that = this,
                clusterId = checkedRow['id'];
            ajaxConfig.type = "DELETE";
            ajaxConfig.url = '/sm/objects/image?id=' + clusterId;

            contrail.ajaxHandler(ajaxConfig, function () {
            }, function (response) {
                console.log(response);
                if (contrail.checkIfFunction(callback)) {
                    callback();
                }
            }, function (error) {
                console.log(error);
                that.showErrorAttr('deletePackage', error.responseText);
            });
        },
        validations: {
            configureValidation: {
                'id': {
                    required: true,
                    msg: smMessages.getRequiredMessage('id')
                },
                'type': {
                    required: true,
                    msg: smMessages.getRequiredMessage('type')
                },
                'version': {
                    required: true,
                    msg: smMessages.getRequiredMessage('version')
                },
                'path': {
                    required: true,
                    msg: smMessages.getRequiredMessage('path')
                }
            }
        }
    });

    return PackageModel;
});
