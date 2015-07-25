/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var coreBaseDir = "/base/contrail-web-core/webroot",
    smBaseDir = "/base/contrail-web-server-manager/webroot",
    pkgBaseDir = smBaseDir;

require(['/base/contrail-web-core/webroot/js/core-app-utils.js'], function () {
    globalObj['env'] = "test";
    requirejs.config({
        baseUrl: smBaseDir,
        paths: getServerManagerTestAppPaths(getCoreAppPaths(coreBaseDir)),
        map: coreAppMap,
        shim: getServerManagerTestAppShim(coreAppShim),
        waitSeconds: 0
    });

    require(['sm-test-init'], function () {});
});

function getServerManagerTestAppPaths(coreAppPaths) {
    var serverManagerTestAppPathObj = {};

    for (var key in coreAppPaths) {
        if (coreAppPaths.hasOwnProperty(key)) {
            var value = coreAppPaths[key];
            serverManagerTestAppPathObj[key] = value;
        }
    }

    serverManagerTestAppPathObj ["co-test-utils"] = coreBaseDir + "/test/ui/co.test.utils";
    serverManagerTestAppPathObj["co-test-mockdata"] = coreBaseDir + "/test/ui/co.test.mockdata";
    serverManagerTestAppPathObj ["test-slickgrid"] = coreBaseDir + "/test/ui/slickgrid.test.common";

    serverManagerTestAppPathObj ["handlebars-helpers"] = smBaseDir + "/common/ui/js/handlebars.helpers";
    serverManagerTestAppPathObj ["image-list-view-mockdata"] = smBaseDir + "/setting/sm/ui/test/ui/ImageListViewMockData";
    serverManagerTestAppPathObj ["package-list-view-mockdata"] = smBaseDir + "/setting/sm/ui/test/ui/PackageListViewMockData";
    serverManagerTestAppPathObj ["test-messages"] = smBaseDir + "/test/ui/sm.test.messages";
    serverManagerTestAppPathObj["sm-test-init"] = smBaseDir + "/test/ui/sm.test.init";

    return serverManagerTestAppPathObj;
};

function getServerManagerTestAppShim(shim) {
    shim['handlebars-helpers'] = {
        deps: ['jquery', 'handlebars']
    };
    return shim;
};
