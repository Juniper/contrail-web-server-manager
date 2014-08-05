/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function(_) {
    var GridConfig = function() {
        this.VNS_GRID_TITLE = 'VNS';
        this.SERVERS_GRID_TITLE = 'Servers';
        this.IMAGES_GRID_TITLE = 'Images';
        this.REPOS_GRID_TITLE = 'Repos';

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
            { id: "package_image_id", field: "package_image_id", name:"Package Image", width:150, minWidth: 15 },
            { id: "static_ip", field: "static_ip", name:"Static IP", width:80, minWidth: 15 },
            { id: "disc_flag", field: "disc_flag", name:"Discovered", width:80, minWidth: 15 },
            { id: "status", field: "status", name:"Status", width:80, minWidth: 15 }
        ];

        this.IMAGE_COLUMNS = [
            { id: "image_id", field: "image_id", name:"Name", width:120, minWidth: 15 },
            { id: "image_type", field: "image_type", name:"Type", width:120, minWidth: 15 },
            { id: "image_version", field: "image_version", name:"Version", width:120, minWidth: 15 }
        ];

        this.REPO_COLUMNS = [
            { id: "image_id", field: "image_id", name:"Name", width:120, minWidth: 15 },
            { id: "image_type", field: "image_type", name:"Type", width:120, minWidth: 15 },
            { id: "image_version", field: "image_version", name:"Version", width:120, minWidth: 15 }
        ];

        this.VNS_COLUMNS = [
            { id: "vns_id", field: "vns_id", name:"Name", width:120, minWidth: 15, cssClass:'cell-hyperlink-blue', events: {
                onClick: function(e, dc) {
                    loadFeature({p:'setting_sm_servers', q: {'vns_id': dc['vns_id']}});
                }
            }},
            { id: "email", field: "email", name:"Email", width:120, minWidth: 15 }
        ];

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
    }

    return GridConfig;
});