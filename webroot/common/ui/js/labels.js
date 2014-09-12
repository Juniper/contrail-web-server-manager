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
            "ipmi_username": "IPMI Username",
            "ipmi_password": "IPMI Password",
            "base_image_id": "Base Image",
            "package_image_id": "Package",
            "roles": "Roles",
            "mac_address": "MAC Address",
            "interface_name": "Interface Name",
            "intf_bond": "Interface Bond",
            "intf_control": "Interface Control",
            "intf_data": "Interface Data",
            "compute_non_mgmt_ip": "Compute Non-Management IP",
            "compute_non_mgmt_gway": "Compute Non-Management Gateway",
            "static_ip": "Static IP",
            "host_name": "Host Name",

            //Tags
            "datacenter": "Datacenter",
            "floor": "Floor",
            "hall": "Hall",
            "rack": "Rack",
            "user_tag": "User Defined Tag",

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
            "keystone_username": "Keystone Username",
            "storage_virsh_uuid": "Storage Virsh UUID",
            "storage_fsid": "Storage FSID",
            "new_servers": "New Servers",
            "registered_servers": "Registered Servers",
            "configured_servers": "Configured Servers",
            "provisioned_servers": "Provisioned Servers",
            "total_servers": "Total Servers",
            "external_bgp": "External BGP",
            "database_dir": "Database Dir",
            "database_token": "Database Token",

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
        this.TITLE_SERVERS_CONFIG = "Servers Config";
        this.TITLE_CONTRAIL = "Contrail";
        this.TITLE_STORAGE = "Storage";
        this.TITLE_OPENSTACK = "Openstack";
        this.TITLE_SYSTEM = "System";
        this.TITLE_TAGS = "Tags";
        this.TITLE_CONFIGURATIONS = "Configurations";
        this.TITLE_SERVER_STATUS = "Server Status";
        this.TITLE_STATUS = "Status";
        this.TITLE_EDIT_CONFIG = "Edit Config";
        this.TITLE_ADD = "Add";
        this.TITLE_REIMAGE = "Reimage";
        this.TITLE_FILTER = "Filter";
        this.TITLE_SELECT = "Select";
        this.TITLE_CONFIRM = 'Confirm';
        this.TITLE_PROVISION = "Provision";
        this.TITLE_PROVISIONING = "Provisioning";
        this.TITLE_TAG = "Tag";
        this.TITLE_TAGS = "Tags";
        this.TITLE_ROLE = "Role";
        this.TITLE_ROLES = "Roles";
        this.TITLE_DELETE = "Delete";

        this.TITLE_CLUSTERS = 'Clusters';
        this.TITLE_CLUSTER = 'Cluster';
        this.TITLE_SERVERS = 'Servers';
        this.TITLE_SERVER = 'Server';
        this.TITLE_IMAGES = 'Images';
        this.TITLE_IMAGE = 'Image';
        this.TITLE_REPOS = 'Repos';
        this.TITLE_REPO = 'Repo';

        this.SELECT_CLUSTER = 'Select Cluster';
        this.TITLE_ADD_CLUSTER = 'Add Cluster';
        this.TITLE_DEL_CLUSTERS = 'Delete Clusters';
        this.TITLE_ADD_SERVERS = 'Add Servers';
        this.TITLE_ADD_TAGS = 'Add Tags';
        this.TITLE_ADD_IMAGE = 'Add Image';
        this.TITLE_ADD_REPO = 'Add Repo';
        this.TITLE_PROVISION_CLUSTER = 'Provision Cluster';
        this.TITLE_ADD_TO_CLUSTER = 'Add to Cluster';

        this.TITLE_REGISTER = 'Register';
        this.TITLE_CONFIGURE_SERVER = 'Configure Server';
        this.TITLE_CONFIGURE_SERVERS = 'Configure Servers';
        this.TITLE_EDIT_TAGS = 'Edit Tags';
        this.TITLE_ASSIGN_ROLES = 'Assign Roles';
        this.TITLE_REGISTER_SERVER = 'Register Server';
        this.TITLE_REGISTER_SERVERS = 'Register Servers';
        this.TITLE_PROVISION_SERVER = 'Provision Server';
        this.TITLE_PROVISION_SERVERS = 'Provision Servers';
        this.TITLE_SEARCH_SERVERS = 'Search Servers';
        this.TITLE_SELECT_SERVERS = 'Select Servers';


        this.SELECT_IMAGE = 'Select Image';
        this.SELECT_PACKAGE = 'Select Package';
        this.SELECT_ROLES = 'Select Roles';
    };
    return Labels;
});