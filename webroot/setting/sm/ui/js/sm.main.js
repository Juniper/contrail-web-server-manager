/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var clustersPageLoader = new ClustersPageLoader(),
    serversPageLoader = new ServersPageLoader(),
    imagesPageLoader = new ImagesPageLoader(),
    packagesPageLoader = new PackagesPageLoader();

function ClustersPageLoader() {
    this.load = function (paramObject) {
        var hashParams = paramObject['hashParams'],
            clusterId = hashParams['cluster_id'];

        $(contentContainer).empty();

        if(contrail.checkIfExist(clusterId)) {
            var clusterViewConfig = {
                elementId: smwl.SM_CLUSTER_VIEW_ID,
                view: "ClusterView",
                app: cowc.APP_CONTRAIL_SM,
                viewConfig: {clusterId: clusterId}
            };
            //TODO: Replace by renderView4Config function of ContrailView
            cowu.renderView4Config(contentContainer, null, clusterViewConfig);
            pushBreadcrumb([clusterId]);
        } else {
            var clusterListViewConfig = {
                elementId: smwl.SM_CLUSTER_LIST_VIEW_ID,
                view: "ClusterListView",
                app: cowc.APP_CONTRAIL_SM,
                viewConfig: {}
            };
            //TODO: Replace by renderView4Config function of ContrailView
            cowu.renderView4Config(contentContainer, null, clusterListViewConfig);
        }

    };
    this.updateViewByHash = function (hashObj, lastHashObj) {
        this.load({hashParams: hashObj});
    };
    this.destroy = function () {
    };
};

function ServersPageLoader() {
    this.load = function (paramObject) {
        var hashParams = paramObject['hashParams'],
            serverId = hashParams['server_id'];

        $(contentContainer).empty();

        if(contrail.checkIfExist(serverId)) {
            var serverViewConfig = {
                elementId: smwl.SM_SERVER_VIEW_ID,
                view: "ServerView",
                app: cowc.APP_CONTRAIL_SM,
                viewConfig: {serverId: serverId}
            };
            //TODO: Replace by renderView4Config function of ContrailView
            cowu.renderView4Config(contentContainer, null, serverViewConfig);
            pushBreadcrumb([serverId]);
        } else {
            var serverListViewConfig = {
                elementId: smwl.SM_SERVER_LIST_VIEW_ID,
                view: "ServerListView",
                app: cowc.APP_CONTRAIL_SM,
                viewConfig: {serverColumnsType: smwc.SERVER_PREFIX_ID, hashParams: hashParams}
            };
            //TODO: Replace by renderView4Config function of ContrailView
            cowu.renderView4Config(contentContainer, null, serverListViewConfig);
        }
    };
    this.updateViewByHash = function (hashObj, lastHashObj) {
        this.load({hashParams: hashObj});
    };
    this.destroy = function () {
    };
};

function ImagesPageLoader() {
    this.load = function (hashParams) {
        $(contentContainer).empty();
        var imageListViewConfig = {
            elementId: smwl.SM_IMAGE_LIST_VIEW_ID,
            view: "ImageListView",
            app: cowc.APP_CONTRAIL_SM,
            viewConfig: {}
        };
        //TODO: Replace by renderView4Config function of ContrailView
        cowu.renderView4Config(contentContainer, null, imageListViewConfig);
    };
    this.updateViewByHash = function (hashObj, lastHashObj) {
        this.load({hashParams: hashObj});
    };
    this.destroy = function () {
    };
};

function PackagesPageLoader() {
    this.load = function (hashParams) {
        $(contentContainer).empty();
        var packageListViewConfig = {
            elementId: smwl.SM_PACKAGE_LIST_VIEW_ID,
            view: "PackageListView",
            app: cowc.APP_CONTRAIL_SM,
            viewConfig: {}
        };
        //TODO: Replace by renderView4Config function of ContrailView
        cowu.renderView4Config(contentContainer, null, packageListViewConfig);
    };
    this.updateViewByHash = function (hashObj, lastHashObj) {
        this.load({hashParams: hashObj});
    };
    this.destroy = function () {
    };
};