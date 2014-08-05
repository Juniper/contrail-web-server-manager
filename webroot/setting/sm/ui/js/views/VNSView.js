/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'setting/sm/ui/js/models/VNSModel',
    'setting/sm/ui/js/views/VNSEditView'
], function (_, Backbone, VNSModel, VNSEditView) {
    var VNSView = Backbone.View.extend({
        el: $(contentContainer),

        render: function () {
            var directoryTemplate = contrail.getTemplate4Id(smConstants.SM_PREFIX_ID + "-template"),
                gridElId = '#' + smConstants.VNS_PREFIX_ID + '-results',
                options;

            this.$el.html(directoryTemplate({name: smConstants.VNS_PREFIX_ID}));

            options = {elementId: gridElId, data: [], url:'/sm/objects/details/vns?field=vns'};
            options['titleText'] = smGridConfig.VNS_GRID_TITLE;
            options['columns'] = smGridConfig.VNS_COLUMNS;
            options['actions'] = [
                smGridConfig.getConfigureAction(function(rowIndex){
                    var prefixId = smConstants.VNS_PREFIX_ID,
                        dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex),
                        vnsModel = new VNSModel(dataItem),
                        vnsEditView = new VNSEditView({'model': vnsModel});

                    vnsEditView.render();
                }),
                smGridConfig.getAddServersAction(function(rowIndex) {
                    console.log(rowIndex);
                }),
                smGridConfig.getReimageAction(function(rowIndex) {
                    console.log(rowIndex);
                }),
                smGridConfig.getProvisionAction(function(rowIndex) {
                    console.log(rowIndex);
                })
            ];

            options['customControls'] = [
                '<a title="Add"><i class="icon-plus"></i></a>',
                '<a title="Actions"><i class="icon-cog"></i></a>'
            ];

            smUtils.renderGrid(options);
        }
    });
    return VNSView;
});