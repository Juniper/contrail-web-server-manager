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

        this.getFirstCharUpperCase = function (key) {
            var label = this.get(key);

            label = label.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
            });
            return label;
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
            "kernel_upgrade": "Kernel Upgrade",
            "kernel_version": "Kernel Version",

            //Server
            "ipmi_address": "IPMI Address",
            "ipmi_username": "IPMI Username",
            "ipmi_password": "IPMI Password",
            "base_image_id": "Base Image",
            'baremetal_edit_vn' : 'Virtual Network',
            "reimaged_id": "Installed Image",
            "package_image_id": "Package",
            "storage_repo_id": "Package",
            "provisioned_id": "Installed Package",
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
            "management_interface": "Management Interface",
            "control_data_interface": "Control Data Interface",
            "live_migration": "Live Migration",
            "live_migration_nfs_vm_host": "Live Migration NFS Host",
            "live_migration_storage_scope": "Live Migration Storage Scope",

            //Tags
            "reservedby": "Reserved By",
            "custom_tag1": "Custom Tag 1",
            "custom_tag2": "Custom Tag 2",
            "user_tag": "Custom Tag",
            "custom_tag": "Custom Tag",

            //Cluster
            "cluster_id": "Cluster",
            "analytics_data_ttl": "Analytics Data TTL",
            "analytics_syslog_port": "Analytics Syslog Port",
            "analytics_data_dir": "Analytics Data Dir",
            "ssd_data_dir": "SSD Data Dir",
            "ext_bgp": "External BGP",
            "openstack_mgmt_ip": "Openstack Management IP",
            "openstack_passwd": "Openstack Password",
            "keystone_tenant": "Keystone Admin Tenant",
            "subnet_mask": "Subnet Mask",
            "router_asn": "Router ASN",
            "multi_tenancy": "Multi Tenancy",
            "uuid": "UUID",
            "use_certificates": "Use Certificates",
            "haproxy": "HA Proxy",
            "encapsulation_priority": "Encapsulation Priority",
            "hc_interval": "Health Check Interval",
            "keystone_ip": "Keystone IP",
            "keystone_username": "Keystone Admin Username",
            "keystone_password": "Keystone Admin Password",
            "keystone_service_tenant": "Keystone Service Tenant",
            "keystone_region_name": "Keystone Region Name",
            "storage_virsh_uuid": "Storage Virsh UUID",
            "storage_fsid": "Storage FSID",
            "new_servers": "New Servers",
            "registered_servers": "Registered Servers",
            "configured_servers": "Configured Servers",
            "inreimage_servers": "In-Reimage Servers",
            "reimaged_servers": "Reimaged Servers",
            "inprovision_servers": "In-Provision Servers",
            "provisioned_servers": "Provisioned Servers",
            "total_servers": "Total Servers",
            "external_bgp": "External BGP",
            "database_dir": "Database Dir",
            "database_token": "Database Token",
            "service_token": "Service Token",
            "storage_mon_secret": "Monitoring Key",
            "osd_bootstrap_key": "OSD Bootstrap Key",
            "admin_key": "Admin Key",
            "internal_vip": "Internal VIP",
            "external_vip": "External VIP",
            "contrail_internal_vip": "Contrail Internal VIP",
            "contrail_external_vip": "Contrail External VIP",
            "nfs_server": "NFS Server",
            "nfs_glance_path": "NFS Glance Path",

            //Images
            'puppet_manifest_version': "Puppet Manifest Version",

            //Roles
            "config": "Config",
            "openstack": "Openstack",
            "control": "Control",
            "compute": "Compute",
            "collector": "Collector",
            "webui": "Webui",
            "database": "Database",
            "storage-compute": "Storage Compute",
            "storage-master": "Storage Master",
            "assign_roles": "Assign Roles"
        };

        this.TITLE_DETAILS = "Details";
        this.TITLE_SERVERS_CONFIG = "Servers Defaults";
        this.TITLE_CONTRAIL = "Contrail";
        this.TITLE_CONTRAIL_CONTROLLER = "Contrail Controller";
        this.TITLE_STORAGE = "Storage";
        this.TITLE_CONTRAIL_STORAGE = "Contrail Storage";
        this.TITLE_OPENSTACK = "Openstack";
        this.TITLE_HA_CONFIG = "High Availability";
        this.TITLE_ANALYTICS_CONFIG = "Analytics";
        this.TITLE_SYSTEM_MANAGEMENT = "System Management";
        this.TITLE_INTERFACES = "Interfaces";
        this.TITLE_PHYSICAL_INTERFACES = "Physical Interfaces";
        this.TITLE_BOND_INTERFACES = "Bond Interfaces";
        this.TITLE_SUB_INTERFACES = "Sub Interfaces";
        this.TITLE_MANAGEMENT_INTERFACES = "Management Interfaces";
        this.TITLE_ROUTE_CONFIGRATIONS = "Route Configurations";
        this.TITLE_TAGS = "Tags";
        this.TITLE_CONFIGURATIONS = "Configurations";
        this.TITLE_SERVER_STATUS = "Server Status";
        this.TITLE_STATUS = "Status";
        this.TITLE_EDIT_CONFIG = "Edit Config";
        this.TITLE_CREATE_CONFIG = "Create Config";
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
        this.TITLE_CONFIGURE = 'Configure';
        this.TITLE_CREATE = 'Create';

        this.TITLE_CLUSTERS = 'Clusters';
        this.TITLE_CLUSTER = 'Cluster';
        this.TITLE_SERVERS = 'Servers';
        this.TITLE_SERVER = 'Server';
        this.TITLE_IMAGES = 'Images';
        this.TITLE_IMAGE = 'Image';
        this.TITLE_PACKAGES = 'Packages';
        this.TITLE_PACKAGE = 'Package';
        this.TITLE_BAREMETAL_SERVERS = 'Baremetal Servers';

        this.SENSORS_INFO = 'Sensors Information';
        this.SELECT_CLUSTER = 'Select Cluster';
        this.SELECT_TYPE = 'Select Type';
        this.TITLE_ADD_CLUSTER = 'Add Cluster';
        this.TITLE_DEL_CLUSTER = 'Delete Cluster';
        this.TITLE_DEL_CLUSTERS = 'Delete Clusters';
        this.TITLE_ADD_SERVER = 'Add Server';
        this.TITLE_ADD_SERVERS = 'Add Servers';
        this.TITLE_REMOVE_SERVERS = 'Remove Servers';
        this.TITLE_ADD_SERVERS_TO_CLUSTER = 'Add Servers to Cluster';
        this.TITLE_ADD_TAGS = 'Add Tags';
        this.TITLE_ADD_IMAGE = 'Add Image';
        this.TITLE_ADD_PACKAGE = 'Add Package';
        this.TITLE_PROVISION_CLUSTER = 'Provision Cluster';
        this.TITLE_ADD_TO_CLUSTER = 'Add to Cluster';
        this.TITLE_REMOVE_FROM_CLUSTER = 'Remove from Cluster';

        this.TITLE_REGISTER = 'Register';
        this.TITLE_CONFIGURE_SERVER = 'Configure Server';
        this.TITLE_CONFIGURE_SERVERS = 'Configure Servers';
        this.TITLE_DEL_SERVER = 'Delete Server';
        this.TITLE_EDIT_TAGS = 'Edit Tags';
        this.TITLE_ASSIGN_ROLES = 'Assign Roles';
        this.TITLE_PROVISION_SERVER = 'Provision Server';
        this.TITLE_PROVISION_SERVERS = 'Provision Servers';
        this.TITLE_SEARCH_SERVERS = 'Search Servers';
        this.TITLE_FILTER_SERVERS = 'Filter Servers';
        this.TITLE_SELECT_SERVERS = 'Select Servers';
        this.TITLE_SELECT_SERVER = 'Select Server';
        this.TITLE_SELECTED_SERVERS = 'Selected Servers';
        this.TITLE_SELECT_MANAGEMENT_INTERFACE = 'Select Management Interface';
        this.TITLE_SELECT_CONTROL_DATA_INTERFACE = 'Select Control Data Interface';
        this.TITLE_SERVER_DETAIL = 'Details';
        this.TITLE_CONFIGURE_INTERFACES = 'Configure Interfaces';
        this.TITLE_SELECT_MANAGEMENT_INTERFACE = 'Select Management Interface';
        this.TITLE_SELECT_CONTROL_DATA_INTERFACE = 'Select Control Data Interface';
        this.TITLE_SERVER_DETAIL = 'Details';
        this.TITLE_CONFIGURE_INTERFACES = 'Configure Interfaces';
        this.TITLE_SELECT_MANAGEMENT_INTERFACE = 'Select Management Interface';
        this.TITLE_SELECT_CONTROL_DATA_INTERFACE = 'Select Control Data Interface';
        this.TITLE_SERVER_DETAIL = 'Details';
        this.TITLE_CONFIGURE_INTERFACES = 'Configure Interfaces';

        this.TITLE_BAREMETAL_SERVERS = 'Baremetal Servers';
        this.TITLE_BAREMETAL_SERVER = 'Baremetal Server';
        this.TITLE_ADD_BAREMETAL_SERVER = 'Add Baremetal Servers';
        this.TITLE_EDIT_BAREMETAL_SERVER = 'Edit Baremetal Server';
        this.TITLE_EDIT_BAREMETAL_VN = 'Edit VN';
        this.TITLE_SELECT_BAREMETAL_SERVER = 'Select Baremetal Server';
        this.TITLE_SELECT_INTERFACE = 'Select Interface';
        this.TITLE_BAREMETAL_INTERFACES = 'Baremetal Interfaces';
        this.TITLE_SELECT_IMAGE = 'Select Image';
        this.TITLE_FILTER_BAREMETALS = 'Filtered Baremetal Servers';

        this.TITLE_SAVE_NEXT = 'Save &amp; Next';
        this.TITLE_NEXT = 'Next';

        this.SELECT_IMAGE = 'Select Image';
        this.TITLE_DELETE_IMAGE = 'Delete Image';
        this.SELECT_PACKAGE = 'Select Package';
        this.TITLE_DELETE_PACKAGE = 'Delete Package';
        this.SELECT_ROLES = 'Select Roles';
        this.SEARCH_ROLES = 'Search Roles';
        this.FILTER_TAGS = 'Filter Tags';
        this.SEARCH_TAGS = 'Search Tags';
        this.SELECT_NETWORK = 'Select Network';
        this.SELECT_INTERFACE = 'Select Interface';
    };
    return Labels;
});