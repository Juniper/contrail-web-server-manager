/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function (_) {
    var SMUtils = function () {
        var self = this;

        this.getObjectDetailUrl = function (objectName, postProcessor) {
            var url = smwc.URL_OBJ_DETAILS + objectName;
            url += (postProcessor != null) ? ("?postProcessor=" + postProcessor) : '';
            return url;
        };

        this.getServerSensorsUrl = function (server) {
            var url = smwc.URL_SERVER_IPMI_INFO + server;
            return url;
        };

        this.getObjectUrl = function (objectName) {
            return smwc.URL_OBJECTS + objectName;
        };

        this.getTagsUrl = function (qs) {
            var url = smwc.URL_TAG_VALUES;
            url += (qs != null) ? qs : '';
            return url;
        };

        this.getTagValueUrl = function (value) {
            return smwc.URL_TAG_VALUES + value;
        };

        this.removeRolesFromServers = function(serversObj) {
            var servers = serversObj[smwc.SERVER_PREFIX_ID],
                server;
            for (var i = 0; i < servers.length; i++) {
                server = servers[i];
                server['roles'] = [];
            }
        };

        this.getQueryString4ServersUrl = function(hashParams) {
            var queryString = '', tagKey, tagQueryArray = [];

            if (hashParams['cluster_id'] != null) {
                queryString += '?cluster_id=' + hashParams['cluster_id'];
            }

            if (hashParams['tag'] != null) {
                for (tagKey in hashParams['tag']) {
                    tagQueryArray.push(tagKey + "=" + hashParams['tag'][tagKey]);
                }
                queryString += '?tag=' + tagQueryArray.join(',');
            }
            return queryString;
        };

        this.handleChassisId = function (params) {
            if (contrail.checkIfExist(params['storage_chassis_id_input'])) {
                if (params['storage_chassis_id_input'] != "") {
                    params['storage_chassis_id'] = params['storage_chassis_id_input'];
                }
                delete params['storage_chassis_id_input'];
            }
            return params;
        };
    };

    return SMUtils;
});
