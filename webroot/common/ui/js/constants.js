/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function(_) {
    var Constants = function() {
        this.IMAGE_PREFIX_ID = 'image';
        this.REPO_PREFIX_ID = 'repo';
        this.CLUSTER_PREFIX_ID = 'cluster';
        this.SERVER_PREFIX_ID = 'server';
        this.SM_PREFIX_ID = 'sm';

        this.SM_API_SERVER = 'sm-api-server';
        this.DFLT_SERVER_IP = '127.0.0.1';
        this.ROLES = ['config', 'openstack', 'control', 'compute', 'collector', 'webui', 'database'];
    }
    return Constants;
});