/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function (_) {
    var DefaultConfig = function () {

        this.getClusterModel = function () {
            return {
                id: null,
                email: null,
                base_image_id: null,
                package_image_id: null,
                parameters: {
                    domain: 'englab.juniper.net',
                    gateway: null,
                    subnet_mask: '255.255.255.0',

                    openstack_mgmt_ip: null,

                    analytics_data_ttl: '48',
                    analytics_config_audit_ttl: '168',
                    analytics_statistics_ttl: '24',
                    analytics_flow_ttl: '2',
                    analytics_syslog_port: "-1",
                    analytics_data_dir: "",
                    ssd_data_dir: "",
                    snmp_scan_frequency: "600",
                    snmp_fast_scan_frequency: "60",
                    topology_scan_frequency: "60",

                    router_asn: '64512',
                    multi_tenancy: 'True',
                    haproxy: 'disable',
                    haproxy_flag: 'disable',
                    use_certificates: 'False',
                    encapsulation_priority: 'MPLSoUDP,MPLSoGRE,VXLAN',
                    hc_interval: '5',

                    compute_non_mgmt_ip: null,
                    compute_non_mgmt_gway: null,

                    keystone_ip: '',
                    keystone_tenant: 'admin',
                    keystone_username: 'admin',
                    keystone_password: 'contrail123',
                    keystone_service_tenant: 'service',
                    keystone_region_name: 'RegionOne',
                    keystone_service_token: 'contrail123',
                    manage_neutron: 'True',
                    openstack_manage_amqp: 'False',
                    amqp_server_ip: '',
                    enable_lbass: 'False',
                    enable_ceilometer: 'False',

                    password: 'c0ntrail123',

                    database_ip_port: '9160',
                    database_dir: '/var/lib/cassandra',
                    analytics_data_dir: '',
                    ssd_data_dir: '',
                    database_minimum_diskGB: '256',
                    database_initial_token: '0',
                    service_token: 'contrail123',

                    vmware_ip: "",
                    vmware_vswitch: "",
                    vmware_username: "",
                    vmware_password: "",

                    vgw_public_subnet: "",
                    vgw_public_vn_name: "",
                    vgw_interface: "",
                    vgw_gateway_routes: "",

                    storage_mon_secret: "AQBM78tTEMz+GhAA3WiOXQI7UVdIy0YFFuTGdw==",
                    osd_bootstrap_key: "AQCq7NFTeJUoBhAAlTVpxwWQJtBej/JDNhT6+Q==",
                    admin_key: "AQDIgtNTgPLWARAAK6gs/fj8m88LnY9DwxJdYA==",
                    storage_osd_disks : "",
                    storage_chassis_config : "",
                    live_migration: 'disable',
                    live_migration_ip : "",
                    live_migration_host : "",
                    live_migration_nfs_vm_host: "",
                    live_migration_storage_scope: "",
                    nfs_server: "",
                    nfs_glance_path: "",

                    internal_vip: "",
                    external_vip: "",
                    contrail_vip: "",
                    internal_virtual_router_id: "100",
                    external_virtual_router_id: "100",
                    contrail_internal_virtual_router_id : "100",
                    contrail_external_virtual_router_id : "100",

                    kernel_upgrade: 'yes',
                    kernel_version: ''
                },
                status: {},
                tag: {},
                roles: {}
            };
        };

        this.getServerModel = function () {
            return {
                'id': null,
                'cluster_id': null,
                'domain': "englab.juniper.net",
                'discovered': null,
                'gateway': null,
                'email': null,
                'subnet_mask': null,
                'static_ip': null,
                'mac_address': null,
                'base_image_id': null,
                'package_image_id': null,
                'ip_address': null,
                'password': null,
                'ipmi_address': null,
                'ipmi_username': 'ADMIN',
                'ipmi_password': 'ADMIN',
                'host_name': null,
                'intf_data': null,
                'intf_bond': null,
                'intf_control': null,
                'parameters': {
                    storage_repo_id: "",
                    storage_chassis_id: "",
                    storage_chassis_id_input: "",
                    partition: "",
                    kernel_upgrade: 'yes',
                    kernel_version: '',
                    disks: []
                },
                'tag': {},
                'roles': ['compute'],
                'contrail': {
                    'control_data_interface': ""
                },
                'network': {
                    'management_interface': "",
                    'provisioning': "kickstart",
                    'interfaces': [],
                    'tor':null,
                    'tor_port':null
                }
            };
        };

        this.getInterfaceModel = function () {
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
        };

        this.getDiskModel = function () {
            return {
                disk: ""
            };
        };

        this.getImageModel = function (category) {
            return {
                'id': null,
                'category': category,
                'type': null,
                'version': null,
                'path': null,
                'parameters': {}
            };
        };
        
        this.getBaremetalModel = function (category) {
            return {
                'baremetal_reimage' : null,
                'base_image_id' : null,
                'interfaces' : []
            };
        };
    };

    return DefaultConfig;
});