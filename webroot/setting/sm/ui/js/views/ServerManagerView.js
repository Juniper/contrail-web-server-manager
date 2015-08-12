/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view'
], function (_, ContrailView) {
    var ServerManagerView = ContrailView.extend({
        el: $(contentContainer),

        renderClusters: function (paramObject) {
            var self = this,
                hashParams = paramObject['hashParams'],
                clusterId = hashParams['cluster_id'];

            if (contrail.checkIfExist(clusterId)) {
                var clusterViewConfig = {
                    elementId: smwl.SM_CLUSTER_VIEW_ID,
                    view: "ClusterView",
                    app: cowc.APP_CONTRAIL_SM,
                    viewConfig: {clusterId: clusterId}
                };
                self.renderView4Config(contentContainer, null, clusterViewConfig);
                pushBreadcrumb([clusterId]);
            } else {
                var clusterListViewConfig = {
                    elementId: smwl.SM_CLUSTER_LIST_VIEW_ID,
                    view: "ClusterListView",
                    app: cowc.APP_CONTRAIL_SM,
                    viewConfig: {}
                };
                self.renderView4Config(contentContainer, null, clusterListViewConfig);
            }
        },

        renderServers: function (paramObject) {
            var self = this,
                hashParams = paramObject['hashParams'],
                serverId = hashParams['server_id'];

            if (contrail.checkIfExist(serverId)) {
                var serverViewConfig = {
                    elementId: smwl.SM_SERVER_VIEW_ID,
                    view: "ServerView",
                    app: cowc.APP_CONTRAIL_SM,
                    viewConfig: {serverId: serverId}
                };
                self.renderView4Config(contentContainer, null, serverViewConfig);
                pushBreadcrumb([serverId]);
            } else {
                var serverListViewConfig = {
                    elementId: smwl.SM_SERVER_LIST_VIEW_ID,
                    view: "ServerListView",
                    app: cowc.APP_CONTRAIL_SM,
                    viewConfig: {serverColumnsType: smwc.SERVER_PREFIX_ID, hashParams: hashParams}
                };
                self.renderView4Config(contentContainer, null, serverListViewConfig);
            }
        },

        renderImages: function (paramObject) {
            var self = this;

            var imageListViewConfig = {
                elementId: smwl.SM_IMAGE_LIST_VIEW_ID,
                view: "ImageListView",
                app: cowc.APP_CONTRAIL_SM,
                viewConfig: {}
            };
            self.renderView4Config(contentContainer, null, imageListViewConfig);
        },

        renderPackages: function (paramObject) {
            var self = this;

            var packageListViewConfig = {
                elementId: smwl.SM_PACKAGE_LIST_VIEW_ID,
                view: "PackageListView",
                app: cowc.APP_CONTRAIL_SM,
                viewConfig: {}
            };
            self.renderView4Config(contentContainer, null, packageListViewConfig);
        }
    });

    return ServerManagerView;
});