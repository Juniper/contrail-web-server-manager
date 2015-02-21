/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */


define(['underscore'], function(_){
    var SMTestUtils = function(){
        var self = this;

        this.getRegExForUrl = function(url){
            var regexUrlMap = {
                '/sm/tags/names' : /\/sm\/tags\/names.*$/,
                '/sm/objects/details/image': /\/sm\/objects\/details\/image\?.*$/
            };

            return regexUrlMap [url];
        };

        this.getNumberOfColumnsForGrid  = function (viewObj){

            var noOfColumns = 0;
            noOfColumns = viewObj.getGridConfig().columnHeader.columns.length;
            if(contrail.checkIfExist(viewObj.getGridConfig().body.options.actionCell))
                noOfColumns ++;
            if(contrail.checkIfExist(viewObj.getGridConfig().body.options.checkboxSelectable))
                noOfColumns ++;
            if(contrail.checkIfExist(viewObj.getGridConfig().body.options.detail))
                noOfColumns ++;
            return noOfColumns;
        };

        this.startQunitWithTimeout = function (timeoutInMilliSec) {
            window.setTimeout(function () {
                QUnit.start();
            }, timeoutInMilliSec);
        };
    };
    return SMTestUtils;
});
