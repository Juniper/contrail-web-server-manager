/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'setting/sm/ui/js/models/ClusterModel',
    'setting/sm/ui/js/views/ClusterEditView'
], function (_, Backbone, ClusterModel, ClusterEditView) {
    var ClusterView = Backbone.View.extend({
        el: $(contentContainer),

        render: function () {
            var directoryTemplate = contrail.getTemplate4Id(smConstants.SM_PREFIX_ID + "-template"),
                gridElId = '#' + smConstants.CLUSTER_PREFIX_ID + '-results',
                headerActionsTemplate = contrail.getTemplate4Id("sm-actions-template"),
                options;

            this.$el.html(directoryTemplate({name: smConstants.CLUSTER_PREFIX_ID}));

            options = {elementId: gridElId, data: [], url:'/sm/objects/details/cluster?field=cluster'};
            options['titleText'] = smGridConfig.CLUSTER_GRID_TITLE;
            options['columns'] = smGridConfig.CLUSTER_COLUMNS;
            options['actions'] = [
                smGridConfig.getConfigureAction(function(rowIndex){
                    var prefixId = smConstants.CLUSTER_PREFIX_ID,
                        dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex),
                        clusterModel = new ClusterModel(dataItem),
                        clusterEditView = new ClusterEditView({'model': clusterModel});

                    clusterEditView.render({"title": "Configure Cluster"});
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

            options['advanceControls'] = headerControlConfig;

            smUtils.renderGrid(options);
        }
    });

    var headerControlConfig = [
        {
            "type": "link",
            "iconClass": "icon-plus",
            "onClick": function() {
                var clusterModel = new ClusterModel(),
                    clusterEditView = new ClusterEditView({'model': clusterModel});

                clusterEditView.render({"title": "Add Cluster"});
            }
        },
        {
            "type": "dropdown",
            "iconClass": "icon-cog",
            "actions": [
                {
                    "iconClass": "icon-upload-alt",
                    "title": "Reimage",
                    "onClick": function() {}
                },
                {
                    "iconClass": "icon-trash",
                    "title": "Delete",
                    "onClick": function() {}
                }
            ]
        }
    ];
    return ClusterView;
});