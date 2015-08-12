/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var smPageLoader = new SMPageLoader();

function SMPageLoader() {
    this.load = function (paramObject) {
        var self = this, currMenuObj = globalObj.currMenuObj,
            hashParams = paramObject['hashParams'],
            rootDir = currMenuObj['resources']['resource'][0]['rootDir'],
            pathSMView = smBaseDir + rootDir + '/js/views/ServerManagerView.js',
            renderFn = paramObject['function'];

        require([pathSMView], function (ServerManagerView) {
            self.smView = new ServerManagerView();
            self.renderView(renderFn, hashParams);
        });
    };

    this.renderView = function (renderFn, hashParams) {
        $(contentContainer).empty();
        switch (renderFn) {
            case 'renderClusters':
                this.smView.renderClusters({hashParams: hashParams});
                break;

            case 'renderServers':
                this.smView.renderServers({hashParams: hashParams});
                break;

            case 'renderImages':
                this.smView.renderImages({hashParams: hashParams});
                break;

            case 'renderPackages':
                this.smView.renderPackages({hashParams: hashParams});
                break;
        }
    },

        this.updateViewByHash = function (currPageQueryStr, lastPageQueryStr, currMenuObj) {
            var hash = currMenuObj['hash'],
                renderFn;

            //TODO: The renderFunction should be passed from ContentHandler
            if (hash == "setting_sm_clusters") {
                renderFn = 'renderClusters';
            } else if (hash == "setting_sm_servers") {
                renderFn = "renderServers";
            } else if (hash == "setting_sm_images") {
                renderFn = "renderImages";
            } else if (hash == "setting_sm_packages") {
                renderFn = "renderPackages";
            }

            this.load({hashParams: currPageQueryStr, 'function': renderFn});
        };

    this.destroy = function () {
    };
};