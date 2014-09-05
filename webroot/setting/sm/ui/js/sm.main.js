/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var clustersPageLoader = new ClustersPageLoader(),
    serversPageLoader = new ServersPageLoader(),
    imagesPageLoader = new ImagesPageLoader(),
    reposPageLoader = new ReposPageLoader();

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
            serversView.render({hashParams: hashParams});
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

function ReposPageLoader() {
    this.load = function (hashParams) {
        var currMenuObj = globalObj.currMenuObj,
            rootDir = currMenuObj['resources']['resource'][0]['rootDir'],
            pathReposView = rootDir + '/js/views/ReposView.js';

        requirejs([pathReposView], function (ReposView) {
            var reposView = new ReposView();
            reposView.render();
        });
    };
    this.destroy = function () {
    };
};