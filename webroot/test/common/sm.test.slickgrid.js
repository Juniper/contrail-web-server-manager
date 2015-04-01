/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore', 'sm-test-messages'], function (_, SMTestMessages) {
    var SMTestSlickGrid = function () {
        this.execute = function (prefixId, objectView, mockData) {

            var gridElId, cols;

            if(prefixId == 'image'){
                cols = smwgc.IMAGE_COLUMNS;
                gridElId = '#' + smwl.SM_IMAGE_GRID_ID;
            } else if(prefixId == 'package'){
                cols = smwgc.PACKAGE_COLUMNS;
                gridElId = '#' + smwl.SM_PACKAGE_GRID_ID;
            }

            asyncTest('Test SlickGrid Dataview', function (assert) {
                expect(2);
                ok($(gridElId).data('contrailGrid')._dataView.getLength() == mockData.length, smtMessages.TEST_NO_OF_ROWS_IN_SLICKGRID_DATAVIEW);
                ok($(gridElId).data('contrailGrid')._dataView.getItem(0) !== 'undefined', smtMessages.TEST_ROWS_LOADED_IN_SLICKGRID_DATAVIEW);

                smtu.startQunitWithTimeout(1);
            });

            asyncTest('Test SlickGrid view', function (assert) {
                expect(2);
                var addnCols = ['detail', 'checkbox', 'actions'];

                equal($(gridElId).find('.slick-row-master').length, mockData.length, smtMessages.TEST_ROWS_LOADED_IN_SLICKGRID_VIEW);
                equal($(gridElId).find('.slick-header-column').length, cols.length + addnCols.length, smtMessages.TEST_COLS_LOADED_IN_SLICKGRID_VIEW);

                smtu.startQunitWithTimeout(1);
            });
        };
    };
    return SMTestSlickGrid;
});
