/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'knockback',
    'knockout',
    'common/ui/js/models/ContrailModel'
], function (_, Knockback, Knockout, ContrailModel) {
    var ClusterModel = ContrailModel.extend({
        defaultConfig: {
            email: null,
            parameters: {
                domain: null,
                keystone_tenant: null,
                gateway: null,
                subnet_mask: null,
                openstack_mgmt_ip: null,
                openstack_passwd: null,
                analytics_data_ttl: null,
                router_asn: null,
                multi_tenancy: 'False',
                haproxy: 'disable',
                use_certificates: 'False',
                compute_non_mgmt_ip: null,
                compute_non_mgmt_gway: null
            }
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
                    msg: 'Please enter a valid ' + smLabels.get('email')
                },
                'parameters.gateway': {
                    required: false,
                    pattern: smConstants.PATTERN_IP_ADDRESS,
                    msg: 'Please enter a valid ' + smLabels.get('gateway')
                },
                'parameters.subnet_mask': {
                    required: false,
                    pattern: smConstants.PATTERN_IP_ADDRESS,
                    msg: 'Please enter a valid ' + smLabels.get('subnet_mask')
                },
                'parameters.openstack_mgmt_ip': {
                    required: false,
                    pattern: smConstants.PATTERN_IP_ADDRESS,
                    msg: 'Please enter a valid ' + smLabels.get('compute_non_mgmt_ip')
                },
                'parameters.router_asn': {
                    required: false,
                    pattern: 'number',
                    msg: 'Please enter a valid ' + smLabels.get('router_asn')
                },
                'parameters.analytics_data_ttl': {
                    required: false,
                    pattern: 'number',
                    msg: 'Please enter a valid no. for ' + smLabels.get('analytics_data_ttl')
                },
                'parameters.compute_non_mgmt_ip': {
                    required: false,
                    pattern: smConstants.PATTERN_IP_ADDRESS,
                    msg: 'Please enter a valid ' + smLabels.get('compute_non_mgmt_ip')
                },
                'parameters.compute_non_mgmt_gway': {
                    required: false,
                    pattern: smConstants.PATTERN_IP_ADDRESS,
                    msg: 'Please enter a valid ' + smLabels.get('compute_non_mgmt_ip')
                }
            }
        }
    });

    return ClusterModel;
});
