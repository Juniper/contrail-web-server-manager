/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

/**
 * @baremetal.api.js
 *     - Handlers for baremetal Configuration
 *     - Interfaces with config api server
 */

var rest        = require(process.mainModule.exports["corePath"] +
                          '/src/serverroot/common/rest.api');
var async       = require('async');
var logutils    = require(process.mainModule.exports["corePath"] +
                          '/src/serverroot/utils/log.utils');
var commonUtils = require(process.mainModule.exports["corePath"] +
                          '/src/serverroot/utils/common.utils');
var config      = process.mainModule.exports["config"];
var messages    = require(process.mainModule.exports["corePath"] +
                          '/src/serverroot/common/messages');
var global      = require(process.mainModule.exports["corePath"] +
                          '/src/serverroot/common/global');
var appErrors   = require(process.mainModule.exports["corePath"] +
                          '/src/serverroot/errors/app.errors');
var util        = require('util');
var url         = require('url');
var jsonPath    = require('JSONPath').eval;
var configApiServer = require(process.mainModule.exports["corePath"] +
                              '/src/serverroot/common/configServer.api');

/**
 * @getBaremetalDetails
 * public function
 * 1. URL /api/tenants/config/baremetal-details
 * 2. Gets list of baremetals from config api server
 * 3. Needs tenant id
 * 4. Calls getBaremetalDetailsCb that process data from config
 *    api server and sends back the http response.
 */
 
function getBaremetalDetails(request, response, appData)
{
    //get physical routers
    configApiServer.apiGet('/physical-routers', appData, function(error, pRouters){
        if(error || pRouters == null || pRouters.length == 0) {
            commonUtils.handleJSONResponse(error, response, []);
            return;
        }
        var liUUIDArry = [];
        var pRoutersObjArry = [];
        pRouters = pRouters['physical-routers'];
        var pRoutersLen = pRouters.length;
        for(var i = 0; i < pRoutersLen; i++) {
            var pRouterReqUrl = '/physical-router/' + pRouters[i].uuid;
            commonUtils.createReqObj(pRoutersObjArry, pRouterReqUrl, global.HTTP_REQUEST_GET,
                 null, null, null, appData);
        }
        async.map(pRoutersObjArry,
            commonUtils.getAPIServerResponse(configApiServer.apiGet, true),
                function(error, pRouterDetails) {
                    //console.log("ERROR:", JSON.stringify(pRouterDetails));
                    if(error || pRouterDetails == null || pRouterDetails.length == 0) {
                        commonUtils.handleJSONResponse(error, response, []);
                        return;
                    }
                    var pInfObjArry = [];
                    var pRouterDetailLen = pRouterDetails.length;
                    for(var i = 0; i < pRouterDetailLen; i++) {
                        var pRouterDetail = pRouterDetails[i]['physical-router'];
                        //get logical interfaces uuid under physical routers
                        if(pRouterDetail.logical_interfaces != null) {
                            var liProuterDet = pRouterDetail.logical_interfaces;
                            var liProuterDetLen =  liProuterDet.length;
                            for(var j = 0; j < liProuterDetLen; j++) {
                                liUUIDArry.push(liProuterDet[j].uuid);    
                            }
                        }
                        //prepare physcial interface's obj array to get details
                        if(pRouterDetail.physical_interfaces != null) {
                            var piProuterDet = pRouterDetail.physical_interfaces;
                            var piProuterDetLen = piProuterDet.length;
                            for(var j = 0; j < piProuterDetLen; j++) {
                                var piReqUrl = '/physical-interface/' + piProuterDet[j].uuid;
                                commonUtils.createReqObj(pInfObjArry, piReqUrl, global.HTTP_REQUEST_GET,
                                    null, null, null, appData);
                            }
                        }
                    }
                    async.map(pInfObjArry,
                        commonUtils.getAPIServerResponse(configApiServer.apiGet, true),
                            function(error, pInfDetails) {
                                if(error || pInfDetails == null || pInfDetails.length == 0){
                                    commonUtils.handleJSONResponse(error, response, []);
                                    return;
                                }
                                var pInfDetailsLen =  pInfDetails.length;
                                for(var i = 0; i < pInfDetailsLen; i++) {
                                    var pInf = pInfDetails[i]['physical-interface'];
                                    if(pInf.logical_interfaces != null && pInf.logical_interfaces.length > 0) {
                                        var lInfs = pInf.logical_interfaces;
                                        var lInfsLen = lInfs.length;
                                        for(var j = 0; j < lInfsLen; j++) {
                                            liUUIDArry.push(lInfs[j].uuid);
                                        }
                                    }
                                }
                                //get all logical interface details
                                var lInfObjArry = [];
                                var liUUIDArryLen = liUUIDArry.length;
                                for(var i = 0; i < liUUIDArryLen; i++) {
                                    var lInfReqUrl = '/logical-interface/' + liUUIDArry[i];
                                    commonUtils.createReqObj(lInfObjArry, lInfReqUrl, global.HTTP_REQUEST_GET,
                                        null, null, null, appData);
                                }
                                getVirtualMachineInterfaceDetails(request, response, appData, lInfObjArry);
                            }
                    );
                }
        );
    });    
}

