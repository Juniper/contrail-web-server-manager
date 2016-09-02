/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([], function () {
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
                    clusterId = serverMonitoringData.rawMonitoringData.cluster_id;

                if(contrail.checkIfExist(clusterId) && clusterId != "") {
                    if(!contrail.checkIfExist(clusterMonitoringMap[clusterId])) {
                        clusterMonitoringMap[clusterId] = {
                            servers: 0,
                            total_disk_rw_bytes: 0,
                            interface_rt_bytes: 0,
                            max_cpu_usage_percentage: 0,
                            max_mem_usage_percentage: 0
                        };
                    }
                    var cluster = clusterMonitoringMap[clusterId];
                    cluster.total_disk_rw_bytes += serverMonitoringData.total_disk_rw_bytes;
                    cluster.interface_rt_bytesers += serverMonitoringData.interface_rt_bytesers;
                    cluster.max_cpu_usage_percentage = (serverMonitoringData.cpu_usage_percentage > cluster.max_cpu_usage_percentage) ? serverMonitoringData.cpu_usage_percentage : cluster.max_cpu_usage_percentage;
                    cluster.max_mem_usage_percentage = (serverMonitoringData.mem_usage_percentage > cluster.max_mem_usage_percentage) ? serverMonitoringData.mem_usage_percentage : cluster.max_mem_usage_percentage;
                    cluster.servers += 1;
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
    };

    function updateServerListModels(serverModelList, serverMonitoringMap) {
        serverModelList[0].onAllRequestsComplete.subscribe(function() {
            var serverItems = serverModelList[0].getItems();
            $.each(serverItems, function (key, server) {
                var serverId = server.id,
                    serverMonitoringData = contrail.handleIfNull(serverMonitoringMap[serverId], { size: 0, x: 0, y: 0 });

                $.extend(true, server, {
                    ui_added_parameters: {
                        monitoring: serverMonitoringData
                    }
                });
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
    }

    function updateClusterListModels(clusterModelList, clusterMonitoringMap) {
        var clusterItems = clusterModelList[0].getItems();
        $.each(clusterItems, function (key, cluster) {
            var clusterId = cluster.id,
                aggServerMonitoringData = clusterMonitoringMap[clusterId],
                clusterMonitoringData = {
                    total_disk_rw_bytes: 0,
                    interface_rt_bytes: 0,
                    max_cpu_usage_percentage: 0,
                    max_mem_usage_percentage: 0
                };

            if (aggServerMonitoringData != null) {
                clusterMonitoringData.total_disk_rw_bytes = aggServerMonitoringData.total_disk_rw_bytes;
                clusterMonitoringData.interface_rt_bytesers = aggServerMonitoringData.interface_rt_bytesers;
                clusterMonitoringData.max_cpu_usage_percentage = aggServerMonitoringData.max_cpu_usage_percentage;
                clusterMonitoringData.max_mem_usage_percentage = aggServerMonitoringData.max_mem_usage_percentage;
            }

            $.extend(true, cluster, {ui_added_parameters: {
                monitoring: clusterMonitoringData
            }});
        });

        for (var i = 0; i < clusterModelList.length; i++) {
            if(i == 0) {
                clusterModelList[i].updateData(clusterItems);
            } else {
                clusterModelList[i].setData(clusterItems);
            }
        }
    }

    function getServerMonitoringMap(contrailListModel) {
        var serverMonitoringMap = {},
            serverMonitoringItems = contrailListModel.getItems();

        for (var i = 0; i < serverMonitoringItems.length; i++) {
            var serverMonitoring = serverMonitoringItems[i],
                serverMonitoringInfo = contrail.handleIfNull(serverMonitoring.ServerMonitoringInfo, {}),
                disksUsage = contrail.handleIfNull(serverMonitoringInfo.disk_usage_totals, []),
                interfacesStats = contrail.handleIfNull(serverMonitoringInfo.network_info_stats, []),
                resourceInfo = contrail.handleIfNull(serverMonitoringInfo.resource_info_stats, {}),
                diskReadBytes = 0, diskWriteBytes = 0,
                cpuUsage =  contrail.handleIfNull(resourceInfo.cpu_usage_percentage, 0),
                memUsageMB = resourceInfo.mem_usage_mb,
                memUsage = resourceInfo.mem_usage_percent,
                rxBytes = 0, rxPackets = 0, txBytes = 0, txPackets = 0;

            for (var j = 0; j < disksUsage.length; j++) {
                diskReadBytes += disksUsage[j].total_read_bytes;
                diskWriteBytes += disksUsage[j].total_write_bytes;
            }

            for (var k = 0; k < interfacesStats.length; k++) {
                rxBytes += interfacesStats[k].rx_bytes;
                rxPackets += interfacesStats[k].rx_packets;
                txBytes += interfacesStats[k].tx_bytes;
                txPackets += interfacesStats[k].tx_packets;
            }

            serverMonitoringMap[serverMonitoring.name] = {
                cpu_usage_percentage: cpuUsage,
                mem_usage_mb: memUsageMB,
                mem_usage_percentage: memUsage,
                total_disk_read_bytes: diskReadBytes,
                total_disk_write_bytes: diskWriteBytes,
                total_disk_rw_bytes: diskReadBytes + diskWriteBytes,
                interface_rx_bytes: rxBytes,
                interface_rx_packets: rxPackets,
                interface_tx_bytes: txBytes,
                interface_tx_packets: txPackets,
                interface_rt_bytes: rxBytes + txBytes,
                size: rxBytes + txBytes,
                x: cpuUsage,
                y: memUsage,
                rawMonitoringData: serverMonitoring
            };
        }

        return serverMonitoringMap;
    }

    return SMParsers;
});
