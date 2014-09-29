/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var clustersPageLoader = new ClustersPageLoader(),
    serversPageLoader = new ServersPageLoader(),
    imagesPageLoader = new ImagesPageLoader(),
    packagesPageLoader = new PackagesPageLoader();

function ClustersPageLoader() {
    this.load = function (paramObject) {
        var currMenuObj = globalObj.currMenuObj,
            rootDir = currMenuObj['resources']['resource'][0]['rootDir'],
            pathClustersView = rootDir + '/js/views/ClustersView.js',
            hashParams = paramObject['hashParams'];
        ;

        requirejs([pathClustersView], function (ClustersView) {
            var clustersView = new ClustersView();
            clustersView.render({hashParams: hashParams});
        });
    };
    this.destroy = function () {
    };
};

function ServersPageLoader() {
    this.load = function (paramObject) {
        var currMenuObj = globalObj.currMenuObj,
            rootDir = currMenuObj['resources']['resource'][0]['rootDir'],
            pathServersView = rootDir + '/js/views/ServersView.js',
            hashParams = paramObject['hashParams'];

        requirejs([pathServersView], function (ServersView) {
            var serversView = new ServersView();
            serversView.render({serverColumnsType: smConstants.SERVER_PREFIX_ID, hashParams: hashParams});
        });
    };
    this.destroy = function () {
    };
};

function ImagesPageLoader() {
    this.load = function (hashParams) {
        var currMenuObj = globalObj.currMenuObj,
            rootDir = currMenuObj['resources']['resource'][0]['rootDir'],
            pathImagesView = rootDir + '/js/views/ImagesView.js';

        requirejs([pathImagesView], function (ImagesView) {
            var imagesView = new ImagesView();
            imagesView.render();
        });
    };
    this.destroy = function () {
    };
};

function PackagesPageLoader() {
    this.load = function (hashParams) {
        var currMenuObj = globalObj.currMenuObj,
            rootDir = currMenuObj['resources']['resource'][0]['rootDir'],
            pathPackagesView = rootDir + '/js/views/PackagesView.js';

        requirejs([pathPackagesView], function (PackagesView) {
            var packagesView = new PackagesView();
            packagesView.render();
        });
    };
    this.destroy = function () {};
};