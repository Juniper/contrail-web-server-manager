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
        configure: function (callbackObj, ajaxMethod) {
            var ajaxConfig = {},
                returnFlag = false;
            if (this.model().isValid(true, 'configureValidation')) {
                // TODO: Check for form-level validation if required
                if (true) {
                    var putData = {}, clusterAttrsEdited = [],
                        clusterAttrs = this.model().attributes,
                        locks = this.model().attributes.locks.attributes,
                        that = this;

                    clusterAttrsEdited.push(smUtils.getEditConfigObj(clusterAttrs, locks));
                    putData[smConstants.CLUSTER_PREFIX_ID] = clusterAttrsEdited;

                    ajaxConfig.async = false;
                    ajaxConfig.type = contrail.checkIfExist(ajaxMethod) ? ajaxMethod : "PUT";
                    ajaxConfig.data = JSON.stringify(putData);
                    ajaxConfig.url = smUtils.getObjectUrl(smConstants.CLUSTER_PREFIX_ID);
                    contrail.ajaxHandler(ajaxConfig, function () {
                        if (contrail.checkIfFunction(callbackObj.init)) {
                            callbackObj.init();
                        }
                    }, function (response) {
                        console.log(response);
                        if (contrail.checkIfFunction(callbackObj.success)) {
                            callbackObj.success();
                        }
                        returnFlag = true;
                    }, function (error) {
                        console.log(error);
                        if (contrail.checkIfFunction(callbackObj.error)) {
                            callbackObj.error(error);
                        }
                        returnFlag = false;
                    });
                } else {
                    // TODO: Show form-level error message if any
                }
            }

            return returnFlag;
        },
        addServer: function (serverList, callbackObj) {
            var ajaxConfig = {},
                returnFlag = false;
            if (this.model().isValid(true, 'configureValidation')) {
                // TODO: Check for form-level validation if required
                if (true) {
                    var clusterAttrs = this.model().attributes,
                        putData = {}, servers = [],
                        that = this;

                    $.each(serverList, function (key, value) {
                        servers.push({'id': value['id'], 'cluster_id': clusterAttrs['id']});
                    });
                    putData[smConstants.SERVER_PREFIX_ID] = servers;

                    ajaxConfig.async = false;
                    ajaxConfig.type = "PUT";
                    ajaxConfig.data = JSON.stringify(putData);
                    ajaxConfig.url = smUtils.getObjectUrl(smConstants.SERVER_PREFIX_ID);

                    contrail.ajaxHandler(ajaxConfig, function () {
                        if (contrail.checkIfFunction(callbackObj.init)) {
                            callbackObj.init();
                        }
                    }, function (response) {
                        console.log(response);
                        if (contrail.checkIfFunction(callbackObj.success)) {
                            callbackObj.success();
                        }
                        returnFlag = true;
                    }, function (error) {
                        console.log(error);
                        if (contrail.checkIfFunction(callbackObj.error)) {
                            callbackObj.error(error);
                        }
                        returnFlag = false;
                    });
                } else {
                    // TODO: Show form-level error message if any
                }
            }
            return returnFlag;
        },
        removeServer: function (serverList, callbackObj) {
            var ajaxConfig = {},
                returnFlag = false,
                putData = {}, servers = [];
            $.each(serverList, function (key, value) {
                servers.push({'id': value['id'], 'cluster_id': ""});
            });
            putData[smConstants.SERVER_PREFIX_ID] = servers;

            ajaxConfig.async = false;
            ajaxConfig.type = "PUT";
            ajaxConfig.data = JSON.stringify(putData);
            ajaxConfig.url = smUtils.getObjectUrl(smConstants.SERVER_PREFIX_ID);
            console.log(ajaxConfig);

            contrail.ajaxHandler(ajaxConfig, function () {
                if (contrail.checkIfFunction(callbackObj.init)) {
                    callbackObj.init();
                }
            }, function (response) {
                console.log(response);
                if (contrail.checkIfFunction(callbackObj.success)) {
                    callbackObj.success();
                }
                returnFlag = true;
            }, function (error) {
                console.log(error);
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(error);
                }
                returnFlag = false;
            });

            return returnFlag;
        },
        assignRoles: function (serverList, callbackObj) {
            var ajaxConfig = {},
                returnFlag = false;
            if (this.model().isValid(true, 'configureValidation')) {
                // TODO: Check for form-level validation if required
                if (true) {
                    var putData = {}, servers = [],
                        that = this;

                    $.each(serverList, function (key, value) {
                        servers.push({'id': value['id'], 'roles': value['roles']});
                    });

                    putData[smConstants.SERVER_PREFIX_ID] = servers;

                    ajaxConfig.async = false;
                    ajaxConfig.type = "PUT";
                    ajaxConfig.data = JSON.stringify(putData);
                    ajaxConfig.url = smUtils.getObjectUrl(smConstants.SERVER_PREFIX_ID);
                    console.log(ajaxConfig);
                    contrail.ajaxHandler(ajaxConfig, function () {
                        if (contrail.checkIfFunction(callbackObj.init)) {
                            callbackObj.init();
                        }
                    }, function (response) {
                        console.log(response);
                        if (contrail.checkIfFunction(callbackObj.success)) {
                            callbackObj.success();
                        }
                        returnFlag = true;
                    }, function (error) {
                        console.log(error);
                        if (contrail.checkIfFunction(callbackObj.error)) {
                            callbackObj.error(error);
                        }
                        returnFlag = false;
                    });
                } else {
                    // TODO: Show form-level error message if any
                }
            }
            return returnFlag;
        },
        reimage: function (callbackObj) {
            var ajaxConfig = {};
            if (this.model().isValid(true, 'reimageValidation')) {
                if (true) {
                    var clusterAttrs = this.model().attributes,
                        putData = {}, clusters = [],
                        that = this;

                    clusters.push({'cluster_id': clusterAttrs['id'], 'base_image_id': clusterAttrs['base_image_id']});
                    putData = clusters;

                    ajaxConfig.type = "POST";
                    ajaxConfig.data = JSON.stringify(putData);
                    ajaxConfig.url = '/sm/server/reimage';

                    console.log(ajaxConfig);
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

                } else {
                    // TODO: Show form-level error message if any
                }
            }
        },
        provision: function (callbackObj) {
            var ajaxConfig = {};
            if (this.model().isValid(true, 'provisionValidation')) {
                if (true) {
                    var clusterAttrs = this.model().attributes,
                        putData = {}, clusters = [],
                        that = this;

                    clusters.push({'cluster_id': clusterAttrs['id'], 'package_image_id': clusterAttrs['package_image_id']});
                    putData = clusters;

                    ajaxConfig.type = "POST";
                    ajaxConfig.data = JSON.stringify(putData);
                    ajaxConfig.url = '/sm/server/provision';

                    console.log(ajaxConfig);
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

                } else {
                    // TODO: Show form-level error message if any
                }
            }
        },
        deleteCluster: function (checkedRow, callbackObj) {
            var ajaxConfig = {}, that = this,
                clusterId = checkedRow['id'];

            ajaxConfig.type = "DELETE";
            ajaxConfig.url = '/sm/objects/cluster?id=' + clusterId;

            console.log(ajaxConfig);
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
            reimageValidation: {
                'base_image_id': {
                    required: true,
                    msg: smMessages.getRequiredMessage('base_image_id')
                }
            },
            provisionValidation: {
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
                    pattern: smConstants.PATTERN_SUBNET_MASK,
                    msg: smMessages.getInvalidErrorMessage('subnet_mask')
                },
                'parameters.openstack_mgmt_ip': {
                    required: false,
                    pattern: smConstants.PATTERN_IP_ADDRESS,
                    msg: smMessages.getInvalidErrorMessage('openstack_mgmt_ip')
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
