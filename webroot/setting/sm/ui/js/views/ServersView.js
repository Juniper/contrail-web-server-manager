/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'setting/sm/ui/js/models/ServerModel',
    'setting/sm/ui/js/views/ServerEditView'
], function (_, Backbone, ServerModel, ServerEditView) {
    var prefixId = smwc.SERVER_PREFIX_ID,
        gridElId = '#' + prefixId + smwc.RESULTS_SUFFIX_ID,
        serverEditView = new ServerEditView();

    var ServersView = Backbone.View.extend({
        el: $(contentContainer),

        render: function (viewConfig) {
            var hashParams = viewConfig['hashParams']
            if (hashParams['server_id'] != null) {
                this.renderServer(hashParams['server_id']);
            } else {
                this.renderServersList(viewConfig);
            }
        },

        renderServersList: function (viewConfig) {
            var smTemplate = contrail.getTemplate4Id(smwc.SM_PREFIX_ID + smwc.TMPL_SUFFIX_ID),
                serverColumnsType = viewConfig['serverColumnsType'],
                showAssignRoles = viewConfig['showAssignRoles'];

            var queryString = getQueryString4ServersUrl(viewConfig['hashParams']);

            this.$el.html(smTemplate({name: prefixId}));

            var gridConfig = {
                header: {
                    title: {
                        text: smwl.TITLE_SERVERS
                    },
                    advanceControls: getHeaderActionConfig(queryString, showAssignRoles)
                },
                columnHeader: {
                    columns: smwgc.getServerColumns(serverColumnsType)
                },
                body: {
                    options: {
                        actionCell: getRowActionConfig(showAssignRoles),
                        checkboxSelectable: {
                            onNothingChecked: function (e) {
                                $('#btnActionServers').addClass('disabled-link').removeAttr('data-toggle');
                            },
                            onSomethingChecked: function (e) {
                                $('#btnActionServers').removeClass('disabled-link').attr('data-toggle', 'dropdown');
                            }
                        },
                        detail: {
                            template: $('#' + smwc.TMPL_2ROW_GROUP_DETAIL).html(),
                            templateConfig: detailTemplateConfig
                        },
                        sortable: {
                            defaultSortCols: {
                                'discovered': {sortAsc: false},
                                'status': {sortAsc: true}
                            }
                        }
                    },
                    dataSource: {
                        remote: {
                            ajaxConfig: {
                                url: smwu.getObjectDetailUrl(prefixId) + queryString
                            }
                        }
                    }
                }
            };

            smwu.renderGrid(gridElId, gridConfig);
        },

        renderServer: function (serverId) {
            var detailTemplate = contrail.getTemplate4Id(smwc.TMPL_2ROW_GROUP_DETAIL),
                serverTemplate = contrail.getTemplate4Id(smwc.TMPL_DETAIL_PAGE),
                serverActionTemplate = contrail.getTemplate4Id(smwc.TMPL_DETAIL_PAGE_ACTION),
                ajaxConfig = {}, that = this;

            ajaxConfig.type = "GET";
            ajaxConfig.cache = "true";
            ajaxConfig.url = smwu.getObjectDetailUrl(smwc.SERVER_PREFIX_ID) + "?id=" + serverId;

            that.$el.html(serverTemplate({prefix: smwc.SERVER_PREFIX_ID, prefixId: serverId}));

            contrail.ajaxHandler(ajaxConfig, function () {}, function (response) {
                var actionConfigItem = null,
                    detailActionConfig = getDetailActionConfig(false),
                    gridConfig, ipmiElId;

                $.each(detailActionConfig, function(detailActionConfigKey, detailActionConfigValue) {
                    actionConfigItem = $(serverActionTemplate(detailActionConfigValue));
                    $('#' + smwc.SERVER_PREFIX_ID + '-actions').find('.dropdown-menu').append(actionConfigItem);

                    $(actionConfigItem).on('click', function(){
                        detailActionConfigValue.onClick(response[0])
                    });
                });

                that.$el.find('#' + smwc.SERVER_PREFIX_ID + '-details').html(detailTemplate({dc: response[0], templateConfig: detailTemplateConfig, advancedViewOptions: false}));

                ipmiElId = '#' + smwc.SERVER_PREFIX_ID + "-ipmi-info";
                gridConfig = getIPMIInfoGridConfig(serverId);
                smwu.renderGrid(ipmiElId, gridConfig);
            }, function () {});
        }
    });

    function getIPMIInfoGridConfig(serverId) {
        return {
            header: {
                title: {
                    text: smwl.SENSORS_INFO
                }
            },
            columnHeader: {
                columns: smwgc.SERVER_IPMI_INFO_COLUMNS
            },
            body: {
                options: {
                    detail: false,
                    checkboxSelectable: false
                },
                dataSource: {
                    remote: {
                        ajaxConfig: {
                            url: smwu.getIPMIInfoUrl(serverId)
                        }
                    }
                }
            },
            footer : {
                pager : {
                    options : {
                        pageSize : 10,
                        pageSizeSelect : [10, 20, 50, 100, 200 ]
                    }
                }
            }
        };
    }

    function getDetailActionConfig(showAssignRoles) {
        var rowActionConfig = [
            smwgc.getConfigureAction(function (dataItem) {
                var serverModel = new ServerModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_EDIT_CONFIG + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderConfigure({"title": title, checkedRows: checkedRow, callback: function () {
                    loadFeature({p: smwc.URL_HASH_SM_SERVERS, q: {server_id: dataItem['id']}});
                }});
            }),
            smwgc.getTagAction(function (dataItem) {
                var serverModel = new ServerModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_EDIT_TAGS + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderTagServers({
                    title: title,
                    checkedRows: checkedRow,
                    callback: function () {
                        loadFeature({p: smwc.URL_HASH_SM_SERVERS, q: {server_id: dataItem['id']}});
                    },
                    lockEditingByDefault: false
                });
            })
        ];

        if (showAssignRoles) {
            rowActionConfig.push(smwgc.getAssignRoleAction(function (dataItem) {
                var serverModel = new ServerModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_ASSIGN_ROLES + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderAssignRoles({"title": title, checkedRows: checkedRow, callback: function () {
                    loadFeature({p: smwc.URL_HASH_SM_SERVERS, q: {server_id: dataItem['id']}});
                }});
            }));
        }

        rowActionConfig = rowActionConfig.concat([
            smwgc.getReimageAction(function (dataItem) {
                var serverModel = new ServerModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_REIMAGE + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderReimage({"title": title, checkedRows: checkedRow, callback: function () {
                    loadFeature({p: smwc.URL_HASH_SM_SERVERS, q: {server_id: dataItem['id']}});
                }});
            }, true),
            smwgc.getProvisionAction(function (dataItem) {
                var serverModel = new ServerModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_PROVISION_SERVER + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderProvisionServers({"title": title, checkedRows: checkedRow, callback: function () {
                    loadFeature({p: smwc.URL_HASH_SM_SERVERS, q: {server_id: dataItem['id']}});
                }});
            }),
            smwgc.getDeleteAction(function (dataItem) {
                var serverModel = new ServerModel(dataItem),
                    checkedRow = dataItem,
                    title = smwl.TITLE_DEL_SERVER + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderDeleteServer({"title": title, checkedRows: checkedRow, callback: function () {
                    loadFeature({p: smwc.URL_HASH_SM_SERVERS});
                }});
            }, true)
        ]);

        return rowActionConfig;
    };

    function getRowActionConfig(showAssignRoles) {
        var rowActionConfig = [
            smwgc.getConfigureAction(function (rowIndex) {
                var dataItem = $('#' + prefixId + smwc.RESULTS_SUFFIX_ID).data('contrailGrid')._dataView.getItem(rowIndex),
                    serverModel = new ServerModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_EDIT_CONFIG + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderConfigure({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }),
            smwgc.getTagAction(function (rowIndex) {
                var dataItem = $('#' + prefixId + smwc.RESULTS_SUFFIX_ID).data('contrailGrid')._dataView.getItem(rowIndex),
                    serverModel = new ServerModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_EDIT_TAGS + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderTagServers({
                    "title": title,
                    checkedRows: checkedRow,
                    callback: function () {
                        var dataView = $(gridElId).data("contrailGrid")._dataView;
                        dataView.refreshData();
                        $('#tagsCheckedMultiselect').data('contrailCheckedMultiselect').refresh();
                    },
                    lockEditingByDefault: false
                });
            })
        ];

        if (showAssignRoles) {
            rowActionConfig.push(smwgc.getAssignRoleAction(function (rowIndex) {
                var dataItem = $('#' + prefixId + smwc.RESULTS_SUFFIX_ID).data('contrailGrid')._dataView.getItem(rowIndex),
                    serverModel = new ServerModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_ASSIGN_ROLES + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderAssignRoles({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }));
        }
        rowActionConfig = rowActionConfig.concat([smwgc.getReimageAction(function (rowIndex) {
                var dataItem = $('#' + prefixId + smwc.RESULTS_SUFFIX_ID).data('contrailGrid')._dataView.getItem(rowIndex),
                    serverModel = new ServerModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_REIMAGE + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderReimage({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }, true),
            smwgc.getProvisionAction(function (rowIndex) {
                var dataItem = $('#' + prefixId + smwc.RESULTS_SUFFIX_ID).data('contrailGrid')._dataView.getItem(rowIndex),
                    serverModel = new ServerModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_PROVISION_SERVER + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderProvisionServers({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }),
            smwgc.getDeleteAction(function (rowIndex) {
                var dataItem = $('#' + prefixId + smwc.RESULTS_SUFFIX_ID).data('contrailGrid')._dataView.getItem(rowIndex),
                    serverModel = new ServerModel(dataItem),
                    checkedRow = dataItem,
                    title = smwl.TITLE_DEL_SERVER + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderDeleteServer({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }, true)
        ]);

        return rowActionConfig;
    };

    var detailTemplateConfig = [
        [
            {
                title: smwl.TITLE_SYSTEM_MANAGEMENT,
                keys: ['id', 'mac_address', 'host_name', 'domain', 'ip_address', 'ipmi_address', 'gateway', 'subnet_mask', 'static_ip', 'parameters.partition']
            },
            {
                title: smwl.TITLE_CONTRAIL_CONTROLLER,
                keys: ['package_image_id', 'contrail.control_data_interface']
            },
            {
                title: smwl.TITLE_CONTRAIL_STORAGE,
                keys: ['parameters.storage_repo_id', 'parameters.live_migration', 'parameters.live_migration_nfs_vm_host', 'parameters.live_migration_storage_scope', 'parameters.disks']
            }
        ],
        [
            {
                title: smwl.TITLE_STATUS,
                keys: ['status', 'last_update', 'state']
            },
            {
                title: smwl.TITLE_ROLES,
                keys: ['roles']
            },
            {
                title: smwl.TITLE_TAGS,
                keys: ['tag.datacenter', 'tag.floor', 'tag.hall', 'tag.rack', 'tag.user_tag']
            },
            {
                title: smwl.TITLE_INTERFACES,
                keys: ['parameters.interface_name', 'intf_bond', 'intf_data', 'intf_control']
            },
            {
                title: smwl.TITLE_PROVISIONING,
                keys: [ 'cluster_id', 'email', 'base_image_id', 'reimaged_id', 'provisioned_id', 'network.management_interface']
            }
        ]
    ];

    return ServersView;

    function formatData4Ajax(response) {
        var filterServerData = [];
        $.each(response, function (key, value) {
            var childrenData = [],
                children = value;
            $.each(children, function (k, v) {
                childrenData.push({'id': v, 'text': v});
            });
            filterServerData.push({'id': key, 'text': smwl.get(key), children: childrenData});
        });

        /*if (contrail.checkIfExist(viewconfig.hashParams) && contrail.checkIfExist(viewconfig.hashParams.tag) && !$.isEmptyObject(viewconfig.hashParams)) {
         $.each(filterServerData, function (filterServerDataKey, filterServerDataValue) {
         var filterServerDataMapValue = {key: filterServerDataKey, children: {}},
         filterServerDataMapChildrenValue = {};

         $.each(filterServerData[filterServerDataKey].children, function (filterServerDataChildrenKey, filterServerDataChildrenValue) {
         filterServerDataMapChildrenValue[filterServerDataChildrenValue.id] = {key: filterServerDataChildrenKey};
         });

         filterServerDataMapValue.children = filterServerDataMapChildrenValue;
         filterServerDataMap[filterServerDataValue.id] = filterServerDataMapValue;
         });

         $.each(viewconfig.hashParams.tag, function (hashParamKey, hashParamValue) {
         var parentKey = filterServerDataMap[hashParamKey].key,
         childrenKey = filterServerDataMap[hashParamKey].children[hashParamValue].key;

         filterServerData[parentKey].children[childrenKey]['selected'] = true;
         });
         }*/
        return filterServerData;
    };

    function getHeaderActionConfig(queryString, showAssignRoles) {
        var headerActionConfig, dropdownActions;
        dropdownActions = [
            {
                "iconClass": "icon-edit",
                "title": smwl.TITLE_EDIT_CONFIG,
                "onClick": function () {
                    var serverModel = new ServerModel(),
                        checkedRows = $(gridElId).data("contrailGrid").getCheckedRows();

                    serverEditView.model = serverModel;
                    serverEditView.renderConfigureServers({"title": smwl.TITLE_EDIT_CONFIG, checkedRows: checkedRows, callback: function () {
                        var dataView = $(gridElId).data("contrailGrid")._dataView;
                        dataView.refreshData();
                    }});
                }
            },
            {
                "iconClass": "icon-tags",
                "title": smwl.TITLE_EDIT_TAGS,
                "onClick": function () {
                    var serverModel = new ServerModel(),
                        checkedRows = $(gridElId).data("contrailGrid").getCheckedRows();

                    serverEditView.model = serverModel;
                    serverEditView.renderTagServers({
                        "title": smwl.TITLE_EDIT_TAGS,
                        "checkedRows": checkedRows,
                        callback: function () {
                            var dataView = $(gridElId).data("contrailGrid")._dataView;
                            dataView.refreshData();
                            $('#tagsCheckedMultiselect').data('contrailCheckedMultiselect').refresh();
                        },
                        lockEditingByDefault: true
                    });
                }
            }
        ];
        if (showAssignRoles) {
            dropdownActions.push({
                "iconClass": "icon-check",
                "title": smwl.TITLE_ASSIGN_ROLES,
                "onClick": function () {
                    var serverModel = new ServerModel(),
                        checkedRows = $(gridElId).data("contrailGrid").getCheckedRows();

                    serverEditView.model = serverModel;
                    serverEditView.renderAssignRoles({"title": smwl.TITLE_ASSIGN_ROLES, "checkedRows": checkedRows, callback: function () {
                        var dataView = $(gridElId).data("contrailGrid")._dataView;
                        dataView.refreshData();
                    }});
                }
            });
        }
        dropdownActions.push({
            "iconClass": "icon-signin",
            "title": smwl.TITLE_REIMAGE,
            divider: true,
            "onClick": function () {
            var serverModel = new ServerModel(),
                checkedRows = $(gridElId).data("contrailGrid").getCheckedRows();

                serverEditView.model = serverModel;
                serverEditView.renderReimage({"title": smwl.TITLE_REIMAGE, checkedRows: checkedRows, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }
        }),
        dropdownActions.push({
            "iconClass": "icon-cloud-upload",
            "title": smwl.TITLE_PROVISION,
            "onClick": function () {
                var serverModel = new ServerModel(),
                    checkedRows = $(gridElId).data("contrailGrid").getCheckedRows();

                serverEditView.model = serverModel;
                serverEditView.renderProvisionServers({"title": smwl.TITLE_PROVISION_SERVERS, "checkedRows": checkedRows, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }
        });
        headerActionConfig = [
            {
                "type": "dropdown",
                "iconClass": "icon-cog",
                "linkElementId": 'btnActionServers',
                "disabledLink": true,
                "actions": dropdownActions
            }
        ];

        headerActionConfig = headerActionConfig.concat([
            {
                "type": "link",
                "title": smwl.TITLE_ADD_SERVER,
                "iconClass": "icon-plus",
                "onClick": function () {
                    var serverModel = new ServerModel();

                    serverEditView.model = serverModel;
                    serverEditView.renderAddServer({"title": smwl.TITLE_ADD_SERVER, callback: function () {
                        var dataView = $(gridElId).data("contrailGrid")._dataView;
                        dataView.refreshData();
                    }});
                }
            }, {
                type: 'checked-multiselect',
                iconClass: 'icon-filter',
                placeholder: 'Filter Servers',
                elementConfig: {
                    elementId: 'tagsCheckedMultiselect',
                    dataTextField: 'text',
                    dataValueField: 'id',
                    noneSelectedText: smwl.FILTER_TAGS,
                    filterConfig: {
                        placeholder: smwl.SEARCH_TAGS
                    },
                    parse: formatData4Ajax,
                    minWidth: 150,
                    height: 250,
                    emptyOptionText: 'No Tags found.',
                    dataSource: {
                        type: 'GET',
                        url: smwu.getTagsUrl(queryString)
                    },
                    click: applyServerTagFilter,
                    optgrouptoggle: applyServerTagFilter,
                    control: false
                }
            }
        ]);
        return headerActionConfig;
    };

    function applyServerTagFilter(event, ui) {
        var checkedRows = $('#tagsCheckedMultiselect').data('contrailCheckedMultiselect').getChecked();
        $('#' + prefixId + smwc.RESULTS_SUFFIX_ID).data('contrailGrid')._dataView.setFilterArgs({
            checkedRows: checkedRows
        });
        $('#' + prefixId + smwc.RESULTS_SUFFIX_ID).data('contrailGrid')._dataView.setFilter(serverTagGridFilter);
    };

    /*
        ServerFilter: OR within the category , AND across the category
     */
    function serverTagGridFilter(item, args) {
        if (args.checkedRows.length == 0) {
            return true;
        } else {
            var returnObj = {},
                returnFlag = true;
            $.each(args.checkedRows, function (checkedRowKey, checkedRowValue) {
                var checkedRowValueObj = $.parseJSON(unescape($(checkedRowValue).val()));
                if(!contrail.checkIfExist(returnObj[checkedRowValueObj.parent])){
                    returnObj[checkedRowValueObj.parent] = false;
                }
                returnObj[checkedRowValueObj.parent] = returnObj[checkedRowValueObj.parent] || (item.tag[checkedRowValueObj.parent] == checkedRowValueObj.value);
            });

            $.each(returnObj, function(returnObjKey, returnObjValue) {
                returnFlag = returnFlag && returnObjValue;
            });

            return returnFlag;
        }
    };

    function getQueryString4ServersUrl(hashParams) {
        var queryString = '', tagKey, tagQueryArray = [];
        ;
        if (hashParams['cluster_id'] != null) {
            queryString += '?cluster_id=' + hashParams['cluster_id'];
        }

        if (hashParams['tag'] != null) {
            for (tagKey in hashParams['tag']) {
                tagQueryArray.push(tagKey + "=" + hashParams['tag'][tagKey]);
            }
            queryString += '?tag=' + tagQueryArray.join(',');
        }
        return queryString;
    };
});