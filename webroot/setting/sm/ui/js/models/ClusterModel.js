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
            id: null,
            email: null,
            base_image_id: null,
            package_image_id: null,
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
                compute_non_mgmt_gway: null,
                base_image_id: null,
                package_image_id: null
            },
            status: {},
            tag: {},
            roles: {}
        },
        configure: function (callback) {
            var ajaxConfig = {},
                returnFlag = false;
            if (this.model().isValid(true, 'configureValidation')) {
                // TODO: Check for form-level validation if required
                if (true) {
                    var putData = {}, clusters = [];
                    serverAttrs = this.model().attributes;
                    locks = this.model().attributes.locks.attributes;
                    smUtils.getEditConfigObj(serverAttrs, locks);
                    clusters.push(serverAttrs);
                    putData[smConstants.CLUSTER_PREFIX_ID] = clusters;

                    ajaxConfig.async = false;
                    ajaxConfig.type = "PUT";
                    ajaxConfig.data = JSON.stringify(putData);
                    ajaxConfig.url = smUtils.getObjectUrl(smConstants.CLUSTER_PREFIX_ID);

                    contrail.ajaxHandler(ajaxConfig, function () {
                    }, function (response) {
                        console.log(response);
                        if (contrail.checkIfFunction(callback)) {
                            callback();
                        }
                        returnFlag = true;
                    }, function (error) {
                        console.log(error);
                        returnFlag = false;
                    });
                } else {
                    // TODO: Show form-level error message if any
                }
            }

            return returnFlag;
        },
        addServer: function (serverList, callback) {
            var ajaxConfig = {};
            if (this.model().isValid(true, 'configureValidation')) {
                // TODO: Check for form-level validation if required
                if (true) {
                    var clusterAttrs = this.model().attributes,
                        putData = {}, servers = [];
                    $.each(serverList, function (key, value) {
                        servers.push({'id': value['id'], 'cluster_id': clusterAttrs['id']});
                    });
                    putData[smConstants.SERVER_PREFIX_ID] = servers;

                    ajaxConfig.type = "PUT";
                    ajaxConfig.data = JSON.stringify(putData);
                    ajaxConfig.url = smUtils.getObjectUrl(smConstants.SERVER_PREFIX_ID);

                    contrail.ajaxHandler(ajaxConfig, function () {
                    }, function (response) {
                        console.log(response);
                        if (contrail.checkIfFunction(callback)) {
                            callback();
                        }
                    }, function (error) {
                        console.log(error);
                    });
                } else {
                    // TODO: Show form-level error message if any
                }
            }
            return true;
        },
        assignRoles: function (serverList, callback) {
            var ajaxConfig = {};
            if (this.model().isValid(true, 'configureValidation')) {
                // TODO: Check for form-level validation if required
                if (true) {
                    var roles = this.model().attributes.roles.split(','),
                        putData = {}, servers = [];
                    $.each(serverList, function (key, value) {
                        servers.push({'id': value['id'], 'roles': roles});
                    });
                    putData[smConstants.SERVER_PREFIX_ID] = servers;

                    ajaxConfig.type = "PUT";
                    ajaxConfig.data = JSON.stringify(putData);
                    ajaxConfig.url = smUtils.getObjectUrl(smConstants.SERVER_PREFIX_ID);

                    contrail.ajaxHandler(ajaxConfig, function () {
                    }, function (response) {
                        console.log(response);
                        if (contrail.checkIfFunction(callback)) {
                            callback();
                        }
                    }, function (error) {
                        console.log(error);
                    });
                } else {
                    // TODO: Show form-level error message if any
                }
            }
            return true;
        },
        provision: function (modalId, checkedRows, callback) {
            var ajaxConfig = {};
            if (this.model().isValid(true, 'configureValidation')) {
                if (true) {
                    var clusterAttrs = this.model().attributes,
                        putData = {}, clusters = [];
                
                    for (var i = 0; i < checkedRows.length; i++) {
                        clusters.push({'id': checkedRows[i]['id'], 'base_image_id': clusterAttrs['base_image_id'],'package_image_id': clusterAttrs['package_image_id']});
                    }
                    putData[smConstants.CLUSTER_PREFIX_ID] = clusters;

                    ajaxConfig.type = "PUT";
                    ajaxConfig.data = JSON.stringify(putData);
                    ajaxConfig.url = smUtils.getObjectUrl(smConstants.CLUSTER_PREFIX_ID);

                    console.log(ajaxConfig);
                    contrail.ajaxHandler(ajaxConfig, function () {
                    }, function (response) {
                        console.log(response);
                        $("#" + modalId).modal('hide');
                        if (contrail.checkIfFunction(callback)) {
                            callback();
                        }
                    }, function (error) {
                        console.log(error);
                    });

                } else {
                    // TODO: Show form-level error message if any
                }
            }
        },
        validations: {
            configureValidation: {
                'id': {
                    required: true,
                    msg: smMessages.getRequiredMessage('id')
                },
                'email': {
                    required: false,
                    pattern: 'email',
                    msg: smMessages.getInvalidErrorMessage('email')
                },
                'parameters.gateway': {
                    required: false,
                    pattern: smConstants.PATTERN_IP_ADDRESS,
                    msg: smMessages.getInvalidErrorMessage('gateway')
                },
                'parameters.subnet_mask': {
                    required: false,
                    pattern: smConstants.PATTERN_IP_ADDRESS,
                    msg: smMessages.getInvalidErrorMessage('subnet_mask')
                },
                'parameters.openstack_mgmt_ip': {
                    required: false,
                    pattern: smConstants.PATTERN_IP_ADDRESS,
                    msg: smMessages.getInvalidErrorMessage('compute_non_mgmt_ip')
                },
                'parameters.router_asn': {
                    required: false,
                    pattern: 'number',
                    msg: smMessages.getInvalidErrorMessage('router_asn')
                },
                'parameters.analytics_data_ttl': {
                    required: false,
                    pattern: 'number',
                    msg: smMessages.getInvalidErrorMessage('analytics_data_ttl')
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

    return ClusterModel;
});
