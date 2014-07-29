/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var SMConstants = function() {
        this.IMAGE_PREFIX_ID = 'image',
        this.REPO_PREFIX_ID = 'repo',
        this.VNS_PREFIX_ID = 'vns',
        this.CLUSTER_PREFIX_ID = 'cluster',
        this.SERVER_PREFIX_ID = 'server';
        this.SM_PREFIX_ID = 'sm';

        this.SM_API_SERVER = 'sm-api-server';
        this.DFLT_SERVER_IP = '127.0.0.1';
    }
    return SMConstants;
});