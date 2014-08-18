/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function(_) {
    var Labels = function() {
        var labelMap;
        this.get = function(key) {
            if(_.has(labelMap, key)){
                return labelMap[key];
            } else {
                return key.charAt(0).toUpperCase() + key.slice(1);
            }
        }
        labelMap = {
            //General
            "id": "ID",
            'email': 'Email',
            "domain": "Domain",
            "gateway": "Gateway",
            "ip_address": "IP Address",
            "status": "Status",
            "last_update": "Last Updated",

            //Server
            "power_address": "Power Address",
            "base_image_id": "Base Image",
            "package_image_id": "Package Image",
            "roles": "Roles",
            "mac_address": "MAC Address",
            "interface_name": "Interface Name",
            "compute_non_mgmt_ip": "Compute Non-Management IP",
            "compute_non_mgmt_gway": "Compute Non-Management Gateway",
            "static_ip": "Static IP",
            "host_name": "Host Name",

            //Tags
            "datacenter": "Datacenter",
            "floor": "Floor",
            "hall": "Hall",
            "rack": "Rack",
            "user_tag": "User-Defined Tag",


            //Cluster
            "cluster_id": "Cluster",
            "analytics_data_ttl": "Analytics Data TTL",
            "ext_bgp": "External BGP",
            "openstack_mgmt_ip": "Openstack Management IP",
            "openstack_passwd": "Openstack Password",
            "keystone_tenant": "Keystone Tenant",
            "subnet_mask": "Subnet Mask",
            "router_asn": "Router ASN",
            "multi_tenancy": "Multi Tenancy",
            "uuid": "UUID",
            "use_certificates": "Use Certificates",
            "haproxy": "HA Proxy",
            "encapsulation_priority": "Encapsulation Priority"
        };
    }
    return Labels;
});