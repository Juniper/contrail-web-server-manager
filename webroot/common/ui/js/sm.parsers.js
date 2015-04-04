/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function (_) {
    var SMParsers = function () {
        this.serverMonitoringDataParser = function (contrailListModel, serverModelList) {
            var serverMonitoringMap = getServerMonitoringMap(contrailListModel);

            if(serverModelList[0].isRequestInProgress()) {
                serverModelList[0].onAllRequestsComplete.subscribe(function() {
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
                            total_disk_rw_MB: 0,
                            total_interface_rt_bytes: 0
                        };
                    }
                    var cluster = clusterMonitoringMap[clusterId];
                    cluster['total_disk_rw_MB'] += serverMonitoringData['total_disk_rw_MB'];
                    cluster['total_interface_rt_bytes'] += serverMonitoringData['total_interface_rt_bytes'];
                    cluster['servers'] += 1;
                }
            }

            if(clusterModelList[0].isRequestInProgress()) {
                clusterModelList[0].onAllRequestsComplete.subscribe(function() {
                    updateClusterListModels(clusterModelList, clusterMonitoringMap);
                });
            } else {
                updateClusterListModels(clusterModelList, clusterMonitoringMap);
            }
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
                serverModelList[i].setItems(serverItems);
            }
        });
    };

    function updateClusterListModels(clusterModelList, clusterMonitoringMap) {
        var clusterItems = clusterModelList[0].getItems();
        $.each(clusterItems, function (key, cluster) {
            var clusterId = cluster['id'],
                aggServerMonitoringData = clusterMonitoringMap[clusterId],
                clusterMonitoringData = {
                    total_disk_rw_MB: 0,
                    total_interface_rt_bytes: 0,
                    avg_disk_rw_MB: 0,
                    avg_interface_rt_bytes: 0
                };

            if (aggServerMonitoringData != null) {
                clusterMonitoringData['total_disk_rw_MB'] = aggServerMonitoringData['total_disk_rw_MB'];
                clusterMonitoringData['total_interface_rt_bytes'] = aggServerMonitoringData['total_interface_rt_bytes'];
                if(aggServerMonitoringData['servers'] != 0) {
                    clusterMonitoringData['avg_disk_rw_MB'] = (aggServerMonitoringData['total_disk_rw_MB']) / (aggServerMonitoringData['servers']);
                    clusterMonitoringData['avg_interface_rt_bytes'] = aggServerMonitoringData['total_interface_rt_bytes'] / (aggServerMonitoringData['servers']);
                }
            }

            $.extend(true, cluster, clusterMonitoringData);
        });

        for (var i = 0; i < clusterModelList.length; i++) {
            clusterModelList[i].setItems(clusterItems);
        }
    };

    function getServerMonitoringMap(contrailListModel) {
        var serverMonitoringMap = {},
            serverMonitoringItems = contrailListModel.getItems();

        for (var i = 0; i < serverMonitoringItems.length; i++) {
            var serverMonitoring = serverMonitoringItems[i],
                disksUsage = contrail.handleIfNull(serverMonitoring['ServerMonitoringInfo']['disk_usage_state'], []),
                interfacesState = contrail.handleIfNull(serverMonitoring['ServerMonitoringInfo']['network_info_state'], []),
                diskReadBytes = 0, diskWriteBytes = 0,
                resourceInfo = contrail.handleIfNull(serverMonitoring['ServerMonitoringInfo']['resource_info_state'], {}),
                cpuUsage = resourceInfo['cpu_usage_percentage'],
                memUsageMB = resourceInfo['mem_usage_mb'],
                memUsage = resourceInfo['mem_usage_percent'],
                rxBytes = 0, rxPackets = 0, txBytes = 0, txPackets = 0;

            for (var j = 0; j < disksUsage.length; j++) {
                diskReadBytes += disksUsage[j]['read_MB'];
                diskWriteBytes += disksUsage[j]['write_MB'];
            }

            for (var k = 0; k < interfacesState.length; k++) {
                rxBytes += interfacesState[k]['rx_bytes'];
                rxPackets += interfacesState[k]['rx_packets'];
                txBytes += interfacesState[k]['tx_bytes'];
                txPackets += interfacesState[k]['tx_packets'];
            }

            serverMonitoringMap[serverMonitoring['name']] = {
                name: serverMonitoring['name'],
                cpu_usage_percentage: cpuUsage,
                mem_usage_mb: memUsageMB,
                mem_usage_percentage: memUsage,
                total_disk_read_MB: diskReadBytes,
                total_disk_write_MB: diskWriteBytes,
                total_disk_rw_MB: diskReadBytes + diskWriteBytes,
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