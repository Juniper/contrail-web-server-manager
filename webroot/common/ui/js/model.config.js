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
                    analytics_syslog_port: "-1",
                    analytics_data_dir: "",
                    ssd_data_dir: "",

                    router_asn: '64512',
                    multi_tenancy: 'True',
                    haproxy: 'disable',
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

                    password: 'c0ntrail123',

                    database_dir: '/var/lib/cassandra',
                    service_token: 'contrail123',

                    storage_mon_secret: null,
                    osd_bootstrap_key: null,
                    admin_key: null,

                    internal_vip: "",
                    external_vip: "",
                    contrail_internal_vip: "",
                    contrail_external_vip: "",
                    nfs_server: "",
                    nfs_glance_path: null
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
                    "storage_repo_id": null,
                    "partition": null,
                    "disks": [],
                    "live_migration": 'disable',
                    "live_migration_nfs_vm_host": null,
                    "live_migration_storage_scope": null
                },
                'tag': {},
                'roles': ['compute'],
                'contrail': {
                    'control_data_interface': null
                },
                'network': {
                    'management_interface': null,
                    'provisioning': "kickstart",
                    'interfaces': [],
                    'tor':null,
                    'tor_port':null
                }
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
                'id': null,
                'category': category,
                'type': null,
                'version': null,
                'path': null,
                'parameters': {}
            };
        };
    };

    return DefaultConfig;
});