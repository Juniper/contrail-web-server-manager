/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'knockout',
    'contrail-model',
    'sm-basedir/setting/sm/ui/js/models/InterfacesModel',
    'sm-basedir/setting/sm/ui/js/models/DisksModel',
    'sm-basedir/setting/sm/ui/js/models/SwitchModel'
], function (_, Backbone, Knockout, ContrailModel, InterfaceModel, DiskModel, SwitchModel) {
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
            if(modelConfig.top_of_rack == null || modelConfig.top_of_rack == '') {
                modelConfig.top_of_rack = {
                    'switches': []
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
                Populating SwitchModel from top_of_rack.switches
             */
            var switches = (modelConfig['top_of_rack'] != null) ? (modelConfig['top_of_rack']['switches']) : [],
                switchModels = [], switchModel,
                switchCollectionModel;

            for(var i = 0; i < switches.length; i++) {
                // manually need to replace 'id' in switches by 'switch_id'
                // as backbone collection does not allow 'id' field in a collection
                if(contrail.checkIfExist(switches[i].id)){
                    switches[i].switch_id = switches[i].id;
                    delete switches[i].id;
                }
                switchModel = new SwitchModel(switches[i]);
                switchModels.push(switchModel)
            }

            switchCollectionModel = new Backbone.Collection(switchModels);
            modelConfig['switches'] = switchCollectionModel;
            if(modelConfig['top_of_rack'] != null) {
                delete modelConfig['top_of_rack']['switches'];
            }

            /*
             Populating DiskModel from network.interfaces
             */
            var disks = (contrail.checkIfExist(modelConfig.parameters.provision.contrail.storage.storage_osd_disks)) ? (modelConfig.parameters.provision.contrail.storage.storage_osd_disks) : [],
                diskModels = [], diskModel,
                diskCollectionModel;

            $.each(disks, function(diskKey, diskValue) {
                diskModel = new DiskModel({disk: diskValue});
                diskModels.push(diskModel)
            });

            diskCollectionModel = new Backbone.Collection(diskModels);
            modelConfig['disks'] = diskCollectionModel;
            if(contrail.checkIfExist(modelConfig.parameters.disks)) {
                delete modelConfig.parameters.provision.contrail.storage.storage_osd_disks;
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
        getSwitches: function (serverAttributes) {
            var switchCollection = serverAttributes.switches.toJSON(),
                switchArray = [], switchAttributes;

            for(var i = 0; i < switchCollection.length; i++) {
                switchAttributes = switchCollection[i].model().attributes;
                delete switchAttributes.errors;
                delete switchAttributes.locks;
                switchArray.push(switchCollection[i].model().attributes);
            }
            return switchArray;
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
            var validations = [
                { key: null, type: cowc.OBJECT_TYPE_MODEL, getValidation: smwc.KEY_CONFIGURE_VALIDATION },
                { key: 'interfaces', type: cowc.OBJECT_TYPE_COLLECTION, getValidation: function (interfaceModel) { return (interfaceModel.attributes.type() + 'Validation'); } },
                { key: 'switches', type: cowc.OBJECT_TYPE_COLLECTION, getValidation: 'topOfRackValidation' }
            ];

            if (this.isDeepValid(validations)) {
                var ajaxConfig = {};
                var putData = {}, serverAttrsEdited = [], serversEdited = [],
                    serverAttrs = this.model().attributes,
                    serverSchema = smwmc.getServerSchema(),
                    originalAttrs = this.model()._originalAttributes,
                    locks = this.model().attributes.locks.attributes,
                    interfaces, disks, switches;

                interfaces = this.getServerInterfaces(serverAttrs);
                disks = this.getServerStorageDisks(serverAttrs);
                switches = this.getSwitches(serverAttrs);

                /* Special handling to reaplace switch_id by id and add type as 'ovs' - START*/
                for (var i = 0; i < switches.length; i++) {
                    if (contrail.checkIfExist(switches[i].switch_id)) {
                        switches[i].id = switches[i].switch_id;
                        switches[i].type = smwc.TYPE_OVS;
                        delete switches[i].switch_id;
                    }
                }
                /* Special handling to reaplace switch_id by id and add type as 'ovs'- END*/

                serverAttrsEdited = cowu.getEditConfigObj(serverAttrs, locks, serverSchema, '');

                serverAttrsEdited['network']['interfaces'] = interfaces;
                delete serverAttrsEdited['interfaces'];

                serverAttrsEdited['top_of_rack'] = {switches : switches};
                delete serverAttrsEdited['switches'];

                serverAttrsEdited.parameters.provision.contrail.storage.storage_osd_disks = disks;
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
                serverSchema = smwmc.getServerSchema(),
                locks = this.model().attributes.locks.attributes,
                that = this;

            serverAttrsEdited = cowu.getEditConfigObj(serverAttrs, locks, serverSchema, '');
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
        createServer: function (callbackObj, ajaxMethod) {
            var validations = [
                { key: null, type: cowc.OBJECT_TYPE_MODEL, getValidation: smwc.KEY_CONFIGURE_VALIDATION },
                { key: 'interfaces', type: cowc.OBJECT_TYPE_COLLECTION, getValidation: function (interfaceModel) { return (interfaceModel.attributes.type() + 'Validation'); } },
                { key: 'switches', type: cowc.OBJECT_TYPE_COLLECTION, getValidation: 'topOfRackValidation'}
            ];

            if (this.isDeepValid(validations)) {
                var ajaxConfig = {};
                var putData = {}, serverAttrsEdited = [], serversCreated = [],
                    serverAttrs = this.model().attributes,
                    serverSchema = smwmc.getServerSchema(),
                    locks = this.model().attributes.locks.attributes,
                    interfaces, disks, switches;

                interfaces = this.getServerInterfaces(serverAttrs);
                switches = this.getSwitches(serverAttrs);
                disks = this.getServerStorageDisks(serverAttrs);

                /* Special handling to reaplace switch_id by id and add type as 'ovs' - START*/
                for (var i = 0; i < switches.length; i++) {
                    if (contrail.checkIfExist(switches[i].switch_id)) {
                        switches[i].id = switches[i].switch_id;
                        switches[i].type = smwc.TYPE_OVS;
                        delete switches[i].switch_id;
                    }
                }
                /* Special handling to reaplace switch_id by id and add type as 'ovs'- END*/

                serverAttrsEdited = cowu.getEditConfigObj(serverAttrs, locks,  serverSchema, '');

                serverAttrsEdited['network']['interfaces'] = interfaces;
                delete serverAttrsEdited['interfaces'];
                serverAttrsEdited.parameters.disks = disks;
                delete serverAttrsEdited['disks'];

                serverAttrsEdited['top_of_rack'] = {switches : switches};
                delete serverAttrsEdited['switches'];

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
                    serverSchema = smwmc.getServerSchema(),
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

                    serverAttrsEdited = cowu.getEditConfigObj(serverAttrs, locks, serverSchema, '');

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
            var ajaxConfig = {}, that = this;
            ajaxConfig.type = "DELETE";
            // check if server to be deleted has a id else delete using mac address
            if(contrail.checkIfExist(checkedRow) && contrail.checkIfExist(checkedRow['id'])) {
                ajaxConfig.url = smwc.URL_OBJ_SERVER_ID + checkedRow['id'];
            } else if (contrail.checkIfExist(checkedRow) && contrail.checkIfExist(checkedRow['mac_address'])){
                ajaxConfig.url = smwc.URL_OBJ_SERVER_MAC_ADDRESS + checkedRow['mac_address'];
            }
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
            var interfaces = this.model().attributes['interfaces'];
            // ip_address is passed as null to avoid SM backend error
            var newInterface = new InterfaceModel({name: "", type: type, "ip_address" : null, "mac_address" : "", "default_gateway" : "", "dhcp" : true, member_interfaces: [], "tor" : "", "tor_port" : ""});
            interfaces.add([newInterface]);
        },
        deleteInterface: function(data, kbInterface) {
            var interfaceCollection = data.model().collection,
                intf = kbInterface.model();

            interfaceCollection.remove(intf);
        },
        addSwitch: function() {
            var switches = this.model().get('switches'),
                newSwitch = new SwitchModel({
                "switch_id"       : "",
                "ip_address"      : "",
                "switch_name"     : "",
                "ovs_port"        : "",
                "ovs_protocol"    : "",
                "http_server_port": "",
                "vendor_name"     : "",
                "product_name"    : "",
                "keepalive_time"  : ""
            });
            switches.add(newSwitch);
        },
        deleteSwitch: function(data, kbSwitch) {
            var switchCollection = data.model().collection,
                swth = kbSwitch.model();

            switchCollection.remove(swth);
        },
        filterInterfaces: function(interfaceType) {
            return Knockout.computed(function () {
                var kbInterfaces = this.interfaces(),
                    interfaces = this.model().attributes.interfaces,
                    filteredInterfaces = [], model, type;

                for (var i = 0; i < interfaces.length; i++) {
                    model = interfaces.at(i);
                    type = contrail.checkIfExist(model.attributes.type()) ? model.attributes.type() : smwc.INTERFACE_TYPE_PHYSICAL;

                    if (type == interfaceType) {
                        filteredInterfaces.push(kbInterfaces[i]);
                    }
                }
                return filteredInterfaces;
            }, this);
        },
        getMemberInterfaces: function() {
            return Knockout.computed(function () {
                var kbInterfaces = this.interfaces(),
                    interfaces = this.model().attributes.interfaces,
                    memberInterfaces = [], model, dhcp, interfaceType = '';
                for (var i = 0; i < interfaces.length; i++) {
                    model = interfaces.at(i);
                    dhcp = model.attributes.dhcp();
                    interfaceType = model.attributes.type();
                    if (dhcp == false && model.attributes.name() != "" && (interfaceType !== 'bond')) {
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
                    if ((type == smwc.INTERFACE_TYPE_PHYSICAL || type == smwc.INTERFACE_TYPE_BOND) && model.attributes.name() !== "") {
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
                    type = contrail.checkIfExist(model.attributes.type()) ? model.attributes.type() : smwc.INTERFACE_TYPE_PHYSICAL;
                    dhcp = model.attributes.dhcp();

                    if (type == smwc.INTERFACE_TYPE_PHYSICAL && dhcp && model.attributes.name() !== "") {
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
                    type = contrail.checkIfExist(model.attributes.type()) ? model.attributes.type() : smwc.INTERFACE_TYPE_PHYSICAL;
                    dhcp = model.attributes.dhcp();
                    if(model.attributes.name() != "") {
                        controlDataInterfaces.push(model.attributes.name());
                    }
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
        runInventory: function (checkedRow, callbackObj) {
            var ajaxConfig = {}, that = this,
                serverId = checkedRow['id'];

            ajaxConfig.type = "POST";
            ajaxConfig.url = smwc.URL_RUN_INVENTORY + '?id=' +serverId;

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
                'ipmi_address': {
                    required: true,
                    pattern: cowc.PATTERN_IP_ADDRESS,
                    msg: smwm.getInvalidErrorMessage('ipmi_address')
                },
                'password': {
                    required: true,
                    msg: smwm.getInvalidErrorMessage('password')
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
