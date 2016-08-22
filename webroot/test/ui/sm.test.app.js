/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var coreBaseDir = "/base/contrail-web-core/webroot",
    smBaseDir = "/base/contrail-web-server-manager/webroot",
    pkgBaseDir = smBaseDir,
    featurePkg = "serverManager";

var smwc, smwgc, smwu, smwl, smwm, smwgc, smwmc, smwru, smwdt;

require([
    coreBaseDir + "/test/ui/js/co.test.app.utils.js"
], function () {
    require([coreBaseDir + "/test/ui/js/co.test.config.js"], function(testConf) {
        globalObj["env"] = testConf["env"];

        //will copy the testConfig to globalObj so window can access it later.
        globalObj["testConf"] = testConf;
        var bundles = {};
        if (globalObj["env"] == "prod") {
            globalObj["buildBaseDir"] = "/dist";
            bundles = coreBundles;
        } else {
            globalObj["buildBaseDir"] = "";
        }
        globalObj["test-env"] = globalObj["env"] + "-test";

        requirejs.config({
            baseUrl: smBaseDir,
            bundles: bundles,
            paths: getServerManagerTestAppPaths(coreBaseDir),
            map: coreAppMap,
            shim: getServerManagerTestAppShim(),
            waitSeconds: 0
        });

        require(["co-test-mockdata", "co-test-init"], function (coreTestMockData) {
            setFeaturePkgAndInit(featurePkg, coreTestMockData);
        });

        function getServerManagerTestAppPaths(coreBaseDir) {
            var serverManagerTestAppPathObj = {};
            var coreAppPaths = getCoreAppPaths(coreBaseDir, globalObj["buildBaseDir"]);
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

            serverManagerTestAppPathObj ["cluster-list-view-custom-test-suite"] = smBaseDir + "/setting/sm/test/ui/views/ClusterListView.custom.test.suite";

            serverManagerTestAppPathObj ["package-model-custom-test-suite"] = smBaseDir + "/setting/sm/test/ui/models/PackageModel.custom.test.suite";

            return serverManagerTestAppPathObj;
        }

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

            smTestAppShim["handlebars-helpers"] = {
                deps: ["jquery", "handlebars"]
            };

            return smTestAppShim;
        }
    });
});
