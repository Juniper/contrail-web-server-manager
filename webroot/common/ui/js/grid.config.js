/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function(_) {
    var GridConfig = function() {
        this.CLUSTER_GRID_TITLE = 'Cluster';
        this.SERVERS_GRID_TITLE = 'Servers';
        this.IMAGES_GRID_TITLE = 'Images';
        this.REPOS_GRID_TITLE = 'Repos';

        this.GRID_HEADER_ACTION_TYPE_ACTION = 'action';
        this.GRID_HEADER_ACTION_TYPE_DROPLIST = 'action-droplist';

        this.SERVER_COLUMNS = [
            { id: "server_id", field: "id", name:"Hostname", width:100, minWidth: 15 },
            { id: "cluster_id", field: "cluster_id", name:"Cluster", width:100, minWidth: 15, cssClass:'cell-hyperlink-blue', events: {
                onClick: function(e, dc) {
                    loadFeature({p:'setting_sm_servers', q: {'cluster_id': dc['cluster_id']}});
                }
            }},
            { id: "tag", field: "tag", name:"Tags", width:150, minWidth: 15, formatter: function(r, c, v, cd, dc) {
                var tagTemplate = contrail.getTemplate4Id("sm-tags-template"),
                    tagHTML = tagTemplate(dc.tag);
                return tagHTML;
            }},
            { id: "ip_address", field: "ip_address", name:"IP", width:120, minWidth: 15 },
            { id: "power_address", field: "power_address", name:"Power IP", width:120, minWidth: 15 },
            { id: "discovered", field: "discovered", name:"Discovered", width:80, minWidth: 15 },
            { id: "roles", field: "roles", name:"Roles", width:200, minWidth: 15, formatter: function(r, c, v, cd, dc) {
                var rolesStr = ''
                if(dc.roles != null) {
                    rolesStr = dc.roles.join(', ');
                }
                return rolesStr;
            }},
            { id: "status", field: "status", name:"Status", width:120, minWidth: 15 }
        ];

        this.IMAGE_COLUMNS = [
            { id: "image_id", field: "id", name:"Name", width:120, minWidth: 15 },
            { id: "image_type", field: "type", name:"Type", width:120, minWidth: 15 },
            { id: "image_version", field: "version", name:"Version", width:120, minWidth: 15 },
            { id: "image_path", field: "path", name:"Path", width:300, minWidth: 15 }
        ];

        this.REPO_COLUMNS = [
            { id: "repo_id", field: "id", name:"Name", width:120, minWidth: 15 },
            { id: "repo_type", field: "type", name:"Type", width:120, minWidth: 15 },
            { id: "repo_version", field: "version", name:"Version", width:120, minWidth: 15 },
            { id: "repo_path", field: "path", name:"Path", width:300, minWidth: 15 }
        ];

        this.CLUSTER_COLUMNS = [
            { id: "cluster_id", field: "id", name:"Name", width:120, minWidth: 15, cssClass:'cell-hyperlink-blue', events: {
                onClick: function(e, dc) {
                    loadFeature({p:'setting_sm_servers', q: {'cluster_id': dc['id']}});
                }
            }},
            { id: "domain", name:"Domain", width:120, minWidth: 15, formatter: function(r, c, v, cd, dc) {
                return dc['parameters']['domain'];
            }},
            { id: "domain", name:"Gateway", width:120, minWidth: 15, formatter: function(r, c, v, cd, dc) {
                return dc['parameters']['gateway'];
            }},
            { id: "domain", name:"Subnet Mask", width:120, minWidth: 15, formatter: function(r, c, v, cd, dc) {
                return dc['parameters']['subnet_mask'];
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

        this.getTagAction = function(onClickFunction) {
            return {
                title: 'Tag',
                iconClass: 'icon-tags',
                width:80,
                onClick: onClickFunction
            };
        }

        this.getDeleteAction = function(onClickFunction) {
            return {
                title: 'Delete',
                iconClass: 'icon-trash',
                width:80,
                onClick: onClickFunction
            };
        }
    }

    return GridConfig;
});