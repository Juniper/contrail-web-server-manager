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
                headerActionsTemplate = contrail.getTemplate4Id("sm-actions-template"),
                options;

            this.$el.html(smTemplate({name: smConstants.SERVER_PREFIX_ID}));

            options = {elementId: gridElId, data: [], url:'/sm/objects/details/server?field=server' + options['queryString']};
            
            options.gridConfig = {
        		header: {
                    title:{
                        text: smGridConfig.SERVERS_GRID_TITLE,
                    },
                    customControls: options['customControls'],
                    advanceControls: headerControlConfig,
                },
                columnHeader: {
                    columns: smGridConfig.SERVER_COLUMNS
                },
                body: {
                    options: {
                        actionCell: [
                             smGridConfig.getConfigureAction(function(rowIndex){
                                 var prefixId = smConstants.SERVER_PREFIX_ID,
                                     dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex),
                                     serverModel = new ServerModel(dataItem),
                                     serverEditView = new ServerEditView({'model': serverModel});

                                 serverEditView.render({"title": "Configure Server"});
                             }),
                             smGridConfig.getReimageAction(function(rowIndex) {
                                 console.log(rowIndex);
                             }),
                             smGridConfig.getProvisionAction(function(rowIndex) {
                                 console.log(rowIndex);
                             }),
                             smGridConfig.getTagAction(function(rowIndex) {
                                 console.log(rowIndex);
                             })
                        ],
                        detail: {
                            template: $('#sm-grid-2-row-group-detail-template').html(),
                            templateConfig: [
                            	[
                            	       {
                            	    	   title: 'Group 3',
                            	    	   keys: ['domain','host_name','power_address']
                            	       },
                            	       {
                            	    	   title: 'Group 1',
                            	    	   keys: ['domain','host_name','power_address']
                            	       }
                            	],
                            	[
                            	 	{
                            	    	   title: 'Group 2',
                            	    	   keys: ['domain','host_name','power_address']
                            	       }

                                ]
                            ]
                        }
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
            "type": "dropdown",
            "iconClass": "icon-cog",
            "actions": [
                {
                    "iconClass": "icon-upload-alt",
                    "title": "Reimage",
                    "onClick": function() {}
                },
                {
                    "iconClass": "icon-tags",
                    "title": "Tag"
                },
                {
                    "iconClass": "icon-trash",
                    "title": "Delete"
                }
            ]
        }
    ];

    return ServersView;
});