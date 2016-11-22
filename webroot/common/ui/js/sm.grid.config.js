/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    "sm-constants",
    "sm-labels",
    "sm-utils"
], function (smwc, smwl, smwu) {
    var GridConfig = {
        GRID_HEADER_ACTION_TYPE_ACTION : "action",
        GRID_HEADER_ACTION_TYPE_DROPLIST : "action-droplist",

        IMAGE_COLUMNS : [
            {id: "image_id", field: "id", name: "ID", width: 120, minWidth: 100, cssClass: "word-break-normal"},
            {id: "category", field: "category", name: "Category", width: 60, minWidth: 50},
            {id: "image_type", field: "type", name: "Type", width: 120, minWidth: 100},
            {id: "image_version", field: "version", name: "Version", width: 120, minWidth: 50, cssClass: "word-break-normal"},
            {id: "image_path", field: "path", name: "Path", width: 300, minWidth: 100, cssClass: "word-break-normal"}
        ],

        PACKAGE_COLUMNS : [
            {id: "package_id", field: "id", name: "ID", width: 120, minWidth: 100, cssClass: "word-break-normal"},
            {id: "package_category", field: "category", name: "Category", width: 60, minWidth: 50},
            {id: "package_type", field: "type", name: "Type", width: 120, minWidth: 100},
            {id: "package_version", field: "version", name: "Version", width: 120, minWidth: 50, cssClass: "word-break-normal"},
            {id: "package_path", field: "path", name: "Path", width: 300, minWidth: 100, cssClass: "word-break-normal"}
        ],

        CLUSTER_COLUMNS : [
            { id: "cluster_id", field: "id", name: "ID", width: 150, minWidth: 100, cssClass: "cell-hyperlink-blue", events: {
                onClick: function (e, dc) {
                    loadFeature({p: "setting_sm_clusters", q: {"cluster_id": dc.id}});
                }
            }},
            { id: "new-servers", field: "", name: "New", width: 120, minWidth: 80, sortable : {sortBy: "formattedValue"},
                formatter: function (r, c, v, cd, dc) {
                    var uiParams = dc[cowc.KEY_UI_ADDED_PARAMS],
                        serverStatus = uiParams.servers_status;
                    return serverStatus.new_servers;
                }
            },
            { id: "configured-servers", field: "", name: "Configured", width: 120, minWidth: 80, sortable : {sortBy: "formattedValue"},
                formatter: function (r, c, v, cd, dc) {
                    var uiParams = dc[cowc.KEY_UI_ADDED_PARAMS],
                        serverStatus = uiParams.servers_status;
                    return serverStatus.configured_servers;
                }
            },
            { id: "inreimage_servers", field: "", name: "In-Reimage", width: 120, minWidth: 80, sortable : {sortBy: "formattedValue"},
                formatter: function (r, c, v, cd, dc) {
                    var uiParams = dc[cowc.KEY_UI_ADDED_PARAMS],
                        serverStatus = uiParams.servers_status;
                    return serverStatus.inreimage_servers;
                }
            },
            { id: "reimaged_servers", field: "", name: "Reimaged", width: 120, minWidth: 80, sortable : {sortBy: "formattedValue"},
                formatter: function (r, c, v, cd, dc) {
                    var uiParams = dc[cowc.KEY_UI_ADDED_PARAMS],
                        serverStatus = uiParams.servers_status;
                    return serverStatus.reimaged_servers;
                }
            },
            { id: "inprovision_servers", field: "", name: "In-Provision", width: 120, minWidth: 80, sortable : {sortBy: "formattedValue"},
                formatter: function (r, c, v, cd, dc) {
                    var uiParams = dc[cowc.KEY_UI_ADDED_PARAMS],
                        serverStatus = uiParams.servers_status;
                    return serverStatus.inprovision_servers;
                }
            },
            { id: "provisioned-servers", field: "", name: "Provisioned", width: 120, minWidth: 80, sortable : {sortBy: "formattedValue"},
                formatter: function (r, c, v, cd, dc) {
                    var uiParams = dc[cowc.KEY_UI_ADDED_PARAMS],
                        serverStatus = uiParams.servers_status;
                    return serverStatus.provisioned_servers;
                }
            },
            { id: "total-servers", field: "", name: "Total", width: 120, minWidth: 80, sortable : {sortBy: "formattedValue"},
                formatter: function (r, c, v, cd, dc) {
                    var uiParams = dc[cowc.KEY_UI_ADDED_PARAMS],
                        serverStatus = uiParams.servers_status;
                    return serverStatus.total_servers;
                }
            }
        ],

        DHCP_HOST_COLUMNS : [
            { id: "host_fqdn", field: "host_fqdn", name: "Host FQDN", width: 150, minWidth: 100},
            { id: "host_name", field: "host_name", name: "Host Name", width: 150, minWidth: 100},
            { id: "mac_address", field: "mac_address", name: "MAC Address", width: 120, minWidth: 80},
            { id: "ip_address", field: "ip_address", name: " IP address", width: 120, minWidth: 80}
        ],

        DHCP_SUBNET_COLUMNS : [
            { id: "subnet_domain", field: "subnet_domain", name: "Subnet Domain", width: 150, minWidth: 100},
            { id: "subnet_address", field: "subnet_address", name: "Subnet Address", width: 150, minWidth: 100},
            { id: "subnet_gateway", field: "subnet_gateway", name: "Subnet Gateway", width: 150, minWidth: 100},
            { id: "subnet_mask", field: "subnet_mask", name: "Subnet Mask", width: 150, minWidth: 100},
            { id: "max_lease_time", field: "max_lease_time", name: "MAX Lease Time", width: 150, minWidth: 100},
            { id: "default_lease_time", field: "default_lease_time", name: "Default Lease Time", width: 150, minWidth: 100}
        ],

        SERVER_SENSORS_COLUMNS : [
            {id: "sensor", field: "sensor", name: "Name", width: 120, minWidth: 15},
            {id: "sensor_type", field: "sensor_type", name: "Type", width: 120, minWidth: 15},
            {
                id: "reading", field: "reading", name: "Reading", width: 120, minWidth: 15,
                formatter: function (r, c, v, cd, dc) {
                    var unit = dc.unit,
                        reading = dc.reading;
                    return reading + " " + unit;
                }
            },
            {
                id: "status", field: "status", name: "Status", width: 120, minWidth: 15,
                formatter: function(r, c, v, cd, dc) {
                    return cowf.getFormattedValue("status-state", dc.status);
                }
            }
        ],

        SERVER_FRU_COLUMNS : [
            {id: "fru_description", field: "fru_description", name: "Description", width: 120, minWidth: 20},
            {id: "product_name", field: "product_name", name: "Product Name", width: 120, minWidth: 15},
            {id: "chassis_type", field: "chassis_type", name: "Chassis Type", width: 120, minWidth: 15}
        ],

        SERVER_DISKUSAGE_COLUMNS : [
            {id: "disk_name", field: "disk_name", name: "Disk Name", width: 80, minWidth: 15},
            {id: "total_read_bytes", field: "total_read_bytes", name: "Read", width: 80, minWidth: 15, formatter: function (r, c, v, cd, dc) {
                return formatBytes(dc.total_read_bytes, false, null, 1);
            }},
            {id: "total_write_bytes", field: "total_write_bytes", name: "Write", width: 80, minWidth: 15, formatter: function (r, c, v, cd, dc) {
                return formatBytes(dc.total_write_bytes, false, null, 1);
             }}
        ],

        SERVER_FILESYSTEM_COLUMNS : [
            {id: "fs_name", field: "fs_name", name: "Name", width: 80, minWidth: 15},
            {id: "type", field: "type", name: "Type", width: 80, minWidth: 15},
            {id: "size_kb", field: "size_kb", name: "Size", width: 80, minWidth: 15, formatter: function (r, c, v, cd, dc) {
                return formatBytes(dc.size_kb * 1024, false, null, 1);
            }},
            {id: "used_percentage", field: "used_percentage", name: "Used", width: 80, minWidth: 15,
                formatter: function(r, c, v, cd, dc) {
                    return cowf.getFormattedValue("alert-percentage", dc.used_percentage);
                }
            }
        ],

        SERVER_INTERFACE_INFO_COLUMNS : [
            {id: "interface_name", field: "interface_name", name: "Name", width: 90, minWidth: 15},
            {id: "ip_addr", field: "ip_addr", name: "IP Address", width: 120, minWidth: 20},
            {id: "macaddress", field: "macaddress", name: "MAC Address", width: 120, minWidth: 20},
            {id: "speed_Mb_per_sec", field: "speed_Mb_per_sec", name: "Speed (mbps)", width: 120, minWidth: 20}
        ],

        SERVER_MONITORING_INTERFACE_COLUMNS : [
            {id: "interface_name", field: "interface_name", name: "Name", width: 120, minWidth: 20},
            {id: "total_tx_bytes", field: "total_tx_bytes", name: "TX Bytes", width: 120, minWidth: 20, formatter: function (r, c, v, cd, dc) {
                return formatBytes(dc.total_tx_bytes, false, null, 1);
            }},
            {id: "total_tx_packets", field: "total_tx_packets", name: "TX Packets", width: 120, minWidth: 20, formatter: function (r, c, v, cd, dc) {
                return d3.format(",")(dc.total_tx_packets);
            }},
            {id: "total_rx_bytes", field: "total_rx_bytes", name: "RX Bytes", width: 120, minWidth: 20, formatter: function (r, c, v, cd, dc) {
                return formatBytes(dc.total_rx_bytes, false, null, 1);
            }},
            {id: "total_rx_packets", field: "total_rx_packets", name: "RX Packets", width: 120, minWidth: 20, formatter: function (r, c, v, cd, dc) {
                return d3.format(",")(dc.total_rx_packets);
            }}
        ],

        getConfigureAction : function (onClickFunction, divider) {
            return {
                title: smwl.TITLE_EDIT_CONFIG,
                iconClass: "fa fa-edit",
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        },

        getCloneServerAction : function (onClickFunction, divider) {
            return {
                title: smwl.TITLE_CLONE_SERVER,
                iconClass: "fa fa-edit",
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        },

        getConfigureJSONAction : function (onClickFunction, divider) {
            return {
                title: smwl.TITLE_EDIT_JSON,
                iconClass: "fa fa-code",
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        },

        getAddServersAction : function (onClickFunction, divider) {
            return {
                title: smwl.TITLE_ADD_SERVERS,
                iconClass: "fa fa-plus",
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        },

        getRemoveServersAction : function (onClickFunction, divider) {
            return {
                title: smwl.TITLE_REMOVE_SERVERS,
                iconClass: "fa fa-minus",
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        },

        getReimageAction : function (onClickFunction, divider) {
            return {
                title: smwl.TITLE_REIMAGE,
                iconClass: "fa fa-upload",
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        },

        getProvisionAction : function (onClickFunction, divider) {
            return {
                title: smwl.TITLE_PROVISION,
                iconClass: "fa fa-cloud-upload",
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        },

        getTagAction : function (onClickFunction, divider) {
            return {
                title: smwl.TITLE_EDIT_TAGS,
                iconClass: "fa fa-tags",
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        },

        getAssignRoleAction : function (onClickFunction, divider) {
            return {
                title: smwl.TITLE_ASSIGN_ROLES,
                iconClass: "fa fa-check-square-o",
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        },

        getDeleteAction : function (onClickFunction, divider) {
            return {
                title: smwl.TITLE_DELETE,
                iconClass: "fa fa-trash",
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        },

        getRunInventoryAction : function (onClickFunction, divider) {
            return {
                title: smwl.TITLE_REFRESH_INVENTORY,
                    iconClass: "fa fa-refresh",
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        },

        getGridColumns4Roles : function () {
            var columns = [], width = 200;
            columns.push({
                id: "roles", field: "roles",
                name: "Roles",
                width: width,
                minWidth: width,
                sortable: {sortBy: "formattedValue"},
                formatter: function (r, c, v, cd, dc) {
                    var roles = (contrail.checkIfExist(dc.roles)) ? dc.roles : [], formattedRoles = [];
                    for (var i = 0; i < roles.length; i++) {
                        formattedRoles.push(smwl.getFirstCharUpperCase(roles[i]));
                    }
                    return formattedRoles.join(", ");
                },
                exportConfig: {
                    allow: true
                }
            });
            return columns;
        },

        EDIT_SERVERS_ROLES_COLUMNS : ([
            {id: "server_id", field: "id", name: "Hostname", width: 75, minWidth: 75},
            {id: "ip_address", field: "ip_address", name: "IP", width: 80, minWidth: 80}
        ]),

        getServerColumns : function (serverColumnsType) {
            var serverColumns,
                commonColumnsSet1 = [
                    {
                        id: "server_id", field: "id", name: "ID", width: 80, minWidth: 80,
                        formatter: function (r, c, v, cd, dc) {
                            if (contrail.checkIfExist(dc.id)) {
                                return '<span class="cell-hyperlink-blue">' + dc.id + '</span>';
                            }
                        },
                        events: {
                            onClick: function (e, dc) {
                                if (contrail.checkIfExist(dc.id)) {
                                    loadFeature({p: "setting_sm_servers", q: {"server_id": dc.id}});
                                }
                            }
                        }
                    }
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
                    {
                        id: "cluster_id", field: "cluster_id", name: "Cluster", width: 80, minWidth: 80,
                        formatter: function (r, c, v, cd, dc) {
                            if (contrail.checkIfExist(dc.id)) {
                                return '<span class="cell-hyperlink-blue">' + dc.cluster_id + '</span>';
                            }
                        },
                        events: {
                            onClick: function (e, dc) {
                                if (contrail.checkIfExist(dc.id)) {
                                    loadFeature({p: "setting_sm_clusters", q: {"cluster_id": dc.cluster_id}});
                                }
                            }
                        }
                    }
                ]);
                serverColumns = serverColumns.concat(ipColumnsSet);
                serverColumns = serverColumns.concat([
                    {
                        id: "status", field: "status", name: "Status", width: 120, minWidth: 120,
                        formatter: function (r, c, v, cd, dc) {
                            var status = smwl.get(dc.status);
                            if (status == "Provision Completed") {
                                return '<div class="status-badge-rounded status-server-provision-completed"></div> ' + status;
                            } else if (status == "Server Added") {
                                return '<div class="status-badge-rounded status-server-added"></div> ' + status;
                            } else if (status == "Server Discovered") {
                                return '<div class="status-badge-rounded status-server-discovered"></div> ' + status;
                            } else {
                                return '<div class="status-badge-rounded status-server-other"></div> ' + status;
                            }
                        }
                    }
                ]);
                serverColumns = serverColumns.concat(tagColumnsSet);
            } else if (serverColumnsType == smwc.CLUSTER_PREFIX_ID) {
                serverColumns = commonColumnsSet1.concat(ipColumnsSet).concat(this.getGridColumns4Roles());

                serverColumns = serverColumns.concat([
                    {
                        id: "status", field: "status", name: "Status", width: 120, minWidth: 120,
                        formatter: function (r, c, v, cd, dc) {
                            var status = smwl.get(dc.status);
                            if (status == "Provision Completed") {
                                return '<div class="status-badge-rounded status-active"></div> ' + status;
                            } else if (status == "Server Added") {
                                return '<div class="status-badge-rounded status-idle"></div> ' + status;
                            } else {
                                return '<div class="status-badge-rounded status-spawning"></div> ' + status;
                            }
                        }
                    }
                ]);
                serverColumns = serverColumns.concat([
                    { id: "provisioned_id", field: "provisioned_id", name: "Provisioned Id", width: 120, minWidth: 120,
                        formatter: function (r, c, v, cd, dc) {
                            return (contrail.checkIfExist(dc.provisioned_id)) ? smwl.get(dc.provisioned_id) : "-";
                        }
                    }
                ]);
            }

            serverColumns = serverColumns.concat([
                { id: "roleCount", name: "Role Count", field: "roleCount", width: 0, minWidth: 0, maxWidth: 0, cssClass: "hide", headerCssClass: "hide" }
            ]);

            return serverColumns;
        },

        getServerMonitoringHLazyRemoteConfig : function (viewConfig, dataParser) {
            var queryString = contrail.checkIfExist(viewConfig.hashParams) ? smwu.getQueryString4ServersUrl(viewConfig.hashParams) : "",
                hashParams = viewConfig.hashParams;

            queryString = queryString.replace("?", "");

            var listModelConfig = {
                remote: {
                    ajaxConfig: {
                        url: smwc.get(smwc.SM_SERVER_MONITORING_INFO_SUMMARY_URL, queryString)
                    },
                    onAllRequestsCompleteCB: function(contrailListModel, parentModelList) {
                        dataParser(contrailListModel, parentModelList);
                    }
                },
                cacheConfig: {
                    cacheTimeout: cowc.LIST_CACHE_UPDATE_INTERVAL
                }
            };

            if (queryString == "") {
                listModelConfig.cacheConfig.ucid = smwc.UCID_ALL_SERVER_MONITORING_SUMMARY_LIST;
            } else if (hashParams.cluster_id != null && hashParams.tag == null) {
                listModelConfig.cacheConfig.ucid = smwc.get(smwc.UCID_CLUSTER_SERVER_MONITORING_SUMMARY_LIST, hashParams.cluster_id);
            }

            return listModelConfig;
        },

        getBaremetalServerColumns : function (baremetalServerColumnsType) {
            var serverColumns =
                [{
                    id: "serverId",
                    field: "serverId",
                    name: "Server"
                },
                {
                    id: "mac",
                    field: "mac",
                    name: "Mac Address"
                },
                {
                    id: "ip",
                    field: "ip",
                    name: "IP Address"
                },
                {
                    id: "physical_router",
                    field: "physical_router",
                    name: "Physical Router"
                },
                {
                    id: "interface",
                    field: "interface",
                    name: "Interface"
                },
                {
                    id: "vn",
                    field: "vn",
                    name: "Virtual Network"
                }];
            return serverColumns;
        }
    };

    return GridConfig;
});
