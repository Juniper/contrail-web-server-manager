/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-model'
], function (_, ContrailModel) {
    var InterfacesModel = ContrailModel.extend({

        defaultConfig: {
            "baremetal_interface" : [],
            "vn" : []
        },

        validateAttr: function (attributePath, validation, data) {
            var model = data.model().attributes.model(),
                attr = cowu.getAttributeFromPath(attributePath),
                errors = model.get(cowc.KEY_MODEL_ERRORS),
                attrErrorObj = {}, isValid;

            isValid = model.isValid(attributePath, validation);

            attrErrorObj[attr + cowc.ERROR_SUFFIX_ID] = (isValid == true) ? false : isValid;
            errors.set(attrErrorObj);
        },

        validations: {
            baremetalInterfaceValidation: {
                'baremetal_interface': {
                    required: true,
                    pattern: cowc.PATTERN_MAC_ADDRESS,
                    msg: smwm.getShortInvalidErrorMessage('mac_address')
                },
                'vn': {
                    required: true,
                    pattern: cowc.PATTERN_IP_ADDRESS,
                    msg: smwm.getShortInvalidErrorMessage('gateway')
                }
            }
        }
    });

    return InterfacesModel;
});
