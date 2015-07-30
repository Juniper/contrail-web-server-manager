/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */
define([
    'co-test-utils',
    'image-list-view-mockdata',
    'test-slickgrid'
], function (TestUtils, ImageListViewMockData, SMTestSlickGrid) {
    var self = this;
    module('Image - Server Manager Tests', {
        setup: function () {
            self.server = TestUtils.getFakeServer();

            $.ajaxSetup({
                cache: true
            });
        },
        teardown: function () {
            self.server.restore();
            delete self.server;
        }
    });

    asyncTest("Test Load Image ", function (assert) {
        expect(0);
        var hashParams = { p: 'setting_sm_images' };
        layoutHandler.setURLHashObj(hashParams);

        contentHandler.featureAppDefObj.done(function () {
            var fakeServer = self.server;

            fakeServer.respondWith("GET", TestUtils.getRegExForUrl(smwc.URL_TAG_NAMES), [200, {"Content-Type": "application/json"}, JSON.stringify(ImageListViewMockData.getTagNamesData())]);
            fakeServer.respondWith( "GET", TestUtils.getRegExForUrl(smwu.getObjectDetailUrl('image')), [200, {"Content-Type": "application/json"}, JSON.stringify(ImageListViewMockData.getSingleImageDetailData())]);

            setTimeout(function() {
                var prefixId = smwc.IMAGE_PREFIX_ID,
                    testConfigObj = {
                        'prefixId': 'image',
                        'cols': smwgc.IMAGE_COLUMNS,
                        'addnCols': ['detail', 'checkbox', 'actions'],
                        'gridElId': '#' + smwl.SM_IMAGE_GRID_ID
                    };
                SMTestSlickGrid.executeSlickGridTests(prefixId, ImageListViewMockData.formatMockData(ImageListViewMockData.getSingleImageDetailData()), testConfigObj);
                QUnit.start();
            }, 1000)
        });
    });
});