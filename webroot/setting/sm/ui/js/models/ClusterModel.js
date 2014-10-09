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
                keystone_tenant: null,
                keystone_username: null,
                keystone_password: null
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
                    var putData = {}, clusterAttrsEdited = [],
                        clusterAttrs = this.model().attributes,
                        locks = this.model().attributes.locks.attributes;

                    clusterAttrsEdited.push(smUtils.getEditConfigObj(clusterAttrs, locks));
                    putData[smConstants.CLUSTER_PREFIX_ID] = clusterAttrsEdited;

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
            } else{
                var errorsObj = this.model().attributes.errors.attributes, errArr = [];
                $.each(errorsObj, function (key, value) {
                    if (value) {
                        error = key.replace('_error', '');
                        errArr.push(smLabels.get(error));
                    }
                });
                this.showErrorAttr('cluster_edit_config', smMessages.getResolveErrorsMessage(errArr.join(', ')));
            }

            return returnFlag;
        },
        configureOpenStack: function (callback) {
            var ajaxConfig = {},
                returnFlag = false;
            if (this.model().isValid(true, 'configureValidation')) {
                // TODO: Check for form-level validation if required
                if (true) {
                    var putData = {}, openstackAttrsEdited = [],
                        clusterAttrs = this.model().attributes;

                    openstackAttrsEdited.push({
                        'id': clusterAttrs['id'],
                        'parameters': {
                            'openstack_mgmt_ip': clusterAttrs.parameters['openstack_mgmt_ip'],
                            'openstack_passwd' : clusterAttrs.parameters['openstack_passwd'],
                            'gateway'          : clusterAttrs.parameters['gateway'],
                            'subnet_mask'      : clusterAttrs.parameters['subnet_mask'],
                            'keystone_tenant'  : clusterAttrs.parameters['keystone_tenant'],
                            'keystone_username': clusterAttrs.parameters['keystone_username'],
                            'keystone_password': clusterAttrs.parameters['keystone_password']
                        }
                    });
                    putData[smConstants.CLUSTER_PREFIX_ID] = openstackAttrsEdited;

                    ajaxConfig.async = false;
                    ajaxConfig.type = "PUT";
                    ajaxConfig.data = JSON.stringify(putData);
                    ajaxConfig.url = smUtils.getObjectUrl(smConstants.CLUSTER_PREFIX_ID);
                    console.log(ajaxConfig);
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
                    var putData = {}, servers = [];
                    $.each(serverList, function (key, value) {
                        servers.push({'id': value['id'], 'roles': value['roles']});
                    });

                    putData[smConstants.SERVER_PREFIX_ID] = servers;

                    ajaxConfig.type = "PUT";
                    ajaxConfig.data = JSON.stringify(putData);
                    ajaxConfig.url = smUtils.getObjectUrl(smConstants.SERVER_PREFIX_ID);
                    console.log(ajaxConfig);
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
        reimage: function (callback) {
            var ajaxConfig = {};
            if (this.model().isValid(true, 'reimageValidation')) {
                if (true) {
                    var clusterAttrs = this.model().attributes,
                        putData = {}, clusters = [];
                    clusters.push({'cluster_id': clusterAttrs['id'], 'base_image_id': clusterAttrs['base_image_id']});
                    putData = clusters;

                    ajaxConfig.type = "POST";
                    ajaxConfig.data = JSON.stringify(putData);
                    ajaxConfig.url = '/sm/server/reimage';

                    console.log(ajaxConfig);
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
        },
        provision: function (callback) {
            var ajaxConfig = {};
            if (this.model().isValid(true, 'provisionValidation')) {
                if (true) {
                    var clusterAttrs = this.model().attributes,
                        putData = {}, clusters = [];
                    clusters.push({'cluster_id': clusterAttrs['id'], 'package_image_id': clusterAttrs['package_image_id']});
                    putData = clusters;

                    ajaxConfig.type = "POST";
                    ajaxConfig.data = JSON.stringify(putData);
                    ajaxConfig.url = '/sm/server/provision';

                    console.log(ajaxConfig);
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
        },
        deleteCluster: function (modalId, checkedRow, callback) {
            var ajaxConfig = {}, that = this,
                clusterId = checkedRow['id'];
                ajaxConfig.type = "DELETE";
                ajaxConfig.url = '/sm/objects/cluster?id=' + clusterId;

            console.log(ajaxConfig);
            contrail.ajaxHandler(ajaxConfig, function () {
            }, function (response) {
                console.log(response);
                $("#" + modalId).modal('hide');
                if (contrail.checkIfFunction(callback)) {
                    callback();
                }
            }, function (error) {
                console.log(this);
                that.showErrorAttr('deleteCluster', error['responseText']);
            });
        },
        validations: {
            reimageValidation: {
                'base_image_id': {
                    required: true,
                    msg: smMessages.getRequiredMessage('base_image_id')
                }
            },
            provisionValidation: {
                'base_image_id': {
                    required: true,
                    msg: smMessages.getRequiredMessage('base_image_id')
                },
                'package_image_id': {
                    required: true,
                    msg: smMessages.getRequiredMessage('package_image_id')
                }
            },
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
