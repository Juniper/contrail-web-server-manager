/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'knockback',
    'knockout',
    'common/ui/js/models/ContrailModel'
], function (_, Knockback, Knockout, ContrailModel) {
    
    var BaremetalModel = ContrailModel.extend({
        
        defaultConfig: $.extend(smwmc.getServerModel(),
                {'baremetal_reimage':null}),
        
        //Creates the VMI
        createVMI: function (data, callbackObj) {
            var ajaxConfig = {};
            var details = data['moreDetails'];
//            if (this.model().isValid(true, 'configureBaremetalValidation')) {
               /* var postObj = {};
                postObj = {"vnUUID": data['vnUUID'], "fixedIPs":[details['ip_address']], "macAddress":data['macAddress']};
                ajaxConfig.type = "POST";
                ajaxConfig.data = JSON.stringify(postObj);
                ajaxConfig.url = smwc.URL_CREATE_PORT;
                */
            var vnData = JSON.parse(data['vnData']);
            var curDomain = getCookie('domain');
            var curProject = getCookie('project');
            
            var nwIpamRefs = vnData['network_ipam_refs'];
            var subnetUUID;
            for(var i = 0 ; i < nwIpamRefs.length; i++){
                if(isIPBoundToRange(nwIpamRefs[i]['subnet']['ipam_subnet'], details['ip_address'].trim())){
                    subnetUUID = nwIpamRefs[i]['subnet']['subnet_uuid'];
                    break;
                }
            }
            
            var postObj = {
                    "virtual-machine-interface": {
                        "parent_type": "project",
                        "fq_name": [
                            curDomain,
                            curProject
                        ],
                        "virtual_network_refs": [
                            {
                                "to": vnData['fq_name']
                            }
                        ],
                        "virtual_machine_interface_mac_addresses": {
                            "mac_address": [
                                data['macAddress']
                            ]
                        },
                        "instance_ip_back_refs": [
                            {
                                "instance_ip_address": [
                                    {
                                        "fixedIp": details['ip_address'],
                                        "domain": curDomain,
                                        "project": curProject
                                    }
                                ],
                                "subnet_uuid": subnetUUID
                            }
                        ]
                    }
                };
                ajaxConfig.type = "POST";
                ajaxConfig.data = JSON.stringify(postObj);
                ajaxConfig.url = smwc.URL_PORTS;
                
                console.log(ajaxConfig);
                contrail.ajaxHandler(ajaxConfig, function () {
                    if (contrail.checkIfFunction(callbackObj.init)) {
                        callbackObj.init();
                    }
                }, function (response) {
                    console.log(response);
                    if (contrail.checkIfFunction(callbackObj.success)) {
                        callbackObj.success(response);
                    }
                }, function (error) {
                    console.log(error);
                    if (contrail.checkIfFunction(callbackObj.error)) {
                        callbackObj.error(error);
                    }
                });
//            } else {
//                if (contrail.checkIfFunction(callbackObj.error)) {
//                    callbackObj.error(this.getFormErrorText(smwc.SERVER_PREFIX_ID));
//                }
//            }
        },
        
        //Creates the dummy VM object
        createVM: function (vmiId, serverId, callbackObj) {
            var ajaxConfig = {};
            ajaxConfig.type = "GET";
            ajaxConfig.url = smwc.URL_MAP_VIRTUAL_MACHINE_REFS + vmiId + '/' + serverId;
            console.log(ajaxConfig);
            contrail.ajaxHandler(ajaxConfig, function () {
                if (contrail.checkIfFunction(callbackObj.init)) {
                    callbackObj.init();
                }
            }, function (response) {
                console.log(response);
                if (contrail.checkIfFunction(callbackObj.success)) {
                    callbackObj.success(response);
                }
            }, function (error) {
                console.log(error);
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(error);
                }
            });
        },
        
        //Creates the logical interface
        createLogicalInterface: function (data, vmiDetails, callbackObj) {
            var ajaxConfig = {};
            var postObject = {}; 
            var moreDetails = data['moreDetails'];
            var pRouter = moreDetails['tor'];
            var physicalInterface = moreDetails['tor_port'];
            var name = physicalInterface + '.0';
            var pRouterUUID;//TODO
            
            var deferredObj = $.Deferred();
            var physicalIntfDeferredObj = $.Deferred();
            this.fetchPRouterUUIDFromName(pRouter,deferredObj);
            deferredObj.done( function(pRouterUUID){
                if(pRouterUUID != null){
                    //Now get the physical-interface details using the prouter uuid
                    ajaxConfig.type = "GET";
                    ajaxConfig.url = smwc.URL_PHYSICAL_INTERFACES + pRouterUUID;
                    contrail.ajaxHandler(ajaxConfig, function () {
                    }, function (response) {
                        //on success
                        console.log(response);
                        if(response == null) {
                            response = [];
                        }
                        var pinterfaces = jsonPath(response,"$..physical-interface");
                        var intfUUID;
                        if(pinterfaces) {
                            $.each(pinterfaces,function(i,pintf){
                                if(pintf['fq_name'][2] == physicalInterface){
                                    intfUUID = pintf['uuid'];
                                }
                            });
                        }
                        if(intfUUID == null){
                            //Physical interface not found so create it
                            postObject = {};
                            postObject["physical-interface"] = {};
                            postObject["physical-interface"]["fq_name"] = ["default-global-system-config", pRouter, physicalInterface];
                            postObject["physical-interface"]["parent_type"] = "physical-router";
                            postObject["physical-interface"]["name"] = physicalInterface;
                            ajaxConfig.type = "POST";
                            ajaxConfig.data = JSON.stringify(postObject);
                            ajaxConfig.url = smwc.URL_PHYSICAL_INTERFACES + pRouterUUID + '/Physical';
                            console.log(ajaxConfig);
                            contrail.ajaxHandler(ajaxConfig, function () {
                            }, function (response) {
                                var physicalInterfaces = jsonPath(response,"$..physical-interface");
                                var pintfUUID;
                                $.each(physicalInterfaces,function(i,pintf){
                                    if(pintf['fq_name'][2] == physicalInterface){
                                        pintfUUID = pintf['uuid'];
                                    }
                                });
                                physicalIntfDeferredObj.resolve(pintfUUID);
                            }, function (error) {
                                console.log(error);
                                if (contrail.checkIfFunction(callbackObj.error)) {
                                    callbackObj.error("Error Creating the Physical Interface");
                                }
                            });
                        } else {
                            physicalIntfDeferredObj.resolve(intfUUID);
                        }
                        physicalIntfDeferredObj.done(function (intfUUID){
                            postObject = {};
                            postObject["logical-interface"] = {};
                            postObject["logical-interface"]["fq_name"] = ["default-global-system-config", pRouter, physicalInterface , name];
                            postObject["logical-interface"]["parent_type"] = "physical-interface";
                            postObject["logical-interface"]["parent_uuid"] = intfUUID;
                            postObject["logical-interface"]["name"] = name;  
                            postObject["logical-interface"]["logical_interface_vlan_tag"] = '0';//vlan always zero
                            postObject["logical-interface"]['virtual_machine_interface_refs'] = [{"to" : [vmiDetails[0], vmiDetails[1], vmiDetails[2]]}];
                            postObject["logical-interface"]["logical_interface_type"] = 'l2';
                            ajaxConfig.type = "POST";
                            ajaxConfig.data = JSON.stringify(postObject);
                            ajaxConfig.url = smwc.URL_PHYSICAL_INTERFACES + pRouterUUID + '/Logical';
                            console.log(ajaxConfig);
                            contrail.ajaxHandler(ajaxConfig, function () {
                                if (contrail.checkIfFunction(callbackObj.init)) {
                                    callbackObj.init();
                                }
                            }, function (response) {
                                console.log(response);
                                if (contrail.checkIfFunction(callbackObj.success)) {
                                    callbackObj.success(response);
                                }
                            }, function (error) {
                                console.log(error);
                                if (contrail.checkIfFunction(callbackObj.error)) {
                                    callbackObj.error(error);
                                }
                            });
                        });

                    }, function (error) {
                        console.log(error);
                        if (contrail.checkIfFunction(callbackObj.error)) {
                            callbackObj.error(error);
                        }
                    });
                } else {
                    if (contrail.checkIfFunction(callbackObj.error)) {
                        callbackObj.error('Physical Router Not Found');
                    }
                } 
            });
        },
        //Gets the virtual networks
        getVN: function (callbackObj) {
            var ajaxConfig = {};
            ajaxConfig.type = "GET";
            ajaxConfig.url = smwc.URL_NETWORKS;
            console.log(ajaxConfig);
            contrail.ajaxHandler(ajaxConfig, function () {
                if (contrail.checkIfFunction(callbackObj.init)) {
                    callbackObj.init();
                }
            }, function (response) {
                console.log(response);
                if (contrail.checkIfFunction(callbackObj.success)) {
                    callbackObj.success(response);
                }
            }, function (error) {
                console.log(error);
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(error);
                }
            });
        },        
        /**
         * 1. Delete the VMI
         * 2. Create the new VMI with the new VN
         * 3. Create the VM associated to the VMI
         * 4. Get the current logical interface data
         * 5. Update the VMI ref to the logical interface
         */
       /* editBaremetal: function (data, callbackObj) {
            var ajaxConfig = {};
            data = data[0];//assuming only one edit is allowed
            var vmiUuid = data['vmiUuid'];
            var vnUuid = data['vnUuid'];
            var self = this;
            //First delete the VMI
            self.deleteVMI(data, {
                init: function () {
                    callbackObj.init();
                },
                success: function (response) {
                  //Second create the new VMI with the new VN
                    self.createVMI(data,{
                        init: function () {
                            
                        },
                        success: function (response) {
                            var vmiDetails = response['virtual-machine-interface']['fq_name'];
                            data['vmiUuid'] = vmiDetails[2];
                            data['vmiDetails'] = vmiDetails;
                            //Third create the VM associated to the VMI
                            self.createVM(vmiDetails[2],{
                                init: function(){
                                    
                                },
                                success: function (response){
                                    //Fourth Get the current logical interface data
//                                    ajaxConfig.type = "GET";
//                                    ajaxConfig.data = JSON.stringify(postObject);
//                                    ajaxConfig.url = smwc.URL_PHYSICAL_INTERFACES + pRouterUUID + '/Logical' + '/' + response.uuid;
//                                    contrail.ajaxHandler(ajaxConfig, function () {
//                                        //Init
//                                    }, function (response) {
                                        console.log(response);
                                        var ajaxConfig = response;
                                        var postObj = {};
                                        var vmiDetails = data['vmiDetails'];
                                        postObject["logical-interface"]['virtual_machine_interface_refs'] = [{"to" : [vmiDetails[0], vmiDetails[1], vmiDetails[2]]}];
                                        postObject['uuid'] = data['liUuid'];
                                        ajaxConfig.type = "PUT";
                                        ajaxConfig.data = JSON.stringify(postObject);
                                        ajaxConfig.url = smwc.URL_PHYSICAL_INTERFACES + pRouterUUID + '/Logical' + '/' + data['liUuid'];
                                        console.log(ajaxConfig);
                                        //Fifth Update the VMI ref to the logical interface
                                        contrail.ajaxHandler(ajaxConfig, function () {
                                            if (contrail.checkIfFunction(callbackObj.init)) {
                                                callbackObj.init();
                                            }
                                        }, function (response) {
                                            console.log(response);
                                            if (contrail.checkIfFunction(callbackObj.success)) {
                                                callbackObj.success(response);
                                            }
                                        }, function (error) {
                                            console.log(error);
                                            if (contrail.checkIfFunction(callbackObj.error)) {
                                                callbackObj.error(error);
                                            }
                                        });//createLogicalInterface
                                    
//                                    }, function (error) {
//                                        //error
//                                    });//getLogicalInterface
                                },
                                error: function(error){
                                    
                                }
                            });//createVM
                        },
                        error: function (error) {
                        }
                    
                    });//createVMI
                },
                error: function (error) {
                    callbackObj.error(error);
                }
            });//deleteVMI
        },*/
        
        editBaremetal: function (data, callbackObj) {
            var ajaxConfig = {};
            data = data[0];//assuming only one edit is allowed
            var vmiUuid = data['vmiUuid'];
            var vnUuid = data['vnUuid'];
            var pRouterUUID = data[''];
            var prouterDefObj = $.Deferred();
            var self = this;
            this.fetchPRouterUUIDFromName(data['physical_router'],prouterDefObj);
            prouterDefObj.done(function(pRouterUUID){
                var ajaxConfig = {};
                var postObject = {};
                
                postObject["logical-interface"] = {};
                postObject["logical-interface"]["fq_name"] = ["default-global-system-config", data['physical_router'], data['interface'].split('.')[0] , data['interface']];
                postObject["logical-interface"]["parent_type"] = "physical-interface";
                postObject["logical-interface"]["parent_uuid"] = data['piUuid'];
                postObject["logical-interface"]["name"] = data['interface'];  
                postObject["logical-interface"]["logical_interface_vlan_tag"] = 0;
                postObject["logical-interface"] ['virtual_machine_interface_refs'] = [];
                postObject["logical-interface"]["logical_interface_type"] = 'l2';
                postObject["logical-interface"]["uuid"] = data['liUuid'];
                
                
                ajaxConfig.type = "PUT";
                ajaxConfig.data = JSON.stringify(postObject);
                ajaxConfig.url = smwc.URL_PHYSICAL_INTERFACE + pRouterUUID + '/Logical' + '/' + data['liUuid'];
                console.log(ajaxConfig);
                // Update the VMI ref to the logical interface
                contrail.ajaxHandler(ajaxConfig, function () {
                    if (contrail.checkIfFunction(callbackObj.init)) {
                        callbackObj.init();
                    }
                }, function (response) {
                    self.deleteVMI(data, {
                        init: function () {
                            //callbackObj.init();
                        },
                        success: function (response) {
                            var postData = {};
//                          TODO use this with ip postObj = {"vnUUID": data['vnUUID'], "fixedIPs":[details['ip_address']], "macAddress":data['macAddress']};
                            postData = {"vnUUID": data['newVNUuid'], "macAddress":data['mac']};
                          // create the new VMI with the new VN
                            self.createVMI(postData,{
                                init: function () {
                                    
                                },
                                success: function (response) {
                                    var vmiDetails = response['virtual-machine-interface']['fq_name'];
                                    data['vmiUuid'] = vmiDetails[2];
                                    data['vmiDetails'] = vmiDetails;
                                    // create the VM associated to the VMI
                                    self.createVM(vmiDetails[2], data.serverId, {
                                        init: function(){
                                            
                                        },
                                        success: function (response){
                                            // Get the current logical interface data
//                                                                    ajaxConfig.type = "GET";
//                                                                    ajaxConfig.data = JSON.stringify(postObject);
//                                                                    ajaxConfig.url = smwc.URL_PHYSICAL_INTERFACES + pRouterUUID + '/Logical' + '/' + response.uuid;
//                                                                    contrail.ajaxHandler(ajaxConfig, function () {
//                                                                        //Init
//                                                                    }, function (response) {
                                                console.log(response);
                                                var ajaxConfig = response;
                                                var postObj = {};
                                                var vmiDetails = data['vmiDetails'];
                                                postObject["logical-interface"] = {};
                                                postObject["logical-interface"]["fq_name"] = ["default-global-system-config", data['physical_router'], data['interface'].split('.')[0] , data['interface']];
                                                postObject["logical-interface"]["parent_type"] = "physical-interface";
                                                postObject["logical-interface"]["parent_uuid"] = data['piUuid'];
                                                postObject["logical-interface"]["name"] = data['interface'];  
                                                postObject["logical-interface"]["logical_interface_vlan_tag"] = 0;
                                                postObject["logical-interface"]['virtual_machine_interface_refs'] = [{"to" : [vmiDetails[0], vmiDetails[1], vmiDetails[2]]}];
                                                postObject["logical-interface"]["logical_interface_type"] = 'l2';
                                                postObject["logical-interface"]["uuid"] = data['liUuid'];
                                                
                                                ajaxConfig.type = "PUT";
                                                ajaxConfig.data = JSON.stringify(postObject);
                                                ajaxConfig.url = smwc.URL_PHYSICAL_INTERFACE + pRouterUUID + '/Logical' + '/' + data['liUuid'];
                                                console.log(ajaxConfig);
                                                // Update the VMI ref to the logical interface
                                                contrail.ajaxHandler(ajaxConfig, function () {
                                                    if (contrail.checkIfFunction(callbackObj.init)) {
                                                        //callbackObj.init();
                                                    }
                                                }, function (response) {
                                                    console.log(response);
                                                    if (contrail.checkIfFunction(callbackObj.success)) {
                                                        callbackObj.success(response);
                                                    }
                                                }, function (error) {
                                                    console.log(error);
                                                    if (contrail.checkIfFunction(callbackObj.error)) {
                                                        callbackObj.error(error);
                                                    }
                                                });//createLogicalInterface
                                            
//                                                                    }, function (error) {
//                                                                        //error
//                                                                    });//getLogicalInterface
                                        },
                                        error: function(error){
                                            
                                        }
                                    });//createVM
                                },
                                error: function (error) {
                                }
                            
                            });//createVMI
                        },
                        error: function (error) {
                            callbackObj.error(error);
                        }
                    });//deleteVMI
                }, function (error) {
                    console.log(error);
                    if (contrail.checkIfFunction(callbackObj.error)) {
                        callbackObj.error(error);
                    }
                });//SetLogicalInterface VMI to null
            });
        },
        
        deleteBaremetal: function (selectedBaremetal, callbackObj) {
            var ajaxConfig = {};
            //Fetch the pRouter UUID through name
            var deferredObj = $.Deferred();
            var self = this;
            this.fetchPRouterUUIDFromName(selectedBaremetal['physical_router'],deferredObj);
            deferredObj.done(function(pRouterUUID){
                if(pRouterUUID != null){
                    //First delete the Logical Interface
                    ajaxConfig.type = "DELETE";
                    ajaxConfig.url = smwc.URL_PHYSICAL_INTERFACE + pRouterUUID + '/Logical/' + selectedBaremetal['liUuid'];
                    console.log(ajaxConfig);
                    contrail.ajaxHandler(ajaxConfig, function () {
                        if (contrail.checkIfFunction(callbackObj.init)) {
                            callbackObj.init();
                        }
                    }, function (response) {
                        self.deleteVMI(selectedBaremetal, callbackObj);
                    }, function (error) {
                        console.log(error);
                        if (contrail.checkIfFunction(callbackObj.error)) {
                            callbackObj.error(error);
                        }
                    });
                } else {
                    callbackObj.error({responseText : "No pRouter with the name found"});
                }
            });
        },
        
        deleteVMI : function (selectedBaremetal, callbackObj) {
            var ajaxConfig = {};
            var self = this;
            ajaxConfig.type = "DELETE";
            ajaxConfig.url = smwc.URL_PORTS + '/' + selectedBaremetal['vmiUuid'];
            console.log(ajaxConfig);
            contrail.ajaxHandler(ajaxConfig, function () {
                
            }, function (response) {
                //self.deleteVM(selectedBaremetal, callbackObj);
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
        
        deleteVM : function (selectedBaremetal, callbackObj) {
            var ajaxConfig = {};
            ajaxConfig.type = "DELETE";
            ajaxConfig.url = smwc.URL_VM + '/' + selectedBaremetal['vmUuid'];
            console.log(ajaxConfig);
            contrail.ajaxHandler(ajaxConfig, function () {
                
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
        
        fetchPRouterUUIDFromName: function (pRouter,deferredObj){
            var ajaxConfig = {};
          //Get the prouter details
            ajaxConfig.type = "GET";
            ajaxConfig.url = smwc.URL_PHYSICAL_ROUTERS_LIST;
            contrail.ajaxHandler(ajaxConfig, function () {
            }, function (response) {
                var pRouterUUID;
                if(response != null && response['physical-routers'] != null){
                    $.each(response['physical-routers'],function(i,pr){
                       if(pr['fq_name'][1] == pRouter){
                           pRouterUUID = pr['uuid'];
                       } 
                    });
                }
                deferredObj.resolve(pRouterUUID);
            }, function (error) {
                deferredObj.fail(error);
            }); 
        },
        
        validations: {
            reimageValidation: {
                'base_image_id': {
                    required: true,
                    msg: smwm.getRequiredMessage('base_image_id')
                }
                // 'network.management_interface': {
                    // required: true,
                    // msg: smwm.getRequiredMessage('management_interface')
                // }
            },
            configureBaremetalValidation: {
                'base_image_id': {
                    required: true,
                    msg: smwm.getRequiredMessage('base_image_id')
                },
                'baremetal_interface': {
                    required: true,
                    msg: smwm.getRequiredMessage('baremetal_interface')
                },
                'baremetal_network': {
                    required: true,
                    msg: smwm.getRequiredMessage('baremetal_network')
                },
            }
        },
        reimage: function (checkedRows, callbackObj) {
            var ajaxConfig = {};
            if (this.model().isValid(true, smwc.KEY_REIMAGE_VALIDATION)) {
                var serverAttrs = this.model().attributes,
                    putData = {}, servers = [],
                    that = this;

                for (var i = 0; i < checkedRows.length; i++) {
                    servers.push({'id': checkedRows[i]['serverId'], 'base_image_id': serverAttrs['base_image_id']});
                }
                putData = servers;
                ajaxConfig.type = "POST";
                ajaxConfig.data = JSON.stringify(putData);
                ajaxConfig.url = smwc.URL_SERVER_REIMAGE;   
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
            }  else {
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(this.getFormErrorText(smwc.SERVER_PREFIX_ID));
                }
            }
        }
    });
    return BaremetalModel;
});