/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'setting/sm/ui/js/models/ServerModel',
    'setting/sm/ui/js/views/ServerEditView'
], function (_, Backbone, ServerModel, ServerEditView) {
    var ServersView = Backbone.View.extend({
        el: $(contentContainer),

        render: function (options) {
            var smTemplate = contrail.getTemplate4Id(smConstants.SM_PREFIX_ID + "-template"),
                gridElId = '#' + smConstants.SERVER_PREFIX_ID + '-results',
                options;

            this.$el.html(smTemplate({name: smConstants.SERVER_PREFIX_ID}));

            options = {elementId: gridElId, data: [], url:'/sm/objects/details/server?field=server' + options['queryString']};
            options['titleText'] = smGridConfig.SERVERS_GRID_TITLE;;
            options['columns'] = smGridConfig.SERVER_COLUMNS;
            options['actions'] = [
                smGridConfig.getConfigureAction(function(rowIndex){
                    var prefixId = smConstants.SERVER_PREFIX_ID,
                        dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex),
                        serverModel = new ServerModel(dataItem),
                        serverEditView = new ServerEditView({'model': serverModel});

                    serverEditView.render();
                }),
                smGridConfig.getReimageAction(function(rowIndex) {
                    console.log(rowIndex);
                }),
                smGridConfig.getProvisionAction(function(rowIndex) {
                    console.log(rowIndex);
                })
            ];
            options['customControls'] = [
                '<a title="Actions"><i class="icon-cog"></i></a>'
            ];

            smUtils.renderGrid(options);
        }
    });
    return ServersView;
});