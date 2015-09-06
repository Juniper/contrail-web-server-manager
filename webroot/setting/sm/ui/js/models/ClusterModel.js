/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-model'
], function (_, ContrailModel) {

    var getValidationByKey = function (key) {
        var configureValidation = {
            'id': {
                required: true,
                msg: smwm.getRequiredMessage('id')
            },
            'email': {
                required: false,
                pattern: 'email',
                msg: smwm.getInvalidErrorMessage('email')
            },
            'parameters.domain': {
                required: true,
                msg: smwm.getRequiredMessage('domain')
            },
            'parameters.subnet_mask': {
                required: true,
                pattern: cowc.PATTERN_SUBNET_MASK,
                msg: smwm.getInvalidErrorMessage('subnet_mask')
            },
            'parameters.gateway': {
                required: false,
                pattern: cowc.PATTERN_IP_ADDRESS,
                msg: smwm.getInvalidErrorMessage('gateway')
            },

            'parameters.analytics_data_ttl': {
                required: true,
                pattern: 'number',
                msg: smwm.getInvalidErrorMessage('analytics_data_ttl')
            },
            'parameters.router_asn': {
                required: true,
                pattern: 'number',
                msg: smwm.getInvalidErrorMessage('router_asn')
            },
            'parameters.encapsulation_priority': {
                required: true,
                msg: smwm.getRequiredMessage('encapsulation_priority')
            },

            'parameters.openstack_mgmt_ip': {
                required: false,
                pattern: cowc.PATTERN_IP_ADDRESS,
                msg: smwm.getInvalidErrorMessage('openstack_mgmt_ip')
            },
            'parameters.compute_non_mgmt_ip': {
                required: false,
                pattern: cowc.PATTERN_IP_ADDRESS,
                msg: smwm.getInvalidErrorMessage('compute_non_mgmt_ip')
            },
            'parameters.compute_non_mgmt_gway': {
                required: false,
                pattern: cowc.PATTERN_IP_ADDRESS,
                msg: smwm.getInvalidErrorMessage('compute_non_mgmt_gway')
            },

            'parameters.keystone_tenant': {
                required: true,
                msg: smwm.getRequiredMessage('keystone_tenant')
            },
            'parameters.keystone_ip': {
                required: false,
                pattern: smwc.PATTERN_IP_ADDRESS,
                msg: smwm.getInvalidErrorMessage('keystone_ip')
            },
            'parameters.keystone_username': {
                required: true,
                msg: smwm.getRequiredMessage('keystone_username')
            },
            'parameters.keystone_password': {
                required: true,
                msg: smwm.getRequiredMessage('keystone_password')
            },
            'parameters.password': {
                required: true,
                msg: smwm.getRequiredMessage('password')
            },

            'parameters.internal_vip': {
                required: false,
                pattern: cowc.PATTERN_IP_ADDRESS,
                msg: smwm.getInvalidErrorMessage('internal_vip')
            },
            'parameters.external_vip': {
                required: false,
                pattern: cowc.PATTERN_IP_ADDRESS,
                msg: smwm.getInvalidErrorMessage('external_vip')
            },
            'parameters.contrail_internal_vip': {
                required: false,
                pattern: cowc.PATTERN_IP_ADDRESS,
                msg: smwm.getInvalidErrorMessage('contrail_internal_vip')
            },
            'parameters.contrail_external_vip': {
                required: false,
                pattern: cowc.PATTERN_IP_ADDRESS,
                msg: smwm.getInvalidErrorMessage('contrail_external_vip')
            },
            'parameters.nfs_server': {
                required: false,
                pattern: cowc.PATTERN_IP_ADDRESS,
                msg: smwm.getInvalidErrorMessage('nfs_server')
            },
            'parameters.database_dir': {
                required: true,
                msg: smwm.getRequiredMessage('database_dir')
            },
            'parameters.database_minimum_diskGB': {
                required: true,
                pattern: 'number',
                msg: smwm.getInvalidErrorMessage('database_minimum_diskGB')
            },
            'parameters.service_token': {
                required: true,
                msg: smwm.getRequiredMessage('service_token')
            }
        };

        if (key == "configureValidation") {
            return configureValidation;
        } else if (key == "provisionValidation") {
            configureValidation['package_image_id'] = {
                required: true,
                msg: smwm.getRequiredMessage('package_image_id')
            };
            return configureValidation;
        }
    };

    var ClusterModel = ContrailModel.extend({

        defaultConfig: smwmc.getClusterModel(),

        configure: function (callbackObj, ajaxMethod, validation) {
            var ajaxConfig = {}, returnFlag = false;

            validation = (validation == null) ? smwc.KEY_CONFIGURE_VALIDATION : validation;

            if (this.model().isValid(true, validation)) {
                var putData = {}, clusterAttrsEdited = [],
                    clusterAttrs = this.model().attributes,
                    locks = this.model().attributes.locks.attributes,
                    that = this;

                clusterAttrsEdited.push(cowu.getEditConfigObj(clusterAttrs, locks));
                putData[smwc.CLUSTER_PREFIX_ID] = clusterAttrsEdited;

                ajaxConfig.async = false;
                ajaxConfig.type = contrail.checkIfExist(ajaxMethod) ? ajaxMethod : "PUT";
                ajaxConfig.data = JSON.stringify(putData);
                ajaxConfig.url = smwu.getObjectUrl(smwc.CLUSTER_PREFIX_ID);
                contrail.ajaxHandler(ajaxConfig, function () {
                    if (contrail.checkIfFunction(callbackObj.init)) {
                        callbackObj.init();
                    }
                }, function (response) {
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
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(this.getFormErrorText(smwc.CLUSTER_PREFIX_ID));
                }
            }

            return returnFlag;
        },
        addServer: function (serverList, callbackObj) {
            var ajaxConfig = {},
                returnFlag = false;

            var clusterAttrs = this.model().attributes,
                putData = {}, servers = [],
                that = this;

            $.each(serverList, function (key, value) {
                servers.push({'id': value['id'], 'cluster_id': clusterAttrs['id']});
            });
            putData[smwc.SERVER_PREFIX_ID] = servers;

            ajaxConfig.async = false;
            ajaxConfig.type = "PUT";
            ajaxConfig.data = JSON.stringify(putData);
            ajaxConfig.url = smwu.getObjectUrl(smwc.SERVER_PREFIX_ID);

            contrail.ajaxHandler(ajaxConfig, function () {
                if (contrail.checkIfFunction(callbackObj.init)) {
                    callbackObj.init();
                }
            }, function (response) {
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
        removeServer: function (serverList, callbackObj) {
            var ajaxConfig = {},
                returnFlag = false,
                putData = {}, servers = [];

            $.each(serverList, function (key, value) {
                servers.push({'id': value['id'], 'cluster_id': ""});
            });

            putData[smwc.SERVER_PREFIX_ID] = servers;
            smwu.removeRolesFromServers(putData);

            ajaxConfig.async = false;
            ajaxConfig.type = "PUT";
            ajaxConfig.data = JSON.stringify(putData);
            ajaxConfig.url = smwu.getObjectUrl(smwc.SERVER_PREFIX_ID);

            contrail.ajaxHandler(ajaxConfig, function () {
                if (contrail.checkIfFunction(callbackObj.init)) {
                    callbackObj.init();
                }
            }, function (response) {
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
            var ajaxConfig = {}, returnFlag = false,
                putData = {}, servers = [],
                that = this;

            $.each(serverList, function (key, value) {
                servers.push({'id': value['id'], 'roles': value['roles']});
            });

            putData[smwc.SERVER_PREFIX_ID] = servers;

            ajaxConfig.async = false;
            ajaxConfig.type = "PUT";
            ajaxConfig.data = JSON.stringify(putData);
            ajaxConfig.url = smwu.getObjectUrl(smwc.SERVER_PREFIX_ID);

            contrail.ajaxHandler(ajaxConfig, function () {
                if (contrail.checkIfFunction(callbackObj.init)) {
                    callbackObj.init();
                }
            }, function (response) {
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
        reimage: function (callbackObj) {
            var ajaxConfig = {};
            if (this.model().isValid(true, smwc.KEY_REIMAGE_VALIDATION)) {
                var clusterAttrs = this.model().attributes,
                    putData = {}, clusters = [],
                    that = this;

                clusters.push({'cluster_id': clusterAttrs['id'], 'base_image_id': clusterAttrs['base_image_id']});
                putData = clusters;

                ajaxConfig.type = "POST";
                ajaxConfig.data = JSON.stringify(putData);
                ajaxConfig.timeout = smwc.TIMEOUT;
                ajaxConfig.url = smwc.URL_SERVER_REIMAGE;

                contrail.ajaxHandler(ajaxConfig, function () {
                    if (contrail.checkIfFunction(callbackObj.init)) {
                        callbackObj.init();
                    }
                }, function (response) {
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
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(this.getFormErrorText(smwc.CLUSTER_PREFIX_ID));
                }
            }
        },
        provision: function (callbackObj) {
            var ajaxConfig = {};
            if (this.model().isValid(true, smwc.KEY_PROVISION_VALIDATION)) {
                var clusterAttrs = this.model().attributes,
                    putData = {}, clusters = [],
                    that = this;

                clusters.push({'cluster_id': clusterAttrs['id'], 'package_image_id': clusterAttrs['package_image_id']});
                putData = clusters;

                ajaxConfig.type = "POST";
                ajaxConfig.data = JSON.stringify(putData);
                ajaxConfig.timeout = smwc.TIMEOUT;
                ajaxConfig.url = smwc.URL_SERVER_PROVISION;

                contrail.ajaxHandler(ajaxConfig, function () {
                    if (contrail.checkIfFunction(callbackObj.init)) {
                        callbackObj.init();
                    }
                }, function (response) {
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
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(this.getFormErrorText(smwc.CLUSTER_PREFIX_ID));
                }
            }
        },
        deleteCluster: function (checkedRow, callbackObj) {
            var ajaxConfig = {}, that = this,
                clusterId = checkedRow['id'];

            ajaxConfig.type = "DELETE";
            ajaxConfig.url = smwc.URL_OBJ_CLUSTER_ID + clusterId;

            contrail.ajaxHandler(ajaxConfig, function () {
                if (contrail.checkIfFunction(callbackObj.init)) {
                    callbackObj.init();
                }
            }, function (response) {
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
                    msg: smwm.getRequiredMessage('base_image_id')
                }
            },
            provisionValidation: getValidationByKey("provisionValidation"),
            addValidation: {
                'id': {
                    required: true,
                    msg: smwm.getRequiredMessage('id')
                },
                'email': {
                    required: false,
                    pattern: 'email',
                    msg: smwm.getInvalidErrorMessage('email')
                }
            },
            configureValidation: getValidationByKey("configureValidation")
        }
    });

    return ClusterModel;
});
