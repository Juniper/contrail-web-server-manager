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
            {id: "image_id", field: "id", name: "Name", width: 120, minWidth: 100, cssClass: 'word-break-normal'},
            {id: "category", field: "category", name: "Category", width: 60, minWidth: 50},
            {id: "image_type", field: "type", name: "Type", width: 120, minWidth: 100},
            {id: "image_version", field: "version", name: "Version", width: 120, minWidth: 50, cssClass: 'word-break-normal'},
            {id: "image_path", field: "path", name: "Path", width: 300, minWidth: 100, cssClass: 'word-break-normal'}
        ];

        this.PACKAGE_COLUMNS = [
            {id: "package_id", field: "id", name: "Name", width: 120, minWidth: 100, cssClass: 'word-break-normal'},
            {id: "package_category", field: "category", name: "Category", width: 60, minWidth: 50},
            {id: "package_type", field: "type", name: "Type", width: 120, minWidth: 100},
            {id: "package_version", field: "version", name: "Version", width: 120, minWidth: 50, cssClass: 'word-break-normal'},
            {id: "package_path", field: "path", name: "Path", width: 300, minWidth: 100, cssClass: 'word-break-normal'}
        ];

        this.CLUSTER_COLUMNS = [
            { id: "cluster_id", field: "id", name: "Name", width: 150, minWidth: 100, cssClass: 'cell-hyperlink-blue', events: {
                onClick: function (e, dc) {
                    loadFeature({p: 'setting_sm_clusters', q: {'cluster_id': dc['id']}});
                }
            }},
            { id: "email", field: "email", name: "Email", width: 150, minWidth: 100 },
            { id: "new-servers", field: "", name: "New Servers", width: 120, minWidth: 80, sortable : {sortBy: 'formattedValue'},
                formatter: function (r, c, v, cd, dc) {
                    var uiParams = dc[cowc.KEY_UI_ADDED_PARAMS],
                        serverStatus = uiParams['servers_status'];
                    return serverStatus['new_servers'];
                }
            },
            { id: "configured-servers", field: "", name: "Configured Servers", width: 120, minWidth: 80, sortable : {sortBy: 'formattedValue'},
                formatter: function (r, c, v, cd, dc) {
                    var uiParams = dc[cowc.KEY_UI_ADDED_PARAMS],
                        serverStatus = uiParams['servers_status'];
                    return serverStatus['configured_servers'];
                }
            },
            { id: "inreimage_servers", field: "", name: "In-Reimage Servers", width: 120, minWidth: 80, sortable : {sortBy: 'formattedValue'},
                formatter: function (r, c, v, cd, dc) {
                    var uiParams = dc[cowc.KEY_UI_ADDED_PARAMS],
                        serverStatus = uiParams['servers_status'];
                    return serverStatus['inreimage_servers'];
                }
            },
            { id: "reimaged_servers", field: "", name: "Reimaged Servers", width: 120, minWidth: 80, sortable : {sortBy: 'formattedValue'},
                formatter: function (r, c, v, cd, dc) {
                    var uiParams = dc[cowc.KEY_UI_ADDED_PARAMS],
                        serverStatus = uiParams['servers_status'];
                    return serverStatus['reimaged_servers'];
                }
            },
            { id: "inprovision_servers", field: "", name: "In-Provision Servers", width: 120, minWidth: 80, sortable : {sortBy: 'formattedValue'},
                formatter: function (r, c, v, cd, dc) {
                    var uiParams = dc[cowc.KEY_UI_ADDED_PARAMS],
                        serverStatus = uiParams['servers_status'];
                    return serverStatus['inprovision_servers'];
                }
            },
            { id: "provisioned-servers", field: "", name: "Provisioned Servers", width: 120, minWidth: 80, sortable : {sortBy: 'formattedValue'},
                formatter: function (r, c, v, cd, dc) {
                    var uiParams = dc[cowc.KEY_UI_ADDED_PARAMS],
                        serverStatus = uiParams['servers_status'];
                    return serverStatus['provisioned_servers'];
                }
            },
            { id: "total-servers", field: "", name: "Total Servers", width: 120, minWidth: 80, sortable : {sortBy: 'formattedValue'},
                formatter: function (r, c, v, cd, dc) {
                    var uiParams = dc[cowc.KEY_UI_ADDED_PARAMS],
                        serverStatus = uiParams['servers_status'];
                    return serverStatus['total_servers'];
                }
            }
        ];

        this.SERVER_SENSORS_COLUMNS = [
            {id: "sensor", field: "sensor", name: "Name", width: 120, minWidth: 15},
            {id: "sensor_type", field: "sensor_type", name: "Type", width: 120, minWidth: 15},
            {
                id: "reading", field: "reading", name: "Reading", width: 120, minWidth: 15,
                formatter: function (r, c, v, cd, dc) {
                    var unit = dc['unit'],
                        reading = dc['reading'];
                    return reading + " " + unit;
                }
            },
            {id: "status", field: "status", name: "Status", width: 120, minWidth: 15}
        ];

        this.SERVER_FRU_COLUMNS = [
            {id: "fru_description", field: "fru_description", name: "Description", width: 120, minWidth: 20},
            {id: "product_name", field: "product_name", name: "Product Name", width: 120, minWidth: 15},
            {id: "chassis_type", field: "chassis_type", name: "Chassis Type", width: 120, minWidth: 15},
            {id: "board_product_name", field: "board_product_name", name: "Board Product Name", width: 120, minWidth: 15},
            {id: "board_mfg_date", field: "board_mfg_date", name: "Board Manufacture Date", width: 120, minWidth: 15}
        ];

        this.SERVER_DISKUSAGE_COLUMNS = [
            {id: "disk_name", field: "disk_name", name: "Disk Name", width: 80, minWidth: 15},
            {id: "read_MB", field: "read_MB", name: "Read (MB)", width: 80, minWidth: 15},
            {id: "write_MB", field: "write_MB", name: "Write (MB)", width: 80, minWidth: 15}
        ];

        this.SERVER_INTERFACE_COLUMNS = [
            {id: "interface_name", field: "interface_name", name: "Name", width: 120, minWidth: 20},
            {id: "ip_addr", field: "ip_addr", name: "IP Address", width: 120, minWidth: 20},
            {id: "netmask", field: "netmask", name: "Netmask", width: 120, minWidth: 20},
            {id: "macaddress", field: "macaddress", name: "MAC Address", width: 120, minWidth: 20},
        ];

        this.getConfigureAction = function (onClickFunction, divider) {
            return {
                title: smwl.TITLE_EDIT_CONFIG,
                iconClass: 'icon-edit',
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        };

        this.getAddServersAction = function (onClickFunction, divider) {
            return {
                title: smwl.TITLE_ADD_SERVERS,
                iconClass: 'icon-plus',
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        };

        this.getRemoveServersAction = function (onClickFunction, divider) {
            return {
                title: smwl.TITLE_REMOVE_SERVERS,
                iconClass: 'icon-minus',
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        };

        this.getReimageAction = function (onClickFunction, divider) {
            return {
                title: smwl.TITLE_REIMAGE,
                iconClass: 'icon-upload-alt',
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        };

        this.getProvisionAction = function (onClickFunction, divider) {
            return {
                title: smwl.TITLE_PROVISION,
                iconClass: 'icon-cloud-upload',
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        };

        this.getTagAction = function (onClickFunction, divider) {
            return {
                title: smwl.TITLE_EDIT_TAGS,
                iconClass: 'icon-tags',
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        };

        this.getAssignRoleAction = function (onClickFunction, divider) {
            return {
                title: smwl.TITLE_ASSIGN_ROLES,
                iconClass: 'icon-check',
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        };

        this.getDeleteAction = function (onClickFunction, divider) {
            return {
                title: smwl.TITLE_DELETE,
                iconClass: 'icon-trash',
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        };

        this.getGridColumns4Roles = function () {
            var columns = [];
            $.each(smwc.ROLES_ARRAY, function (roleKey, roleValue) {
                var width = 60;
                if(roleValue.indexOf('storage-') != -1) {
                    width = 100;
                }
                columns.push({
                    id: roleValue, field: "roles",
                    name: smwl.get(roleValue),
                    width: width,
                    minWidth: width,
                    cssClass: 'text-center',
                    sortable: {sortBy: 'formattedValue'},
                    formatter: function (r, c, v, cd, dc) {
                        if ($.isEmptyObject(dc.roles)) {
                            return ''
                        } else {
                            return (dc.roles.indexOf(roleValue) != -1) ? '<i class="icon-ok green"></i>' : '';
                        }
                    },
                    exportConfig: {
                        allow: true,
                        advFormatter: function (dc) {
                            return (dc.roles.indexOf(roleValue) != -1);
                        }
                    }
                });
            })
            return columns;
        };

        this.EDIT_SERVERS_ROLES_COLUMNS = ([
            {id: "server_id", field: "id", name: "Hostname", width: 75, minWidth: 75},
            {id: "ip_address", field: "ip_address", name: "IP", width: 80, minWidth: 80}
        ]);

        this.getServerColumns = function (serverColumnsType) {
            var serverColumns,
                commonColumnsSet1 = [
                    { id: "discovered", field: "discovered", resizable: false, sortable: false, width: 30,
                        searchable: false, exportConfig: { allow: false }, formatter: function (r, c, v, cd, dc) {
                        if (dc['discovered'] == 'true') {
                            return '<div class="padding-2-0;"><i class="icon-circle blue"></i></div>';
                        }
                    }
                    },
                    { id: "server_id", field: "id", name: "ID", width: 80, minWidth: 80, cssClass: 'cell-hyperlink-blue', events: {
                        onClick: function (e, dc) {
                            loadFeature({p: 'setting_sm_servers', q: {'server_id': dc['id']}});
                        }
                    } }
                ],
                tagColumnsSet = [
                    {
                        id: "tag", field: "tag", name: "Tags", width: 150, minWidth: 150, sortable: false,
                        formatter: function (r, c, v, cd, dc) {
                            var tagTemplate = contrail.getTemplate4Id(smwc.TMPL_TAGS),
                                tagHTML = tagTemplate({tags: dc.tag, colors: smwc.CACHED_TAG_COLORS, allowLink: true});
                            return tagHTML;
                        },
                        exportConfig: {
                            allow: true,
                            advFormatter: function(dc) {
                                return JSON.stringify(dc.tag);
                            }
                        }
                    }
                ],
                ipColumnsSet = [
                    { id: "ip_address", field: "ip_address", name: "IP", width: 80, minWidth: 80 }
                    /*
                    { id: "ipmi_address", field: "ipmi_address", name: "IPMI", width: 100, minWidth: 100, cssClass: 'cell-hyperlink-blue', events: {
                        onClick: function (e, dc) {
                            if(dc['ipmi_address'] != null && dc['ipmi_address'] != '') {
                                window.open("http://" + dc['ipmi_address']);
                            }
                        }
                    }}*/
                ];

            if (serverColumnsType == smwc.SERVER_PREFIX_ID) {
                serverColumns = commonColumnsSet1.concat([
                    { id: "cluster_id", field: "cluster_id", name: "Cluster", width: 80, minWidth: 80, cssClass: 'cell-hyperlink-blue', events: {
                        onClick: function (e, dc) {
                            loadFeature({p: 'setting_sm_clusters', q: {'cluster_id': dc['cluster_id']}});
                        }
                    }}
                ]);
                serverColumns = serverColumns.concat(tagColumnsSet).concat(ipColumnsSet);
            } else if (serverColumnsType == smwc.CLUSTER_PREFIX_ID) {
                serverColumns = commonColumnsSet1.concat(ipColumnsSet).concat(this.getGridColumns4Roles());
            }

            serverColumns = serverColumns.concat([
                { id: "status", field: "status", name: "Status", width: 120, minWidth: 120 }
            ]);

            return serverColumns;
        };

        this.getBaremetalServerColumns = function (baremetalServerColumnsType) {
            var serverColumns =
                [{
                    id: 'serverId',
                    field: 'serverId',
                    name: 'Server'
                },
                {
                    id: 'mac',
                    field: 'mac',
                    name: 'Mac Address'
                },
                {
                    id: 'ip',
                    field: 'ip',
                    name: 'IP Address'
                },
                {
                    id: 'physical_router',
                    field: 'physical_router',
                    name: 'Physical Router'
                },
                {
                    id: 'interface',
                    field: 'interface',
                    name: 'Interface'
                },
                {
                    id: 'vn',
                    field: 'vn',
                    name: 'Virtual Network'
                }];
            return serverColumns;
        };
    };

    return GridConfig;
});