function getVirtualMachineInterfaceDetails(request, response, appData, lInfObjArry) 
{
    async.map(lInfObjArry,
        commonUtils.getAPIServerResponse(configApiServer.apiGet, true),
            function(error, lInfDetails) {
                if(error || lInfDetails == null || lInfDetails.length == 0) {
                    commonUtils.handleJSONResponse(error, response, []);
                    return;
                }
                var result = [];
                var vmiList = [];
                var lInfDetailsLen = lInfDetails.length;
                for(var j = 0; j < lInfDetailsLen; j++) {
                    var lInterface = lInfDetails[j]['logical-interface'];
                    if('virtual_machine_interface_refs' in lInterface) {
                        vmiList.push({li_uuid : lInterface.uuid, uuid : lInterface['virtual_machine_interface_refs'][0].uuid});
                    }
                }
                if(vmiList.length > 0) {
                    processVirtualMachineInterfaceDetails(response, appData, vmiList, function(vmiData) {
                        if(vmiData != null && vmiData.length > 0) {
                            var vmiListLen = vmiList.length;
                            for(var i = 0; i < vmiListLen; i++) {
                                vmiList[i]['vmi_details'] = vmiData[i];
                            }
                            for(var j = 0; j < lInfDetails.length; j++) {
                                var lInterface = lInfDetails[j]['logical-interface'];
                                for(var k = 0; k < vmiList.length; k++) {
                                    if(vmiList[k].li_uuid === lInterface.uuid) {
                                        lInterface['vmi_details'] = vmiList[k]['vmi_details'];
                                        var mac = lInterface['vmi_details'].mac[0];
                                        var ip = lInterface['vmi_details'].ip[0];
                                        var pRouter = lInterface.fq_name[1];
                                        var inf = lInterface.name;
                                        var vn = lInterface['vmi_details'].vn_refs[0].to[2];
                                        var vLan = lInterface.logical_interface_vlan_tag;
                                        var liUuid = lInterface['uuid'];
                                        var piUuid = lInterface['parent_uuid'];
                                        var vnUuid = lInterface['vmi_details'].vn_refs[0]['uuid'];
                                        var vmiUuid = lInterface['vmi_details'].vmi_fq_name[2];
                                        var serverId = '';
                                        var vmRef = lInterface['vmi_details'].vm_refs[0];
                                        var vmUUID = vmRef['uuid'];
                                        if(vmRef != null && vmRef.to[0] === vmRef.uuid) {
                                            serverId = vmRef.uuid;
                                        } else if(vmRef != null && vmRef.to[0] !== vmRef.uuid) {
                                            serverId = vmRef.to[0];
                                        }
                                        result.push({'mac' : mac, 'ip' : ip, 'physical_router' : pRouter, 'interface' : inf,
                                            'vn' : vn, 'vlan' : vLan, 'liUuid' : liUuid, 'piUuid': piUuid, 'vnUuid': vnUuid, 'vmiUuid' : vmiUuid,
                                            'vmUuid' : vmUUID, 'serverId' : serverId});
                                    } 
                                }    
                            }
                            commonUtils.handleJSONResponse(error, response, result);
                        } else {
                            commonUtils.handleJSONResponse(error, response, []);
                        }
                    });
                   
                } else {
                    commonUtils.handleJSONResponse(error, response, []);
                }
            }
    );
}
 
