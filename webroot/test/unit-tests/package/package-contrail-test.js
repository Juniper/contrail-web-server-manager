/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'sm-test-utils',
    'setting/sm/ui/js/views/PackagesView',
    'sm-test-mockdata',
    'sm-test-slickgrid'
], function (SMTestUtils, PackagesView, SMTestMockdata, SMTestSlickGrid) {
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
        packagesView = new PackagesView();

//    test("Test 1", function() {
//        ok(1 == 1);
//    });
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

        packagesView.render({hashParams: {image_id: null}});
        fakeServer.respond();
        smtu.startQunitWithTimeout(3000);

        smtSlickGrid.execute(prefixId, packagesView, smtMockData.getSinglePackageDetailData());
    });
});
