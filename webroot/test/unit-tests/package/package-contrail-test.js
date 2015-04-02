/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'sm-test-utils',
    'setting/sm/ui/js/views/PackageGridView',
    'setting/sm/ui/js/views/PackageListView',
    'sm-test-mockdata',
    'sm-test-slickgrid'
], function (SMTestUtils, PackageGridView, PackageListView, SMTestMockdata, SMTestSlickGrid) {
    module('Package - Server Manager Tests', {
        setup   : function () {
            this.server = sinon.fakeServer.create();
            $.ajaxSetup({
                cache: true
            });
        },
        teardown: function () {
            this.server.restore();
            delete this.server;
        }
    });

    var prefixId = smwc.PACKAGE_PREFIX_ID,
        gridElId = '#' + prefixId + cowc.RESULTS_SUFFIX_ID,
        packageListView = new PackageListView();


    asyncTest("Test Load Package ", function (assert) {
        expect(0);
        var fakeServer = this.server;

        fakeServer.respondWith(
            "GET", smtu.getRegExForUrl(smwc.URL_TAG_NAMES),
            [200, {"Content-Type": "application/json"},
                JSON.stringify(smtMockData.getTagNamesData())]);

        fakeServer.respondWith(
            "GET", smtu.getRegExForUrl(smwu.getObjectDetailUrl('package')),
            [200, {"Content-Type": "application/json"}, JSON.stringify(smtMockData.getSinglePackageDetailData())]);

        packageListView.render({hashParams: {image_id: null}});
        fakeServer.respond();
        smtu.startQunitWithTimeout(3000);

        smtSlickGrid.execute(prefixId, packageListView, smtMockData.getSinglePackageDetailData());
    });
});