function processVirtualMachineInterfaceDetails(response, appData, result, callback)
{
    var dataObjArr = [];
    var resultJSON = [];
    var tempVMIResourceObj = [];
    var vmiBackRefs = result;
    var vmiCnt = vmiBackRefs.length;
    for(var i = 0; i < vmiCnt; i++) {
        var vmiUrl = '/virtual-machine-interface/' + vmiBackRefs[i].uuid;
        commonUtils.createReqObj(dataObjArr, vmiUrl, global.HTTP_REQUEST_GET,
                                    null, null, null, appData); 
    }
    async.map(dataObjArr,
        commonUtils.getAPIServerResponse(configApiServer.apiGet, true),
            function(error, data) {
                if ((null != error) || (null == data) || (!data.length)) {
                    commonUtils.handleJSONResponse(error, response, []);
                    return;
                }
                dataObjArr = [];
                vmiCnt = data.length;
                for(var j = 0; j < vmiCnt; j++) {
                    if ((null == data[j]) || (null == data[j]['virtual-machine-interface'])) {
                        continue;
                    }
                    var vmi =  data[j]['virtual-machine-interface'];
                    if(vmi['virtual_machine_interface_device_owner'] == null || vmi['virtual_machine_interface_device_owner'] == "") {
                        tempVMIResourceObj.push({"mac": vmi
                            ['virtual_machine_interface_mac_addresses']['mac_address'],
                            "instance-ip": vmi['instance_ip_back_refs'], "fq_name": vmi['fq_name'], "vn_refs" : vmi['virtual_network_refs'],
                            "vm_refs" : vmi['virtual_machine_refs'] != null ? vmi['virtual_machine_refs'] : [],
                            "subnet" : vmi['subnet_back_refs'] != null ? vmi['subnet_back_refs'][0].to[0] : ''});
                    }
                     var instIPBackRefs = vmi['instance_ip_back_refs'];
                     //var instIPBackRefsCnt = instIPBackRefsCntinstIPBackRefs.length;
                     if(instIPBackRefs != null && instIPBackRefs.length > 0) {
                         for (var k = 0; k < instIPBackRefs.length ; k++) {
                            var instIPUrl = '/instance-ip/' + instIPBackRefs[k]['uuid'];
                            commonUtils.createReqObj(dataObjArr, instIPUrl, global.HTTP_REQUEST_GET,
                                                     null, null, null, appData);
                         }
                     }
                 }
                 if(dataObjArr.length > 0) {
                     async.map(dataObjArr,
                         commonUtils.getAPIServerResponse(configApiServer.apiGet, true),
                         function(error, data) {
                         if ((null != error) || (null == data) || (!data.length)) {
                             commonUtils.handleJSONResponse(error, response, []);
                             return;
                         }
                         var tempVMIResourceObjCnt = tempVMIResourceObj.length;
                         var total = 0;
                         for (var i = 0; i < tempVMIResourceObjCnt; i++) {
                             if(tempVMIResourceObj[i]['instance-ip'] != null && tempVMIResourceObj[i]['instance-ip'].length > 0) {
                                 var instIpCnt =  tempVMIResourceObj[i]['instance-ip'].length;
                                 var tempInstIPData = data.slice(total, total + instIpCnt);
                                 total += instIpCnt;
                                 var ipAddrs = jsonPath(tempInstIPData, "$..instance_ip_address");
                                 resultJSON.push({"mac": tempVMIResourceObj[i]['mac'], "ip": ipAddrs,
                                                 "vmi_fq_name": tempVMIResourceObj[i]['fq_name'], "vn_refs" : tempVMIResourceObj[i]["vn_refs"],
                                                 "vm_refs" : tempVMIResourceObj[i]["vm_refs"], "subnet" : tempVMIResourceObj[i]['subnet']});
                             } else {
                                 resultJSON.push({"mac": tempVMIResourceObj[i]['mac'], "ip": [],
                                                 "vmi_fq_name": tempVMIResourceObj[i]['fq_name'], "vn_refs" : tempVMIResourceObj[i]["vn_refs"],
                                                 "vm_refs" : tempVMIResourceObj[i]["vm_refs"], "subnet" : tempVMIResourceObj[i]['subnet']});
                             }
                         }
                         if(callback != null) {
                             callback(resultJSON);
                         } else {
                             commonUtils.handleJSONResponse(null, response, resultJSON);
                         }    
                     });
                 } else {
                     var tempVMIResourceObjCnt = tempVMIResourceObj.length;
                     for(var i = 0; i < tempVMIResourceObjCnt; i++) {
                         resultJSON.push({"mac": tempVMIResourceObj[i]['mac'], "ip": [],
                                         "vmi_fq_name": tempVMIResourceObj[i]['fq_name'], "vn_refs" : tempVMIResourceObj[i]["vn_refs"],
                                         "vm_refs" : tempVMIResourceObj[i]["vm_refs"], "subnet" : tempVMIResourceObj[i]['subnet']});                         
                     }
                     if(callback != null) {
                         callback(resultJSON);
                     } else {
                         commonUtils.handleJSONResponse(null, response, resultJSON);
                     }
                 }
            }
    );       
}

exports.getBaremetalDetails = getBaremetalDetails;                            

