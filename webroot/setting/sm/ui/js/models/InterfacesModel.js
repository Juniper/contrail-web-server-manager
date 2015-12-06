/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-model'
], function (_, ContrailModel) {
    var InterfacesModel = ContrailModel.extend({

        defaultConfig: smwmc.getInterfaceModel(),

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
            physicalValidation: {
                'name': {
                    required: true,
                    msg: smwm.getRequiredMessage('name')
                },
                'ip_address': {
                    required: true,
                    pattern: cowc.PATTERN_SUBNET_MASK,
                    msg: smwm.getShortInvalidErrorMessage('ip_address')
                },
                'mac_address': {
                    required: true,
                    pattern: cowc.PATTERN_MAC_ADDRESS,
                    msg: smwm.getShortInvalidErrorMessage('mac_address')
                },
                'default_gateway': {
                    required: function(value, attr, computedState){
                        if(contrail.checkIfExist(computedState.dhcp) && (computedState.dhcp)){
                            return false;
                        } else {
                            return true;
                        }
                    },
                    pattern: cowc.PATTERN_IP_ADDRESS,
                    msg: smwm.getShortInvalidErrorMessage('gateway')
                }
            },
            bondValidation: {
                'name': {
                    required: true,
                    msg: smwm.getRequiredMessage('name')
                },
                'ip_address': {
                    required: false,
                    pattern: cowc.PATTERN_SUBNET_MASK,
                    msg: smwm.getShortInvalidErrorMessage('ip_address')
                }
            },
            subinterfaceValidation: {
                'name': {
                    required: true,
                    msg: smwm.getRequiredMessage('name')
                },
                'ip_address': {
                    required: false,
                    pattern: cowc.PATTERN_SUBNET_MASK,
                    msg: smwm.getShortInvalidErrorMessage('ip_address')
                }
            }
        }
    });

    return InterfacesModel;
});
