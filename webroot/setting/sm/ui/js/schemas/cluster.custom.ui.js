/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */
define(["sm-labels"], function (SMLables) {
    var labels = new SMLables();

    var customClusterSchema = {
        "label": "Details",
        "properties": {
            "base_image_id": {
                "view" : "FormDropdownView",
                "elementConfig" : {
                    "placeholder": smwl.SELECT_IMAGE,
                    "dataSource": {
                        "type": "remote",
                        "url": smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, "filterInImages")
                    }
                }
            },
            "package_image_id": {
                "view" : "FormDropdownView",
                "elementConfig" : {
                    "placeholder": smwl.SELECT_PACKAGE,
                    "dataSource": {
                        "type": "remote",
                        "url": smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, "filterInPackages")
                    }
                }
            },
            "parameters" : {
                "properties" : {
                    "provision" : {
                        "properties" : {
                            "contrail" : {
                                "properties" : {
                                    "config" : {
                                        "properties" : {
                                            "zookeeper_ip_port" : {
                                                label: smwl.LABEL_ZOOKEEPER_IP_PORT
                                            }
                                        }
                                    },
                                    "ha" : {
                                        "properties" : {
                                            "haproxy_enable": {
                                                label : smwl.LABEL_HA_PROXY_ENABLE
                                            }
                                        }
                                    },
                                    "vmware" : {
                                        "ip" : {
                                            label:smwl.LABEL_VMWARE_IP
                                        },
                                        "vswitch" : {
                                            label:smwl.LABEL_VMWARE_VSWITCH
                                        },
                                        "username" : {
                                            label:smwl.LABEL_VMWARE_USERNAME
                                        },
                                        "password" : {
                                            label:smwl.LABEL_VMWARE_PASSWORD
                                        }
                                    },
                                    "vgw" : {
                                        "properties" : {
                                            "public_subnet" : {
                                                label:smwl.LABEL_VGW_PUBLIC_SUBNET
                                            },
                                            "public_vn_name" : {
                                                label:smwl.LABEL_VGW_PUBLIC_VN_NAME
                                            },
                                            "interface" : {
                                                label:smwl.LABEL_VGW_INTERFACE
                                            },
                                            "gateway_routes" : {
                                                label:smwl.LABEL_VGW_GATEWAY_ROUTES
                                            }
                                        }
                                    },
                                    "analytics" : {
                                        "properties" : {
                                            "syslog_port": {
                                                label: smwl.LABEL_ANALYTICS_SYSLOG_PORT
                                            },
                                            "data_ttl" : {
                                                label: smwl.LABEL_ANALYTICS_DATA_TTL
                                            },
                                            "flow_ttl": {
                                                label: smwl.LABEL_ANALYTICS_FLOW_TTL
                                            },
                                            "config_audit_ttl" : {
                                                label: smwl.LABEL_ANALYTICS_CONFIG_AUDIT_TTL
                                            },
                                            "statistics_ttl" : {
                                                label: smwl.LABEL_ANALYTICS_STATISTICS_TTL
                                            },
                                        }
                                    },
                                    "storage" : {
                                        "properties" : {
                                            "storage_chassis_config" : {
                                                "validation" : "",
                                                "collection" : "getStorageDisks()",
                                                "elementId" : "disk",
                                                "name" : "Storage Disks",
                                                "_path" : "disk",
                                                "rowActions": [
                                                    {
                                                        "onClick" : "function() { $root.deleteDisk($data, this); }",
                                                        "iconClass": "icon-minus"}
                                                ],
                                                "gridActions": [
                                                    {
                                                        "onClick": "function() { addDisk(); }",
                                                        "buttonTitle": "Add"
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                }
                            },
                            "openstack" : {
                                "properties" : {
                                    "amqp" : {
                                        "properties" : {
                                            "server_ip": {
                                                label: smwl.LABEL_AMQP_SERVER_IP
                                            }
                                        }
                                    },
                                    "neutron" : {
                                        "properties" : {
                                            "port" : {
                                                label: smwl.LABEL_NEUTRON_PORT
                                            },
                                            "service_protocol": {
                                                label: smwl.LABEL_NEUTRON_SERVICE_PROTOCOL
                                            }
                                        }
                                    },
                                    "keystone" : {
                                        "properties" : {
                                            "ip" : {
                                                label: smwl.LABEL_KEYSTONE_IP
                                            },
                                            "admin_tenant": {
                                                label: smwl.LABEL_KEYSTONE_ADMIN_TENANT
                                            },
                                            "service_tenant" : {
                                                label: smwl.LABEL_KEYSTONE_SERVICE_TENANT
                                            },
                                            "admin_user" : {
                                                label: smwl.LABEL_KEYSTONE_ADMIN_USER
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    return customClusterSchema;
});
