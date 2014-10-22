/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'common/ui/js/models/ContrailModel'
], function (_, ContrailModel) {
    var ServerModel = ContrailModel.extend({
        defaultConfig: {
            'id': null,
            'cluster_id': null,
            'domain': null,
            'discovered': null,
            'gateway': null,
            'email': null,
            'subnet_mask': null,
            'static_ip': null,
            'mac_address': null,
            'base_image_id': null,
            'package_image_id': null,
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
            'roles': ['compute']
        },
        configure: function (modalId, checkedRows, callback) {
            if (this.model().isValid(true, 'configureValidation')) {
                // TODO: Check for form-level validation if required
                var ajaxConfig = {};
                if (true) {
                    var putData = {}, serverAttrsEdited = [], serversEdited = [],
                        serverAttrs = this.model().attributes,
                        locks = this.model().attributes.locks.attributes,
                        that = this;

                    serverAttrsEdited = smUtils.getEditConfigObj(serverAttrs, locks);
                    for (var i = 0; i < checkedRows.length; i++) {
                        serversEdited.push(serverAttrsEdited);
                    }
                    putData[smConstants.SERVER_PREFIX_ID] = serversEdited;

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
                        that.showErrorAttr(smConstants.SERVER_PREFIX_ID + '_form', error.responseText);
                    });
                } else {
                    // TODO: Show form-level error message if any
                }
            }
        },
        configureServers: function (modalId, checkedRows, callback) {
            var ajaxConfig = {};
            if (true) {
                var putData = {}, serverAttrsEdited = {}, serversEdited = [],
                    serverAttrs = this.model().attributes,
                    locks = this.model().attributes.locks.attributes,
                    that = this;

                serverAttrsEdited = smUtils.getEditConfigObj(serverAttrs, locks);
                $.each(checkedRows, function (checkedRowsKey, checkedRowsValue) {
                    serversEdited.push($.extend(true, {}, serverAttrsEdited, {id: checkedRowsValue.id}));
                });
                putData[smConstants.SERVER_PREFIX_ID] = serversEdited;

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
                    that.showErrorAttr(smConstants.SERVER_PREFIX_ID + '_form', error.responseText);
                });
            } else {
                // TODO: Show form-level error message if any
            }
        },
        createServers: function (modalId, callback, ajaxMethod) {
            if (this.model().isValid(true, 'configureValidation')) {
                var ajaxConfig = {};
                if (true) {
                    var putData = {}, serversCreated = [], that = this,
                        serverAttrs = this.model().attributes;
                        serversCreated.push(serverAttrs),
                        that = this;

                    putData[smConstants.SERVER_PREFIX_ID] = serversCreated;

                    ajaxConfig.type = contrail.checkIfExist(ajaxMethod) ? ajaxMethod : "PUT";
                    ajaxConfig.data = JSON.stringify(putData);
                    ajaxConfig.url = smUtils.getObjectUrl(smConstants.SERVER_PREFIX_ID);
                    contrail.ajaxHandler(ajaxConfig, function () {
                    }, function (response) {
                        console.log(response);
                        $("#" + modalId).modal('hide');
                        if (contrail.checkIfFunction(callback)) {
                            callback();
                        }
                    }, function (error) {
                        console.log(error);
                        that.showErrorAttr(smConstants.SERVER_PREFIX_ID + '_form', error.responseText);
                    });
                } else {
                    // TODO: Show form-level error message if any
                }
            }
        },
        editRoles: function (modalId, checkedRows, callback) {
            var ajaxConfig = {};
            if (this.model().isValid(true, 'configureValidation')) {
                if (true) {
                    var serverAttrs = this.model().attributes,
                        putData = {}, servers = [],
                        roles = serverAttrs['roles'].split(','),
                        that = this;

                    for(var i = 0; i < checkedRows.length; i++) {
                        servers.push({'id': checkedRows[i]['id'], 'roles': roles});
                    }
                    putData[smConstants.SERVER_PREFIX_ID] = servers;

                    ajaxConfig.type = "PUT";
                    ajaxConfig.data = JSON.stringify(putData);
                    ajaxConfig.url = smUtils.getObjectUrl(smConstants.SERVER_PREFIX_ID);
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
                        that.showErrorAttr(smConstants.SERVER_PREFIX_ID + '_form', error.responseText);
                    });
                } else {
                    // TODO: Show form-level error message if any
                }
            }
        },
        editTags: function (modalId, checkedRows, callback) {
            var ajaxConfig = {};
            if (this.model().isValid(true, 'editTagsValidation')) {
                // TODO: Check for form-level validation if required
                if (true) {
                    var putData = {}, serverAttrsEdited = {}, serversEdited = [],
                        serverAttrs = this.model().attributes,
                        locks = this.model().attributes.locks.attributes,
                        that = this;

                    contrail.ajaxHandler({
                        type: 'GET',
                        url: smConstants.URL_TAG_NAMES
                    }, function () {
                    }, function (response) {
                        $.each(response, function(tagKey, tagValue) {
                            if(!contrail.checkIfExist(serverAttrs.tag[tagValue])){
                                serverAttrs.tag[tagValue] = null;
                            }
                        });

                        serverAttrsEdited = smUtils.getEditConfigObj(serverAttrs, locks);

                        $.each(checkedRows, function (checkedRowsKey, checkedRowsValue) {
                            serversEdited.push({'id': checkedRowsValue.id, 'tag': serverAttrsEdited['tag']});
                        });
                        putData[smConstants.SERVER_PREFIX_ID] = serversEdited;

                        ajaxConfig.type = "PUT";
                        ajaxConfig.data = JSON.stringify(putData);
                        ajaxConfig.url = smUtils.getObjectUrl(smConstants.SERVER_PREFIX_ID);
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
                            that.showErrorAttr(smConstants.SERVER_PREFIX_ID + '_form', error.responseText);
                        });
                    }, function (error) {
                        console.log(error);
                        that.showErrorAttr(smConstants.SERVER_PREFIX_ID + '_form', error.responseText);
                    });


                } else {
                    // TODO: Show form-level error message if any
                }
            }
        },
        reimage: function (modalId, checkedRows, callback) {
            var ajaxConfig = {};
            if (this.model().isValid(true, 'reimageValidation')) {
                // TODO: Check for form-level validation if required
                if (true) {
                    var serverAttrs = this.model().attributes,
                        putData = {}, servers = [],
                        that = this;

                    for (var i = 0; i < checkedRows.length; i++) {
                        servers.push({'id': checkedRows[i]['id'], 'base_image_id': serverAttrs['base_image_id']});
                    }
                    putData = servers;
                    ajaxConfig.type = "POST";
                    ajaxConfig.data = JSON.stringify(putData);
                    ajaxConfig.url = 'sm/server/reimage';
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
                        that.showErrorAttr(smConstants.SERVER_PREFIX_ID + '_form', error.responseText);
                    });
                } else {
                    // TODO: Show form-level error message if any
                }
            }
        },
        provision: function (modalId, checkedRows, callback) {
            var ajaxConfig = {};
            if (this.model().isValid(true, 'provisionValidation')) {
                if (true) {
                    var serverAttrs = this.model().attributes,
                        putData = {}, servers = [],
                        that = this;

                    for (var i = 0; i < checkedRows.length; i++) {
                        servers.push({'id': checkedRows[i]['id'], 'package_image_id': serverAttrs['package_image_id']});
                    }
                    putData = servers;

                    ajaxConfig.type = "POST";
                    ajaxConfig.data = JSON.stringify(putData);
                    ajaxConfig.url = '/sm/server/provision';
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
                        that.showErrorAttr(smConstants.SERVER_PREFIX_ID + '_form', error.responseText);
                    });

                } else {
                    // TODO: Show form-level error message if any
                }
            }
        },
        deleteServer: function (modalId, checkedRow, callback) {
            var ajaxConfig = {}, that = this,
                serverId = checkedRow['id'];
            ajaxConfig.type = "DELETE";
            ajaxConfig.url = '/sm/objects/server?id=' + serverId;
            contrail.ajaxHandler(ajaxConfig, function () {
            }, function (response) {
                console.log(response);
                $("#" + modalId).modal('hide');
                if (contrail.checkIfFunction(callback)) {
                    callback();
                }
            }, function (error) {
                console.log(error);
                this.showErrorAttr('deleteServer', error['responseText']);
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
                'ip_address': {
                    required: true,
                    pattern: smConstants.PATTERN_IP_ADDRESS,
                    msg: smMessages.getInvalidErrorMessage('ip_address')
                },
                'ipmi_address': {
                    required: false,
                    pattern: smConstants.PATTERN_IP_ADDRESS,
                    msg: smMessages.getInvalidErrorMessage('ipmi_address')
                },
                'mac_address': {
                    required: true,
                    pattern: smConstants.PATTERN_MAC_ADDRESS,
                    msg: smMessages.getInvalidErrorMessage('mac_address')
                },
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
                    pattern: smConstants.PATTERN_MAC_ADDRESS,
                    msg: smMessages.getInvalidErrorMessage('mac_address')
                },
                'subnet_mask': {
                    required: false,
                    pattern: smConstants.PATTERN_IP_ADDRESS,
                    msg: smMessages.getInvalidErrorMessage('subnet_mask')
                }
            },
            editTagsValidation: {}
        }
    });

    return ServerModel;
});
