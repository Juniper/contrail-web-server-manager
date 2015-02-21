define([
    'sm-test-utils',
    'setting/sm/ui/js/views/ImagesView',
    'sm-test-mockdata',
    'sm-test-slickgrid'
], function (SMTestUtils, ImagesView, SMTestMockdata, SMTestSlickGrid) {
    module('Image - Server Manager Tests', {
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

    var prefixId = smwc.IMAGE_PREFIX_ID,
        gridElId = '#' + prefixId + cowc.RESULTS_SUFFIX_ID,
        imagesView = new ImagesView();

    asyncTest("Test Load Image ", function (assert) {
        expect(0);
        var fakeServer = this.server;
        fakeServer.respondWith(
            "GET", smtu.getRegExForUrl(smwc.URL_TAG_NAMES),
            [200, {"Content-Type": "application/json"},
                JSON.stringify(smtMockData.getTagNamesData())]);

        fakeServer.respondWith(
            "GET", smtu.getRegExForUrl(smwu.getObjectDetailUrl('image')),
            [200, {"Content-Type": "application/json"}, JSON.stringify(smtMockData.getSingleImageDetailData())]);

        imagesView.render({hashParams: {image_id: null}});
        fakeServer.respond();
        smtu.startQunitWithTimeout(3000);
        smtSlickGrid.execute(prefixId, imagesView, smtMockData.getSingleImageDetailData());
    });
});