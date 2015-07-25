/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'co-test-utils',
    'package-list-view-mockdata',
    'test-slickgrid',
    'test-messages'
], function (SMTestUtils, PackageListViewMockData, SMTestSlickGrid, TestMessages) {
    module(TestMessages.PACKAGE_GRID_MODULE, {
        setup: function () {
            self.server = sinon.fakeServer.create();
            self.server.autoRespond = true;

            $.ajaxSetup({
                cache: true
            });
        },
        teardown: function () {
            self.server.restore();
            delete self.server;
        }
    });

    asyncTest(TestMessages.TEST_LOAD_PACKAGES_GRID, function (assert) {
        expect(0);

        var hashParams = { p: 'setting_sm_packages' };
        layoutHandler.setURLHashObj(hashParams);

        contentHandler.featureAppDefObj.done(function () {
            var fakeServer = self.server;

            fakeServer.respondWith("GET", SMTestUtils.getRegExForUrl(smwc.URL_TAG_NAMES), [200, {"Content-Type": "application/json"}, JSON.stringify(PackageListViewMockData.getTagNamesData())]);
            fakeServer.respondWith("GET", SMTestUtils.getRegExForUrl(smwu.getObjectDetailUrl('package')), [200, {"Content-Type": "application/json"}, JSON.stringify(PackageListViewMockData.getSinglePackageDetailData())]);

            setTimeout(function() {
                var prefixId = smwc.PACKAGE_PREFIX_ID,
                    testConfigObj = {
                        'prefixId': 'package',
                        'cols': smwgc.PACKAGE_COLUMNS,
                        'addnCols': ['detail', 'checkbox', 'actions'],
                        'gridElId': '#' + smwl.SM_PACKAGE_GRID_ID
                    };
                SMTestSlickGrid.executeSlickGridTests(prefixId, PackageListViewMockData.formatMockData(PackageListViewMockData.getSinglePackageDetailData()), testConfigObj);
                QUnit.start();
            }, 1000)
        });
    });
});
