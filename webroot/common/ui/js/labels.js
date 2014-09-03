/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function (_) {
    var Labels = function () {
        this.get = function (key) {
            var keyArray, newKey;
            if (_.has(labelMap, key)) {
                return labelMap[key];
            } else {
                keyArray = key.split('.');
                newKey = keyArray[keyArray.length - 1];
                if (keyArray.length > 1 && _.has(labelMap, newKey)) {
                    return labelMap[newKey];
                } else {
                    return newKey.charAt(0).toUpperCase() + newKey.slice(1);
                }
            }
        };

        this.getInLowerCase = function (key) {
            var label = this.get(key);
            return label.toLowerCase();
        };

        this.getInUpperCase = function (key) {
            var label = this.get(key);
            return label.toUpperCase();
        };

        var labelMap = {
            //General
            "id": "ID",
            'email': 'Email',
            "domain": "Domain",
            "gateway": "Gateway",
            "ip_address": "IP Address",
            "status": "Status",
            "last_update": "Last Updated",

            //Server
            "ipmi_address": "IPMI",
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
            "encapsulation_priority": "Encapsulation Priority",

            //Roles
            "config": "Config",
            "openstack": "Openstack",
            "control": "Control",
            "compute": "Compute",
            "collector": "Collector",
            "webui": "Webui",
            "database": "Database"
        };

        this.TITLE_DETAILS = "Details";
        this.TITLE_SYSTEM = "System";
        this.TITLE_TAGS = "Tags";
        this.TITLE_CONFIGURATIONS = "Configurations";
        this.TITLE_STATUS = "Status";
        this.TITLE_CONFIGURE = "Configure";
        this.TITLE_ADD = "Add";
        this.TITLE_EDIT = "Edit";
        this.TITLE_PROVISION = "Provision";
        this.TITLE_TAG = "Tag";
        this.TITLE_TAGS = "Tags";
        this.TITLE_ROLE = "Role";
        this.TITLE_ROLES = "Roles";
        this.TITLE_DELETE = "Delete";

        this.TITLE_CLUSTERS = 'Clusters';
        this.TITLE_CLUSTER = 'Cluster';
        this.TITLE_SERVERS = 'Servers';
        this.TITLE_ALL_SERVERS = 'All Servers';
        this.TITLE_SERVER = 'Server';
        this.TITLE_IMAGES = 'Images';
        this.TITLE_IMAGE = 'Image';
        this.TITLE_REPOS = 'Repos';
        this.TITLE_REPO = 'Repo';
    };
    return Labels;
});