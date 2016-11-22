/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([], function () {
   var SMConstants = {
        TIMEOUT : 600 * 1000,
        IMAGE_PREFIX_ID : "image",
        PACKAGE_PREFIX_ID : "package",
        CLUSTER_PREFIX_ID : "cluster",
        SERVER_PREFIX_ID : "server",
        BAREMETAL_PREFIX_ID : "baremetal",
        SM_PREFIX_ID : "sm",
        BM_PREFIX_ID : "bm",
        DHCP_HOST_PREFIX_ID : "dhcp_host",
        DHCP_SUBNET_PREFIX_ID : "dhcp_subnet",


        CATEGORY_IMAGE : "image",
        CATEGORY_PACKAGE : "package",

        SM_API_SERVER : "sm-api-server",
        DFLT_SERVER_IP : "127.0.0.1",

        ROLES_ARRAY : ["config", "openstack", "control", "compute", "collector", "webui", "database", "storage-compute", "storage-master", "toragent", "tsn"],
        ROLES_OBJECTS : [
            {"id": "config", "text": "Config"},
            {"id": "openstack", "text": "Openstack"},
            {"id": "control", "text": "Control"},
            {"id": "compute", "text": "Compute"},
            {"id": "collector", "text": "Collector"},
            {"id": "webui", "text": "Webui"},
            {"id": "database", "text": "Database"},
            {"id": "storage-compute", "text": "Storage Compute"},
            {"id": "storage-master", "text": "Storage Master"},
            {"id": "toragent", "text": "TOR Agent"},
            {"id": "tsn", "text": "TSN"}
        ],

        INTERFACE_TYPE_PHYSICAL : "physical",
        INTERFACE_TYPE_BOND : "bond",
        INTERFACE_TYPE_SUB : "subinterface",


        STATES : [
            {"id": "enable", "text": "Enable"},
            {"id": "disable", "text": "Disable"}
        ],

        STATES_YES_NO : [
            {"id": "yes", "text": "Yes"},
            {"id": "no", "text": "No"}
        ],

        IPMI_INTERFACE_TYPES : [
            {
                id: "lan",
                text: "Lan"
            },
            {
                id: "lanplus",
                text: "Lanplus"
            }
        ],

        INTERFACE_TYPES : [
            {
                text: "physical",
                value: "physical"
            },
            {
                text: "bond",
                value: "bond"
            }
        ],

        FLAGS : [
            {"id": "False", "text": "False"},
            {"id": "True", "text": "True"}
        ],

        FLAGS_TRUE_FALSE_BOOLEAN_TYPE : [
            {"id": false, "text": "False"},
            {"id": true, "text": "True"}
        ],

        FLAGS_RADIO : [
            {"label": "False", "value": "False"},
            {"label": "True", "value": "True"}
        ],

        STATES_YES_NO_RADIO : [
            {"label": "Yes", "value": "yes"},
            {"label": "No", "value": "no"}
        ],
        STATES_ENABLE_DISABLE_RADIO : [
            {"label": "Enable", "value": "enable"},
            {"label": "Disable", "value": "disable"}
        ],

        STORAGE_SCOPE : [
            {"id": "global", "text": "Global"},
            {"id": "local", "text": "Local"}
        ],

        OVS_PROTOCOLS : [
            {"id": "tcp", "text": "TCP"},
            {"id": "pssl", "text": "pssl"}
        ],

        get : function () {
            var args = arguments;
            return cowu.getValueFromTemplate(args)
        },

        SERVERS_STATE_PROCESSOR : "computeServerStates",

        URL_TAG_NAMES : "/sm/tags/names",
        URL_OBJ_DETAILS : "/sm/objects/details/",
        URL_SERVER_IPMI_INFO : "/sm/server/ipmiinfo/",
        URL_OBJECTS : "/sm/objects/",
        URL_TAG_VALUES : "/sm/tags/values/",
        URL_SERVER_PROVISION : "/sm/server/provision",
        URL_SERVER_PROVISION : "/sm/server/provision",
        URL_OBJ_CLUSTER_ID : "/sm/objects/cluster?id=",
        URL_OBJ_SERVER_ID : "/sm/objects/server?id=",
        URL_OBJ_SERVER_MAC_ADDRESS : "/sm/objects/server?mac_address=",
        URL_SERVER_REIMAGE : "/sm/server/reimage",
        URL_OBJ_IMAGE_ID : "/sm/objects/image?id=",
        URL_OBJ_DHCP_HOST_ID : "/sm/objects/dhcp_host?host_fqdn=",
        URL_OBJ_DHCP_SUBNET_ID : "/sm/objects/dhcp_subnet?subnet_address=",
        URL_BAREMETAL_SERVER : "/api/tenants/config/baremetal-details",
        URL_BAREMETAL_ADD : "/api/tenants/config/baremetal",
        URL_NETWORKS : "/api/admin/config/get-data?type=virtual-network",
        URL_PHYSICAL_INTERFACES : "/api/tenants/config/physical-interfaces/",
        URL_PHYSICAL_INTERFACE : "/api/tenants/config/physical-interface/",
        URL_DELETE_PORT : "/api/tenants/config/delete-port/",
        URL_CREATE_PORT : "/api/tenants/config/create-port",
        URL_PORTS : "/api/tenants/config/ports",
        URL_VM : "/api/tenants/config/li-virtual-machine",
        URL_PHYSICAL_ROUTERS_LIST : "/api/tenants/config/physical-routers-list",
        URL_MAP_VIRTUAL_MACHINE_REFS : "/api/tenants/config/map-virtual-machine-refs/",
        SM_SERVER_MONITORING_INFO_URL : "/sm/server/monitoring/info?{0}",
        SM_SERVER_MONITORING_INFO_SUMMARY_URL : "/sm/server/monitoring/info/summary?{0}",
        SM_SERVER_MONITORING_CONFIG_URL : "/sm/server/monitoring/config",
        SM_SERVER_INVENTORY_INFO_URL : "/sm/server/inventory/info?{0}",
        URL_RUN_INVENTORY : "/sm/run_inventory",
        URL_CHASSIS_ID : "/sm/chassis/ids",

        CACHED_TAG_COLORS : {},
        MONITORING_CONFIG : {},

        URL_HASH_SM_CLUSTERS : "setting_sm_clusters",
        URL_HASH_SM_SERVERS : "setting_sm_servers",
        URL_HASH_BM_SERVERS : "config_pd_baremetal",

        KEY_CONFIGURE_VALIDATION : "configureValidation",
        KEY_EDIT_TAGS_VALIDATION : "editTagsValidation",
        KEY_ADD_VALIDATION : "addValidation",
        KEY_REIMAGE_VALIDATION : "reimageValidation",
        KEY_PROVISION_VALIDATION : "provisionValidation",

        TMPL_BAREMETAL_PAGE_DETAIL : "baremetal-detail-page-template",
        TMPL_DELETE_IMAGE : "sm-delete-image-template",
        TMPL_DELETE_PACKAGE : "sm-delete-package-template",
        TMPL_DELETE_DHCP_HOST : "sm-delete-dhcp-host-template",
        TMPL_DELETE_DHCP_SUBNET : "sm-delete-dhcp-subnet-template",
        TMPL_TAGS : "sm-tags-template",

        IMAGE_TYPES : ["ubuntu", "centos", "redhat", "esxi5.1", "esxi5.5", "fedora"],
        PACKAGE_TYPES : ["contrail-ubuntu-package", "contrail-centos-package", "contrail-storage-ubuntu-package"],

        TMPL_BM_EDIT_FORM : "bm-edit-form-template",

        URL_TAGGED_SERVERS : "/#p=setting_sm_servers&q[tag][{{params.tag}}]={{key}}",

        UCID_PREFIX_SM : "server-manager",
        UCID_PREFIX_LISTS : "lists",
        UCID_PREFIX_UVES : "uves",

        UCID_PREFIX_SM_LISTS : this.UCID_PREFIX_SM + ":" + this.UCID_PREFIX_LISTS + ":",
        UCID_PREFIX_SM_UVES : this.UCID_PREFIX_SM + ":" + this.UCID_PREFIX_UVES + ":",

        UCID_ALL_CLUSTER_LIST : this.UCID_PREFIX_SM_LISTS + "all-clusters",
        UCID_CLUSTER_SERVER_LIST : this.UCID_PREFIX_SM_LISTS + "{0}:servers",

        UCID_ALL_SERVER_LIST : this.UCID_PREFIX_SM_LISTS + "all-servers",
        UCID_ALL_SERVER_MONITORING_LIST : this.UCID_PREFIX_SM_LISTS + "all-server-monitoring",
        UCID_ALL_SERVER_MONITORING_SUMMARY_LIST : this.UCID_PREFIX_SM_LISTS + "all-server-monitoring-summary",
        UCID_CLUSTER_SERVER_MONITORING_LIST : this.UCID_PREFIX_SM_LISTS + "{0}:all-server-monitoring",
        UCID_CLUSTER_SERVER_MONITORING_SUMMARY_LIST : this.UCID_PREFIX_SM_LISTS + "{0}:all-server-monitoring-summary",

        UCID_SERVER_INVENTORY_UVE : this.UCID_PREFIX_SM_UVES + "{0}:inventory",
        UCID_SERVER_MONITORING_UVE : this.UCID_PREFIX_SM_UVES + "{0}:monitoring",

        UCID_ALL_IMAGE_LIST : this.UCID_PREFIX_SM_LISTS + "all-images",
        UCID_ALL_PACKAGE_LIST : this.UCID_PREFIX_SM_LISTS + "all-packages",

        UMID_SERVER_INVENTORY_UVE : "uve:{0}:inventory",
        UMID_SERVER_MONITORING_UVE : "uve:{0}:monitoring",

        TYPE_OVS : "ovs"

    };

    return SMConstants;

});
