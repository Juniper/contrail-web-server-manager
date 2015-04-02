/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function (_) {
    var SMParsers = function () {
        this.serverMonitoringDataParser = function(response) {
            var serverMonitoringList = [];

            for (var i = 0; i < response.length; i++) {
                var server = response[i],
                    disksUsage = contrail.handleIfNull(server['ServerMonitoringInfo']['disk_usage_state'], []),
                    interfacesState = contrail.handleIfNull(server['ServerMonitoringInfo']['interface_info_state'], []),
                    diskReadBytes = 0, diskWriteBytes = 0,
                    cpuUsage = server['ServerMonitoringInfo']['cpu_usage_percentage'],
                    memUsage = server['ServerMonitoringInfo']['mem_usage_mb'],
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

                serverMonitoringList.push({
                    name: server['name'],
                    cpu_usage_percentage: cpuUsage,
                    mem_usage_mb: memUsage,
                    total_disk_read_MB: diskReadBytes,
                    total_disk_write_MB: diskWriteBytes,
                    total_disk_rw_MB: diskReadBytes + diskWriteBytes,
                    total_interface_rx_bytes: rxBytes,
                    total_interface_rx_packets: rxPackets,
                    total_interface_tx_bytes: txBytes,
                    total_interface_tx_packets: txPackets,
                    total_interface_rt_bytes: rxBytes + txBytes,
                    size: rxBytes + txBytes,
                    y: cpuUsage,
                    x: memUsage,
                    rawData: server});
            }

            return serverMonitoringList;
        };
    };

    return SMParsers;
});