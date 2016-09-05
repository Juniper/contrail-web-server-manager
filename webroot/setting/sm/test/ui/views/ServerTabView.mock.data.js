/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([], function () {

    var getServerDetailsData = function () {
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

    var getServerMonitoringInfoData = function () {
        return [
            {
                "ServerMonitoringInfo": {
                    "disk_usage_totals": [
                        {
                            "total_read_bytes": 87,
                            "disk_name": "sda",
                            "total_write_bytes": 1451
                        },
                        {
                            "total_read_bytes": 83,
                            "disk_name": "dm-0",
                            "total_write_bytes": 1451
                        },
                        {
                            "total_read_bytes": 0,
                            "disk_name": "dm-1",
                            "total_write_bytes": 0
                        }
                    ],
                    "resource_info_stats": {
                        "mem_usage_percent": 6.74,
                        "cpu_usage_percentage": 18.01,
                        "mem_usage_mb": 2168
                    },
                    "chassis_state": {
                        "power_restore_policy": "always-off",
                        "system_power": "on",
                        "cooling_fan_fault": false,
                        "front_panel_lockout": "inactive",
                        "drive_fault": false,
                        "chassis_intrusion": "inactive",
                        "main_power_fault": false,
                        "power_control_fault": false,
                        "power_overload": false,
                        "power_interlock": "inactive"
                    },
                    "disk_usage_stats": [
                        {
                            "read_bytes": 6,
                            "write_bytes": 376,
                            "disk_name": "sda"
                        },
                        {
                            "read_bytes": 6,
                            "write_bytes": 338,
                            "disk_name": "dm-0"
                        },
                        {
                            "read_bytes": 0,
                            "write_bytes": 0,
                            "disk_name": "dm-1"
                        }
                    ],
                    "name": "a7s12",
                    "sensor_stats": [
                        {
                            "status": "ok",
                            "sensor_type": "temperature",
                            "reading": 29,
                            "sensor": "System Temp",
                            "unit": "C"
                        },
                        {
                            "status": "ok",
                            "sensor_type": "temperature",
                            "reading": 38,
                            "sensor": "Peripheral Temp",
                            "unit": "C"
                        },
                        {
                            "status": "ok",
                            "sensor_type": "temperature",
                            "reading": 0,
                            "sensor": "CPU Temp",
                            "unit": "unspecified"
                        },
                        {
                            "status": "ok",
                            "sensor_type": "fan",
                            "reading": 3225,
                            "sensor": "FAN 1",
                            "unit": "RPM"
                        },
                        {
                            "status": "ok",
                            "sensor_type": "fan",
                            "reading": 2925,
                            "sensor": "FAN 3",
                            "unit": "RPM"
                        },
                        {
                            "status": "ok",
                            "sensor_type": "fan",
                            "reading": 3075,
                            "sensor": "FAN A",
                            "unit": "RPM"
                        }
                    ],
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
                    "file_system_view_stats": [
                        {
                            "fs_name": "/dev/mapper/a7s12--vg-root",
                            "physical_disks": [
                                {
                                    "disk_used_percentage": 1,
                                    "disk_used_kb": 2047788,
                                    "disk_available_kb": 422502272,
                                    "disk_name": "sda",
                                    "disk_size_kb": 488386584
                                }
                            ],
                            "size_kb": 447294328,
                            "used_percentage": 1,
                            "mountpoint": "/",
                            "used_kb": 2047788,
                            "available_kb": 422502272,
                            "type": "lvm"
                        },
                        {
                            "fs_name": "/dev/sda1",
                            "physical_disks": [
                                {
                                    "disk_used_percentage": 1,
                                    "disk_used_kb": 36525,
                                    "disk_available_kb": 192006,
                                    "disk_name": "sda",
                                    "disk_size_kb": 488386584
                                }
                            ],
                            "size_kb": 240972,
                            "used_percentage": 16,
                            "mountpoint": "/boot",
                            "used_kb": 36525,
                            "available_kb": 192006,
                            "type": "partition"
                        }
                    ],
                    "network_info_totals": [
                        {
                            "total_rx_bytes": 0,
                            "total_tx_bytes": 0,
                            "interface_name": "em1",
                            "total_rx_packets": 0,
                            "total_tx_packets": 0
                        },
                        {
                            "total_rx_bytes": 582427438,
                            "total_tx_bytes": 1486936,
                            "interface_name": "p4p1",
                            "total_rx_packets": 384770,
                            "total_tx_packets": 18478
                        }
                    ]
                },
                "cluster_id": "mainline_cluster",
                "name": "a7s12"
            }
        ];
    };

    var getServerMonitoringConfigData = function () {
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
        ];
    };

    var getServerInventoryInfoData = function () {
        return [
            {
                "ServerInventoryInfo": {
                    "physical_processor_count": 1,
                    "virtual_machine": "physical",
                    "eth_controller_state": {
                        "num_of_ports": 2
                    },
                    "cpu_cores_count": 4,
                    "os_family": "Debian",
                    "fru_infos": [
                        {
                            "fru_description": "Builtin FRU Device (ID 0)",
                            "chassis_type": "N/A",
                            "product_manfacturer": "N/A",
                            "board_manufacturer": "Supermicro",
                            "board_part_number": "N/A",
                            "board_serial_number": "N/A",
                            "board_mfg_date": "Sun Dec 31 15",
                            "chassis_serial_number": "N/A",
                            "product_part_number": "N/A",
                            "board_product_name": "N/A",
                            "product_name": "N/A"
                        }
                    ],
                    "name": "a7s12",
                    "mem_state": {
                        "dimm_size_mb": 8192,
                        "mem_speed_MHz": 1333,
                        "swap_size_mb": 32740,
                        "total_mem_mb": 32022,
                        "mem_type": "DDR3",
                        "num_of_dimms": 4
                    },
                    "kernel_version": "3.13.0",
                    "uptime_seconds": 3647787,
                    "hardware_model": "x86_64",
                    "os_version": "14.04",
                    "cpu_info_state": {
                        "model": "Intel(R) Core(TM) i3-2100 CPU @ 3.10GHz",
                        "clock_speed_MHz": 1600,
                        "num_of_threads": 2,
                        "core_count": 2
                    },
                    "interface_infos": [
                        {
                            "macaddress": "00:25:90:7e:0f:15",
                            "ip_addr": "N/A",
                            "speed_Mb_per_sec": 0,
                            "netmask": "N/A",
                            "model": "e1000e",
                            "interface_name": "em1"
                        },
                        {
                            "macaddress": "00:25:90:7e:0f:14",
                            "ip_addr": "N/A",
                            "speed_Mb_per_sec": 1000,
                            "netmask": "N/A",
                            "model": "e1000e",
                            "interface_name": "p4p1"
                        },
                        {
                            "macaddress": "12:aa:3f:ef:2d:27",
                            "ip_addr": "N/A",
                            "speed_Mb_per_sec": 10,
                            "netmask": "N/A",
                            "model": "tun",
                            "interface_name": "pkt0"
                        },
                        {
                            "speed_Mb_per_sec": 0,
                            "macaddress": "N/A",
                            "netmask": "N/A",
                            "interface_name": "pkt1",
                            "ip_addr": "N/A"
                        },
                        {
                            "speed_Mb_per_sec": 0,
                            "macaddress": "N/A",
                            "netmask": "N/A",
                            "interface_name": "pkt2",
                            "ip_addr": "N/A"
                        },
                        {
                            "speed_Mb_per_sec": 0,
                            "macaddress": "N/A",
                            "netmask": "N/A",
                            "interface_name": "pkt3",
                            "ip_addr": "N/A"
                        },
                        {
                            "macaddress": "00:25:90:7e:0f:14",
                            "ip_addr": "10.84.30.249",
                            "speed_Mb_per_sec": 0,
                            "netmask": "255.255.255.248",
                            "model": "vrouter",
                            "interface_name": "vhost0"
                        },
                        {
                            "macaddress": "6e:7b:4d:0c:a4:b3",
                            "ip_addr": "192.168.122.1",
                            "speed_Mb_per_sec": 0,
                            "netmask": "255.255.255.0",
                            "model": "bridge",
                            "interface_name": "virbr0"
                        }
                    ],
                    "os": "Ubuntu",
                    "total_numof_disks": 1
                },
                "cluster_id": "mainline_cluster",
                "name": "a7s12"
            }
        ];
    };

    var getTagNamesData = function () {
        return ["datacenter", "floor", "hall", "rack", "user_tag"];
    };

    var formatMockData = function (rawMockData) {
        return {
            "data": {
                "value": rawMockData
            }
        };
    };

    return {
        getServerDetailsData: getServerDetailsData,
        getServerMonitoringConfigData: getServerMonitoringConfigData,
        getServerMonitoringInfoData: getServerMonitoringInfoData,
        getServerInventoryInfoData: getServerInventoryInfoData,
        getTagNamesData: getTagNamesData,
        formatMockData: formatMockData
    };
});
