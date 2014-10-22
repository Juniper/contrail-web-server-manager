/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function (_) {
    var Constants = function () {
        this.IMAGE_PREFIX_ID = 'image';
        this.PACKAGE_PREFIX_ID = 'package';
        this.CLUSTER_PREFIX_ID = 'cluster';
        this.SERVER_PREFIX_ID = 'server';
        this.SM_PREFIX_ID = 'sm';

        this.SM_API_SERVER = 'sm-api-server';
        this.DFLT_SERVER_IP = '127.0.0.1';
        this.ROLES_ARRAY = ['config', 'openstack', 'control', 'compute', 'collector', 'webui', 'database'];
        this.ROLES_OBJECTS = [
            {'id': 'config', 'text': 'Config'},
            {'id': 'openstack', 'text': 'Openstack'},
            {'id': 'control', 'text': 'Control'},
            {'id': 'compute', 'text': 'Compute'},
            {'id': 'collector', 'text': 'Collector'},
            {'id': 'webui', 'text': 'Webui'},
            {'id': 'database', 'text': 'Database'}
        ];
        this.STATES = [
            {'id': 'enable', 'text': 'Enable'},
            {'id': 'disable', 'text': 'Disable'}

        ];
        this.FLAGS = [
            {'id': 'False', 'text': 'False'},
            {'id': 'True', 'text': 'True'}
        ];
        this.PATTERN_IP_ADDRESS = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        this.PATTERN_MAC_ADDRESS = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;

        this.ERROR_SUFFIX_ID = "_error";
        this.LOCKED_SUFFIX_ID = "_locked";

        this.SERVERS_STATE_PROCESSOR = "computeServerStates";

        this.GET_METHOD = "GET";
        this.POST_METHOD = "POST";
        this.PUT_METHOD = "PUT";

        this.URL_TAG_NAMES = '/sm/tags/names';
    }
    return Constants;
});