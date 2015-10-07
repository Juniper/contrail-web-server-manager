/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var coreBaseDir = "/base/contrail-web-core/webroot",
    smBaseDir = "/base/contrail-web-server-manager/webroot",
    pkgBaseDir = smBaseDir,
    featurePkg = 'serverManager';

var smwc, smwgc, smwu, smwl, smwm, smwgc, smwmc, smwru, smwdt;

require([
    coreBaseDir + '/js/common/core.app.utils.js',
    coreBaseDir + '/test/ui/js/co.test.app.utils.js'
], function () {
    globalObj['env'] = "test";

    requirejs.config({
        baseUrl: smBaseDir,
        paths: getServerManagerTestAppPaths(coreBaseDir),
        map: coreAppMap,
        shim: getServerManagerTestAppShim(),
        waitSeconds: 0
    });

    require(['co-test-init'], function () {
        setFeaturePkgAndInit(featurePkg);
    });


    function getServerManagerTestAppPaths(coreBaseDir) {
        var serverManagerTestAppPathObj = {};
        var coreAppPaths = getCoreAppPaths(coreBaseDir);
        var coreTestAppPaths = getCoreTestAppPaths(coreBaseDir);

        for (var key in coreAppPaths) {
            if (coreAppPaths.hasOwnProperty(key)) {
                var value = coreAppPaths[key];
                serverManagerTestAppPathObj[key] = value;
            }
        }

        for (var key in coreTestAppPaths) {
            if (coreTestAppPaths.hasOwnProperty(key)) {
                var value = coreTestAppPaths[key];
                serverManagerTestAppPathObj[key] = value;
            }
        }

        serverManagerTestAppPathObj ["sm-test-messages"] = smBaseDir + "/test/ui/sm.test.messages";
        serverManagerTestAppPathObj ["sm-test-utils"] = smBaseDir + "/test/ui/sm.test.utils";

        serverManagerTestAppPathObj ["handlebars-helpers"] = smBaseDir + "/common/ui/js/handlebars.helpers";
        serverManagerTestAppPathObj ["image-list-view-mock-data"] = smBaseDir + "/setting/sm/ui/test/ui/ImageListView.mock.data";
        serverManagerTestAppPathObj ["package-list-view-mock-data"] = smBaseDir + "/setting/sm/ui/test/ui/PackageListView.mock.data";
        serverManagerTestAppPathObj ["cluster-list-view-mock-data"] = smBaseDir + "/setting/sm/ui/test/ui/ClusterListView.mock.data";
        serverManagerTestAppPathObj ["server-list-view-mock-data"] = smBaseDir + "/setting/sm/ui/test/ui/ServerListView.mock.data";

        serverManagerTestAppPathObj ["cluster-tab-view-mock-data"] = smBaseDir + "/setting/sm/ui/test/ui/ClusterTabView.mock.data";
        serverManagerTestAppPathObj ["server-tab-view-mock-data"] = smBaseDir + "/setting/sm/ui/test/ui/ServerTabView.mock.data";

        return serverManagerTestAppPathObj;
    };

    function getServerManagerTestAppShim() {

        var smTestAppShim = {};

        for (var key in coreAppShim) {
            if (coreAppShim.hasOwnProperty(key)) {
                var value = coreAppShim[key];
                smTestAppShim[key] = value;
            }
        }

        for (var key in coreTestAppShim) {
            if (coreTestAppShim.hasOwnProperty(key)) {
                var value = coreTestAppShim[key];
                smTestAppShim[key] = value;
            }
        }

        smTestAppShim['handlebars-helpers'] = {
            deps: ['jquery', 'handlebars']
        };

        return smTestAppShim;
    };

});
