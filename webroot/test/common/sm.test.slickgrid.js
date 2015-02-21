/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore', 'sm-test-messages'], function (_, SMTestMessages) {
    var SMTestSlickGrid = function () {
        this.execute = function (prefixId, objectView, mockData) {

            var gridElId = '#' + prefixId + cowc.RESULTS_SUFFIX_ID;

            asyncTest('Test SlickGrid Dataview', function (assert) {
                expect(2);
                ok($(gridElId).data('contrailGrid')._dataView.getLength() == mockData.length, smtMessages.TEST_NO_OF_ROWS_IN_SLICKGRID_DATAVIEW);
                ok($(gridElId).data('contrailGrid')._dataView.getItem(0) !== 'undefined', smtMessages.TEST_ROWS_LOADED_IN_SLICKGRID_DATAVIEW);

                smtu.startQunitWithTimeout(1);
            });

            asyncTest('Test SlickGrid view', function (assert) {
                expect(2);
                equal($(gridElId).find('.slick-row-master').length, mockData.length, smtMessages.TEST_ROWS_LOADED_IN_SLICKGRID_VIEW);
                equal($(gridElId).find('.slick-header-column').length, smtu.getNumberOfColumnsForGrid(objectView), smtMessages.TEST_COLS_LOADED_IN_SLICKGRID_VIEW);

                smtu.startQunitWithTimeout(1);
            });
        };
    };
    return SMTestSlickGrid;
});
