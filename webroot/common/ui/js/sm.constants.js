/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function (_) {
    var SMConstants = function () {
        this.TIMEOUT = 600 * 1000;
        this.IMAGE_PREFIX_ID = 'image';
        this.PACKAGE_PREFIX_ID = 'package';
        this.CLUSTER_PREFIX_ID = 'cluster';
        this.SERVER_PREFIX_ID = 'server';
        this.BAREMETAL_PREFIX_ID = 'baremetal';
        this.SM_PREFIX_ID = 'sm';
        this.BM_PREFIX_ID = 'bm';


        this.CATEGORY_IMAGE = 'image';
        this.CATEGORY_PACKAGE = 'package';

        this.SM_API_SERVER = 'sm-api-server';
        this.DFLT_SERVER_IP = '127.0.0.1';

        this.ROLES_ARRAY = ['config', 'openstack', 'control', 'compute', 'collector', 'webui', 'database', 'storage-compute', 'storage-master'];
        this.ROLES_OBJECTS = [
            {'id': 'config', 'text': 'Config'},
            {'id': 'openstack', 'text': 'Openstack'},
            {'id': 'control', 'text': 'Control'},
            {'id': 'compute', 'text': 'Compute'},
            {'id': 'collector', 'text': 'Collector'},
            {'id': 'webui', 'text': 'Webui'},
            {'id': 'database', 'text': 'Database'},
            {'id': 'storage-compute', 'text': 'Storage Compute'},
            {'id': 'storage-master', 'text': 'Storage Master'}
        ];

        this.STATES = [
            {'id': 'enable', 'text': 'Enable'},
            {'id': 'disable', 'text': 'Disable'}

        ];

        this.STATES_YES_NO = [
            {'id': 'yes', 'text': 'Yes'},
            {'id': 'no', 'text': 'No'}

        ];

        this.INTERFACE_TYPES = [
            {
                text: 'physical',
                value: 'physical'
            },
            {
                text: 'bond',
                value: 'bond'
            }
        ];

        this.FLAGS = [
            {'id': 'False', 'text': 'False'},
            {'id': 'True', 'text': 'True'}
        ];

        this.STORAGE_SCOPE = [
            {'id': 'global', 'text': 'Global'},
            {'id': 'local', 'text': 'Local'}
        ];

        this.get = function () {
            var args = arguments;
            return cowu.getValueFromTemplate(args);
        };

        this.SERVERS_STATE_PROCESSOR = "computeServerStates";

        this.URL_TAG_NAMES = '/sm/tags/names';
        this.URL_OBJ_DETAILS ='/sm/objects/details/';
        this.URL_SERVER_IPMI_INFO ='/sm/server/ipmiinfo/';
        this.URL_OBJECTS = '/sm/objects/';
        this.URL_TAG_VALUES = '/sm/tags/values/';
        this.URL_SERVER_PROVISION = '/sm/server/provision';
        this.URL_SERVER_PROVISION = '/sm/server/provision';
        this.URL_OBJ_CLUSTER_ID = '/sm/objects/cluster?id=';
        this.URL_OBJ_SERVER_ID = '/sm/objects/server?id=';
        this.URL_SERVER_REIMAGE = '/sm/server/reimage';
        this.URL_OBJ_IMAGE_ID = '/sm/objects/image?id=';
        this.URL_BAREMETAL_SERVER = '/api/tenants/config/baremetal-details';
        this.URL_BAREMETAL_ADD = '/api/tenants/config/baremetal';
        this.URL_NETWORKS = '/api/admin/config/get-data?type=virtual-network';
        this.URL_PHYSICAL_INTERFACES = '/api/tenants/config/physical-interfaces/';
        this.URL_PHYSICAL_INTERFACE = '/api/tenants/config/physical-interface/';
        this.URL_DELETE_PORT = '/api/tenants/config/delete-port/';
        this.URL_CREATE_PORT = '/api/tenants/config/create-port';
        this.URL_PORTS = '/api/tenants/config/ports';
        this.URL_VM = '/api/tenants/config/li-virtual-machine';
        this.URL_PHYSICAL_ROUTERS_LIST = '/api/tenants/config/physical-routers-list';
        this.URL_MAP_VIRTUAL_MACHINE_REFS = '/api/tenants/config/map-virtual-machine-refs/';
        this.SM_SERVER_MONITORING_INFO_URL = '/sm/server/monitoring/info?{0}';
        this.SM_SERVER_MONITORING_INFO_SUMMARY_URL = '/sm/server/monitoring/info/summary?{0}';
        this.SM_SERVER_MONITORING_CONFIG_URL = '/sm/server/monitoring/config';
        this.SM_SERVER_INVENTORY_INFO_URL = '/sm/server/inventory/info?{0}';
        this.URL_CHASSIS_ID = '/sm/chassis/ids'

        this.CACHED_TAG_COLORS = {};
        this.MONITORING_CONFIG = {};

        this.URL_HASH_SM_CLUSTERS = 'setting_sm_clusters';
        this.URL_HASH_SM_SERVERS = 'setting_sm_servers';
        this.URL_HASH_BM_SERVERS = 'config_pd_baremetal';

        this.KEY_CONFIGURE_VALIDATION = 'configureValidation';
        this.KEY_EDIT_TAGS_VALIDATION = 'editTagsValidation';
        this.KEY_ADD_VALIDATION = 'addValidation';
        this.KEY_REIMAGE_VALIDATION = 'reimageValidation';
        this.KEY_PROVISION_VALIDATION = 'provisionValidation';

        this.TMPL_BAREMETAL_PAGE_DETAIL = "baremetal-detail-page-template";
        this.TMPL_DELETE_IMAGE = "sm-delete-image-template";
        this.TMPL_DELETE_PACKAGE = "sm-delete-package-template";
        this.TMPL_TAGS = "sm-tags-template";

        this.IMAGE_TYPES = ['ubuntu', 'centos', 'redhat', 'esxi5.1', 'esxi5.5', 'fedora'];
        this.PACKAGE_TYPES = ['contrail-ubuntu-package', 'contrail-centos-package', 'contrail-storage-ubuntu-package'];

        this.TMPL_BM_EDIT_FORM = "bm-edit-form-template";

        this.URL_TAGGED_SERVERS = '/#p=setting_sm_servers&q[tag][{{params.tag}}]={{key}}';

        this.UCID_PREFIX_SM = "server-manager";
        this.UCID_PREFIX_LISTS = "lists";
        this.UCID_PREFIX_UVES = "uves";
        this.UCID_PREFIX_SM_LISTS = this.UCID_PREFIX_SM + ":" + this.UCID_PREFIX_LISTS + ":";
        this.UCID_PREFIX_SM_UVES = this.UCID_PREFIX_SM + ":" + this.UCID_PREFIX_UVES + ":";

        this.UCID_ALL_CLUSTER_LIST = this.UCID_PREFIX_SM_LISTS + "all-clusters";
        this.UCID_CLUSTER_SERVER_LIST = this.UCID_PREFIX_SM_LISTS + "{0}:servers";

        this.UCID_ALL_SERVER_LIST = this.UCID_PREFIX_SM_LISTS + "all-servers";
        this.UCID_ALL_SERVER_MONITORING_LIST = this.UCID_PREFIX_SM_LISTS + "all-server-monitoring";
        this.UCID_ALL_SERVER_MONITORING_SUMMARY_LIST = this.UCID_PREFIX_SM_LISTS + "all-server-monitoring-summary";
        this.UCID_CLUSTER_SERVER_MONITORING_LIST = this.UCID_PREFIX_SM_LISTS + "{0}:all-server-monitoring";
        this.UCID_CLUSTER_SERVER_MONITORING_SUMMARY_LIST = this.UCID_PREFIX_SM_LISTS + "{0}:all-server-monitoring-summary";

        this.UCID_SERVER_INVENTORY_UVE = this.UCID_PREFIX_SM_UVES + "{0}:inventory";
        this.UCID_SERVER_MONITORING_UVE = this.UCID_PREFIX_SM_UVES + "{0}:monitoring";

        this.UCID_ALL_IMAGE_LIST = this.UCID_PREFIX_SM_LISTS + "all-images";
        this.UCID_ALL_PACKAGE_LIST = this.UCID_PREFIX_SM_LISTS + "all-packages";

        this.UMID_SERVER_INVENTORY_UVE = "uve:{0}:inventory";
        this.UMID_SERVER_MONITORING_UVE = "uve:{0}:monitoring";
    }
    return SMConstants;
});
