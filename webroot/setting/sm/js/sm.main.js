/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var clustersPageLoader = new ClustersPageLoader(),
    vnsPageLoader = new VNSPageLoader(),
    serversPageLoader = new ServersPageLoader(),
    imagesPageLoader = new ImagesPageLoader(),
    reposPageLoader = new ReposPageLoader();

function ClustersPageLoader() {
    this.load = function(hashParams) {
        var currMenuObj = globalObj.currMenuObj,
            rootDir = currMenuObj['resources']['resource'][0]['rootDir'],
            pathClustersView = rootDir + '/js/ClustersView.js';
        requirejs([pathClustersView], function(ClustersView){
            var clusterView = new ClustersView();
            clusterView.render();
        });
    };
    this.destroy = function() {};
};

function VNSPageLoader() {
    this.load = function(hashParams) {
        var currMenuObj = globalObj.currMenuObj,
            rootDir = currMenuObj['resources']['resource'][0]['rootDir'],
            pathVNSView = rootDir + '/js/VNSView.js';

        requirejs([pathVNSView], function(VNSView){
            var vnsView = new VNSView();
            vnsView.render();
        });
    };
    this.destroy = function() {};
};

function ServersPageLoader() {
    this.load = function(paramObject) {
        var currMenuObj = globalObj.currMenuObj,
            rootDir = currMenuObj['resources']['resource'][0]['rootDir'],
            pathServersView = rootDir + '/js/ServersView.js';

        var hashParams = paramObject['hashParams'],
            queryString = '';


        if(hashParams['cluster_id'] != null) {
            queryString += '&cluster_id=' + hashParams['cluster_id'];
        }

        if(hashParams['vns_id'] != null) {
            queryString += '&vns_id=' + hashParams['vns_id'];
        }

        requirejs([pathServersView], function(ServersView){
            var serverView = new ServersView();
            serverView.render({queryString: queryString});
        });
    };
    this.destroy = function() {};
};

function ImagesPageLoader() {
    this.load = function(hashParams) {
        var currMenuObj = globalObj.currMenuObj,
            rootDir = currMenuObj['resources']['resource'][0]['rootDir'],
            pathImagesView = rootDir + '/js/ImagesView.js';

        requirejs([pathImagesView], function(ImagesView){
            var imageView = new ImagesView();
            imageView.render();
        });
    };
    this.destroy = function() {};
};

function ReposPageLoader() {
    this.load = function(hashParams) {
        var currMenuObj = globalObj.currMenuObj,
            rootDir = currMenuObj['resources']['resource'][0]['rootDir'],
            pathReposView = rootDir + '/js/ReposView.js';

        requirejs([pathReposView], function(ReposView){
            var reposView = new ReposView();
            reposView.render();
        });
    };
    this.destroy = function() {};
};