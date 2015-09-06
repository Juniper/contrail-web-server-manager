/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'knockout',
    'contrail-model',
    'setting/sm/ui/js/models/InterfacesModel',
    'setting/sm/ui/js/models/DisksModel'
], function (_, Backbone, Knockout, ContrailModel, InterfaceModel, DiskModel) {
    var ServerModel = ContrailModel.extend({

        defaultConfig: smwmc.getServerModel(),

        formatModelConfig: function (modelConfig) {

            /*
                Populating contrail and network objects if set to null
             */
            if(modelConfig.contrail == null || modelConfig.contrail == '') {
                modelConfig.contrail = {
                    'control_data_interface': null
                };
            }

            if(modelConfig.network == null || modelConfig.network == '') {
                modelConfig.network = {
                    'management_interface': null,
                    'interfaces': []
                };
            }

            /*
                Populating InterfaceModel from network.interfaces
             */
            var interfaces = (modelConfig['network'] != null) ? (modelConfig['network']['interfaces']) : [],
                interfaceModels = [], interfaceModel,
                interfaceCollectionModel;

            for(var i = 0; i < interfaces.length; i++) {
                interfaceModel = new InterfaceModel(interfaces[i]);
                interfaceModels.push(interfaceModel)
            }

            interfaceCollectionModel = new Backbone.Collection(interfaceModels);
            modelConfig['interfaces'] = interfaceCollectionModel;
            if(modelConfig['network'] != null) {
                delete modelConfig['network']['interfaces'];
            }

            /*
             Populating DiskModel from network.interfaces
             */
            var disks = (contrail.checkIfExist(modelConfig.parameters.disks)) ? (modelConfig.parameters.disks) : [],
                diskModels = [], diskModel,
                diskCollectionModel;

            $.each(disks, function(diskKey, diskValue) {
                diskModel = new DiskModel({disk: diskValue});
                diskModels.push(diskModel)
            });

            diskCollectionModel = new Backbone.Collection(diskModels);
            modelConfig['disks'] = diskCollectionModel;
            if(contrail.checkIfExist(modelConfig.parameters.disks)) {
                delete modelConfig.parameters.disks;
            }

            return modelConfig;
        },

        getServerInterfaces: function (serverAttributes) {
            var interfaceCollection = serverAttributes.interfaces.toJSON(),
                interfaceArray = [], interfaceAttributes;

            for(var i = 0; i < interfaceCollection.length; i++) {
                interfaceAttributes = interfaceCollection[i].model().attributes;
                delete interfaceAttributes.errors;
                delete interfaceAttributes.locks;
                interfaceArray.push(interfaceCollection[i].model().attributes);
            }
            return interfaceArray;
        },

        getServerStorageDisks: function (serverAttributes) {
            var diskCollection = serverAttributes.disks.toJSON(),
                diskArray = [], diskAttributes;

            for(var i = 0; i < diskCollection.length; i++) {
                diskAttributes = diskCollection[i].model().attributes;
                delete diskAttributes.errors;
                delete diskAttributes.locks;
                diskArray.push(diskAttributes.disk);
            }
            return diskArray;
        },

        configure: function (checkedRows, callbackObj) {
            if (this.model().isValid(true, smwc.KEY_CONFIGURE_VALIDATION)) {
                var ajaxConfig = {};
                var putData = {}, serverAttrsEdited = [], serversEdited = [],
                    serverAttrs = this.model().attributes,
                    originalAttrs = this.model()._originalAttributes,
                    locks = this.model().attributes.locks.attributes,
                    interfaces, disks;

                interfaces = this.getServerInterfaces(serverAttrs);
                disks = this.getServerStorageDisks(serverAttrs);

                serverAttrsEdited = cowu.getEditConfigObj(serverAttrs, locks);

                serverAttrsEdited['network']['interfaces'] = interfaces;
                delete serverAttrsEdited['interfaces'];
                serverAttrsEdited.parameters.disks = disks;
                delete serverAttrsEdited['disks'];

                for (var i = 0; i < checkedRows.length; i++) {
                    /* START handling for storage chassis id */
                    serverAttrsEdited['parameters'] = smwu.handleChassisId(serverAttrsEdited['parameters']);
                    /* END handling for storage chassis id */
                    serversEdited.push(serverAttrsEdited);
                }

                putData[smwc.SERVER_PREFIX_ID] = serversEdited;
                if(originalAttrs['cluster_id'] != serverAttrsEdited['cluster_id']) {
                    smwu.removeRolesFromServers(putData);
                }

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
                }, function (error) {
                    console.log(error);
                    if (contrail.checkIfFunction(callbackObj.error)) {
                        callbackObj.error(error);
                    }
                });
            } else {
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(this.getFormErrorText(smwc.SERVER_PREFIX_ID));
                }
            }
        },
        configureServers: function (checkedRows, callbackObj) {
            var ajaxConfig = {};
            var putData = {}, serverAttrsEdited = {}, serversEdited = [],
                serverAttrs = this.model().attributes,
                locks = this.model().attributes.locks.attributes,
                that = this;

            serverAttrsEdited = cowu.getEditConfigObj(serverAttrs, locks);
            $.each(checkedRows, function (checkedRowsKey, checkedRowsValue) {

                /* START handling for storage chassis id */
                if(_.has(serverAttrsEdited, 'parameters')){
                    if(_.has(serverAttrsEdited['parameters'], 'storage_chassis_id') || _.has(serverAttrsEdited['parameters'], 'storage_chassis_id_input')){
                        serverAttrsEdited['parameters'] = smwu.handleChassisId(serverAttrsEdited['parameters']);
                    }
                }
                /* END handling for storage chassis id */
                serversEdited.push($.extend(true, {}, serverAttrsEdited, {id: checkedRowsValue.id}));
            });

            putData[smwc.SERVER_PREFIX_ID] = serversEdited;
            smwu.removeRolesFromServers(putData);

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
            }, function (error) {
                console.log(error);
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(error);
                }
            });
        },
        createServers: function (callbackObj, ajaxMethod) {
            if (this.model().isValid(true, smwc.KEY_CONFIGURE_VALIDATION)) {
                var ajaxConfig = {};
                var putData = {}, serverAttrsEdited = [], serversCreated = [],
                    serverAttrs = this.model().attributes,
                    locks = this.model().attributes.locks.attributes,
                    interfaces, disks;

                interfaces = this.getServerInterfaces(serverAttrs);
                disks = this.getServerStorageDisks(serverAttrs);

                serverAttrsEdited = cowu.getEditConfigObj(serverAttrs, locks);

                serverAttrsEdited['network']['interfaces'] = interfaces;
                delete serverAttrsEdited['interfaces'];
                serverAttrsEdited.parameters.disks = disks;
                delete serverAttrsEdited['disks'];

                serversCreated.push(serverAttrsEdited);

                putData[smwc.SERVER_PREFIX_ID] = serversCreated;

                ajaxConfig.type = contrail.checkIfExist(ajaxMethod) ? ajaxMethod : "PUT";
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
                }, function (error) {
                    console.log(error);
                    if (contrail.checkIfFunction(callbackObj.error)) {
                        callbackObj.error(error);
                    }
                });
            } else {
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(this.getFormErrorText(smwc.SERVER_PREFIX_ID));
                }
            }
        },
        editRoles: function (checkedRows, callbackObj) {
            var ajaxConfig = {};
            if (this.model().isValid(true, smwc.KEY_CONFIGURE_VALIDATION)) {
                var serverAttrs = this.model().attributes,
                    putData = {}, servers = [],
                    roles = serverAttrs['roles'].split(','),
                    that = this;

                for (var i = 0; i < checkedRows.length; i++) {
                    servers.push({'id': checkedRows[i]['id'], 'roles': roles});
                }
                putData[smwc.SERVER_PREFIX_ID] = servers;

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
                }, function (error) {
                    console.log(error);
                    if (contrail.checkIfFunction(callbackObj.error)) {
                        callbackObj.error(error);
                    }
                });
            } else {
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(this.getFormErrorText(smwc.SERVER_PREFIX_ID));
                }
            }
        },
        editTags: function (checkedRows, callbackObj) {
            var ajaxConfig = {};
            if (this.model().isValid(true, smwc.KEY_EDIT_TAGS_VALIDATION)) {
                var putData = {}, serverAttrsEdited = {}, serversEdited = [],
                    serverAttrs = this.model().attributes,
                    locks = this.model().attributes.locks.attributes,
                    that = this;

                contrail.ajaxHandler({
                    type: 'GET',
                    url: smwc.URL_TAG_NAMES
                }, function () {
                }, function (response) {
                    $.each(response, function (tagKey, tagValue) {
                        if (!contrail.checkIfExist(serverAttrs.tag[tagValue])) {
                            serverAttrs.tag[tagValue] = null;
                        }
                    });

                    serverAttrsEdited = cowu.getEditConfigObj(serverAttrs, locks);

                    $.each(checkedRows, function (checkedRowsKey, checkedRowsValue) {
                        serversEdited.push({'id': checkedRowsValue.id, 'tag': serverAttrsEdited['tag']});
                    });
                    putData[smwc.SERVER_PREFIX_ID] = serversEdited;

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
                    }, function (error) {
                        console.log(error);
                        if (contrail.checkIfFunction(callbackObj.error)) {
                            callbackObj.error(error);
                        }
                    });
                }, function (error) {
                    console.log(error);
                    that.showErrorAttr(smwc.SERVER_PREFIX_ID + '_form', error.responseText);
                });
            } else {
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(this.getFormErrorText(smwc.SERVER_PREFIX_ID));
                }
            }
        },
        reimage: function (checkedRows, callbackObj) {
            var ajaxConfig = {};
            if (this.model().isValid(true, smwc.KEY_REIMAGE_VALIDATION)) {
                var serverAttrs = this.model().attributes,
                    putData = {}, servers = [],
                    that = this;

                for (var i = 0; i < checkedRows.length; i++) {
                    servers.push({'id': checkedRows[i]['id'], 'base_image_id': serverAttrs['base_image_id']});
                }
                putData = servers;
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
            }  else {
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(this.getFormErrorText(smwc.SERVER_PREFIX_ID));
                }
            }
        },
        provision: function (checkedRows, callbackObj) {
            var ajaxConfig = {};
            if (this.model().isValid(true, smwc.KEY_PROVISION_VALIDATION)) {
                var serverAttrs = this.model().attributes,
                    putData = {}, servers = [],
                    that = this;

                for (var i = 0; i < checkedRows.length; i++) {
                    servers.push({'id': checkedRows[i]['id'], 'package_image_id': serverAttrs['package_image_id']});
                }
                putData = servers;

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
                    callbackObj.error(this.getFormErrorText(smwc.SERVER_PREFIX_ID));
                }
            }
        },
        deleteServer: function (checkedRow, callbackObj) {
            var ajaxConfig = {}, that = this,
                serverId = checkedRow['id'];
            ajaxConfig.type = "DELETE";
            ajaxConfig.url = smwc.URL_OBJ_SERVER_ID + serverId;
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
        addInterface: function(type) {
            var interfaces = this.model().attributes['interfaces'],
                newInterface = new InterfaceModel({name: "", type: type, "ip_address" : "", "mac_address" : "", "default_gateway" : "", "dhcp" : true, members: [], "tor" : "", "tor_port" : ""});

            interfaces.add([newInterface]);
        },
        deleteInterface: function(data, kbInterface) {
            var interfaceCollection = data.model().collection,
                intf = kbInterface.model();

            interfaceCollection.remove(intf);
        },
        filterInterfaces: function(interfaceType) {
            return Knockout.computed(function () {
                var kbInterfaces = this.interfaces(),
                    interfaces = this.model().attributes.interfaces,
                    phyInterfaces = [], model, type;

                for (var i = 0; i < interfaces.length; i++) {
                    model = interfaces.at(i);
                    type = contrail.checkIfExist(model.attributes.type()) ? model.attributes.type() : 'physical';

                    if (type == interfaceType) {
                        phyInterfaces.push(kbInterfaces[i]);
                    }
                }
                return phyInterfaces;
            }, this);
        },
        getMemberInterfaces: function() {
            return Knockout.computed(function () {
                var kbInterfaces = this.interfaces(),
                    interfaces = this.model().attributes.interfaces,
                    memberInterfaces = [], model, dhcp;
                for (var i = 0; i < interfaces.length; i++) {
                    model = interfaces.at(i);
                    dhcp = model.attributes.dhcp();
                    if (dhcp == false && model.attributes.name() != "") {
                        memberInterfaces.push(model.attributes.name());
                    }
                }
                return memberInterfaces;
            }, this);
        },
        getParentInterfaces: function() {
            return Knockout.computed(function () {
                var kbInterfaces = this.interfaces(),
                    interfaces = this.model().attributes.interfaces,
                    parentInterfaces = [], model, type;
                for (var i = 0; i < interfaces.length; i++) {
                    model = interfaces.at(i);
                    type = model.attributes.type();
                    if ((type == 'physical' || type == 'bond') && model.attributes.name() != "") {
                        parentInterfaces.push(model.attributes.name());
                    }
                }
                return parentInterfaces;
            }, this);
        },
        getManagementInterfaces: function() {
            return Knockout.computed(function () {
                var kbInterfaces = this.interfaces(),
                    interfaces = this.model().attributes.interfaces,
                    managementInterfaces = [], model, type,
                    dhcp = null;

                for (var i = 0; i < interfaces.length; i++) {
                    model = interfaces.at(i);
                    type = contrail.checkIfExist(model.attributes.type()) ? model.attributes.type() : 'physical';
                    dhcp = model.attributes.dhcp();

                    if (type == 'physical' && dhcp) {
                        managementInterfaces.push(model.attributes.name());
                    }
                }
                return managementInterfaces;
            }, this);
        },
        getControlDataInterfaces: function() {
            return Knockout.computed(function () {
                var kbInterfaces = this.interfaces(),
                    interfaces = this.model().attributes.interfaces,
                    controlDataInterfaces = [], model, type,
                    dhcp = null;

                for (var i = 0; i < interfaces.length; i++) {
                    model = interfaces.at(i);
                    type = contrail.checkIfExist(model.attributes.type()) ? model.attributes.type() : 'physical';
                    dhcp = model.attributes.dhcp();
                    controlDataInterfaces.push(model.attributes.name());
                }

                return controlDataInterfaces;
            }, this);
        },
        addDisk: function() {
            var disks = this.model().attributes['disks'],
                newDisk = new DiskModel({disk: ""});

            disks.add([newDisk]);
        },
        deleteDisk: function(data, kbDisk) {
            var diskCollection = data.model().collection,
                intf = kbDisk.model();

            diskCollection.remove(intf);
        },
        getStorageDisks: function() {
            return Knockout.computed(function () {
                var kbDisks = this.disks(),
                    disks = this.model().attributes.disks,
                    storageDisks = [], model, type;

                for (var i = 0; i < disks.length; i++) {
                    storageDisks.push(kbDisks[i]);
                };
                return storageDisks;
            }, this);
        },

        validations: {
            reimageValidation: {
                'base_image_id': {
                    required: true,
                    msg: smwm.getRequiredMessage('base_image_id')
                }
            },
            provisionValidation: {
                'package_image_id': {
                    required: true,
                    msg: smwm.getRequiredMessage('package_image_id')
                }
            },
            configureValidation: {
                'id': {
                    required: true,
                    msg: smwm.getRequiredMessage('id')
                },
                'network.management_interface': {
                    required: true,
                    msg: smwm.getRequiredMessage('management_interface')
                },
                'contrail.control_data_interface': {
                    required: true,
                    msg: smwm.getRequiredMessage('control_data_interface')
                },
                'ipmi_address': {
                    required: true,
                    pattern: cowc.PATTERN_IP_ADDRESS,
                    msg: smwm.getInvalidErrorMessage('ipmi_address')
                },
                'email': {
                    required: false,
                    pattern: 'email',
                    msg: smwm.getInvalidErrorMessage('email')
                }
            },
            editTagsValidation: {}
        }
    });

    return ServerModel;
});
