/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */
define([
    'setting/sm/ui/js/views/ImageGridView',
    'setting/sm/ui/js/views/ImageListView',
    'co-test-utils',
    'image-list-view-mockdata',
    'test-slickgrid'
], function (ImageGridView, ImageListView, SMTestUtils, ImageListViewMockData, SMTestSlickGrid) {
    module('Image - Server Manager Tests', {
        setup: function () {
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

    asyncTest("Test Load Image ", function (assert) {
        expect(0);
        var prefixId = smwc.IMAGE_PREFIX_ID,
            imageListView = new ImageListView();
        var fakeServer = this.server,
            testConfigObj = {
                'prefixId': 'image',
                'cols': smwgc.IMAGE_COLUMNS,
                'addnCols': ['detail', 'checkbox', 'actions'],
                'gridElId': '#' + smwl.SM_IMAGE_GRID_ID
            };
        fakeServer.respondWith(
            "GET", SMTestUtils.getRegExForUrl(smwc.URL_TAG_NAMES),
            [200, {"Content-Type": "application/json"},
                JSON.stringify(ImageListViewMockData.getTagNamesData())]);

        fakeServer.respondWith(
            "GET", SMTestUtils.getRegExForUrl(smwu.getObjectDetailUrl('image')),
            [200, {"Content-Type": "application/json"}, JSON.stringify(ImageListViewMockData.getSingleImageDetailData())]);

        imageListView.render({hashParams: {image_id: null}});
        fakeServer.respond();
        SMTestUtils.startQunitWithTimeout(3000);

        SMTestSlickGrid.executeSlickGridTests(prefixId, ImageListViewMockData.formatMockData(ImageListViewMockData.getSingleImageDetailData()), testConfigObj);
    });
});