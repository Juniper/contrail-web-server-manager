/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'setting/sm/ui/js/models/ServerModel',
    'setting/sm/ui/js/views/ServerEditView'
], function (_, Backbone, ServerModel, ServerEditView) {
    var prefixId = smConstants.SERVER_PREFIX_ID;

    var ServersView = Backbone.View.extend({
        el: $(contentContainer),

        render: function (viewConfig) {
            var smTemplate = contrail.getTemplate4Id(smConstants.SM_PREFIX_ID + "-template"),
                gridElId = '#' + prefixId + '-results',
                serverColumnsType = viewConfig['serverColumnsType'];

            var queryString = getQueryString4ServersUrl(viewConfig['hashParams']);

            this.$el.html(smTemplate({name: prefixId}));

            var gridConfig = {
                header: {
                    title: {
                        text: smLabels.TITLE_SERVERS
                    },
                    advanceControls: getHeaderActionConfig(viewConfig)
                },
                columnHeader: {
                    columns: smGridConfig.getServerColumns(serverColumnsType)
                },
                body: {
                    options: {
                        actionCell: rowActionConfig,
                        detail: {
                            template: $('#sm-grid-2-row-group-detail-template').html(),
                            templateConfig: detailTemplateConfig
                        },
                        sortable: {
                            defaultSortCols: {
                                'discovered': {sortAsc: false},
                                'tag': {sortAsc: true},
                                'status': {sortAsc: true}
                            }
                        }
                    },
                    dataSource: {
                        remote: {
                            ajaxConfig: {
                                url: smUtils.getObjectDetailUrl(prefixId, prefixId) + queryString
                            }
                        }
                    }
                }
            };

            smUtils.renderGrid(gridElId, gridConfig);
        }
    });

    var rowActionConfig = [
        smGridConfig.getRegister2CobblerAction(function (rowIndex) {
        }),
        smGridConfig.getConfigureAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex),
                serverModel = new ServerModel(dataItem),
                serverEditView = new ServerEditView({'model': serverModel});

            serverEditView.renderConfigure({"title": smLabels.TITLE_CONFIGURE_SERVER});
        }),
        smGridConfig.getTagAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex),
                serverModel = new ServerModel(dataItem),
                serverEditView = new ServerEditView({'model': serverModel});

            serverEditView.renderTagServers({"title":  smLabels.TITLE_EDIT_TAGS});
        }),
        smGridConfig.getRoleAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex),
                serverModel = new ServerModel(dataItem),
                serverEditView = new ServerEditView({'model': serverModel});

            serverEditView.renderEditRoles({"title": smLabels.TITLE_ASSIGN_ROLES});
        }),
        smGridConfig.getProvisionAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + '-results').data('contrailGrid')._dataView.getItem(rowIndex),
                serverModel = new ServerModel(dataItem),
                serverEditView = new ServerEditView({'model': serverModel});

            serverEditView.renderProvisionServers({"title": smLabels.TITLE_PROVISION + ' ' + smLabels.TITLE_SERVER});
        })
    ];

    var detailTemplateConfig = [
        [
            {
                title: smLabels.TITLE_DETAILS,
                keys: ['id', 'cluster_id', 'host_name', 'email']
            },
            {
                title: smLabels.TITLE_SYSTEM,
                keys: ['domain', 'ip_address', 'ipmi_address', 'gateway', 'subnet_mask', 'mac_address', 'parameters.interface_name']
            },
            {
                title: smLabels.TITLE_TAGS,
                keys: ['tag.datacenter', 'tag.floor', 'tag.hall', 'tag.rack', 'tag.user_tag']
            }
        ],
        [
            {
                title: smLabels.TITLE_STATUS,
                keys: ['status', 'last_update']
            },
            {
                title: smLabels.TITLE_ROLES,
                keys: ['roles']
            },
            {
                title: smLabels.TITLE_CONFIGURATIONS,
                keys: ['base_image_id', 'package_image_id', 'static_ip', 'parameters.compute_non_mgmt_ip', 'parameters.compute_non_mgmt_gway']
            }
        ]
    ];

    return ServersView;

    function formatData4Ajax(response){
        var filterServerData = [];
        $.each(response, function( key, value ){
            var childrenData = [],
                children = value;
            $.each(children, function(k, v){
                childrenData.push({'id': v, 'text': v});
            });
            filterServerData.push({'id': key, 'text': smLabels.get(key), children: childrenData});
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
        return filterServerData ;
    };

    function getHeaderActionConfig(viewconfig) {
        return [
            {
                "type": "dropdown",
                "iconClass": "icon-cog",
                "actions": [
                    {
                        "iconClass": "icon-signin",
                        "title": smLabels.TITLE_REG_2_COBBLER,
                        "onClick": function () {}
                    },
                    {
                        "iconClass": "icon-edit",
                        "title": smLabels.TITLE_EDIT_CONFIG,
                        "onClick": function () {
                            var serverModel = new ServerModel(),
                                serverEditView = new ServerEditView({'model': serverModel});
                            serverEditView.renderConfigureServers({"title": smLabels.TITLE_CONFIGURE_SERVERS});
                        }
                    },
                    {
                        "iconClass": "icon-tags",
                        "title": smLabels.TITLE_EDIT_TAGS,
                        "onClick": function () {
                            var serverModel = new ServerModel(),
                                serverEditView = new ServerEditView({'model': serverModel});
                            serverEditView.renderTagServers({"title": smLabels.TITLE_EDIT_TAGS});
                        }
                    },
                    {
                        "iconClass": "icon-check",
                        "title": smLabels.TITLE_ASSIGN_ROLES,
                        "onClick": function () {
                            var serverModel = new ServerModel(),
                                serverEditView = new ServerEditView({'model': serverModel});
                            serverEditView.renderEditRoles({"title": smLabels.TITLE_ASSIGN_ROLES});
                        }
                    },
                    {
                        "iconClass": "icon-cloud-upload",
                        "title": smLabels.TITLE_PROVISION,
                        "onClick": function () {
                            var serverModel = new ServerModel(),
                                serverEditView = new ServerEditView({'model': serverModel});
                            serverEditView.renderProvisionServers({"title": smLabels.TITLE_PROVISION_SERVERS});
                        }
                    }
                ]
            },
            {
                type: 'checked-multiselect',
                iconClass: 'icon-filter',
                placeholder: 'Filter Servers',
                elementConfig: {
                    elementId: 'tagsCheckedMultiselect',
                    dataTextField: 'text',
                    dataValueField: 'id',
                    filterConfig: {
                        placeholder: 'Search Tags'
                    },
                    parse: formatData4Ajax,
                    minWidth: 200,
                    dataSource: {
                        type: 'GET',
                        url: smUtils.getTagsUrl()
                    },
                    click: applyServerTagFilter,
                    optgrouptoggle: applyServerTagFilter,
                    control: false
                }
            }
        ];
    };

    function applyServerTagFilter(event, ui){
        var checkedRows = $('#tagsCheckedMultiselect').data('contrailCheckedMultiselect').getChecked();
        $('#' + prefixId + '-results').data('contrailGrid')._dataView.setFilterArgs({
            checkedRows: checkedRows
        });
        $('#' + prefixId + '-results').data('contrailGrid')._dataView.setFilter(serverTagGridFilter);
    };

    function serverTagGridFilter(item, args) {

        if(args.checkedRows.length == 0){
            return true;
        }
        else{
            var returnFlag = true;
            $.each(args.checkedRows, function(checkedRowKey, checkedRowValue){
                var checkedRowValueObj = $.parseJSON(unescape($(checkedRowValue).val()));
                if(item.tag[checkedRowValueObj.parent] == checkedRowValueObj.value){
                    returnFlag = returnFlag && true;
                }
                else{
                    returnFlag = false;
                }
            });
            return returnFlag;
        }
    };

    function getQueryString4ServersUrl(hashParams) {
        var queryString = '', tagKey, tagQueryArray = [];
        ;
        if (hashParams['cluster_id'] != null) {
            queryString += '&cluster_id=' + hashParams['cluster_id'];
        }

        if (hashParams['tag'] != null) {
            for (tagKey in hashParams['tag']) {
                tagQueryArray.push(tagKey + "=" + hashParams['tag'][tagKey]);
            }
            queryString += '&tag=' + tagQueryArray.join(',');
        }
        return queryString;
    };
});