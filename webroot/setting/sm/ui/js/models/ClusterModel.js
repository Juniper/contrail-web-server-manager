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
            email: '',
            parameters: {
                domain: '',
                keystone_tenant: '',
                gateway: '',
                subnet_mask: '',
                openstack_mgmt_ip: '',
                openstack_passwd: '',
                analytics_data_ttl: '',
                router_asn: '',
                multi_tenancy: 'False',
                haproxy: 'Disable',
                use_certificates: 'False',
                compute_non_mgmt_ip: '',
                compute_non_mgmt_gway: ''
            }
        },
        configure: function (modalId) {
            if(this.model().isValid(true)) {
                console.log(this.model().attributes);
                $("#" + modalId).modal('hide');
            }
        },
        validation: {
            email: {
                required: true,
                pattern: 'email',
                msg: 'Please enter a valid email'
            }
        }
    });

    return ClusterModel;
});
