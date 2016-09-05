/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([], function () {

    var getSingleServerDetailData = function () {
        return [
            {
                "domain"          : "contrail.juniper.net",
                "ipmi_type"       : "",
                "ipmi_username"   : "ADMIN",
                "discovered"      : "false",
                "tag"             : {
                    "datacenter": "contrail-lab",
                    "user_tag"  : "Row-14",
                    "rack"      : "A7",
                    "floor"     : "6"
                },
                "cluster_id"      : "mainline_cluster",
                "id"              : "a7s12",
                "gateway"         : "10.84.30.254",
                "network"         : {
                    "management_interface": "eth1",
                    "interfaces"          : [
                        {
                            "members"        : [],
                            "tor_port"       : "",
                            "name"           : "eth1",
                            "parent"         : "",
                            "default_gateway": "10.84.30.254",
                            "tor"            : "",
                            "dhcp"           : true,
                            "mac_address"    : "00:25:90:7e:0f:14",
                            "type"           : "physical",
                            "ip_address"     : "10.84.30.249/29"
                        }
                    ]
                },
                "parameters"      : {
                    "interface_name"          : "eth1",
                    "partition"               : "",
                    "kernel_upgrade"          : "yes",
                    "storage_repo_id"         : "",
                    "kernel_version"          : "3.13.0-40",
                    "storage_chassis_id"      : "",
                    "disks"                   : [],
                    "storage_chassis_id_input": ""
                },
                "last_update"     : "2015-07-21 17:24:12",
                "ssh_public_key"  : "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQChWezwe1OO7sdRkDHcRvHgm6n/V3Dcm0bLNa7a5yLMV28Zv9M5RhJIKjwLjRx4WorBni+pYQtSZlwqMdeFv5hQ50rrY6Wq3IRe1rX+rJxdFjkIaBBgzXcfJaoGkv4NI0TfwnkpRNdocJ1mhLGkM4+RIZnnJBneONkyml/ybL2IliIeAPqlwhgil2r212g8kNNupJ+nO0I5UCFQONLXUPusJFj5e3SFgZvsAEvfGQOT8is7Ngesr7G5MXvFB2WMd+MDar9SPM8YSzgV/1TbyOP8l4gzE+OU8l1z4pOP6/J4V01MzT7x3MmvEogcgOtgB8P+IeWX0QhsYh3u9CBFuVhf",
                "mac_address"     : "00:25:90:7E:0F:14",
                "provisioned_id"  : "main_2625",
                "email"           : null,
                "status"          : "provision_completed",
                "reimaged_id"     : "ubuntu_1404_1",
                "top_of_rack"     : null,
                "package_image_id": "",
                "static_ip"       : "N",
                "intf_bond"       : null,
                "subnet_mask"     : "255.255.255.248",
                "base_image_id"   : "",
                "ipmi_password"   : "ADMIN",
                "intf_control"    : null,
                "password"        : "c0ntrail123",
                "ip_address"      : "10.84.30.249",
                "intf_data"       : null,
                "roles"           : [
                    "config",
                    "openstack",
                    "control",
                    "compute",
                    "collector",
                    "webui",
                    "database"
                ],
                "contrail"        : {
                    "control_data_interface": "eth1"
                },
                "ipmi_address"    : "10.84.61.12",
                "host_name"       : "a7s12"
            }
        ];
    };

    var getSingleServerMonitoringData = function () {
        return [
            {
                "ServerMonitoringInfo": {
                    "resource_info_stats": {
                        "mem_usage_percent": 6.74,
                        "cpu_usage_percentage": 18.01,
                        "mem_usage_mb": 2168
                    },
                    "network_info_stats": [
                        {
                            "tx_bytes": 0,
                            "rx_packets": 0,
                            "interface_name": "em1",
                            "tx_packets": 0,
                            "rx_bytes": 0
                        },
                        {
                            "tx_bytes": 117298,
                            "rx_packets": 24154,
                            "interface_name": "p4p1",
                            "tx_packets": 1389,
                            "rx_bytes": 36385493
                        }
                    ],
                    "name": "a7s12"
                },
                "cluster_id": "mainline_cluster",
                "name": "a7s12"
            },
            {
                "ServerMonitoringInfo": {
                    "resource_info_stats": {
                        "mem_usage_percent": 97.83,
                        "cpu_usage_percentage": 8.76,
                        "mem_usage_mb": 7785
                    },
                    "network_info_stats": [
                        {
                            "tx_bytes": 0,
                            "rx_packets": 0,
                            "interface_name": "em1",
                            "tx_packets": 0,
                            "rx_bytes": 0
                        },
                        {
                            "tx_bytes": 220928,
                            "rx_packets": 655,
                            "interface_name": "p4p1",
                            "tx_packets": 621,
                            "rx_bytes": 232917
                        }
                    ],
                    "name": "a7s14"
                },
                "cluster_id": "r22_cluster",
                "name": "a7s14"
            },
            {
                "ServerMonitoringInfo": {
                    "resource_info_stats": {
                        "mem_usage_percent": 3.76,
                        "cpu_usage_percentage": 4.52,
                        "mem_usage_mb": 1205
                    },
                    "network_info_stats": [
                        {
                            "tx_bytes": 0,
                            "rx_packets": 0,
                            "interface_name": "em1",
                            "tx_packets": 0,
                            "rx_bytes": 0
                        },
                        {
                            "tx_bytes": 261594,
                            "rx_packets": 599,
                            "interface_name": "p4p1",
                            "tx_packets": 684,
                            "rx_bytes": 195592
                        }
                    ],
                    "name": "a7s13"
                },
                "cluster_id": "r22_cluster",
                "name": "a7s13"
            }
        ];
    };

    var getSingleServerMonitoringConfigData = function () {
        return [
            {
                "config": {
                    "monitoring_frequency": 60,
                    "http_introspect_port": "8107",
                    "analytics_node_ips": [
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
        ];
    };

    var getTagNamesData = function () {
        return ["datacenter", "floor", "hall", "rack", "user_tag"];
    };

    var getTagValuesData = function () {
        return {
            "datacenter": [
                "contrail-lab"
            ],
            "floor": [
                "6"
            ],
            "hall": [],
            "rack": [
                "A7"
            ],
            "user_tag": [
                "Row-14"
            ]
        };
    };

    var formatMockData = function (rawMockData) {
        return {
            "data": {
                "value": rawMockData
            }
        };
    };
    return {
        getSingleServerDetailData: getSingleServerDetailData,
        getSingleServerMonitoringData: getSingleServerMonitoringData,
        getSingleServerMonitoringConfigData: getSingleServerMonitoringConfigData,
        getTagNamesData: getTagNamesData,
        getTagValuesData: getTagValuesData,
        formatMockData: formatMockData
    };
});
