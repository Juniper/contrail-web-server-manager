/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */
define([
    'co-test-utils',
    'contrail-list-model'
], function (cotu, ContrailListModel) {

    this.getRegExForUrl = function (url) {
        var regexUrlMap = {
            '/sm/tags/names': /\/sm\/tags\/names.*$/,
            '/sm/objects/details/image': /\/sm\/objects\/details\/image\?.*$/,
            '/sm/objects/details/package': /\/sm\/objects\/details\/image\?.*$/
        };

        return regexUrlMap [url];
    };

    this.commonGridDataGenerator = function (viewObj) {
        var viewConfig = cotu.getViewConfigObj(viewObj);
        var modelConfig = cotu.getGridDataSourceWithOnlyRemotes(viewConfig);
        var contrailListModel = new ContrailListModel(modelConfig);
        return contrailListModel;
    };

    this.deleteSizeField = function (dataArr) {
        _.each(dataArr, function (data) {
            if (contrail.checkIfExist(data.size)) {
                delete data.size;
            }
        });
        return dataArr;
    };

    return {
        self: self,
        getRegExForUrl: getRegExForUrl,
        commonGridDataGenerator: commonGridDataGenerator,
        deleteSizeField: deleteSizeField
    };

});
