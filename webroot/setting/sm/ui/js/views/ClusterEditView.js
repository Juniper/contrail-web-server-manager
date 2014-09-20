/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'knockback'
], function (_, Backbone, Knockback) {
    var prefixId = smConstants.CLUSTER_PREFIX_ID,
        modalId = 'configure-' + prefixId,
        editTemplate = contrail.getTemplate4Id("sm-edit-form-template");

    var ClusterEditView = Backbone.View.extend({
        modalElementId: '#' + modalId,
        renderConfigure: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                //var clusterForm = $('#' + modalId).find('#sm-cluster-edit-form').serializeObject();
                that.model.configure(function () {
                    options['callback']();
                    $('#' + modalId).modal('hide');
                }); // TODO: Release binding on successful configure
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
                smValidation.unbind(that);
                $("#" + modalId).modal('hide');
            }});

            smUtils.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, configureViewConfig, "configureValidation");

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smValidation.bind(this);
        },

        renderAddCluster: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smUtils.createWizardModal({'modalId': modalId, 'className': 'modal-840', 'title': options['title'], 'body': editLayout, 'onSave': function () {
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
                smValidation.unbind(that);
                $("#" + modalId).find('.contrailWizard').data('contrailWizard').destroy();
                $("#" + modalId).modal('hide');
            }});

            smUtils.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, getAddClusterViewConfig(options['callback']), "configureValidation");

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smValidation.bind(this);
        },

        renderProvision: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-840', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                that.model.provision(function () {
                    options['callback']();
                    $('#' + modalId).modal('hide');
                }); // TODO: Release binding on successful configure
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
                smValidation.unbind(that);
                $("#" + modalId).modal('hide');
            }});

            smUtils.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, provisionViewConfig);

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smValidation.bind(this);
        },

        renderAddServers: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smUtils.createWizardModal({'modalId': modalId, 'className': 'modal-840', 'title': options['title'], 'body': editLayout, 'onSave': function () {
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
                smValidation.unbind(that);
                $("#" + modalId).modal('hide');
            }});

            smUtils.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, addServerViewConfig);

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smValidation.bind(this);
        },

        renderAssignRoles: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smUtils.createWizardModal({'modalId': modalId, 'className': 'modal-840', 'title': options['title'], 'body': editLayout, 'onSave': function () {
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
                smValidation.unbind(that);
                $("#" + modalId).modal('hide');
            }});

            smUtils.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, assignRolesViewConfig);

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smValidation.bind(this);
        }
    });

    var configureViewConfig = {
        elementId:  smUtils.formatElementId([prefixId, smLabels.TITLE_EDIT_CONFIG]),
        view: "AccordianView",
        viewConfig: [
            {
                elementId: smUtils.formatElementId([prefixId, smLabels.TITLE_DETAILS]),
                title: smLabels.TITLE_DETAILS,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {elementId: 'id', view: "FormInputView", viewConfig: {disabled:true, path: 'id', dataBindValue: 'id', class: "span6"}},
                                {elementId: 'email', view: "FormInputView", viewConfig: {path: 'email', dataBindValue: 'email', class: "span6"}}

                            ]
                        }
                    ]
                }
            },
            {
                elementId: smUtils.formatElementId([prefixId, smLabels.TITLE_OPENSTACK]),
                title: smLabels.TITLE_OPENSTACK,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {elementId: 'openstack_mgmt_ip', view: "FormInputView", viewConfig: {path: 'parameters.openstack_mgmt_ip', dataBindValue: 'parameters().openstack_mgmt_ip', class: "span6"}},
                                {elementId: 'openstack_passwd', view: "FormInputView", viewConfig: {path: 'parameters.openstack_passwd', dataBindValue: 'parameters().openstack_passwd', class: "span6"}}
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'gateway', view: "FormInputView", viewConfig: {path: 'parameters.gateway', dataBindValue: 'parameters().gateway', class: "span6"}},
                                {elementId: 'subnet_mask', view: "FormInputView", viewConfig: {path: 'parameters.subnet_mask', dataBindValue: 'parameters().subnet_mask', class: "span6"}}
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'keystone_username', view: "FormInputView", viewConfig: {path: 'parameters.keystone_username', dataBindValue: 'parameters().keystone_username', class: "span6"}},
                                {elementId: 'keystone_password', view: "FormInputView", viewConfig: {path: 'parameters.keystone_password', dataBindValue: 'parameters().keystone_password', class: "span6"}}
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'keystone_tenant', view: "FormInputView", viewConfig: {path: 'parameters.keystone_tenant', dataBindValue: 'parameters().keystone_tenant', class: "span6"}}
                            ]
                        }
                    ]
                }
            },
            {
                elementId: smUtils.formatElementId([prefixId, smLabels.TITLE_CONTRAIL]),
                title: smLabels.TITLE_CONTRAIL,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {elementId: 'analytics_data_ttl', view: "FormInputView", viewConfig: {path: 'parameters.analytics_data_ttl', dataBindValue: 'parameters().analytics_data_ttl', class: "span6"}},
                                {elementId: 'ext_bgp', view: "FormInputView", viewConfig: {path: 'parameters.ext_bgp', dataBindValue: 'parameters().ext_bgp', class: "span6"}}
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'router_asn', view: "FormInputView", viewConfig: {path: 'parameters.router_asn', dataBindValue: 'parameters().router_asn', class: "span6"}},
                                {elementId: 'multi_tenancy', view: "FormDropdownView", viewConfig: {path: 'parameters.multi_tenancy', dataBindValue: 'parameters().multi_tenancy', class: "span6", elementConfig: {dataTextField: "text", dataValueField: "id", data: smConstants.FLAGS}}}
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'haproxy', view: "FormDropdownView", viewConfig: {path: 'parameters.haproxy', dataBindValue: 'parameters().haproxy', class: "span6", elementConfig: {dataTextField: "text", dataValueField: "id", data: smConstants.STATES}}},
                                {elementId: 'use_certificates', view: "FormDropdownView", viewConfig: {path: 'parameters.use_certificates', dataBindValue: 'parameters().use_certificates', class: "span6", elementConfig: {dataTextField: "text", dataValueField: "id", data: smConstants.FLAGS}}}
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'database_dir', view: "FormInputView", viewConfig: {path: 'parameters.database_dir', dataBindValue: 'parameters().database_dir', class: "span6"}},
                                {elementId: 'database_token', view: "FormInputView", viewConfig: {path: 'parameters.database_token', dataBindValue: 'parameters().database_token', class: "span6"}}
                            ]
                        }
                    ]
                }
            },
            {
                elementId: smUtils.formatElementId([prefixId, smLabels.TITLE_SERVERS_CONFIG]),
                title: smLabels.TITLE_SERVERS_CONFIG,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {elementId: 'domain', view: "FormInputView", viewConfig: {path: 'parameters.domain', dataBindValue: 'parameters().domain', class: "span6"}},
                                {elementId: 'password', view: "FormInputView", viewConfig: {path: 'parameters.password', dataBindValue: 'parameters().password', class: "span6"}}
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'gateway', view: "FormInputView", viewConfig: {path: 'parameters.gateway', dataBindValue: 'parameters().gateway', class: "span6"}},
                                {elementId: 'subnet_mask', view: "FormInputView", viewConfig: {path: 'parameters.subnet_mask', dataBindValue: 'parameters().subnet_mask', class: "span6"}}
                            ]
                        },
                        {
                            columns: [
                                {
                                    elementId: 'base_image_id',
                                    view: "FormDropdownView",
                                    viewConfig: {path: 'base_image_id', class: "span6", dataBindValue: 'base_image_id', elementConfig: {placeholder: smLabels.SELECT_IMAGE, dataTextField: "id", dataValueField: "id", dataSource: { type: 'remote', url: smUtils.getObjectUrl(smConstants.IMAGE_PREFIX_ID, smConstants.IMAGE_PREFIX_ID)}}}
                                },
                                {
                                    elementId: 'package_image_id',
                                    view: "FormDropdownView",
                                    viewConfig: {path: 'package_image_id', class: "span6", dataBindValue: 'package_image_id', elementConfig: {placeholder: smLabels.SELECT_PACKAGE, dataTextField: "id", dataValueField: "id", dataSource: { type: 'remote', url: smUtils.getObjectUrl(smConstants.IMAGE_PREFIX_ID, smConstants.IMAGE_PREFIX_ID)}}}
                                }
                            ]
                        }
                    ]
                }
            }
        ]
    };

    var addServerViewConfig = {
        elementId:  smUtils.formatElementId([prefixId, smLabels.TITLE_ADD_SERVERS]),
        view: "WizardView",
        viewConfig: {
            steps: [
                {
                    elementId:  smUtils.formatElementId([prefixId, smLabels.TITLE_ADD_SERVERS, smLabels.TITLE_SEARCH_SERVERS]),
                    view: "SectionView",
                    title: smLabels.TITLE_SEARCH_SERVERS,
                    viewConfig: {
                        rows: [
                            {
                                columns: [
                                    {
                                        elementId: 'datacenter',
                                        view: "FormDropdownView",
                                        viewConfig: {path: "tag.datacenter", dataBindValue: "tag().datacenter", class: "span6", elementConfig: {allowClear: true, placeholder: (smLabels.TITLE_SELECT + ' ' + smLabels.get('datacenter')), dataSource: { type: 'remote', url: '/sm/tags/values/datacenter'}}}
                                    },
                                    {
                                        elementId: 'floor',
                                        view: "FormDropdownView",
                                        viewConfig: {path: 'tag.floor', dataBindValue: 'tag().floor', class: "span6", elementConfig: {allowClear: true, placeholder: (smLabels.TITLE_SELECT + ' ' + smLabels.get('floor')), dataSource: { type: 'remote', url: '/sm/tags/values/floor'}}}
                                    }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        elementId: 'hall',
                                        view: "FormDropdownView",
                                        viewConfig: {path: "tag.hall", dataBindValue: "tag().hall", class: "span6", elementConfig: {allowClear: true, placeholder: (smLabels.TITLE_SELECT + ' ' + smLabels.get('hall')), dataSource: { type: 'remote', url: '/sm/tags/values/hall'}}}
                                    },
                                    {
                                        elementId: 'rack',
                                        view: "FormDropdownView",
                                        viewConfig: {path: 'tag.rack', dataBindValue: 'tag().rack', class: "span6", elementConfig: {allowClear: true, placeholder: (smLabels.TITLE_SELECT + ' ' + smLabels.get('rack')), dataSource: { type: 'remote', url: '/sm/tags/values/rack'}}}
                                    }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        elementId: 'user_tag',
                                        view: "FormDropdownView",
                                        viewConfig: {path: "tag.user_tag", dataBindValue: "tag().user_tag", class: "span6", elementConfig: {allowClear: true, placeholder: (smLabels.TITLE_SELECT + ' ' + smLabels.get('user_tag')), dataSource: { type: 'remote', url: '/sm/tags/values/user_tag'}}}
                                    }
                                ]
                            }
                        ]
                    },
                    stepType: 'step',
                    onInitRender: true,
                    showButtons: {
                        previous: false
                    }
                },
                {
                    elementId:  smUtils.formatElementId([prefixId, smLabels.TITLE_ADD_SERVERS, smLabels.TITLE_SELECT_SERVERS]),
                    title: smLabels.TITLE_SELECT_SERVERS,
                    view: "SectionView",
                    viewConfig: {
                        rows: [
                            {
                                columns: [
                                    {
                                        elementId: 'add-server-filtered-servers',
                                        view: "FormGridView",
                                        viewConfig: {
                                            path: 'id',
                                            class: "span12",
                                            elementConfig: getSelectedServerGridElementConfig('add-server')
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    stepType: 'step',
                    onInitRender: true,
                    onLoadFromNext: function (params) {
                        onLoadFilteredServers('add-server', params);
                    }
                },
                {
                    elementId:  smUtils.formatElementId([prefixId, smLabels.TITLE_ADD_SERVERS, smLabels.TITLE_ADD_TO_CLUSTER]),
                    title: smLabels.TITLE_ADD_TO_CLUSTER,
                    view: "SectionView",
                    viewConfig: {
                        rows: [
                            {
                                columns: [
                                    {
                                        elementId: 'add-server-confirm-servers',
                                        view: "FormGridView",
                                        viewConfig: {
                                            path: 'id',
                                            class: "span12",
                                            elementConfig: {
                                                header: {
                                                    title: {
                                                        text: smLabels.TITLE_ADD_SERVERS_TO_CLUSTER
                                                    }
                                                },
                                                columnHeader: {
                                                    columns: smGridConfig.EDIT_SERVERS_ROLES_COLUMNS
                                                },
                                                body: {
                                                    options: {
                                                        checkboxSelectable: false,
                                                        actionCell: {
                                                            type: 'link',
                                                            iconClass: 'icon-minus',
                                                            onclick: function(e, args) {
                                                                var selectedRow = $('#add-server-confirm-servers').data('contrailGrid')._dataView.getItem(args.row);
                                                                updateSelectedServer('add-server', 'remove', [selectedRow]);
                                                            }
                                                        }
                                                    },
                                                    dataSource: {
                                                        data: []
                                                    },
                                                    statusMessages: {
                                                        empty: {
                                                            type: 'status',
                                                            iconClasses: '',
                                                            text: 'No Servers Selected.'
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    stepType: 'step',
                    onInitRender: false,
                    onLoadFromNext: function(params) {
                        $('#add-server-confirm-servers').data('contrailGrid')._dataView.setData($('#add-server-filtered-servers').data('serverData').selectedServers);
                    },
                    onNext: function(params) {
                        var currentSelectedServers = $('#add-server-confirm-servers').data('contrailGrid')._dataView.getItems();
                        return params.model.addServer(currentSelectedServers, function(){
                            $('#' + modalId).modal('hide');
                        });

                    }
                }
            ]
        }
    };

    function getSelectedServerGridElementConfig(gridPrefix) {
        var filteredServerGrid = '#' + gridPrefix + '-filtered-servers';
        var gridElementConfig = {
            header: {
                title: {
                    text: smLabels.TITLE_SELECT_SERVERS
                },
                advanceControls: [
                    {
                        "type": "link",
                        "title": 'Select Servers',
                        "iconClass": "icon-plus",
                        "onClick": function () {
                            var checkedRows = $(filteredServerGrid).data('contrailGrid').getCheckedRows();
                            updateSelectedServer(gridPrefix, 'add', checkedRows);
                        }
                    }
                ]

            },
            columnHeader: {
                columns: smGridConfig.EDIT_SERVERS_ROLES_COLUMNS
            },
            body: {
                options: {
                    actionCell: {
                        type: 'link',
                        iconClass: 'icon-plus',
                        onclick: function(e, args) {
                            var selectedRow = $(filteredServerGrid).data('contrailGrid')._dataView.getItem(args.row);
                            updateSelectedServer(gridPrefix, 'add', [selectedRow]);
                        }
                    }
                },
                dataSource: {
                    remote: {
                        ajaxConfig: {
                            url: smUtils.getObjectDetailUrl(smConstants.SERVER_PREFIX_ID) + '?filterInNull=cluster_id'
                        }
                    },
                    events: {
                        onDataBoundCB: function() {
                            if(contrail.checkIfExist($(filteredServerGrid).data('serverData'))){
                                var serverIds = $(filteredServerGrid).data('serverData').serverIds,
                                    cgrIds = [];
                                if(serverIds.length > 0){
                                    var serverList = $(filteredServerGrid).data('contrailGrid')._dataView.getItems()
                                    $.each(serverList, function(serverListKey, serverListValue){
                                        if(serverIds.indexOf(serverListValue.id) != -1){
                                            cgrIds.push(serverListValue.cgrid);
                                        }
                                    });

                                    $(filteredServerGrid).data('contrailGrid')._dataView.deleteDataByIds(cgrIds);
                                }

                            }
                        }
                    }
                },
                statusMessages: {
                    empty: {
                        type: 'status',
                        iconClasses: '',
                        text: 'No Servers to select.'
                    }
                }
            }
        };

        return gridElementConfig;
    }

    function onLoadFilteredServers(gridPrefix, params) {
        var filteredServerGridElement = $('#' + gridPrefix + '-filtered-servers'),
            tagParams = getParamsFromTags(params.model.model().attributes.tag);

        filteredServerGridElement.data('contrailGrid')._dataView.setRemoteAjaxConfig({
            url: smUtils.getObjectDetailUrl(smConstants.SERVER_PREFIX_ID) + '?filterInNull=cluster_id' + tagParams
        });

        filteredServerGridElement.data('contrailGrid').refreshData();
        if(!contrail.checkIfExist(filteredServerGridElement.data('serverData'))){
            filteredServerGridElement.data('serverData', {
                selectedServers: [],
                serverIds: []
            });
        }
        else {

        }
    }

    function updateSelectedServer(gridPrefix, method, serverList){
        var filteredServerGridElement = $('#' + gridPrefix + '-filtered-servers'),
            confirmServerGridElement = $('#' + gridPrefix + '-confirm-servers'),
            currentSelectedServer = filteredServerGridElement.data('serverData').selectedServers,
            serverIds = filteredServerGridElement.data('serverData').serverIds;

        if(method == 'add') {
            var cgrids = [];
            currentSelectedServer = currentSelectedServer.concat(serverList);
            filteredServerGridElement.data('serverData').selectedServers = currentSelectedServer;

            $.each(serverList, function(serverListKey, serverListValue){
                cgrids.push(serverListValue.cgrid);
                serverIds.push(serverListValue.id);
            });
            filteredServerGridElement.data('contrailGrid')._dataView.deleteDataByIds(cgrids);
        }
        else if(method == 'remove') {
            var cgrids = [];

            $.each(serverList, function(serverListKey, serverListValue){
                cgrids.push(serverListValue.cgrid);
                serverIds.splice(serverIds.indexOf(serverListValue.id), 1 );
            });
            confirmServerGridElement.data('contrailGrid')._dataView.deleteDataByIds(cgrids);
        }

        filteredServerGridElement.data('serverData').serverIds = serverIds;
        filteredServerGridElement.data('serverData').selectedServers = currentSelectedServer;
    }

    var assignRolesViewConfig = {
        elementId:  smUtils.formatElementId([prefixId, smLabels.TITLE_ASSIGN_ROLES]),
        view: "WizardView",
        viewConfig: {
            steps: [
                {
                    elementId:  smUtils.formatElementId([prefixId, smLabels.TITLE_ASSIGN_ROLES, smLabels.TITLE_SEARCH_SERVERS]),
                    view: "SectionView",
                    title: smLabels.TITLE_SEARCH_SERVERS,
                    viewConfig: {
                        rows: [
                            {
                                columns: [
                                    {
                                        elementId: 'datacenter',
                                        view: "FormDropdownView",
                                        viewConfig: {path: "tag.datacenter", dataBindValue: "tag().datacenter", class: "span6", elementConfig: {allowClear: true, placeholder: (smLabels.TITLE_SELECT + ' ' + smLabels.get('datacenter')), dataSource: { type: 'remote', url: '/sm/tags/values/datacenter'}}}
                                    },
                                    {
                                        elementId: 'floor',
                                        view: "FormDropdownView",
                                        viewConfig: {path: 'tag.floor', dataBindValue: 'tag().floor', class: "span6", elementConfig: {allowClear: true, placeholder: (smLabels.TITLE_SELECT + ' ' + smLabels.get('floor')), dataSource: { type: 'remote', url: '/sm/tags/values/floor'}}}
                                    }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        elementId: 'hall',
                                        view: "FormDropdownView",
                                        viewConfig: {path: "tag.hall", dataBindValue: "tag().hall", class: "span6", elementConfig: {allowClear: true, placeholder: (smLabels.TITLE_SELECT + ' ' + smLabels.get('hall')), dataSource: { type: 'remote', url: '/sm/tags/values/hall'}}}
                                    },
                                    {
                                        elementId: 'rack',
                                        view: "FormDropdownView",
                                        viewConfig: {path: 'tag.rack', dataBindValue: 'tag().rack', class: "span6", elementConfig: {allowClear: true, placeholder: (smLabels.TITLE_SELECT + ' ' + smLabels.get('rack')), dataSource: { type: 'remote', url: '/sm/tags/values/rack'}}}
                                    }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        elementId: 'user_tag',
                                        view: "FormDropdownView",
                                        viewConfig: {path: "tag.user_tag", dataBindValue: "tag().user_tag", class: "span6", elementConfig: {allowClear: true, placeholder: (smLabels.TITLE_SELECT + ' ' + smLabels.get('user_tag')), dataSource: { type: 'remote', url: '/sm/tags/values/user_tag'}}}
                                    }
                                ]
                            }
                        ]
                    },
                    stepType: 'step',
                    onInitRender: true,
                    showButtons: {
                        previous: false
                    }
                },
                {
                    elementId:  smUtils.formatElementId([prefixId, smLabels.TITLE_ASSIGN_ROLES, smLabels.TITLE_SELECT_SERVERS]),
                    title: smLabels.TITLE_SELECT_SERVERS,
                    view: "SectionView",
                    viewConfig: {
                        rows: [
                            {
                                columns: [
                                    {
                                        elementId: 'assign-roles-filtered-servers',
                                        view: "FormGridView",
                                        viewConfig: {
                                            path: 'id',
                                            class: "span12",
                                            elementConfig: {
                                                header: {
                                                    title: {
                                                        text: smLabels.TITLE_SELECT_SERVERS
                                                    },
                                                    advanceControls: [
                                                        {
                                                            "type": "link",
                                                            "title": 'Select Servers',
                                                            "iconClass": "icon-plus",
                                                            "onClick": function () {
                                                                var checkedRows = $('#assign-roles-filtered-servers').data('contrailGrid').getCheckedRows();
                                                                $('#assign-roles-filtered-servers').data('serverData').selectedServers = checkedRows;

                                                                var cgrids = [];
                                                                $.each(checkedRows, function(checkedRowKey, checkedRowValue){
                                                                    cgrids.push(checkedRowValue.cgrid);
                                                                });

                                                                $('#assign-roles-filtered-servers').data('contrailGrid')._dataView.deleteDataByIds(cgrids);
                                                            }
                                                        }
                                                    ]

                                                },
                                                columnHeader: {
                                                    columns: smGridConfig.EDIT_SERVERS_ROLES_COLUMNS
                                                },
                                                body: {
                                                    options: {
                                                        actionCell: {
                                                            type: 'link',
                                                            iconClass: 'icon-plus',
                                                            onclick: function(e, args) {
                                                                var selectedRow = $('#assign-roles-filtered-servers').data('contrailGrid')._dataView.getItem(args.row);
                                                                $('#assign-roles-filtered-servers').data('serverData').selectedServers.push(selectedRow);
                                                                $('#assign-roles-filtered-servers').data('contrailGrid').deleteDataByRows([args.row]);
                                                            }
                                                        }
                                                    },
                                                    dataSource: {
                                                        remote: {
                                                            ajaxConfig: {
                                                                url: smUtils.getObjectDetailUrl(smConstants.SERVER_PREFIX_ID) + '?filterInNull=cluster_id'
                                                            }
                                                        }
                                                    },
                                                    statusMessages: {
                                                        empty: {
                                                            type: 'status',
                                                            iconClasses: '',
                                                            text: 'No more Servers to select.'
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    stepType: 'step',
                    onInitRender: true,
                    onLoadFromNext: function (params) {
                        var clusterId = params.model.model().attributes.id,
                            tagParams = getParamsFromTags(params.model.model().attributes.tag);
                        $('#assign-roles-filtered-servers').data('contrailGrid')._dataView.setRemoteAjaxConfig({
                            url: smUtils.getObjectDetailUrl(smConstants.SERVER_PREFIX_ID) + '?cluster_id=' + clusterId + tagParams
                        });

                        $('#assign-roles-filtered-servers').data('contrailGrid').refreshData();
                        $('#assign-roles-filtered-servers').data('serverData' , {
                            selectedServers: []
                        });
                    },
                    onLoadFromPrevious: function (params) {
                        $('#assign-roles-filtered-servers').data('serverData').selectedServers = [];
                    }
                },
                {
                    elementId:  smUtils.formatElementId([prefixId, smLabels.TITLE_ASSIGN_ROLES, smLabels.TITLE_CONFIRM]),
                    title: smLabels.TITLE_ASSIGN_ROLES,
                    view: "SectionView",
                    viewConfig: {
                        rows: [
                            {
                                columns: [
                                    {
                                        elementId: 'assign-roles-confirm-servers',
                                        view: "FormGridView",
                                        viewConfig: {
                                            path: 'id',
                                            class: "span12",
                                            elementConfig: {
                                                header: {
                                                    title: {
                                                        text: smLabels.TITLE_SELECTED_SERVERS
                                                    }
                                                },
                                                columnHeader: {
                                                    columns: smGridConfig.EDIT_SERVERS_ROLES_COLUMNS
                                                },
                                                body: {
                                                    options: {
                                                        checkboxSelectable: false,
                                                        actionCell: {
                                                            type: 'link',
                                                            iconClass: 'icon-minus',
                                                            onclick: function(e, args) {
                                                                $('#assign-roles-confirm-servers').data('contrailGrid').deleteDataByRows([args.row]);
                                                            }
                                                        }
                                                    },
                                                    dataSource: {
                                                        data: []
                                                    },
                                                    statusMessages: {
                                                        empty: {
                                                            type: 'status',
                                                            iconClasses: '',
                                                            text: 'No Servers Selected.'
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                columns: []
                            },
                            {
                                columns: [
                                    {elementId: smUtils.formatElementId([smLabels.TITLE_ASSIGN_ROLES]), view: "FormMultiselectView", viewConfig: {path: 'roles', dataBindValue: 'roles', class: "span12", elementConfig: {placeholder: smLabels.SELECT_ROLES, data: smConstants.ROLES_OBJECTS}}}
                                ]
                            }
                        ]
                    },
                    stepType: 'step',
                    onInitRender: true,
                    onLoadFromNext: function(params) {
                        var currentSelectedServers = $('#assign-roles-confirm-servers').data('contrailGrid')._dataView.getItems(),
                            selectedServers = $('#assign-roles-filtered-servers').data('serverData').selectedServers;

                        $('#assign-roles-confirm-servers').data('contrailGrid')._dataView.setData(currentSelectedServers.concat(selectedServers));
                    },
                    onNext: function(params) {
                        var currentSelectedServers = $('#assign-roles-confirm-servers').data('contrailGrid')._dataView.getItems();

                        return params.model.assignRoles(currentSelectedServers, function(){
                            $('#' + modalId).modal('hide');
                        });

                    }
                }
            ]
        }
    };

    var provisionViewConfig = {
        elementId:  smUtils.formatElementId([prefixId, smLabels.TITLE_PROVISIONING]),
        view: "SectionView",
        viewConfig: {
            rows: [
                {
                    columns: [
                        {
                            elementId: 'base_image_id',
                            view: "FormDropdownView",
                            viewConfig: {path: 'base_image_id', class: "span6", dataBindValue: 'base_image_id', elementConfig: {placeholder: smLabels.SELECT_IMAGE, dataTextField: "id", dataValueField: "id", dataSource: { type: 'remote', url: smUtils.getObjectUrl(smConstants.IMAGE_PREFIX_ID, smConstants.IMAGE_PREFIX_ID)}}}
                        },
                        {
                            elementId: 'package_image_id',
                            view: "FormDropdownView",
                            viewConfig: {path: 'package_image_id', class: "span6", dataBindValue: 'package_image_id', elementConfig: {placeholder: smLabels.SELECT_PACKAGE, dataTextField: "id", dataValueField: "id", dataSource: { type: 'remote', url: smUtils.getObjectUrl(smConstants.IMAGE_PREFIX_ID, smConstants.IMAGE_PREFIX_ID)}}}
                        }
                    ]
                }
            ]
        }
    };

    function getParamsFromTags(tagsObject) {
        if(tagsObject.length == 0){
            return '';
        }
        var tagParams = [];

        $.each(tagsObject, function (tagKey, tagValue) {
            if(tagValue != ''){
                tagParams.push(tagKey + '=' + tagValue);
            }
        });
        return (tagParams.length > 0) ? '&tag=' + tagParams.join(',') : '';
    }

    function getAddClusterViewConfig(callback) {
        var addClusterViewConfig = {
                elementId: smUtils.formatElementId([prefixId, smLabels.TITLE_ADD_CLUSTER]),
                view: "WizardView",
                viewConfig: {
                    steps: []
                }
            },
            steps = [],
            configureStepViewConfig = null,
            addServerStepViewConfig = null,
            assignRolesStepViewConfig = null,
            provisionStepViewConfig;


        //Appending Configure Server Steps
        configureStepViewConfig = $.extend(true, {}, configureViewConfig, {
            // making 'id' NOT disabled
            viewConfig: [{viewConfig: {rows: [{columns: [{viewConfig: {disabled: false}}]}]}}],
            title: smLabels.TITLE_CONFIGURE,
            stepType: 'step',
            showButtons: {
                previous: false
            },
            onInitRender: true,
            onNext: function (params) {
                return params.model.configure(callback);
            }
        });
        steps = steps.concat(configureStepViewConfig);

        //Appending Add Server Steps
        addServerStepViewConfig = $.extend(true, {}, addServerViewConfig.viewConfig).steps;

        addServerStepViewConfig[0].title = smLabels.TITLE_ADD_SERVERS_TO_CLUSTER;
        addServerStepViewConfig[0].viewConfig['title'] = smLabels.TITLE_FILTER_SERVERS;
        addServerStepViewConfig[0].onPrevious = function(params) {
            return false;
        };

        addServerStepViewConfig[1].stepType = 'sub-step';
        addServerStepViewConfig[2].stepType = 'sub-step';
        steps = steps.concat(addServerStepViewConfig);
        addServerStepViewConfig[2].onNext = function(params) {
            var currentSelectedServers = $('#add-server-confirm-servers').data('contrailGrid')._dataView.getItems();
            return params.model.addServer(currentSelectedServers, callback);
        };

        //Appending Assign Roles Steps
        assignRolesStepViewConfig = $.extend(true, {}, assignRolesViewConfig.viewConfig).steps;

        assignRolesStepViewConfig[0].title = smLabels.TITLE_ASSIGN_ROLES;
        assignRolesStepViewConfig[0].viewConfig['title'] = smLabels.TITLE_FILTER_SERVERS;
        assignRolesStepViewConfig[0].onPrevious = function(params) {
            return false;
        };

        assignRolesStepViewConfig[1].stepType = 'sub-step';
        assignRolesStepViewConfig[2].stepType = 'sub-step';
        assignRolesStepViewConfig[2].onNext = function(params) {
            var currentSelectedServers = $('#add-server-confirm-servers').data('contrailGrid')._dataView.getItems();
            return params.model.assignRoles(currentSelectedServers, callback);
        };
        steps = steps.concat(assignRolesStepViewConfig);

        //Appending Provision steps
        provisionStepViewConfig = $.extend(true, {}, provisionViewConfig, {
            title: smLabels.TITLE_PROVISION,
            stepType: 'step',
            onInitRender: true,
            onPrevious: function(params) {
                return false;
            },
            onNext: function (params) {
                return params.model.provision(function(){
                    callback();
                    $('#' + modalId).modal('hide');
                });
            }
        });
        steps = steps.concat(provisionStepViewConfig);

        addClusterViewConfig.viewConfig.steps = steps;

        return addClusterViewConfig;

    }

    return ClusterEditView;
});