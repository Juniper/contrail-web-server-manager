/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'setting/sm/js/VNSModel'
], function(_, Backbone, VNSModel) {
    var GridConfig = function() {
        this.CLUSTERS_GRID_TITLE = 'Clusters';
        this.VNS_GRID_TITLE = 'VNS';
        this.SERVERS_GRID_TITLE = 'Servers';
        this.IMAGES_GRID_TITLE = 'Images';
        this.REPOS_GRID_TITLE = 'Repos';

        this.CLUSTER_COLUMNS = [
            { id: "cluster_id", field: "cluster_id", name:"ID", width:150, minWidth: 15, cssClass:'cell-hyperlink-blue', events: {
                onClick: function(e, dc) {
                    loadFeature({p:'setting_dir_servers', q: {'cluster_id': dc['cluster_id']}});
                }
            }}
        ];

        this.CLUSTER_ACTIONS = [
            getConfigureAction(function(rowIndex){
                console.log(rowIndex);
            }),
            getAddServersAction(function(rowIndex) {
                console.log(rowIndex);
            })
        ];

        this.SERVER_COLUMNS = [
            { id: "server_id", field: "server_id", name:"Hostname", width:100, minWidth: 15 },
            { id: "vns_id", field: "vns_id", name:"VNS", width:120, minWidth: 15, cssClass:'cell-hyperlink-blue', events: {
                onClick: function(e, dc) {
                    loadFeature({p:'setting_sm_servers', q: {'vns_id': dc['vns_id']}});
                }
            }},
            { id: "cluster_id", field: "cluster_id", name:"Tags", width:120, minWidth: 15, cssClass:'cell-hyperlink-blue', events: {
                onClick: function(e, dc) {
                    loadFeature({p:'setting_sm_servers', q: {'cluster_id': dc['cluster_id']}});
                }
            }},
            { id: "ip", field: "ip", name:"IP", width:120, minWidth: 15 },
            { id: "power_address", field: "power_address", name:"Power IP", width:120, minWidth: 15 },
            { id: "base_image_id", field: "base_image_id", name:"Base Image", width:120, minWidth: 15 },
            { id: "package_image_id", field: "package_image_id", name:"Package Image", width:150, minWidth: 15 },
            { id: "static_ip", field: "static_ip", name:"Static IP", width:80, minWidth: 15 },
            { id: "disc_flag", field: "disc_flag", name:"Discovered", width:80, minWidth: 15 },
            { id: "status", field: "status", name:"Status", width:80, minWidth: 15 }
        ];

        this.SERVER_GRID_ACTIONS = [
            '<a title="Actions"><i class="icon-cog"></i></a>'
        ];

        this.SERVER_ROW_ACTIONS = [
            getConfigureAction(function(rowIndex){
                var prefixId = smConstants.SERVER_PREFIX_ID;
                var dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex);
                smUtils.renderJSONEditor({'prefixId': prefixId, 'className': 'modal-700', 'title': "Configure Server", 'dataItem': dataItem, 'onSave': function() {
                    console.log('Saving');
                }});
            }),
            getReimageAction(function(rowIndex) {
                console.log(rowIndex);
            }),
            getProvisionAction(function(rowIndex) {
                console.log(rowIndex);
            })
        ];

        this.IMAGE_COLUMNS = [
            { id: "image_id", field: "image_id", name:"Name", width:120, minWidth: 15 },
            { id: "image_type", field: "image_type", name:"Type", width:120, minWidth: 15 },
            { id: "image_version", field: "image_version", name:"Version", width:120, minWidth: 15 }
        ];

        this.IMAGE_ROW_ACTIONS = [
            getConfigureAction(function(rowIndex){
                var prefixId = smConstants.IMAGE_PREFIX_ID;
                var dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex);
                smUtils.renderJSONEditor({'prefixId': prefixId, 'className': 'modal-700', 'title': "Configure Image", 'dataItem': dataItem, 'onSave': function() {
                    console.log('Saving');
                }});
            })
        ];

        this.IMAGE_GRID_ACTIONS = [
            '<a title="Add Image"><i class="icon-plus"></i></a>',
            '<a title="Actions"><i class="icon-cog"></i></a>'
        ];

        this.REPO_COLUMNS = [
            { id: "image_id", field: "image_id", name:"Name", width:120, minWidth: 15 },
            { id: "image_type", field: "image_type", name:"Type", width:120, minWidth: 15 },
            { id: "image_version", field: "image_version", name:"Version", width:120, minWidth: 15 }
        ];

        this.REPO_ROW_ACTIONS = [
            getConfigureAction(function(rowIndex){
                var prefixId = smConstants.REPO_PREFIX_ID;
                var dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex);
                smUtils.renderJSONEditor({'prefixId': prefixId, 'className': 'modal-700', 'title': "Configure Image", 'dataItem': dataItem, 'onSave': function() {
                    console.log('Saving');
                }});
            })
        ];

        this.REPO_GRID_ACTIONS = [
            '<a title="Add Repo"><i class="icon-plus"></i></a>',
            '<a title="Actions"><i class="icon-cog"></i></a>'
        ];

        this.VNS_COLUMNS = [
            { id: "vns_id", field: "vns_id", name:"Name", width:120, minWidth: 15, cssClass:'cell-hyperlink-blue', events: {
                onClick: function(e, dc) {
                    loadFeature({p:'setting_sm_servers', q: {'vns_id': dc['vns_id']}});
                }
            }},
            { id: "email", field: "email", name:"Email", width:120, minWidth: 15 }
        ];

        this.VNS_ROW_ACTIONS = [
            getConfigureAction(function(rowIndex){
                var prefixId = smConstants.VNS_PREFIX_ID,
                    dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex),
                    vnsModel = new VNSModel(dataItem);

                smUtils.renderJSONEditor({'prefixId': prefixId, 'className': 'modal-700', 'title': "Configure VNS", 'model': vnsModel, 'onSave': function() {
                    vnsModel.saveConfig();
                }});
            }),
            getAddServersAction(function(rowIndex) {
                console.log(rowIndex);
            }),
            getReimageAction(function(rowIndex) {
                console.log(rowIndex);
            }),
            getProvisionAction(function(rowIndex) {
                console.log(rowIndex);
            })
        ];

        this.VNS_GRID_ACTIONS = [
            '<a title="Add"><i class="icon-plus"></i></a>',
            '<a title="Actions"><i class="icon-cog"></i></a>'
        ];
    }

    this.getConfigureAction = function(onClickFunction) {
        return {
            title: 'Configure',
            iconClass: 'icon-cogs',
            width:80,
            onClick: onClickFunction
        };
    }

    this.getAddServersAction = function(onClickFunction) {
        return {
            title: 'Add Servers',
            iconClass: 'icon-plus',
            width:80,
            onClick: onClickFunction
        };
    }

    this.getReimageAction = function(onClickFunction) {
        return {
            title: 'Reimage',
            iconClass: 'icon-upload-alt',
            width:80,
            onClick: onClickFunction
        };
    }

    this.getProvisionAction = function(onClickFunction) {
        return {
            title: 'Provision',
            iconClass: 'icon-cloud-upload',
            width:80,
            onClick: onClickFunction
        };
    }

    return GridConfig;
});