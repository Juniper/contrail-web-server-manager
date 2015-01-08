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
                    domain: 'contrail.juniper.net',
                    gateway: null,
                    subnet_mask: '255.255.255.0',

                    openstack_mgmt_ip: null,
                    openstack_passwd: 'contrail123',

                    analytics_data_ttl: '168',
                    router_asn: '64512',
                    multi_tenancy: 'True',
                    haproxy: 'disable',
                    use_certificates: 'False',
                    encapsulation_priority: 'MPLSoUDP,MPLSoGRE,VXLAN',

                    compute_non_mgmt_ip: null,
                    compute_non_mgmt_gway: null,

                    keystone_tenant: 'admin',
                    keystone_username: 'admin',
                    keystone_password: 'contrail123',
                    password: 'c0ntrail123',

                    database_dir: '/home/cassandra',
                    service_token: 'contrail123'
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
                'domain': "contrail.juniper.net",
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
                'parameters': {},
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