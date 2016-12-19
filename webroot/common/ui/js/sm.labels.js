/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    "underscore"
], function (_) {
    var Labels = {
        get : function (key) {
            var keyArray, newKey;
            if (_.has(this.labelMap, key)) {
                return this.labelMap[key];
            } else {
                keyArray = key.split(".");
                newKey = keyArray[keyArray.length - 1];
                if (keyArray.length > 1 && _.has(this.labelMap, newKey)) {
                    return this.labelMap[newKey];
                } else {
                    newKey = cowu.replaceAll("_", " ", newKey);
                    return capitalizeSentence(newKey);
                }
            }
        },

        isExistKey : function (key) {
            var keyArray, newKey;
            if (_.has(this.labelMap, key)) {
                return true;
            } else {
                keyArray = key.split(".");
                newKey = keyArray[keyArray.length - 1];
                if (keyArray.length > 1 && _.has(this.labelMap, newKey)) {
                    return true;
                }
            }

            return false;
        },

        getInLowerCase : function (key) {
            var label = this.get(key);
            return label.toLowerCase();
        },

        getInUpperCase : function (key) {
            var label = this.get(key);
            return label.toUpperCase();
        },

        getFirstCharUpperCase : function (key) {
            var label = this.get(key);

            label = label.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
            });
            return label;
        },

        labelMap : {
            //General
            "id": "ID",
            "dhcp": "DHCP",
            "email": "Email",
            "domain": "Domain",
            "gateway": "Gateway",
            "ip_address": "IP Address",
            "status": "Status",
            "last_update": "Last Updated",
            "kernel_upgrade": "Kernel Upgrade",
            "kernel_version": "Kernel Version",
            "xmpp_auth_enable": "XMPP Auth",
            "xmpp_dns_auth_enable": "XMPP DNS Auth",

            //Server
            "ipmi_address": "IPMI Address",
            "ipmi_username": "IPMI Username",
            "ipmi_password": "IPMI Password",
            "ipmi_interface": "IPMI Interface",
            "base_image_id": "Configured OS Image",
            "baremetal_edit_vn" : "Virtual Network",
            "reimaged_id": "Installed OS Image",
            "package_image_id": "Configured Package",
            "storage_repo_id": "Storage Repo ID",
            "storage_chassis_id" : "Chassis ID",
            "storage_chassis_id_input" : "Add New Chassis ID",
            "storage_admin_key": "Storage Admin Key",
            "enable": "Enable SRIOV",

            "root_password" : "MySQL Root Password",
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

            //Tags
            "reservedby": "Reserved By",
            "custom_tag1": "Custom Tag 1",
            "custom_tag2": "Custom Tag 2",
            "user_tag": "Custom Tag",
            "custom_tag": "Custom Tag",

            //Cluster
            "cluster_id": "Cluster",
            "analytics_data_ttl": "Analytics Data TTL",
            "analytics_config_audit_ttl": "Analytics Config Audit TTL",
            "analytics_statistics_ttl": "Analytics Statistics TTL",
            "analytics_flow_ttl": "Analytics Flow TTL",
            "snmp_scan_frequency": "SNMP Scan Frequency (Seconds)",
            "snmp_fast_scan_frequency": "SNMP Fast Scan Frequency (Seconds)",
            "topology_scan_frequency": "Topology Scan Frequency (Seconds)",
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
            "admin_password": "Keystone Admin Password",
            "keystone_service_tenant": "Keystone Service Tenant",
            "region": "Openstack Keystone Region Name",
            "amqp_server_ip": "AMQP Server IP",
            "openstack_manage_amqp": "Openstack Managed AMQP",
            "database_ip_port": "Database IP Port",
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
            "database_minimum_diskGB": "Database Min Disk (GB)",
            "database_token": "Database Token",
            "service_token": "Service Token",
            "vgw_public_subnet": "Virtual Gateway Public Subnet",
            "vgw_public_vn_name": "Virtual Gateway Public VN Name",
            "vgw_interface": "Virtual Gateway Interface",
            "vgw_gateway_routes": "Virtual Gateway Routes",
            "storage_mon_secret": "Monitoring Key",
            "osd_bootstrap_key": "OSD Bootstrap Key",
            "admin_key": "Admin Key",
            "internal_vip": "Internal VIP",
            "external_vip": "External VIP",
            "contrail_internal_vip": "Contrail Internal VIP",
            "contrail_external_vip": "Contrail External VIP",
            "contrail_vip" : "Contrail VIP",
            "internal_virtual_router_id" : "Internal Virtual Router ID",
            "external_virtual_router_id" : "External Virtual Router ID",
            "contrail_internal_virtual_router_id" : "Contrail Internal Virtual Router ID",
            "contrail_external_virtual_router_id" : "Contrail External Virtual Router ID",
            "nfs_server": "NFS Server",
            "nfs_glance_path": "NFS Glance Path",
            "vmware_ip" : "VMware IP",
            "vmware_username" : "VMware Username",
            "vmware_password" : "VMware Password",
            "vmware_vswitch"  : "VMware vSwitch Name",

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
            "assign_roles": "Assign Roles",

            //Monitoring
            "disk_name": "Disk",
            "disk_size_kb": "Size",
            "disk_used_percentage": "Used",
            "fs_name": "Name",
            "size_kb": "Size",
            "used_percentage": "Used",
            "mountpoint": "Mount",

            //Inventory
            "physical_processor_count": "Physical Processors",
            "total_numof_disks": "Total Disks",
            "cpu_cores_count": "Processor Count",
            "core_count": "VCPU Count",
            "os": "Operating System",
            "os_family": "OS Family",
            "os_version": "OS Version",
            "virtual_machine": "Virtual Machine",
            "uptime_seconds": "Uptime (secs)",
            "clock_speed_MHz": "Clock Speed (MHz)",
            "num_of_threads": "Threads Per Core",
            "num_of_ports": "Interface Controller Ports",
            "speed_Mb_per_sec": "Speed (Mbps)",
            "num_of_dimms": "Dimms",
            "mem_speed_MHz": "Memory Speed (MHz)",
            "dimm_size_mb": "Dimm Size (MB)",
            "total_mem_mb": "Total Memory (MB)",
            "swap_size_mb": "Swap Size (MB)",

            //FRU
            "board_mfg_date": "Board Manufacture Date",
            "mem_usage_mb": "Memory Used",
            "cpu_usage_percentage": "CPU Utilization",
            "mem_usage_percent": "Memory Usage"
        },

        TITLE_DETAILS : "Details",
        TITLE_OVERVIEW : "Overview",
        TITLE_FRU__BOARD_INFO : "Board Information",
        TITLE_SERVERS_CONFIG : "Servers Defaults",
        TITLE_CONTRAIL : "Contrail",
        TITLE_CONTRAIL_CONTROLLER : "Contrail Controller",
        TITLE_STORAGE : "Storage",
        TITLE_VMWARE : "VMware",
        TITLE_VIRTUAL_GATEWAY : "Virtual Gateway",
        TITLE_CONTRAIL_STORAGE : "Contrail Storage",
        TITLE_OPENSTACK : "Openstack",
        TITLE_HA_CONFIG : "High Availability",
        TITLE_ANALYTICS_CONFIG : "Analytics",
        TITLE_DATABASE : "Database",
        TITLE_SYSTEM_MANAGEMENT : "System Management",
        TITLE_INTERFACES : "Interfaces",
        TITLE_PHYSICAL_INTERFACES : "Physical Interfaces",
        TITLE_ROUTES: "Routes",
        TITLE_OVS_SWITCHES : "OVS Type Switches",
        TITLE_BOND_INTERFACES : "Bond Interfaces",
        TITLE_SUB_INTERFACES : "Sub Interfaces",
        TITLE_MANAGEMENT_INTERFACES : "Management Interfaces",
        TITLE_ROUTE_CONFIGRATIONS : "Route Configurations",
        TITLE_TAGS : "Tags",
        TITLE_CONFIGURATIONS : "Configurations",
        TITLE_SERVER_STATUS : "Server Status",
        TITLE_STATUS : "Status",
        TITLE_EDIT_CONFIG : "Edit Config",
        TITLE_EDIT_JSON : "Edit JSON",
        TITLE_EDIT_DHCP_HOST : "Edit DHCP Host",
        TITLE_EDIT_DHCP_SUBNET : "Edit DHCP Subnet",
        TITLE_CLONE_SERVER : "Clone Server",
        TITLE_CREATE_CONFIG : "Create Config",
        TITLE_ADD : "Add",
        TITLE_REIMAGE : "Reimage",
        TITLE_FILTER : "Filter",
        TITLE_SELECT : "Select",
        TITLE_CONFIRM : "Confirm",
        TITLE_PROVISION : "Provision",
        TITLE_PROVISIONING : "Provisioning",
        TITLE_TAG : "Tag",
        TITLE_TAGS : "Tags",
        TITLE_ROLE : "Role",
        TITLE_ROLES : "Roles",
        TITLE_DELETE : "Delete",
        TITLE_CONFIGURE : "Configure",
        TITLE_CREATE : "Create",
        TITLE_REFRESH_INVENTORY : "Refresh Inventory",
        TITLE_CLONE_SERVER : "Clone Server",

        TITLE_CLUSTERS : "Clusters",
        TITLE_CLUSTER : "Cluster",
        TITLE_SERVERS : "Servers",
        TITLE_SERVER_FRU_INFO : "FRU Information",
        TITLE_SERVER_INTERFACE_INFO : "Interface Information",
        TITLE_SERVER_SENSORS : "Sensors",
        TITLE_SERVER_MONITORING_INTERFACE : "Interface Monitoring",
        TITLE_SERVER_DISK_USAGE : "Disk Usage",
        TITLE_SERVER_FILE_SYSTEM : "File System",
        TITLE_CPU_MEM_INFO : "CPU/Memory Information",
        TITLE_SERVER : "Server",
        TITLE_IMAGES : "OS Images",
        TITLE_IMAGE : "OS Image",
        TITLE_PACKAGES : "Packages",
        TITLE_PACKAGE : "Package",
        TITLE_BAREMETAL_SERVERS : "Baremetal Servers",
        TITLE_MONITORING : "Monitoring",
        TITLE_INVENTORY : "Inventory",
        TITLE_DHCP : "DHCP",
        TITLE_DHCP_HOST : "DHCP Host",
        TITLE_DHCP_SUBNET : "DHCP Subnet",

        SENSORS_INFO : "Sensors Information",
        SELECT_CLUSTER : "Select Cluster",
        SELECT_TYPE : "Select Type",
        SELECT_PARENT_INTERFACE : "Select Parent",
        SELECT_PROTOCOL : "Select Protocol",
        SELECT_MEMBERS : "Select Members",
        TITLE_ADD_CLUSTER : "Add Cluster",
        TITLE_ADD_DHCP_HOST : "Add DHCP Host",
        TITLE_ADD_DHCP_SUBNET : "Add DHCP Subnet",
        TITLE_ADD_NEW_DHCP_HOST : "Add a New DHCP Host",
        TITLE_ADD_NEW_DHCP_SUBNET : "Add a New DHCP Subnet",
        TITLE_DEL_CLUSTER : "Delete Cluster",
        TITLE_DEL_DHCP_HOST : "Delete DHCP Host",
        TITLE_DEL_CLUSTERS : "Delete Clusters",
        TITLE_ADD_SERVER : "Add Server",
        TITLE_ADD_SERVERS : "Add Servers",
        TITLE_REMOVE_SERVERS : "Remove Servers",
        TITLE_ADD_SERVERS_TO_CLUSTER : "Add Servers to Cluster",
        TITLE_ADD_TAGS : "Add Tags",
        TITLE_ADD_IMAGE : "Add OS Image",
        TITLE_ADD_PACKAGE : "Add Package",
        TITLE_PROVISION_CLUSTER : "Provision Cluster",
        TITLE_ADD_TO_CLUSTER : "Add to Cluster",
        TITLE_REMOVE_FROM_CLUSTER : "Remove from Cluster",
        TITLE_EDIT_CLUSTER_CONFIG : "Edit Cluster Configurations",
        TITLE_REFRESH_INVENTORY : "Refresh Inventory",

        TITLE_REGISTER : "Register",
        TITLE_CONFIGURE_SERVER : "Configure Server",
        TITLE_CONFIGURE_SERVERS : "Configure Servers",
        TITLE_EDIT_SERVER_CONFIG : "Edit Server Configurations",
        TITLE_DEL_SERVER : "Delete Server",
        TITLE_EDIT_TAGS : "Edit Tags",
        TITLE_ASSIGN_ROLES : "Assign Roles",
        TITLE_PROVISION_SERVER : "Provision Server",
        TITLE_PROVISION_SERVERS : "Provision Servers",
        TITLE_SEARCH_SERVERS : "Search Servers",
        TITLE_FILTER_SERVERS : "Filter Servers",
        TITLE_SELECT_SERVERS : "Select Servers",
        TITLE_SELECT_SERVER : "Select Server",
        TITLE_SELECTED_SERVERS : "Selected Servers",
        TITLE_SELECT_MANAGEMENT_INTERFACE : "Select Management Interface",
        TITLE_SELECT_CONTROL_DATA_INTERFACE : "Select Control Data Interface",
        TITLE_SERVER_DETAIL : "Details",
        TITLE_CONFIGURE_INTERFACES : "Configure Interfaces",
        TITLE_SELECT_MANAGEMENT_INTERFACE : "Select Management Interface",
        TITLE_SELECT_CONTROL_DATA_INTERFACE : "Select Control Data Interface",
        TITLE_SERVER_DETAIL : "Details",
        TITLE_CONFIGURE_INTERFACES : "Configure Interfaces",
        TITLE_SELECT_MANAGEMENT_INTERFACE : "Select Management Interface",
        TITLE_SELECT_CONTROL_DATA_INTERFACE : "Select Control Data Interface",
        TITLE_SERVER_DETAIL : "Details",
        TITLE_CONFIGURE_INTERFACES : "Configure Interfaces",

        TITLE_BAREMETAL_SERVERS : "Baremetal Servers",
        TITLE_BAREMETAL_SERVER : "Baremetal Server",
        TITLE_ADD_BAREMETAL_SERVER : "Add Baremetal Servers",
        TITLE_EDIT_BAREMETAL_SERVER : "Edit Baremetal Server",
        TITLE_EDIT_BAREMETAL_VN : "Edit VN",
        TITLE_SELECT_BAREMETAL_SERVER : "Select Baremetal Server",
        TITLE_SELECT_INTERFACE : "Select Interface",
        TITLE_BAREMETAL_INTERFACES : "Baremetal Interfaces",
        TITLE_SELECT_IMAGE : "Select OS Image",
        TITLE_FILTER_BAREMETALS : "Filtered Baremetal Servers",

        TITLE_SAVE_NEXT : "Save &amp; Next",
        TITLE_NEXT : "Next",

        TITLE_SERVER_CPU : "CPU",
        TITLE_SERVER_MEMORY : "Memory",
        TITLE_SERVER_ETH_CONTROLLER : "Interface Controller",
        TITLE_SERVER_CHASSIS_STATE : "Chassis State",

        SELECT_IMAGE : "Select OS Image",
        TITLE_DELETE_IMAGE : "Delete OS Image",
        SELECT_PACKAGE : "Select Package",
        SELECT_REPO_ID : "Select Repo ID",
        SELECT_CHASSIS_ID : "Select Chassis ID",
        TITLE_DELETE_PACKAGE : "Delete Package",
        SELECT_ROLES : "Select Roles",
        SEARCH_ROLES : "Search Roles",
        FILTER_TAGS : "Filter Tags",
        SEARCH_TAGS : "Search Tags",
        SELECT_NETWORK : "Select Network",
        SELECT_INTERFACE : "Select Interface",

        SM_CLUSTER_LIST_VIEW_ID : "cluster-list-view",
        SM_CLUSTER_VIEW_ID : "cluster-view",
        SM_CLUSTER_LIST_SECTION_ID : "cluster-list-section",
        SM_CLUSTER_GRID_SECTION_ID : "cluster-grid-section",
        SM_DHCP_HOST_GRID_SECTION_ID : "dhcp-host-grid-section",
        SM_DHCP_SUBNET_GRID_SECTION_ID : "dhcp-subnet-grid-section",
        SM_CLUSTER_SCATTER_CHART_ID : "cluster-scatter-chart",
        SM_CLUSTER_GRID_VIEW_ID : "cluster-grid-vew",
        SM_CLUSTER_GRID_ID : "cluster-grid",
        SM_DHCP_HOST_GRID_ID : "dhcp-host-grid",
        SM_DHCP_SUBNET_GRID_ID : "dhcp-subnet-grid",
        SM_CLUSTER_SECTION_ID : "cluster-section",
        SM_CLUSTER_TAB_VIEW_ID : "cluster-tab-view",
        SM_CLUSTER_TAB_ID : "cluster-tab",
        SM_CLUSTER_TAB_DETAILS_ID : "cluster-tab-details",
        SM_CLUSTER_TAB_SERVERS_ID : "cluster-tab-servers",
        SM_CLUSTER_TAB_SECTION_ID : "cluster-tab-section",

        SM_SERVER_LIST_VIEW_ID : "server-list-view",
        SM_SERVER_VIEW_ID : "server-view",
        SM_SERVER_LIST_SECTION_ID : "server-list-section",
        SM_SERVER_GRID_SECTION_ID : "server-grid-section",
        SM_SERVER_GRID_VIEW_ID : "server-grid-view",
        SM_SERVER_GRID_ID : "server-grid",
        SM_SERVER_SECTION_ID : "server-section",
        SM_SERVER_TAB_VIEW_ID : "server-tab-view",
        SM_SERVER_TAB_ID : "server-tab",
        SM_SERVER_TAB_DETAILS_ID : "server-tab-details",
        SM_SERVER_TAB_INVENTORY_ID : "server-tab-inventory",
        SM_SERVER_INVENTORY_SECTION_ID : "server-inventory-section",
        SM_SERVER_INVENTORY_LEFT_SECTION_ID : "server-inventory-left-section",
        SM_SERVER_INVENTORY_RIGHT_SECTION_ID : "server-inventory-right-section",
        SM_SERVER_INVENTORY_DETAILS_ID : "server-inventory-details",
        SM_SERVER_INVENTORY_FRU_GRID_ID : "server-inventory-fru-grid",
        SM_SERVER_INVENTORY_INTERFACE_GRID_ID : "server-inventory-interface-grid",
        SM_SERVER_TAB_MONITORING_ID : "server-tab-monitoring",
        SM_SERVER_MONITORING_SECTION_ID : "server-monitoring-section",
        SM_SERVER_MONITORING_INNER_LEFT_SECTION_ID : "server-monitoring-inner-left-section",
        SM_SERVER_MONITORING_INNER_RIGHT_SECTION_ID : "server-monitoring-inner-right-section",
        SM_SERVER_CHASSIS_DETAILS_ID : "server-chassis-details",
        SM_SERVER_MONITORING_SENSOR_GRID_ID : "server-monitoring-sensor-grid",
        SM_SERVER_MONITORING_INTERFACE_GRID_ID : "server-monitoring-interface-grid",
        SM_SERVER_MONITORING_DISKUSAGE_GRID_ID : "server-monitoring-diskusage-grid",
        SM_SERVER_MONITORING_FILESYSTEM_GRID_ID : "server-monitoring-filesystem-grid",
        SM_SERVER_MONITORING_RESOURCE_INFO_ID : "server-monitoring-resourceinfo-grid",
        SM_SERVER_TAB_SECTION_ID : "server-tab-section",
        SM_SERVER_SCATTER_CHART_ID : "server-scatter-chart",

        SM_IMAGE_LIST_VIEW_ID : "image-list-view",
        SM_IMAGE_LIST_SECTION_ID : "image-list-section",
        SM_IMAGE_GRID_SECTION_ID : "image-grid-section",
        SM_IMAGE_GRID_VIEW_ID : "image-grid-view",
        SM_IMAGE_GRID_ID : "image-grid",

        SM_PACKAGE_LIST_VIEW_ID : "package-list-view",
        SM_PACKAGE_LIST_SECTION_ID : "package-list-section",
        SM_PACKAGE_GRID_SECTION_ID : "package-grid-section",
        SM_PACKAGE_GRID_VIEW_ID : "package-grid-view",
        SM_PACKAGE_GRID_ID : "package-grid",

        SM_DHCP_HOST_GRID_VIEW_ID : "dhcp-host-grid-view",
        SM_DHCP_HOST_LIST_SECTION_ID : "dhcp-host-list-section",

        SM_DHCP_HOST_LIST_VIEW_ID : "dhcp-host-list-view",

        SM_DHCP_SUBNET_GRID_VIEW_ID : "dhcp-subnet-grid-view",
        SM_DHCP_SUBNET_LIST_VIEW_ID : "dhcp-subnet-list-view",
        SM_DHCP_SUBNET_LIST_SECTION_ID : "dhcp-subnet-list-section",

        LABEL_HA_PROXY_ENABLE : "HA Proxy Enable",
        LABEL_ZOOKEEPER_IP_PORT : "Zookeeper IP Port",
        LABEL_NEUTRON_PORT : "Neutron Port",
        LABEL_AMQP_SERVER_IP : "AMQP Server IP",
        LABEL_AMQP_SSL: "AMQP SSL",
        LABEL_KEYSTONE_IP : "Keystone IP",
        LABEL_KEYSTONE_ADMIN_TENANT : "Keystone Admin Tenant",
        LABEL_KEYSTONE_SERVICE_TENANT : "Keystone Service Tenant",
        LABEL_KEYSTONE_ADMIN_USER : "Keystone Admin User",
        LABEL_NEUTRON_SERVICE_PROTOCOL : "Neutron Service Protocol",
        LABEL_ANALYTICS_DATA_TTL : "Analytics Data TTL",
        LABEL_ANALYTICS_FLOW_TTL : "Analytics Flow TTL",
        LABEL_ANALYTICS_CONFIG_AUDIT_TTL : "Analytics Config Audit TTL",
        LABEL_ANALYTICS_STATISTICS_TTL : "Analytics Stats TTL",
        LABEL_VMWARE_IP : "VMware IP",
        LABEL_VMWARE_VSWITCH : "VMware vSwitch",
        LABEL_VMWARE_USERNAME : "VMware Username",
        LABEL_VMWARE_PASSWORD : "VMware Password",
        LABEL_VGW_PUBLIC_SUBNET : "VGW Public Interface",
        LABEL_VGW_PUBLIC_VN_NAME : "VGW Public VN Name",
        LABEL_VGW_INTERFACE :  "VGW Interface",
        LABEL_VGW_GATEWAY_ROUTES :  "VGW Gateway Routes",
    };

    function capitalizeSentence(sentence) {
        var word = sentence.split(" ");
        for ( var i = 0; i < word.length; i++ ) {
            word[i] = word[i].charAt(0).toUpperCase() + word[i].slice(1);
        }
        return word.join(" ");
    }

    return Labels;
});
