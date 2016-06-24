/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-model'
], function (_, ContrailModel) {
    var SwitchesModel = ContrailModel.extend({

        defaultConfig: smwmc.getSwitchModel(),

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
            topOfRackValidation: {
                'switch_id': {
                    required: true,
                    msg: cowm.DATA_ERROR_REQUIRED
                },
                'switch_name': {
                    required: true,
                    msg: cowm.DATA_ERROR_REQUIRED
                },
                'vendor_name': {
                    required: true,
                    msg: cowm.DATA_ERROR_REQUIRED
                },
                'product_name': {
                    required: true,
                    msg: cowm.DATA_ERROR_REQUIRED
                },
                'ip_address': {
                    required: true,
                    pattern: cowc.PATTERN_SUBNET_MASK,
                    msg: cowm.DATA_ERROR_INVALID
                },
                'ovs_port': {
                    required: true,
                    pattern: 'number',
                    msg: smwm.getShortInvalidErrorMessage('port')
                },
                'ovs_protocol': {
                    required: true,
                    msg: cowm.DATA_ERROR_REQUIRED
                },
                'http_server_port': {
                    required: true,
                    pattern: 'number',
                    msg: smwm.getShortInvalidErrorMessage('port')
                },
                'keepalive_time': {
                    required: true,
                    pattern: 'number',
                    msg: smwm.getShortInvalidErrorMessage('time')
                }
            }
        }
    });

    return SwitchesModel;
});
