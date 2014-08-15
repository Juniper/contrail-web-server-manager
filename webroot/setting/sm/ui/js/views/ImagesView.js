/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'setting/sm/ui/js/models/ImageModel'
], function (_, Backbone, ImageModel) {
    var ImagesView = Backbone.View.extend({
        el: $(contentContainer),

        render: function () {
            var directoryTemplate = contrail.getTemplate4Id(smConstants.SM_PREFIX_ID + "-template"),
                gridElId = '#' + smConstants.IMAGE_PREFIX_ID + '-results',
                headerActionsTemplate = contrail.getTemplate4Id("sm-actions-template"),
                options;

            this.$el.html(directoryTemplate({name: smConstants.IMAGE_PREFIX_ID}));

            options = {elementId: gridElId, data: [], url:'/sm/objects/details/image?field=image'};
            
            options.gridConfig = {
        		header: {
                    title:{
                        text: smGridConfig.IMAGES_GRID_TITLE,
                    },
                    customControls: options['customControls'],
                    advanceControls: headerControlConfig,
                },
                columnHeader: {
                    columns: smGridConfig.IMAGE_COLUMNS
                },
                body: {
                    options: {
                        actionCell: [
                             smGridConfig.getConfigureAction(function(rowIndex){
                                 var prefixId = smConstants.IMAGE_PREFIX_ID,
                                     dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex),
                                     imageModel = new ImageModel(dataItem);

                                 smUtils.renderJSONEditor({'prefixId': prefixId, 'className': 'modal-700', 'title': "Configure Image", 'model': imageModel, 'onSave': function() {
                                     imageModel.saveConfig();
                                 }});
                             })
                         ]
                    },
                    dataSource: {
                        remote: {
                            ajaxConfig: {
                                url: options.url
                            },
                        }
                    }
                }
            };
            
            smUtils.renderGrid(options);
        }
    });

    var headerControlConfig = [
        {
            "type": "link",
            "title": "Add Image",
            "iconClass": "icon-plus",
            "onClick": function() {}
        },
        {
            "type": "dropdown",
            "iconClass": "icon-cog",
            "actions": [
                {
                    "iconClass": "icon-trash",
                    "title": "Delete",
                    "onClick": function() {}
                }
            ]
        }
    ];

    return ImagesView;
});