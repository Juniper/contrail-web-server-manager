/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'common/ui/js/models/ContrailModel'
], function (_, ContrailModel) {
    var ServerModel = ContrailModel.extend({
        defaultConfig: {
            'domain': null,
            'discovered': null,
            'gateway': null,
            'email': null,
            'subnet_mask': null,
            'base_image_id': null,
            'ip_address': null,
            'password': null,
            'ipmi_address': null,
            'ipmi_username': null,
            'ipmi_password': null,
            'host_name': null,
            'intf_data': null,
            'intf_bond': null,
            'intf_control': null,
            'parameters': {},
            'tag': {},
            'roles': {}
        },
        configure: function (modalId) {
            if (this.model().isValid(true, 'configureValidation')) {
                // TODO: Check for form-level validation if required
                if (true) {
                    console.log(this.model().attributes);
                    $("#" + modalId).modal('hide');
                } else {
                    // TODO: Show form-level error message if any
                }
            }
        },
        validations: {
            configureValidation: {
                'email': {
                    required: false,
                    pattern: 'email',
                    msg: smMessages.getInvalidErrorMessage('email')
                },
                'gateway': {
                    required: false,
                    pattern: smConstants.PATTERN_IP_ADDRESS,
                    msg: smMessages.getInvalidErrorMessage('gateway')
                },
                'mac_address': {
                    required: true,
                    pattern:  smConstants.PATTERN_MAC_ADDRESS,
                    msg: smMessages.getInvalidErrorMessage('mac_address')
                },
                'parameters.compute_non_mgmt_ip': {
                    required: false,
                    pattern: smConstants.PATTERN_IP_ADDRESS,
                    msg: smMessages.getInvalidErrorMessage('compute_non_mgmt_ip')
                },
                'parameters.compute_non_mgmt_gway': {
                    required: false,
                    pattern: smConstants.PATTERN_IP_ADDRESS,
                    msg: smMessages.getInvalidErrorMessage('compute_non_mgmt_gway')
                }
            }
        }
    });

    return ServerModel;
});
