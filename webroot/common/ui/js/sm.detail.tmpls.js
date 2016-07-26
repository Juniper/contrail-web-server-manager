/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function (_) {
    var DetailTemplates = function () {
        this.getClusterDetailsTemplate = function (detailTheme, detailActions) {
            var detailTheme = contrail.checkIfExist(detailTheme) ? detailTheme : cowc.THEME_DETAIL_DEFAULT;
            return {
                actions: contrail.handleIfNull(detailActions, []),
                templateGenerator: 'ColumnSectionTemplateGenerator',
                templateGeneratorConfig: {
                    columns: [
                        {
                            class: 'span6',
                            rows: [
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_OVERVIEW,
                                    theme: detailTheme,
                                    advancedViewOptions: false,
                                    templateGeneratorConfig: [
                                        {
                                            key: 'id',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'email',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                },
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_OPENSTACK,
                                    theme: detailTheme,
                                    advancedViewOptions: false,
                                    templateGeneratorConfig: [
                                        {
                                            key: 'parameters.provision.openstack.keystone.admin_tenant',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.provision.openstack.keystone.service_tenant',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.provision.openstack.keystone.admin_user',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.provision.openstack.keystone_region_name',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.provision.openstack.keystone.ip',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                },
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_CONTRAIL_CONTROLLER,
                                    theme: detailTheme,
                                    advancedViewOptions: false,
                                    templateGeneratorConfig: [
                                        {
                                            key: 'parameters.provision.contrail.control.encapsulation_priority',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.provision.contrail.control.external_bgp',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.provision.openstack.multi_tenancy',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.provision.contrail.control.router_asn',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        //{
                                        //    key: 'parameters.use_certificates',
                                        //    templateGenerator: 'TextGenerator'
                                        //},
                                        {
                                            key: 'parameters.provision.contrail.database.directory',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.provision.contrail.database.minimum_diskGB',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.provision.contrail.config.healthcheck_interval',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                },
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_HA_CONFIG,
                                    theme: detailTheme,
                                    advancedViewOptions: false,
                                    templateGeneratorConfig: [
                                        {
                                            key: 'parameters.provision.contrail.ha.haproxy_enable',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.provision.openstack.ha.internal_vip',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.provision.openstack.ha.external_vip',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.provision.contrail.ha.contrail_internal_vip',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.provision.contrail.ha.contrail_external_vip',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.provision.openstack.ha.nfs_server',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.provision.openstack.ha.nfs_glance_path',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                },
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_ANALYTICS_CONFIG,
                                    theme: detailTheme,
                                    advancedViewOptions: false,
                                    templateGeneratorConfig: [
                                        {
                                            key: 'parameters.provision.contrail.analytics.data_ttl',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.provision.contrail.analytics.syslog_port',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.provision.contrail.analytics.data_directory',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.provision.contrail.analytics.ssd_data_directory',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            class: 'span6',
                            rows: [
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_STATUS,
                                    theme: detailTheme,
                                    advancedViewOptions: false,
                                    templateGeneratorConfig: [
                                        {
                                            key: 'ui_added_parameters.servers_status.total_servers',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ui_added_parameters.servers_status.new_servers',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ui_added_parameters.servers_status.configured_servers',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ui_added_parameters.servers_status.inreimage_servers',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ui_added_parameters.servers_status.reimaged_servers',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ui_added_parameters.servers_status.inprovision_servers',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ui_added_parameters.servers_status.provisioned_servers',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                },
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_CONTRAIL_STORAGE,
                                    theme: detailTheme,
                                    advancedViewOptions: false,
                                    templateGeneratorConfig: [
                                        {
                                            key: 'parameters.provision.contrail.storage.storage_virsh_uuid',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.provision.contrail.storage.storage_fsid',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.provision.contrail.storage.storage_monitor_secret',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.provision.contrail.storage.osd_bootstrap_key',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.provision.contrail.storage.storage_admin_key',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.provision.contrail.storage.live_migration_storage_scope',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.provision.contrail.storage.live_migration_host',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                },
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_SERVERS_CONFIG,
                                    theme: detailTheme,
                                    advancedViewOptions: false,
                                    templateGeneratorConfig: [
                                        {
                                            key: 'parameters.domain',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.gateway',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.subnet_mask',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'base_image_id',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'package_image_id',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.provision.contrail.kernel_upgrade',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.provision.contrail.kernel_version',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        };

        this.getServerDetailsTemplate = function (detailTheme, detailActions) {
            var detailTheme = contrail.checkIfExist(detailTheme) ? detailTheme : cowc.THEME_DETAIL_DEFAULT;

            return {
                actions: contrail.handleIfNull(detailActions, []),
                templateGenerator: 'ColumnSectionTemplateGenerator',
                templateGeneratorConfig: {
                    columns: [
                        {
                            class: 'span6',
                            rows: [
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_SYSTEM_MANAGEMENT,
                                    theme: detailTheme,
                                    advancedViewOptions: false,
                                    templateGeneratorConfig: [
                                        {
                                            key: 'id',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'mac_address',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'domain',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ip_address',
                                            templateGenerator: 'LinkGenerator',
                                            templateGeneratorConfig: {
                                                template: 'http://{{params.ip_address}}:8080',
                                                params: {
                                                    ip_address: 'ip_address'
                                                }
                                            }
                                        },
                                        {
                                            key: 'ipmi_address',
                                            templateGenerator: 'LinkGenerator',
                                            templateGeneratorConfig: {
                                                template: 'http://{{params.ipmi_address}}',
                                                params: {
                                                    ipmi_address: 'ipmi_address'
                                                }
                                            }
                                        },
                                        {
                                            key: 'gateway',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'subnet_mask',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                },
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_CONTRAIL_CONTROLLER,
                                    theme: detailTheme,
                                    advancedViewOptions: false,
                                    templateGeneratorConfig: [
                                        {
                                            key: 'package_image_id',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'provisioned_id',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'contrail.control_data_interface',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                },
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_CONTRAIL_STORAGE,
                                    theme: detailTheme,
                                    advancedViewOptions: false,
                                    templateGeneratorConfig: [
                                        {
                                            key: 'parameters.storage_repo_id',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.disks',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.storage_chassis_id',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                },
                                {
                                    key: 'network.interfaces',
                                    title: smwl.TITLE_INTERFACES,
                                    templateGenerator: 'BlockGridTemplateGenerator',
                                    templateGeneratorConfig: {
                                        dataColumn: [
                                            {
                                                key: 'name',
                                                templateGenerator: 'TextGenerator',
                                                templateGeneratorConfig: {
                                                    width: 35
                                                }
                                            },
                                            {
                                                key: 'ip_address',
                                                templateGenerator: 'TextGenerator',
                                                templateGeneratorConfig: {
                                                    width: 85
                                                }
                                            },
                                            {
                                                key: 'default_gateway',
                                                templateGenerator: 'TextGenerator',
                                                templateGeneratorConfig: {
                                                    width: 120
                                                }
                                            },
                                            {
                                                key: 'mac_address',
                                                templateGenerator: 'TextGenerator',
                                                templateGeneratorConfig: {
                                                    width: 120
                                                }
                                            },
                                            {
                                                key: 'dhcp',
                                                templateGenerator: 'TextGenerator',
                                                templateGeneratorConfig: {
                                                    width: 32
                                                }
                                            },
                                            {
                                                key: 'type',
                                                templateGenerator: 'TextGenerator',
                                                templateGeneratorConfig: {
                                                    width: 45
                                                }
                                            }
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            class: 'span6',
                            rows: [
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_STATUS,
                                    theme: detailTheme,
                                    advancedViewOptions: false,
                                    templateGeneratorConfig: [
                                        {
                                            key: 'status',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'last_update',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'state',
                                            templateGenerator: 'TextGenerator'
                                        },
                                    ]
                                },
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_ROLES,
                                    theme: detailTheme,
                                    advancedViewOptions: false,
                                    templateGeneratorConfig: [
                                        {
                                            key: 'roles',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                },
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_TAGS,
                                    theme: detailTheme,
                                    templateGeneratorData: 'tag',
                                    advancedViewOptions: false,
                                    templateGeneratorConfig: [
                                        {
                                            key: 'tag.datacenter',
                                            templateGenerator: 'LinkGenerator',
                                            templateGeneratorConfig: {
                                                template: smwc.URL_TAGGED_SERVERS,
                                                params: {
                                                    tag: {
                                                        type: 'fixed',
                                                        value: 'datacenter'
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            key: 'tag.floor',
                                            templateGenerator: 'LinkGenerator',
                                            templateGeneratorConfig: {
                                                template: smwc.URL_TAGGED_SERVERS,
                                                params: {
                                                    tag: {
                                                        type: 'fixed',
                                                        value: 'floor'
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            key: 'tag.hall',
                                            templateGenerator: 'LinkGenerator',
                                            templateGeneratorConfig: {
                                                template: smwc.URL_TAGGED_SERVERS,
                                                params: {
                                                    tag: {
                                                        type: 'fixed',
                                                        value: 'hall'
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            key: 'tag.rack',
                                            templateGenerator: 'LinkGenerator',
                                            templateGeneratorConfig: {
                                                template: smwc.URL_TAGGED_SERVERS,
                                                params: {
                                                    tag: {
                                                        type: 'fixed',
                                                        value: 'rack'
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            key: 'tag.user_tag',
                                            templateGenerator: 'LinkGenerator',
                                            templateGeneratorConfig: {
                                                template: smwc.URL_TAGGED_SERVERS,
                                                params: {
                                                    tag: {
                                                        type: 'fixed',
                                                        value: 'user_tag'
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_PROVISIONING,
                                    theme: detailTheme,
                                    advancedViewOptions: false,
                                    templateGeneratorConfig: [
                                        {
                                            key: 'cluster_id',
                                            templateGenerator: 'LinkGenerator',
                                            templateGeneratorConfig: {
                                                template: '/#p=setting_sm_clusters&q[cluster_id]={{params.cluster_id}}',
                                                params: {
                                                    cluster_id: 'cluster_id'
                                                }
                                            }
                                        },
                                        {
                                            key: 'email',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'base_image_id',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'reimaged_id',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'network.management_interface',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.kernel_upgrade',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.kernel_version',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        };

        this.getImageDetailsTemplate = function () {
            return {
                templateGenerator: 'ColumnSectionTemplateGenerator',
                templateGeneratorConfig: {
                    columns: [
                        {
                            class: 'span6',
                            rows: [
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_OVERVIEW,
                                    templateGeneratorConfig: [
                                        {
                                            key: 'id',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'category',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'type',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'version',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            class: 'span6',
                            rows: [
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_DETAILS,
                                    templateGeneratorConfig: [
                                        {
                                            key: 'path',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.kickstart',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.kickseed',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.puppet_manifest_version',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        };

        this.getServerChassisDetailsTemplate = function (detailTheme) {
            var detailTheme = contrail.checkIfExist(detailTheme) ? detailTheme : cowc.THEME_DETAIL_DEFAULT;
            return {
                advancedViewOptions: false, //TODO - find a way to enable this
                templateGenerator: 'ColumnSectionTemplateGenerator',
                templateGeneratorConfig: {
                    columns: [
                        {
                            class: 'span12',
                            rows: [
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_SERVER_CHASSIS_STATE,
                                    theme: detailTheme,
                                    templateGeneratorData: 'ServerMonitoringInfo.chassis_state',
                                    templateGeneratorConfig: [
                                        {
                                            key: 'ServerMonitoringInfo.chassis_state.power_restore_policy',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ServerMonitoringInfo.chassis_state.system_power',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ServerMonitoringInfo.chassis_state.cooling_fan_fault',
                                            templateGenerator: 'TextGenerator',
                                            templateGeneratorConfig: {
                                                formatter: 'fault-state'
                                            }
                                        },
                                        {
                                            key: 'ServerMonitoringInfo.chassis_state.front_panel_lockout',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ServerMonitoringInfo.chassis_state.drive_fault',
                                            templateGenerator: 'TextGenerator',
                                            templateGeneratorConfig: {
                                                formatter: 'fault-state'
                                            }
                                        },
                                        {
                                            key: 'ServerMonitoringInfo.chassis_state.chassis_intrusion',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ServerMonitoringInfo.chassis_state.main_power_fault',
                                            templateGenerator: 'TextGenerator',
                                            templateGeneratorConfig: {
                                                formatter: 'fault-state'
                                            }
                                        },
                                        {
                                            key: 'ServerMonitoringInfo.chassis_state.power_control_fault',
                                            templateGenerator: 'TextGenerator',
                                            templateGeneratorConfig: {
                                                formatter: 'fault-state'
                                            }
                                        },
                                        {
                                            key: 'ServerMonitoringInfo.chassis_state.power_overload',
                                            templateGenerator: 'TextGenerator',
                                            templateGeneratorConfig: {
                                                formatter: 'fault-state'
                                            }
                                        },
                                        {
                                            key: 'ServerMonitoringInfo.chassis_state.power_interlock',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        };

        this.getServerCPUMemDetailsTemplate = function (detailTheme) {
            var detailTheme = contrail.checkIfExist(detailTheme) ? detailTheme : cowc.THEME_DETAIL_DEFAULT;
            return {
                advancedViewOptions: false, //TODO - find a way to enable this
                templateGenerator: 'ColumnSectionTemplateGenerator',
                templateGeneratorConfig: {
                    columns: [
                        {
                            class: 'span12',
                            rows: [
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_CPU_MEM_INFO,
                                    theme: detailTheme,
                                    templateGeneratorData: 'ServerMonitoringInfo.resource_info_stats',
                                    templateGeneratorConfig: [
                                        {
                                            key: 'ServerMonitoringInfo.resource_info_stats.cpu_usage_percentage',
                                            templateGenerator: 'TextGenerator',
                                            templateGeneratorConfig: {
                                                formatter: 'alert-percentage'
                                            }
                                        },
                                        {
                                            key: 'ServerMonitoringInfo.resource_info_stats.mem_usage_percent',
                                            templateGenerator: 'TextGenerator',
                                            templateGeneratorConfig: {
                                                formatter: 'alert-percentage'
                                            }
                                        },
                                        {
                                            key: 'ServerMonitoringInfo.resource_info_stats.mem_usage_mb',
                                            templateGenerator: 'TextGenerator',
                                            templateGeneratorConfig: {
                                                formatter: 'mega-byte'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        };

        this.getServerInventoryDetailsTemplate = function (detailTheme) {
            var detailTheme = contrail.checkIfExist(detailTheme) ? detailTheme : cowc.THEME_DETAIL_DEFAULT;
            return {
                advancedViewOptions: false, //TODO - find a way to enable this
                templateGenerator: 'ColumnSectionTemplateGenerator',
                templateGeneratorConfig: {
                    columns: [
                        {
                            rows: [
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_OVERVIEW,
                                    theme: detailTheme,
                                    templateGeneratorConfig: [
                                        {
                                            key: 'ServerInventoryInfo.hardware_model',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ServerInventoryInfo.physical_processor_count',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ServerInventoryInfo.os',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ServerInventoryInfo.os_family',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ServerInventoryInfo.os_version',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ServerInventoryInfo.virtual_machine',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ServerInventoryInfo.uptime_seconds',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ServerInventoryInfo.eth_controller_state.num_of_ports',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ServerInventoryInfo.total_numof_disks',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                },
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_SERVER_CPU,
                                    theme: detailTheme,
                                    templateGeneratorConfig: [
                                        {
                                            key: 'ServerInventoryInfo.cpu_info_state.model',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ServerInventoryInfo.cpu_info_state.clock_speed_MHz',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ServerInventoryInfo.cpu_info_state.num_of_threads',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ServerInventoryInfo.cpu_cores_count',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ServerInventoryInfo.cpu_info_state.core_count',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                },
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_SERVER_MEMORY,
                                    theme: detailTheme,
                                    templateGeneratorConfig: [
                                        {
                                            key: 'ServerInventoryInfo.mem_state.num_of_dimms',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ServerInventoryInfo.mem_state.mem_speed_MHz',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ServerInventoryInfo.mem_state.dimm_size_mb',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ServerInventoryInfo.mem_state.mem_type',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ServerInventoryInfo.mem_state.total_mem_mb',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ServerInventoryInfo.mem_state.swap_size_mb',
                                            templateGenerator: 'TextGenerator'
                                        },

                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        };

        this.getFRUDetailsTemplate = function () {
            return {
                templateGenerator: 'ColumnSectionTemplateGenerator',
                templateGeneratorConfig: {
                    columns: [
                        {
                            class: 'span12',
                            rows: [
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_OVERVIEW,
                                    templateGeneratorConfig: [
                                        {
                                            key: 'fru_description',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'product_name',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'product_manfacturer',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'product_part_number',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'chassis_type',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'chassis_serial_number',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                },
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_FRU__BOARD_INFO,
                                    templateGeneratorConfig: [
                                        {
                                            key: 'board_product_name',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'board_manufacturer',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'board_part_number',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'board_serial_number',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'board_mfg_date',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        };

        this.getInterfaceDetailsTemplate = function () {
            return {
                templateGenerator: 'ColumnSectionTemplateGenerator',
                templateGeneratorConfig: {
                    columns: [
                        {
                            rows: [
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_DETAILS,
                                    templateGeneratorConfig: [
                                        {
                                            key: 'macaddress',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'netmask',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'model',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'speed_Mb_per_sec',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        };

        this.getServerFileSystemDetailsTemplate = function () {
            return {
                templateGenerator: 'ColumnSectionTemplateGenerator',
                templateGeneratorConfig: {
                    columns: [
                        {
                            rows: [
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_OVERVIEW,
                                    templateGeneratorConfig: [
                                        {
                                            key: 'fs_name',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'type',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'mountpoint',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                },
                                {
                                    templateGenerator: 'BlockGridTemplateGenerator',
                                    title: smwl.TITLE_SERVER_DISK_USAGE,
                                    key: 'physical_disks',
                                    templateGeneratorConfig: {
                                        titleColumn: {
                                            key: 'disk_name',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        dataColumn: [
                                            {
                                                key: 'disk_name',
                                                templateGenerator: 'TextGenerator'
                                            },
                                            {
                                                key: 'disk_size_kb',
                                                templateGenerator: 'TextGenerator',
                                                templateGeneratorConfig: {
                                                    formatter: 'kilo-byte'
                                                }
                                            },
                                            {
                                                key: 'disk_used_percentage',
                                                templateGenerator: 'TextGenerator',
                                                templateGeneratorConfig: {
                                                    formatter: 'alert-percentage'
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                }
            }
        };
    };


    return DetailTemplates;
});