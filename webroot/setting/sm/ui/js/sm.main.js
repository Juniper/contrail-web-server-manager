/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var clusterPageLoader = new ClusterPageLoader(),
    serversPageLoader = new ServersPageLoader(),
    imagesPageLoader = new ImagesPageLoader(),
    reposPageLoader = new ReposPageLoader();

function ClusterPageLoader() {
    this.load = function(hashParams) {
        var currMenuObj = globalObj.currMenuObj,
            rootDir = currMenuObj['resources']['resource'][0]['rootDir'],
            pathClusterView = rootDir + '/js/views/ClusterView.js';

        requirejs([pathClusterView], function(ClusterView){
            var clusterView = new ClusterView();
            clusterView.render();
        });
    };
    this.destroy = function() {};
};

function ServersPageLoader() {
    this.load = function(paramObject) {
        var currMenuObj = globalObj.currMenuObj,
            rootDir = currMenuObj['resources']['resource'][0]['rootDir'],
            pathServersView = rootDir + '/js/views/ServersView.js';

        var hashParams = paramObject['hashParams'],
            queryString = '', tagKey, tagQueryArray = [];

        if(hashParams['cluster_id'] != null) {
            queryString += '&cluster_id=' + hashParams['cluster_id'];
        }

        if(hashParams['tag'] != null) {
            for(tagKey in hashParams['tag']) {
                tagQueryArray.push(tagKey + "=" + hashParams['tag'][tagKey]);
            }
            queryString += '&tag=' + tagQueryArray.join(',');
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
            pathImagesView = rootDir + '/js/views/ImagesView.js';

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
            pathReposView = rootDir + '/js/views/ReposView.js';

        requirejs([pathReposView], function(ReposView){
            var reposView = new ReposView();
            reposView.render();
        });
    };
    this.destroy = function() {};
};