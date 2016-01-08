/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var baremetalPageLoader = new BaremetalPageLoader();

function BaremetalPageLoader() {
    this.load = function (paramObject) {
        var pathBaremetalView = smWebDir + '/config/physicaldevices/baremetal/ui/js/views/BaremetalView.js',
            hashParams = paramObject['hashParams'];

        requirejs([pathBaremetalView], function (BaremetalView) {
            var baremetalView = new BaremetalView();
            baremetalView.render({hashParams: hashParams});
        });
    };
    this.updateViewByHash = function (hashObj, lastHashObj) {
        this.load({hashParams : hashObj});
    };
    this.destroy = function () {};
};