/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([], function () {
    var DefaultConfig  = {

        getClusterModel : function () {
            return {
                "id": null,
                "email": null,
                "base_image_id": null,
                "package_image_id": null,
                "parameters" : {
                    "domain": null,
                    "subnet_mask": null,
                    "gateway": null,
                    "password": null,
                    "provision": {
                        "contrail": {
                            "xmpp_auth_enable": false,
                            "xmpp_dns_auth_enable": false,
                            "kernel_upgrade": true,
                            "kernel_version": "",
                            "enable_lbass": false,
                            "amqp_ssl": false,
                            "ha": {
                                "haproxy_enable": false,
                                "contrail_internal_vip": "",
                                "contrail_external_vip": "",
                                "contrail_internal_virtual_router_id": 103,
                                "contrail_external_virtual_router_id": 104
                            },
                            "database": {
                                "ip_port": 9160,
                                "directory": "/var/lib/cassandra",
                                "minimum_diskGB": 32
                            },
                            "analytics": {
                                "data_ttl": 48,
                                "config_audit_ttl": 2160,
                                "statistics_ttl": 168,
                                "flow_ttl": 2,
                                "snmp_scan_frequency": 600,
                                "snmp_fast_scan_frequency": 60,
                                "topology_scan_frequency": 60,
                                "syslog_port": -1,
                                "data_directory": "",
                                "ssd_data_directory": "",
                                "redis_password": null
                            },
                            "control": {
                                "encapsulation_priority": "VXLAN,MPLSoUDP,MPLSoGRE",
                                "router_asn": 64512,
                                "external_bgp": ""
                            },
                            "config": {
                                "manage_neutron": false,
                                "zookeeper_ip_port": 2181,
                                "healthcheck_interval": 5,
                                "amqp_use_ssl": false
                            },
                            "webui": {
                            },
                            "compute": {
                                "huge_pages": "",
                                "core_mask": "",
                                "sriov": {
                                    "enable": false
                                }
                            },
                            "vmware": {
                                "ip": "",
                                "username": "",
                                "password": "",
                                "vswitch": ""
                            },
                            "vgw": {
                                "public_subnet": "",
                                "public_vn_name": "",
                                "interface": "",
                                "gateway_routes": ""
                            },
                            "storage": {
                                "storage_monitor_secret": "",
                                "osd_bootstrap_key": "",
                                "storage_chassis_config": [],
                                "live_migration_host": "",
                                "storage_admin_key": ""
                            },
                            "toragent": {
                            },
                            "tsn": {
                            }
                        },
                        "openstack":{
                            "keystone": {
                                "admin_password": "contrail123",
                                "ip": "",
                                "admin_user": "admin",
                                "admin_tenant": "admin",
                                "service_tenant": "services",
                                "auth_port": 35357,
                                "auth_protocol": "http",
                                "version": "v2.0"
                            },
                            "neutron": {
                                "service_protocol": "http",
                                "port": 9697
                            },
                            "amqp": {
                                "server_ip": "",
                                "use_ssl": false
                            },
                            "region": "RegionOne",
                            "multi_tenancy": true,
                            "openstack_manage_amqp": false,
                            "enable_ceilometer": false,
                            "ha": {
                                "internal_vip": "",
                                "external_vip": "",
                                "internal_virtual_router_id": 102,
                                "external_virtual_router_id": 101,
                                "nfs_server": "",
                                "nfs_glance_path": ""
                            },
                            "mysql": {
                                "root_password": "c0ntrail123"
                            }
                        }
                    }
                }
            };
        },

        getDockerClusterModel : function () {
            return {
                "id": null,
                "parameters": {
                    "domain": null,
                    "subnet_mask": null,
                    "gateway": null,
                    "password": null,
                    "provision": {
                        "contrail_4": {
                            "docker_registry": "",
                            "docker_registry_insecure": true,
                            "controller_image": "",
                            "analytics_image": "",
                            "lb_image": "",
                            "analyticsdb_image": "",
                            "agent_image": "",
                            "ssl_certs_src_dir": "/etc/contrail_smgr/puppet/ssl",
                            "global_config": {
                                "log_level": "SYS_INFO",
                                "cloud_orchestrator": "openstack",
                                "external_lb": false,
                                "external_rabbitmq_servers": "",
                                "external_zookeeper_servers": "",
                                "external_cassandra_servers": "",
                                "external_configdb_servers": "",
                                "xmpp_auth_enable": false,
                                "xmpp_dns_auth_enable": false,
                                "sandesh_ssl_enable": false,
                                "introspect_ssl_enable": false
                            },
                            "controller_config": {
                                "encap_priority": "MPLSoUDP,MPLSoGRE,VXLAN",
                                "external_routers_list": {},
                                "bgp_asn": "64512"
                            },
                            "control_config": {
                                "log": "/var/log/contrail/contrail-control.log",
                                "log_level": "SYS_NOTICE"
                            },
                            "dns_config": {
                                "log_level": "SYS_NOTICE"
                            },
                            "cassandra_config": {
                                "commitlog_dir": "/var/lib/cassandra/commitlog",
                                "saved_caches_dir": "/var/lib/cassandra/saved_caches",
                                "data_dirs": ["/var/lib/cassandra/data"],
                                "java_max_heap_size": "512M",
                                "java_max_heap_newsize": "100M"
                            },
                            "api_config": {
                                "log_level": "SYS_NOTICE"
                            },
                            "schema_config": {
                                "log": "/var/log/contrail/contrail-schema.log",
                                "log_level": "SYS_NOTICE"
                            },
                            "device_manager_config": {
                                "log": "/var/log/contrail/contrail-device-manager.log",
                                "log_level": "SYS_NOTICE"
                            },
                            "svc_monitor_config": {
                                "log": "/var/log/contrail/contrail-svc-monitor.log",
                                "log_level": "SYS_NOTICE"
                            },
                            "alarm_gen_config": {
                                "log": "/var/log/contrail/contrail-alarm-gen.log",
                                "log_level": "SYS_NOTICE"
                            },
                            "analytics_api_config": {
                                "log_level": "SYS_NOTICE",
                                "log": "/var/log/contrail/contrail-analytics-api.log",
                                "aaa_mode": "cloud-admin"
                            },
                            "analytics_collector_config": {
                                "log_level": "SYS_CONFIG",
                                "log": "/var/log/contrail/contrail-collector.log",
                            },
                            "query_engine_config": {
                                "log": "/var/log/contrail/contrail-query-engine.log",
                                "log_level": "SYS_NOTICE",
                            },
                            "snmp_collector_config": {
                                "log": "/var/log/contrail/contrail-snmp-collector.log",
                                "log_level": "SYS_NOTICE",
                                "introspect_port": "5920",
                                "scan_frequencey": "600",
                                "fast_scan_frequency": "60"
                            },
                            "topology_config": {
                                "log": "/var/log/contrail/contrail-topology.log",
                                "log_level": "SYS_NOTICE"
                            },
                            "storage_ceph_config": {
                                "replica_size": 2,
                                "ceph_object_storage": true,
                                "object_store_pool": "volumes"
                            }
                        }
                    }
                }
            };
        },
        getClusterSchema : function () {
            return {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "type": "object",
                "properties": {
                    "id": {
                        "type": "null",
                        "default": null
                    },
                    "email": {
                        "type": "null",
                        "default": null
                    },
                    "base_image_id": {
                        "type": "null",
                        "default": null
                    },
                    "package_image_id": {
                        "type": "null",
                        "default": null
                    },
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "domain": {
                                "type": "null",
                                "default": null
                            },
                            "subnet_mask": {
                                "type": "null",
                                "default": null
                            },
                            "gateway": {
                                "type": "null",
                                "default": null
                            },
                            "password": {
                                "type": "null",
                                "default": null
                            },
                            "provision": {
                                "type": "object",
                                "properties": {
                                    "contrail": {
                                        "type": "object",
                                        "properties": {
                                            "xmpp_auth_enable": {
                                                "type": "boolean",
                                                "default": false
                                            },
                                            "xmpp_dns_auth_enable": {
                                                "type": "boolean",
                                                "default": false
                                            },
                                            "kernel_upgrade": {
                                                "type": "boolean",
                                                "default": true
                                            },
                                            "kernel_version": {
                                                "type": "string",
                                                "default": ""
                                            },
                                            "enable_lbass": {
                                                "type": "boolean",
                                                "default": false
                                            },
                                            "amqp_ssl": {
                                                "type": "boolean",
                                                "default": false
                                            },
                                            "ha": {
                                                "type": "object",
                                                "properties": {
                                                    "haproxy_enable": {
                                                        "type": "boolean",
                                                        "default": false
                                                    },
                                                    "contrail_internal_vip": {
                                                        "type": "string",
                                                        "default": ""
                                                    },
                                                    "contrail_external_vip": {
                                                        "type": "string",
                                                        "default": ""
                                                    },
                                                    "contrail_internal_virtual_router_id": {
                                                        "type": "integer",
                                                        "default": 103
                                                    },
                                                    "qqcontrail_internal_virtual_router_id": {
                                                        "type": "integer",
                                                        "default": 1034
                                                    }
                                                },
                                                "required": ["haproxy_enable", "contrail_internal_vip", "contrail_external_vip", "contrail_internal_virtual_router_id", "qqcontrail_internal_virtual_router_id"]
                                            },
                                            "database": {
                                                "type": "object",
                                                "properties": {
                                                    "ip_port": {
                                                        "type": "integer",
                                                        "default": 9160
                                                    },
                                                    "directory": {
                                                        "type": "string",
                                                        "default": "/var/lib/cassandra"
                                                    },
                                                    "minimum_diskGB": {
                                                        "type": "integer",
                                                        "default": 32
                                                    }
                                                },
                                                "required": ["ip_port", "directory", "minimum_diskGB"]
                                            },
                                            "analytics": {
                                                "type": "object",
                                                "properties": {
                                                    "data_ttl": {
                                                        "type": "integer",
                                                        "default": 48
                                                    },
                                                    "config_audit_ttl": {
                                                        "type": "integer",
                                                        "default": 2160
                                                    },
                                                    "statistics_ttl": {
                                                        "type": "integer",
                                                        "default": 168
                                                    },
                                                    "flow_ttl": {
                                                        "type": "integer",
                                                        "default": 2
                                                    },
                                                    "snmp_scan_frequency": {
                                                        "type": "integer",
                                                        "default": 600
                                                    },
                                                    "snmp_fast_scan_frequency": {
                                                        "type": "integer",
                                                        "default": 60
                                                    },
                                                    "topology_scan_frequency": {
                                                        "type": "integer",
                                                        "default": 60
                                                    },
                                                    "syslog_port": {
                                                        "type": "integer",
                                                        "default": -1
                                                    },
                                                    "data_directory": {
                                                        "type": "string",
                                                        "default": ""
                                                    },
                                                    "ssd_data_directory": {
                                                        "type": "string",
                                                        "default": ""
                                                    },
                                                    "redis_password": {
                                                        "type": "null",
                                                        "default": null
                                                    }
                                                },
                                                "required": ["data_ttl", "config_audit_ttl", "statistics_ttl", "flow_ttl", "snmp_scan_frequency", "snmp_fast_scan_frequency", "topology_scan_frequency", "syslog_port", "data_directory", "ssd_data_directory", "redis_password"]
                                            },
                                            "control": {
                                                "type": "object",
                                                "properties": {
                                                    "encapsulation_priority": {
                                                        "type": "string",
                                                        "default": "VXLAN,MPLSoUDP,MPLSoGRE"
                                                    },
                                                    "router_asn": {
                                                        "type": "integer",
                                                        "default": 64512
                                                    },
                                                    "external_bgp": {
                                                        "type": "string",
                                                        "default": ""
                                                    }
                                                },
                                                "required": ["encapsulation_priority", "router_asn", "external_bgp"]
                                            },
                                            "config": {
                                                "type": "object",
                                                "properties": {
                                                    "manage_neutron": {
                                                        "type": "boolean",
                                                        "default": false
                                                    },
                                                    "zookeeper_ip_port": {
                                                        "type": "integer",
                                                        "default": 2181
                                                    },
                                                    "healthcheck_interval": {
                                                        "type": "integer",
                                                        "default": 5
                                                    },
                                                    "amqp_use_ssl": {
                                                        "type": "boolean",
                                                        "default": false
                                                    }
                                                },
                                                "required": ["manage_neutron", "zookeeper_ip_port", "healthcheck_interval"]
                                            },
                                            "webui": {
                                                "type": "object",
                                                "properties": {}
                                            },
                                            "compute": {
                                                "type": "object",
                                                "properties": {
                                                    "huge_pages": {
                                                        "type": "string",
                                                        "default": ""
                                                    },
                                                    "core_mask": {
                                                        "type": "string",
                                                        "default": ""
                                                    },
                                                    "sriov": {
                                                        "type": "object",
                                                        "properties": {
                                                            "enable": {
                                                                "type": "boolean",
                                                                "default": false
                                                            }
                                                        },
                                                        "required": ["enable"]
                                                    }
                                                },
                                                "required": ["huge_pages", "core_mask", "sriov"]
                                            },
                                            "vmware": {
                                                "type": "object",
                                                "properties": {
                                                    "ip": {
                                                        "type": "string",
                                                        "default": ""
                                                    },
                                                    "username": {
                                                        "type": "string",
                                                        "default": ""
                                                    },
                                                    "password": {
                                                        "type": "string",
                                                        "default": ""
                                                    },
                                                    "vswitch": {
                                                        "type": "string",
                                                        "default": ""
                                                    }
                                                },
                                                "required": ["ip", "username", "password", "vswitch"]
                                            },
                                            "vgw": {
                                                "type": "object",
                                                "properties": {
                                                    "public_subnet": {
                                                        "type": "string",
                                                        "default": ""
                                                    },
                                                    "public_vn_name": {
                                                        "type": "string",
                                                        "default": ""
                                                    },
                                                    "interface": {
                                                        "type": "string",
                                                        "default": ""
                                                    },
                                                    "gateway_routes": {
                                                        "type": "string",
                                                        "default": ""
                                                    }
                                                },
                                                "required": ["public_subnet", "public_vn_name", "interface", "gateway_routes"]
                                            },
                                            "storage": {
                                                "type": "object",
                                                "properties": {
                                                    "storage_monitor_secret": {
                                                        "type": "string",
                                                        "default": ""
                                                    },
                                                    "osd_bootstrap_key": {
                                                        "type": "string",
                                                        "default": ""
                                                    },
                                                    "storage_chassis_config": {
                                                        "type": "array",
                                                        "items": {}
                                                    },
                                                    "live_migration_host": {
                                                        "type": "string",
                                                        "default": ""
                                                    },
                                                    "storage_admin_key": {
                                                        "type": "string",
                                                        "default": ""
                                                    }
                                                },
                                                "required": ["storage_monitor_secret", "osd_bootstrap_key", "storage_chassis_config", "live_migration_host", "storage_admin_key"]
                                            },
                                            "toragent": {
                                                "type": "object",
                                                "properties": {}
                                            },
                                            "tsn": {
                                                "type": "object",
                                                "properties": {}
                                            }
                                        },
                                        "required": ["xmpp_auth_enable", "xmpp_dns_auth_enable", "kernel_upgrade", "kernel_version", "enable_lbass", "ha", "database", "analytics", "control", "config", "webui", "compute", "vmware", "vgw", "storage", "toragent", "tsn"]
                                    },
                                    "openstack": {
                                        "type": "object",
                                        "properties": {
                                            "keystone": {
                                                "type": "object",
                                                "properties": {
                                                    "admin_password": {
                                                        "type": "string",
                                                        "default": "contrail123"
                                                    },
                                                    "ip": {
                                                        "type": "string",
                                                        "default": ""
                                                    },
                                                    "admin_user": {
                                                        "type": "string",
                                                        "default": "admin"
                                                    },
                                                    "admin_tenant": {
                                                        "type": "string",
                                                        "default": "admin"
                                                    },
                                                    "service_tenant": {
                                                        "type": "string",
                                                        "default": "services"
                                                    },
                                                    "auth_port": {
                                                        "type": "integer",
                                                        "default": 35357
                                                    },
                                                    "auth_protocol": {
                                                        "type": "string",
                                                        "default": "http"
                                                    },
                                                    "version": {
                                                        "type": "string",
                                                        "default": "v2.0"
                                                    }
                                                },
                                                "required": ["admin_password", "ip", "admin_user", "admin_tenant", "service_tenant", "auth_port", "auth_protocol"]
                                            },
                                            "neutron": {
                                                "type": "object",
                                                "properties": {
                                                    "service_protocol": {
                                                        "type": "string",
                                                        "default": "http"
                                                    },
                                                    "port": {
                                                        "type": "integer",
                                                        "default": 9697
                                                    }
                                                },
                                                "required": ["service_protocol", "port"]
                                            },
                                            "amqp": {
                                                "type": "object",
                                                "properties": {
                                                    "server_ip": {
                                                        "type": "string",
                                                        "default": ""
                                                    },
                                                    "use_ssl": {
                                                        "type": "boolean",
                                                        "default": false
                                                    }
                                                },
                                                "required": ["server_ip"]
                                            },
                                            "region": {
                                                "type": "string",
                                                "default": "RegionOne"
                                            },
                                            "multi_tenancy": {
                                                "type": "boolean",
                                                "default": true
                                            },
                                            "openstack_manage_amqp": {
                                                "type": "boolean",
                                                "default": false
                                            },
                                            "enable_ceilometer": {
                                                "type": "boolean",
                                                "default": false
                                            },
                                            "ha": {
                                                "type": "object",
                                                "properties": {
                                                    "internal_vip": {
                                                        "type": "string",
                                                        "default": ""
                                                    },
                                                    "external_vip": {
                                                        "type": "string",
                                                        "default": ""
                                                    },
                                                    "internal_virtual_router_id": {
                                                        "type": "integer",
                                                        "default": 102
                                                    },
                                                    "external_virtual_router_id": {
                                                        "type": "integer",
                                                        "default": 101
                                                    },
                                                    "nfs_server": {
                                                        "type": "string",
                                                        "default": ""
                                                    },
                                                    "nfs_glance_path": {
                                                        "type": "string",
                                                        "default": ""
                                                    }
                                                },
                                                "required": ["internal_vip", "external_vip", "internal_virtual_router_id", "external_virtual_router_id", "nfs_server", "nfs_glance_path"]
                                            },
                                            "mysql": {
                                                "type": "object",
                                                "properties": {
                                                    "root_password": {
                                                        "type": "string",
                                                        "default": "c0ntrail123"
                                                    }
                                                },
                                                "required": ["root_password"]
                                            }
                                        },
                                        "required": ["keystone", "neutron", "amqp", "region", "multi_tenancy", "openstack_manage_amqp", "enable_ceilometer", "ha", "mysql"]
                                    }
                                },
                                "required": ["contrail", "openstack"]
                            }
                        },
                        "required": ["domain", "subnet_mask", "gateway", "password", "provision"]
                    }
                },
                "required": ["id", "email", "base_image_id", "package_image_id", "parameters"]
            };
        },

        getServerModel : function () {
            return {
                "base_image_id": null,
                "cluster_id": null,
                "domain": null,
                "email": null,
                "id": null,
                "host_name": null,
                "ipmi_address": null,
                "ipmi_username": "ADMIN",
                "ipmi_password": "ADMIN",
                "ipmi_interface": "lan",
                "password": null,
                "package_image_id": null,
                "roles": ["compute"],
                "parameters": {
                    "partition": null,
                    "provision": {
                        "contrail_4": {
                            "storage": {
                                "storage_osd_ssd_disks": [],
                                "storage_osd_disks": [],
                                "storage_chassis_id": ""
                            },
                            "live_partition": true
                        },
                        "contrail": {}
                    }
                },
                "tag": {},
                "network": {
                    "interfaces": [],
                    "routes": [],
                    "management_interface": null,
                    "provisioning": "kickstart"
                },
                "contrail": {
                    "control_data_interface": null
                },
                "top_of_rack": {
                    "switches": []
                }
            };
        },

        getServerSchema : function () {
            return {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "type": "object",
                "properties": {
                "base_image_id": {
                    "type": "null"
                },
                "cluster_id": {
                    "type": "null"
                },
                "domain": {
                    "type": "null"
                },
                "email": {
                    "type": "null"
                },
                "id": {
                    "type": "null"
                },
                "ipmi_address": {
                    "type": "null"
                },
                "ipmi_username": {
                    "type": "string"
                },
                "ipmi_password": {
                    "type": "string"
                },
                "ipmi_interface": {
                    "type": "string"
                },
                "password": {
                    "type": "null"
                },
                "package_image_id": {
                    "type": "null"
                },
                "roles": {
                    "type": "array",
                        "items": {
                        "type": "string"
                    }
                },
                "parameters": {
                    "type": "object",
                        "properties": {
                        "provision": {
                            "type": "object",
                                "properties": {
                                "contrail": {
                                    "type": "object",
                                        "properties": {
                                        "storage": {
                                            "type": "object",
                                                "properties": {
                                                "storage_repo_id": {
                                                    "type": "string"
                                                },
                                                "storage_osd_disks": {
                                                    "type": "array",
                                                        "items": {}
                                                },
                                                "storage_chassis_id": {
                                                    "type": "string"
                                                },
                                                "storage_chassis_id_input": {
                                                    "type": "string"
                                                },
                                                "partition": {
                                                    "type": "string"
                                                }
                                            },
                                            "required": [
                                                "storage_repo_id",
                                                "storage_osd_disks",
                                                "storage_chassis_id",
                                                "storage_chassis_id_input",
                                                "partition"
                                            ]
                                        }
                                    },
                                    "required": [
                                        "storage"
                                    ]
                                }
                            },
                            "required": [
                                "contrail"
                            ]
                        }
                    },
                    "required": [
                        "provision"
                    ]
                },
                "tag": {
                    "type": "object",
                        "properties": {}
                },
                "network": {
                    "type": "object",
                        "properties": {
                        "interfaces": {
                            "type": "array",
                                "items": {}
                        },
                        "management_interface": {
                            "type": "null"
                        },
                        "provisioning": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "interfaces",
                        "management_interface",
                        "provisioning"
                    ]
                },
                "top_of_rack": {
                    "type": "object",
                        "properties": {
                        "switches": {
                            "type": "array",
                                "items": {}
                        }
                    },
                    "required": [
                        "switches"
                    ]
                }
            },
                "required": [
                "base_image_id",
                "cluster_id",
                "domain",
                "email",
                "id",
                "ipmi_address",
                "ipmi_username",
                "ipmi_password",
                "ipmi_interface",
                "password",
                "package_image_id",
                "roles",
                "parameters",
                "tag",
                "network",
                "top_of_rack"
            ]
            };
        },

        getJSONModel : function () {
            return {
                "customJSON": {},
                "json": {},
                "schema": {}
            };
        },

        getInterfaceModel : function () {
            return {
                "name": null,
                "type": null,
                "ip_address" : null,
                "mac_address" : null,
                "default_gateway" : null,
                "dhcp" : null,
                "member_interfaces": [],
                "tor" : null,
                "tor_port" : null,
                "parent": ""
            };
        },

        getRoutesModel : function () {
            return {
                "network": null,
                "netmask": null,
                "gateway": null,
                "interface": null
            };
        },

        getSwitchModel : function () {
            return {
                "switch_id"       : null,
                "ip_address"      : null,
                "switch_name"     : null,
                "ovs_port"        : null,
                "ovs_protocol"    : null,
                "http_server_port": null,
                "vendor_name"     : null,
                "product_name"    : null,
                "keepalive_time"  : null
            };
        },

        getDiskModel : function () {
            return {
                disk: ""
            };
        },

        getImageModel : function (category) {
            return {
                "id": null,
                "category": category,
                "type": null,
                "version": null,
                "path": null,
                "parameters": {}
            };
        },

        getDhcpHostModel : function () {
            return {
                "host_fqdn": "",
                "host_name": "",
                "ip_address": "",
                "mac_address": ""
            }
        },

        getDhcpSubnetModel : function () {
            return {
                "default_lease_time": 21600,
                "dhcp_range": null,
                "dns_server_list": "['127.0.0.1', '8.8.8.8']",
                "max_lease_time": 43200,
                "search_domains_list": "['englab.juniper.net']",
                "subnet_address": "",
                "subnet_domain": "",
                "subnet_gateway": "",
                "subnet_mask": ""
            }
        },

        getImageSchema : function () {
            return {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "type": "object",
                "properties": {
                    "id": {
                        "type": "null"
                    },
                    "category": {
                        "type": "string"
                    },
                    "type": {
                        "type": "null"
                    },
                    "version": {
                        "type": "null"
                    },
                    "path": {
                        "type": "null"
                    },
                    "parameters": {
                        "type": "object",
                        "properties": {}
                    }
                },
                "required": ["id", "category", "type", "version", "path", "parameters"]
            };
        },

        getBaremetalModel : function () {
            return {
                "baremetal_reimage" : null,
                "base_image_id" : null,
                "interfaces" : []
            };
        },
    };

    return DefaultConfig;
});
