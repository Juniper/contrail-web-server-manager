/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function (_) {
    var SMParsers = function () {
        this.serverMonitoringDataParser = function (contrailListModel, serverModelList) {
            var serverMonitoringMap = getServerMonitoringMap(contrailListModel);

            //TODO: isRequestInProgress should be available
            if(!contrail.checkIfFunction(serverModelList[0].isRequestInProgress) || serverModelList[0].isRequestInProgress()) {
                serverModelList[0].onAllRequestsComplete.subscribe(function() {
                    // TODO: Will we have multiple updates subscribed on refresh?
                    updateServerListModels(serverModelList, serverMonitoringMap);
                });
            } else {
                updateServerListModels(serverModelList, serverMonitoringMap);
            }
        };

        this.clusterMonitoringDataParser = function (contrailListModel, clusterModelList) {
            var serverMonitoringMap = getServerMonitoringMap(contrailListModel),
                clusterMonitoringMap = {};

            for (var key in serverMonitoringMap) {
                var serverMonitoringData = serverMonitoringMap[key],
                    clusterId = serverMonitoringData['rawMonitoringData']['cluster_id'];

                if(contrail.checkIfExist(clusterId) && clusterId != '') {
                    if(!contrail.checkIfExist(clusterMonitoringMap[clusterId])) {
                        clusterMonitoringMap[clusterId] = {
                            servers: 0,
                            total_disk_rw_bytes: 0,
                            total_interface_rt_bytes: 0
                        };
                    }
                    var cluster = clusterMonitoringMap[clusterId];
                    cluster['total_disk_rw_bytes'] += serverMonitoringData['total_disk_rw_bytes'];
                    cluster['total_interface_rt_bytes'] += serverMonitoringData['total_interface_rt_bytes'];
                    cluster['servers'] += 1;
                }
            }

            //TODO: isRequestInProgress should be available
            if(!contrail.checkIfFunction(clusterModelList[0].isRequestInProgress) || clusterModelList[0].isRequestInProgress()) {
                clusterModelList[0].onAllRequestsComplete.subscribe(function() {
                    // TODO: Will we have multiple updates subscribed on refresh?
                    updateClusterListModels(clusterModelList, clusterMonitoringMap);
                });
            } else {
                updateClusterListModels(clusterModelList, clusterMonitoringMap);
            }
        };

        this.serverDataParser = function (servers) {
            if(servers != null) {
                for (var i = 0; i < servers.length; i++) {
                    servers[i]['roleCount'] = servers[i]['roles'].length;
                    servers[i]['name'] = contrail.handleIfNull(servers[i]['id'], servers[i]['mac_address']) ;
                }
            }
            return servers;
        };
    };

    function updateServerListModels(serverModelList, serverMonitoringMap) {
        serverModelList[0].onAllRequestsComplete.subscribe(function() {
            var serverItems = serverModelList[0].getItems();
            $.each(serverItems, function (key, server) {
                var serverId = server['id'],
                    serverMonitoringData = serverMonitoringMap[serverId];
                if (serverMonitoringData != null) {
                    $.extend(true, server, serverMonitoringData);
                } else {
                    $.extend(true, server, { size: 0, x: 0, y: 0 });
                }
            });

            for (var i = 0; i < serverModelList.length; i++) {
                if(i == 0) {
                    serverModelList[i].updateData(serverItems);
                    try {
                        serverModelList[i].performDefaultSort();
                    } catch (error) {
                        console.log(error.stack);
                    }
                } else {
                    serverModelList[i].setData(serverItems);
                }
            }
        });
    };

    function updateClusterListModels(clusterModelList, clusterMonitoringMap) {
        var clusterItems = clusterModelList[0].getItems();
        $.each(clusterItems, function (key, cluster) {
            var clusterId = cluster['id'],
                aggServerMonitoringData = clusterMonitoringMap[clusterId],
                clusterMonitoringData = {
                    total_disk_rw_bytes: 0,
                    total_interface_rt_bytes: 0,
                    avg_disk_rw_bytes: 0,
                    avg_interface_rt_bytes: 0
                };

            if (aggServerMonitoringData != null) {
                clusterMonitoringData['total_disk_rw_bytes'] = aggServerMonitoringData['total_disk_rw_bytes'];
                clusterMonitoringData['total_interface_rt_bytes'] = aggServerMonitoringData['total_interface_rt_bytes'];
                if(aggServerMonitoringData['servers'] != 0) {
                    clusterMonitoringData['avg_disk_rw_bytes'] = (aggServerMonitoringData['total_disk_rw_bytes']) / (aggServerMonitoringData['servers']);
                    clusterMonitoringData['avg_interface_rt_bytes'] = aggServerMonitoringData['total_interface_rt_bytes'] / (aggServerMonitoringData['servers']);
                }
            }

            $.extend(true, cluster, clusterMonitoringData);
        });

        for (var i = 0; i < clusterModelList.length; i++) {
            if(i == 0) {
                clusterModelList[i].updateData(clusterItems);
            } else {
                clusterModelList[i].setData(clusterItems);
            }
        }
    };

    function getServerMonitoringMap(contrailListModel) {
        var serverMonitoringMap = {},
            serverMonitoringItems = contrailListModel.getItems();

        for (var i = 0; i < serverMonitoringItems.length; i++) {
            var serverMonitoring = serverMonitoringItems[i],
                serverMonitoringInfo = contrail.handleIfNull(serverMonitoring['ServerMonitoringInfo'], {}),
                disksUsage = contrail.handleIfNull(serverMonitoringInfo['disk_usage_totals'], []),
                interfacesState = contrail.handleIfNull(serverMonitoringInfo['network_info_totals'], []),
                resourceInfo = contrail.handleIfNull(serverMonitoringInfo['resource_info_stats'], [{}]),
                diskReadBytes = 0, diskWriteBytes = 0,
                cpuUsage = resourceInfo.length > 0 ? resourceInfo[0]['cpu_usage_percentage'] : 0,
                memUsageMB = resourceInfo.length > 0 ? resourceInfo[0]['mem_usage_mb'] : 0,
                memUsage = resourceInfo.length > 0 ? resourceInfo[0]['mem_usage_percent'] : 0,
                rxBytes = 0, rxPackets = 0, txBytes = 0, txPackets = 0;

            for (var j = 0; j < disksUsage.length; j++) {
                diskReadBytes += disksUsage[j]['total_read_bytes'];
                diskWriteBytes += disksUsage[j]['total_write_bytes'];
            }

            for (var k = 0; k < interfacesState.length; k++) {
                rxBytes += interfacesState[k]['total_rx_bytes'];
                rxPackets += interfacesState[k]['total_rx_packets'];
                txBytes += interfacesState[k]['total_tx_bytes'];
                txPackets += interfacesState[k]['total_rx_packets'];
            }

            serverMonitoringMap[serverMonitoring['name']] = {
                name: serverMonitoring['name'],
                cpu_usage_percentage: cpuUsage,
                mem_usage_mb: memUsageMB,
                mem_usage_percentage: memUsage,
                total_disk_read_bytes: diskReadBytes,
                total_disk_write_bytes: diskWriteBytes,
                total_disk_rw_bytes: diskReadBytes + diskWriteBytes,
                total_interface_rx_bytes: rxBytes,
                total_interface_rx_packets: rxPackets,
                total_interface_tx_bytes: txBytes,
                total_interface_tx_packets: txPackets,
                total_interface_rt_bytes: rxBytes + txBytes,
                size: rxBytes + txBytes,
                x: cpuUsage,
                y: memUsage,
                rawMonitoringData: serverMonitoring
            };
        }

        return serverMonitoringMap;
    };

    return SMParsers;
});