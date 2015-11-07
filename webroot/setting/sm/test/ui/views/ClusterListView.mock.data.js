/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore'], function (_) {

    this.getSingleClusterDetailData = function () {
        return [
            {
                "parameters": {
                    "haproxy": "disable",
                    "domain": "englab.juniper.net",
                    "keystone_ip": "",
                    "kernel_upgrade": "yes",
                    "analytics_data_dir": "",
                    "keystone_region_name": "RegionOne",
                    "encapsulation_priority": "MPLSoUDP,MPLSoGRE,VXLAN",
                    "keystone_username": "admin",
                    "analytics_data_ttl": "48",
                    "subnet_mask": "255.255.255.0",
                    "nfs_glance_path": "",
                    "admin_key": "AQDIgtNTgPLWARAAK6gs/fj8m88LnY9DwxJdYA==",
                    "keystone_password": "contrail123",
                    "router_asn": "64512",
                    "database_dir": "/var/lib/cassandra",
                    "live_migration_storage_scope": "",
                    "analytics_syslog_port": "-1",
                    "keystone_tenant": "admin",
                    "gateway": null,
                    "database_token": "0",
                    "database_minimum_diskGB": "256",
                    "storage_virsh_uuid": "ee86e4e8-b725-4153-a441-21a40ce828be",
                    "password": "contrail123",
                    "uuid": "2dd91b70-63c8-43b3-a484-e9586beec9ca",
                    "service_token": "contrail123",
                    "external_bgp": "",
                    "kernel_version": "",
                    "storage_fsid": "d064a2c7-4fe3-4d47-ab6a-37f9ef6fb6cc",
                    "internal_vip": "",
                    "ssd_data_dir": "",
                    "hc_interval": "5",
                    "live_migration": "disable",
                    "storage_mon_secret": "AQBM78tTEMz+GhAA3WiOXQI7UVdIy0YFFuTGdw==",
                    "multi_tenancy": "True",
                    "osd_bootstrap_key": "AQCq7NFTeJUoBhAAlTVpxwWQJtBej/JDNhT6+Q==",
                    "openstack_mgmt_ip": null,
                    "use_certificates": "",
                    "nfs_server": "",
                    "live_migration_nfs_vm_host": "",
                    "keystone_service_tenant": "service",
                    "external_vip": ""
                },
                "provision_role_sequence": "{'completed': [('a7s12', 'haproxy', '2015_07_21__10_42_40'), ('a7s12', 'database', '2015_07_21__10_44_43'), ('a7s12', 'openstack', '2015_07_21__10_54_02'), ('a7s12', 'config', '2015_07_21__10_56_29'), ('a7s12', 'control', '2015_07_21__10_57_24'), ('a7s12', 'collector', '2015_07_21__10_58_18'), ('a7s12', 'webui', '2015_07_21__10_58_59'), ('a7s12', 'compute', '2015_07_21__11_16_36'), ('a7s12', 'post_provision', '2015_07_21__11_16_51')], 'steps': []}",
                "package_image_id": "main_2625",
                "email": "contrail@juniper.net",
                "provisioned_id": null,
                "base_image_id": "ubuntu_1404_1",
                "id": "mainline_cluster",
                "ui_added_parameters": {
                    "servers_status": {
                        "provision_completed": 1,
                        "server_added": 1,
                        "total_servers": 2,
                        "new_servers": 0,
                        "configured_servers": 1,
                        "provisioned_servers": 1,
                        "inreimage_servers": 0,
                        "reimaged_servers": 0,
                        "inprovision_servers": 0
                    }
                }
            }
        ]
    };

    this.getSingleClusterMonitoringData = function () {
        return [
            {
                "ServerMonitoringInfo": {
                    "resource_info_stats": {
                        "mem_usage_percent"   : 6.74,
                        "cpu_usage_percentage": 18.01,
                        "mem_usage_mb"        : 2168
                    },
                    "network_info_stats" : [
                        {
                            "tx_bytes"      : 0,
                            "rx_packets"    : 0,
                            "interface_name": "em1",
                            "tx_packets"    : 0,
                            "rx_bytes"      : 0
                        },
                        {
                            "tx_bytes"      : 117298,
                            "rx_packets"    : 24154,
                            "interface_name": "p4p1",
                            "tx_packets"    : 1389,
                            "rx_bytes"      : 36385493
                        }
                    ],
                    "name"               : "a7s12"
                },
                "cluster_id"          : "mainline_cluster",
                "name"                : "a7s12"
            },
            {
                "ServerMonitoringInfo": {
                    "resource_info_stats": {
                        "mem_usage_percent"   : 97.83,
                        "cpu_usage_percentage": 8.76,
                        "mem_usage_mb"        : 7785
                    },
                    "network_info_stats" : [
                        {
                            "tx_bytes"      : 0,
                            "rx_packets"    : 0,
                            "interface_name": "em1",
                            "tx_packets"    : 0,
                            "rx_bytes"      : 0
                        },
                        {
                            "tx_bytes"      : 220928,
                            "rx_packets"    : 655,
                            "interface_name": "p4p1",
                            "tx_packets"    : 621,
                            "rx_bytes"      : 232917
                        }
                    ],
                    "name"               : "a7s14"
                },
                "cluster_id"          : "r22_cluster",
                "name"                : "a7s14"
            },
            {
                "ServerMonitoringInfo": {
                    "resource_info_stats": {
                        "mem_usage_percent"   : 3.76,
                        "cpu_usage_percentage": 4.52,
                        "mem_usage_mb"        : 1205
                    },
                    "network_info_stats" : [
                        {
                            "tx_bytes"      : 0,
                            "rx_packets"    : 0,
                            "interface_name": "em1",
                            "tx_packets"    : 0,
                            "rx_bytes"      : 0
                        },
                        {
                            "tx_bytes"      : 261594,
                            "rx_packets"    : 599,
                            "interface_name": "p4p1",
                            "tx_packets"    : 684,
                            "rx_bytes"      : 195592
                        }
                    ],
                    "name"               : "a7s13"
                },
                "cluster_id"          : "r22_cluster",
                "name"                : "a7s13"
            }
        ]
    };

    this.getSingleClusterMonitoringConfigData = function () {
        return [
            {
                "config": {
                    "monitoring_frequency": 60,
                    "http_introspect_port": "8107",
                    "analytics_node_ips"  : [
                        "[",
                        "'",
                        "1",
                        "2",
                        "7",
                        ".",
                        "0",
                        ".",
                        "0",
                        ".",
                        "1",
                        ":",
                        "8",
                        "0",
                        "8",
                        "6",
                        "'",
                        "]"
                    ]
                }
            }
        ]
    };

    this.getTagNamesData = function () {
        return ["datacenter", "floor", "hall", "rack", "user_tag"];
    };

    this.formatMockData = function (rawMockData) {
        return {
            'data': {
                'value': rawMockData
            }
        }
    };
    return {
        getSingleClusterDetailData: getSingleClusterDetailData,
        getSingleClusterMonitoringData: getSingleClusterMonitoringData,
        getSingleClusterMonitoringConfigData: getSingleClusterMonitoringConfigData,
        getTagNamesData: getTagNamesData,
        formatMockData: formatMockData
    };
});
