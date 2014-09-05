/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function (_) {
    var GridConfig = function () {
        this.GRID_HEADER_ACTION_TYPE_ACTION = 'action';
        this.GRID_HEADER_ACTION_TYPE_DROPLIST = 'action-droplist';

        this.IMAGE_COLUMNS = [
            { id: "image_id", field: "id", name: "Name", width: 120, minWidth: 15 },
            { id: "image_type", field: "type", name: "Type", width: 120, minWidth: 15 },
            { id: "image_version", field: "version", name: "Version", width: 120, minWidth: 15 },
            { id: "image_path", field: "path", name: "Path", width: 300, minWidth: 15 }
        ];

        this.REPO_COLUMNS = [
            { id: "repo_id", field: "id", name: "Name", width: 120, minWidth: 15 },
            { id: "repo_type", field: "type", name: "Type", width: 120, minWidth: 15 },
            { id: "repo_version", field: "version", name: "Version", width: 120, minWidth: 15 },
            { id: "repo_path", field: "path", name: "Path", width: 300, minWidth: 15 }
        ];

        this.CLUSTER_COLUMNS = [
            { id: "cluster_id", field: "id", name: "Name", width: 120, minWidth: 15, cssClass: 'cell-hyperlink-blue', events: {
                onClick: function (e, dc) {
                    loadFeature({p: 'setting_sm_clusters', q: {'cluster_id': dc['id']}});
                }
            }},
            { id: "domain", name: "Domain", width: 120, minWidth: 15, formatter: function (r, c, v, cd, dc) {
                return (dc['parameters'] != null) ? dc['parameters']['domain'] : '';
            }},
            { id: "gateway", name: "Gateway", width: 120, minWidth: 15, formatter: function (r, c, v, cd, dc) {
                return (dc['parameters'] != null) ? dc['parameters']['gateway'] : '';
            }},
            { id: "subnet_mask", name: "Subnet Mask", width: 120, minWidth: 15, formatter: function (r, c, v, cd, dc) {
                return (dc['parameters'] != null) ? dc['parameters']['subnet_mask'] : '';
            }},
            { id: "email", field: "email", name: "Email", width: 120, minWidth: 15 }
        ];

        this.getConfigureAction = function (onClickFunction) {
            return {
                title: 'Configure',
                iconClass: 'icon-cogs',
                width: 80,
                onClick: onClickFunction
            };
        };

        this.getAddServersAction = function (onClickFunction) {
            return {
                title: 'Add Servers',
                iconClass: 'icon-plus',
                width: 80,
                onClick: onClickFunction
            };
        };

        this.getReimageAction = function (onClickFunction) {
            return {
                title: 'Reimage',
                iconClass: 'icon-upload-alt',
                width: 80,
                onClick: onClickFunction
            };
        };

        this.getProvisionAction = function (onClickFunction) {
            return {
                title: 'Provision',
                iconClass: 'icon-cloud-upload',
                width: 80,
                onClick: onClickFunction
            };
        };

        this.getTagAction = function (onClickFunction) {
            return {
                title: 'Edit Tags',
                iconClass: 'icon-tags',
                width: 80,
                onClick: onClickFunction
            };
        };

        this.getRoleAction = function (onClickFunction) {
            return {
                title: 'Edit Roles',
                iconClass: 'icon-check',
                width: 80,
                onClick: onClickFunction
            };
        };

        this.getDeleteAction = function (onClickFunction) {
            return {
                title: 'Delete',
                iconClass: 'icon-trash',
                width: 80,
                onClick: onClickFunction
            };
        };

        this.getGridColumns4Roles = function () {
            var columns = [];
            for (var i = 0; i < smConstants.ROLES_ARRAY.length; i++) {
                var role = smConstants.ROLES_ARRAY[i];
                columns.push({
                    id: role, field: "roles", name: smLabels.get(role), width: 60, minWidth: 15, cssClass: "slick-cell-checkboxsel", formatter: function (r, c, v, cd, dc) {
                        var checked = dc.roles.indexOf(role) != -1 ? true : false;
                        var returnHTML = checked ? "<i class='icon-ok green'></i>" : "<i class='icon-remove red'></i>";
                        return returnHTML;
                    }
                });
            }
            return columns;
        };

        this.EDIT_SERVERS_ROLES_COLUMNS = ([
            { id: "server_id", field: "id", name: "Hostname", width: 100, minWidth: 15 },
            { id: "ip_address", field: "ip_address", name: "IP", width: 120, minWidth: 15 }
        ]).concat(this.getGridColumns4Roles());

        this.SERVER_COLUMNS = [
            { id: "discovered", field: "discovered", resizable: false, sortable: false, width: 30,
                searchable: false, exportConfig: { allow: false }, formatter: function (r, c, v, cd, dc) {
                if (dc['discovered'] == "true") {
                    return '<div class="padding-2-0;"><i class="icon-plus-sign-alt"></i></div>';
                }
            }
            },
            { id: "server_id", field: "id", name: "Hostname", width: 80, minWidth: 15 },
            { id: "cluster_id", field: "cluster_id", name: "Cluster", width: 80, minWidth: 15, cssClass: 'cell-hyperlink-blue', events: {
                onClick: function (e, dc) {
                    loadFeature({p: 'setting_sm_clusters', q: {'cluster_id': dc['cluster_id']}});
                }
            }},
            { id: "tag", field: "tag", name: "Tags", width: 150, minWidth: 150, formatter: function (r, c, v, cd, dc) {
                var tagTemplate = contrail.getTemplate4Id("sm-tags-template"),
                    tagHTML = tagTemplate(dc.tag);
                return tagHTML;
            }},
            { id: "ip_address", field: "ip_address", name: "IP", width: 80, minWidth: 15 },
            { id: "ipmi_address", field: "ipmi_address", name: "IPMI", width: 80, minWidth: 15 }
        ].concat(this.getGridColumns4Roles()).concat([
                { id: "status", field: "status", name: "Status", width: 120, minWidth: 15 }
            ]);
    }

    return GridConfig;
});