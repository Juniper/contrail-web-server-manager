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
                options;

            this.$el.html(directoryTemplate({name: smConstants.IMAGE_PREFIX_ID}));

            options = {elementId: gridElId, data: [], url:'/sm/objects/details/image?field=image'};
            options['titleText'] = smGridConfig.IMAGES_GRID_TITLE;
            options['columns'] = smGridConfig.IMAGE_COLUMNS;
            options['actions'] = [
                smGridConfig.getConfigureAction(function(rowIndex){
                    var prefixId = smConstants.IMAGE_PREFIX_ID,
                        dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex),
                        imageModel = new ImageModel(dataItem);

                    smUtils.renderJSONEditor({'prefixId': prefixId, 'className': 'modal-700', 'title': "Configure Image", 'model': imageModel, 'onSave': function() {
                        imageModel.saveConfig();
                    }});
                })
            ];
            options['customControls'] = [
                '<a title="Add Image"><i class="icon-plus"></i></a>',
                '<a title="Actions"><i class="icon-cog"></i></a>'
            ];

            smUtils.renderGrid(options);
        }
    });
    return ImagesView;
});