/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'knockback'
], function (_, Backbone, Knockback) {

    var prefixId = smwc.SERVER_PREFIX_ID,
        modalId = 'configure-' + prefixId,
        editTemplate = contrail.getTemplate4Id(smwc.TMPL_EDIT_FORM);

    var ServerEditView = Backbone.View.extend({

        renderReimage: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smwu.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                that.model.reimage(options['checkedRows'], {
                    init: function () {
                        that.model.showErrorAttr(prefixId + smwc.FORM_SUFFIX_ID, false);
                        smwu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options['callback']();
                        $("#" + modalId).modal('hide');
                    },
                    error: function (error) {
                        smwu.disableModalLoading(modalId, function () {
                            that.model.showErrorAttr(prefixId + smwc.FORM_SUFFIX_ID, error.responseText);
                        });
                    }
                }); // TODO: Release binding on successful configure
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
                smwv.unbind(that);
                $("#" + modalId).modal('hide');
            }});

            smwu.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, reimageViewConfig);
            this.model.showErrorAttr(prefixId + smwc.FORM_SUFFIX_ID, false);

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smwv.bind(this);
        },

        renderConfigure: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                disableId, modelAttr, that = this;

            smwu.createModal({'modalId': modalId, 'className': 'modal-840', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                that.model.configure(options['checkedRows'], {
                    init: function () {
                        that.model.showErrorAttr(prefixId + smwc.FORM_SUFFIX_ID, false);
                        smwu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options['callback']();
                        $('#server-interfaces-grid').data('contrailDynamicgrid')._grid.destroy();
                        $("#" + modalId).modal('hide');
                    },
                    error: function (error) {
                        smwu.disableModalLoading(modalId, function () {
                            that.model.showErrorAttr(prefixId + smwc.FORM_SUFFIX_ID, error.responseText);
                        });
                    }
                });
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
                $('#server-interfaces-grid').data('contrailDynamicgrid')._grid.destroy();
                smwv.unbind(that);
                $("#" + modalId).modal('hide');
            }});

            modelAttr = this.model.model().get('id');
            disableId = (modelAttr == null || modelAttr == '') ? false : true;

            smwu.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, getConfigureViewConfig(disableId), "configureValidation");
            this.model.showErrorAttr(prefixId + smwc.FORM_SUFFIX_ID, false);

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smwv.bind(this);
        },

        renderConfigureServers: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smwu.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                that.model.configureServers(options['checkedRows'], {
                    init: function () {
                        that.model.showErrorAttr(prefixId + smwc.FORM_SUFFIX_ID, false);
                        smwu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options['callback']();
                        $("#" + modalId).modal('hide');
                    },
                    error: function (error) {
                        smwu.disableModalLoading(modalId, function () {
                            that.model.showErrorAttr(prefixId + smwc.FORM_SUFFIX_ID, error.responseText);
                        });
                    }
                });
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
                smwv.unbind(that);
                $("#" + modalId).modal('hide');
            }});

            smwu.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, configureServersViewConfig, "configureValidation", true);
            this.model.showErrorAttr(prefixId + smwc.FORM_SUFFIX_ID, false);

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smwv.bind(this);
        },

        renderAddServer: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smwu.createModal({'modalId': modalId, 'className': 'modal-840', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                that.model.createServers({
                    init: function () {
                        that.model.showErrorAttr(prefixId + smwc.FORM_SUFFIX_ID, false);
                        smwu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options['callback']();
                        $('#server-interfaces-grid').data('contrailDynamicgrid')._grid.destroy();
                        $("#" + modalId).modal('hide');
                    },
                    error: function (error) {
                        smwu.disableModalLoading(modalId, function () {
                            that.model.showErrorAttr(prefixId + smwc.FORM_SUFFIX_ID, error.responseText);
                        });
                    }
                }, "POST");
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
                $('#server-interfaces-grid').data('contrailDynamicgrid')._grid.destroy();
                smwv.unbind(that);
                $("#" + modalId).modal('hide');
            }});

            smwu.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, getConfigureViewConfig(false), "configureValidation");
            this.model.showErrorAttr(prefixId + smwc.FORM_SUFFIX_ID, false);

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smwv.bind(this);
        },

        renderProvisionServers: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smwu.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                that.model.provision(options['checkedRows'], {
                    init: function () {
                        that.model.showErrorAttr(prefixId + smwc.FORM_SUFFIX_ID, false);
                        smwu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options['callback']();
                        $("#" + modalId).modal('hide');
                    },
                    error: function (error) {
                        smwu.disableModalLoading(modalId, function () {
                            that.model.showErrorAttr(prefixId + smwc.FORM_SUFFIX_ID, error.responseText);
                        });
                    }
                });
                // TODO: Release binding on successful configure
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
                smwv.unbind(that);
                $("#" + modalId).modal('hide');
            }});

            smwu.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, provisionServersViewConfig);
            this.model.showErrorAttr(prefixId + smwc.FORM_SUFFIX_ID, false);

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smwv.bind(this);
        },

        renderTagServers: function (options) {
            var that = this;

            getTagServersViewConfigRows(function (tagServersViewConfigRows) {
                var editLayout = editTemplate({prefixId: prefixId}),
                    editTagViewConfig = {
                        elementId: (prefixId + '_' + smwl.TITLE_TAG).toLowerCase(),
                        view: "SectionView",
                        viewConfig: {
                            rows: tagServersViewConfigRows
                        }
                    },
                    lockEditingByDefault = options.lockEditingByDefault;

                smwu.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                        that.model.editTags(options['checkedRows'], {
                            init: function () {
                                that.model.showErrorAttr(prefixId + smwc.FORM_SUFFIX_ID, false);
                                smwu.enableModalLoading(modalId);
                            },
                            success: function () {
                                options['callback']();
                                $("#" + modalId).modal('hide');
                            },
                            error: function (error) {
                                smwu.disableModalLoading(modalId, function () {
                                    that.model.showErrorAttr(prefixId + smwc.FORM_SUFFIX_ID, error.responseText);
                                });
                            }
                        }); // TODO: Release binding on successful configure
                    }, 'onCancel': function () {
                        Knockback.release(that.model, document.getElementById(modalId));
                        smwv.unbind(that);
                        $("#" + modalId).modal('hide');
                    }
                });

                smwu.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), that.model, editTagViewConfig, 'editTagsValidation', lockEditingByDefault);
                that.model.showErrorAttr(prefixId + smwc.FORM_SUFFIX_ID, false);

                Knockback.applyBindings(that.model, document.getElementById(modalId));
            });
        },

        renderAssignRoles: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smwu.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                that.model.editRoles(options['checkedRows'], {
                    init: function () {
                        that.model.showErrorAttr(prefixId + smwc.FORM_SUFFIX_ID, false);
                        smwu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options['callback']();
                        $("#" + modalId).modal('hide');
                    },
                    error: function (error) {
                        smwu.disableModalLoading(modalId, function () {
                            that.model.showErrorAttr(prefixId + smwc.FORM_SUFFIX_ID, error.responseText);
                        });
                    }
                }); // TODO: Release binding on successful configure
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
                smwv.unbind(that);
                $("#" + modalId).modal('hide');
            }});

            smwu.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, assignRolesViewConfig);
            this.model.showErrorAttr(prefixId + smwc.FORM_SUFFIX_ID, false);

            Knockback.applyBindings(this.model, document.getElementById(modalId));
        },

        renderDeleteServer: function (options) {
            var textTemplate = contrail.getTemplate4Id("sm-delete-server-template"),
                elId = 'deleteServer',
                that = this,
                checkedRows = options['checkedRows'],
                serversToBeDeleted = {'serverId': [], 'elementId': elId};
            serversToBeDeleted['serverId'].push(checkedRows['id']);

            smwu.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'btnName': 'Confirm', 'body': textTemplate(serversToBeDeleted), 'onSave': function () {
                that.model.deleteServer(options['checkedRows'], {
                    init: function () {
                        that.model.showErrorAttr(elId, false);
                        smwu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options['callback']();
                        $("#" + modalId).modal('hide');
                    },
                    error: function (error) {
                        smwu.disableModalLoading(modalId, function () {
                            that.model.showErrorAttr(elId, error.responseText);
                        });
                    }
                });
            }, 'onCancel': function () {
                $("#" + modalId).modal('hide');
            }});

            this.model.showErrorAttr(elId, false);

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smwv.bind(this);
        }
    });

    function getTagServersViewConfigRows(callback) {
        var ajaxConfig = {type: "GET", cache: "true", url: smwc.URL_TAG_NAMES},
            tagServersViewConfigRows = [];

        contrail.ajaxHandler(ajaxConfig, function () {}, function (response) {
            var row, columns, isNewRow, tagName;
            for (var i = 0; response != null && i < response.length; i++) {
                isNewRow = ((i % 2) == 0) ? true : false;
                tagName = response[i];
                if (isNewRow) {
                    row = {columns: []};
                    tagServersViewConfigRows.push(row);
                }
                row['columns'].push({ elementId: tagName, view: "FormInputView", viewConfig: {path: "tag." + tagName, dataBindValue: "tag()." + tagName, class: "span6"}});
            }
            callback(tagServersViewConfigRows)
        }, function () {
            callback(tagServersViewConfigRows)
        });
    };

    function getConfigureViewConfig(disableId) {
        return {
            elementId: prefixId,
                view: "AccordianView",
            viewConfig: [
            {
                elementId: smwu.formatElementId([prefixId, smwl.TITLE_SYSTEM_MANAGEMENT]),
                title: smwl.TITLE_SYSTEM_MANAGEMENT,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {elementId: 'id', view: "FormInputView", viewConfig: {disabled: disableId, path: "id", dataBindValue: "id", class: "span6"}},
                                {elementId: 'password', view: "FormInputView", viewConfig: {path: 'password', type: 'password', dataBindValue: 'password', class: "span6"}}
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'host_name', view: "FormInputView", viewConfig: {path: "host_name", dataBindValue: "host_name", class: "span6"}},
                                {elementId: 'domain', view: "FormInputView", viewConfig: {path: "domain", dataBindValue: "domain", class: "span6", view: "FormInputView"}}
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'static_ip', view: "FormInputView", viewConfig: {path: 'static_ip', dataBindValue: 'static_ip', class: "span6"}},
                                {elementId: 'ipmi_address', view: "FormInputView", viewConfig: {path: 'ipmi_address', dataBindValue: 'ipmi_address', class: "span6"}}
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'ipmi_username', view: "FormInputView", viewConfig: {path: 'ipmi_username', dataBindValue: 'ipmi_username', class: "span6"}},
                                {elementId: 'ipmi_password', view: "FormInputView", viewConfig: {path: 'ipmi_password', type: 'password', dataBindValue: 'ipmi_password', class: "span6"}}
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'partition', view: "FormInputView", viewConfig: {path: 'parameters.partition', dataBindValue: 'parameters().partition', class: "span6"}},
                            ]
                        }
                    ]
                }
            },
            {
                elementId: smwu.formatElementId([prefixId, smwl.TITLE_INTERFACES]),
                title: smwl.TITLE_INTERFACES,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {
                                    elementId: 'server-interfaces-grid',
                                    view: "FormDynamicGridView",
                                    viewConfig: {
                                        path: 'network.interfaces',
                                        class: "span12",
                                        modelAttributePath: 'network.interfaces',
                                        elementConfig: {
                                            options: {
                                                uniqueColumn: 'name',
                                                events: {
                                                    onUpdate: function () {
                                                        var interfaces = $('#server-interfaces-grid').data('contrailDynamicgrid')._grid.getData(),
                                                            managementInterfacePrevData = $('#management_interface_dropdown').data('contrailDropdown').getAllData(),
                                                            managementInterfacePrevValue = $('#management_interface_dropdown').data('contrailDropdown').value(),
                                                            managementInterfaceData = [],
                                                            controlDataInterfacePrevData = $('#control_data_interface_dropdown').data('contrailDropdown').getAllData(),
                                                            controlDataInterfacePrevValue = $('#control_data_interface_dropdown').data('contrailDropdown').value(),
                                                            controlDataInterfaceData = [],
                                                            bondMemberInterfaces = [];

                                                        $.each(interfaces, function(interfaceKey, interfaceValue) {
                                                            bondMemberInterfaces = bondMemberInterfaces.concat(interfaceValue.member_interfaces);
                                                        });

                                                        $.each(interfaces, function (interfaceKey, interfaceValue) {
                                                            if (interfaceValue.name != '' && bondMemberInterfaces.indexOf(interfaceValue.name) == -1) {
                                                                if ((!contrail.checkIfExist(interfaceValue.type) || (contrail.checkIfExist(interfaceValue.type) &&interfaceValue.type == 'physical')) && interfaceValue.dhcp) {
                                                                    managementInterfaceData.push({
                                                                        id: interfaceValue.name,
                                                                        text: interfaceValue.name
                                                                    });
                                                                }

                                                                controlDataInterfaceData.push({
                                                                    id: interfaceValue.name,
                                                                    text: interfaceValue.name
                                                                });
                                                            }
                                                        });

                                                        if (JSON.stringify(managementInterfacePrevData) != JSON.stringify(managementInterfaceData)) {
                                                            $('#management_interface_dropdown').data('contrailDropdown').setData(managementInterfaceData);
                                                            $('#management_interface_dropdown').data('contrailDropdown').value(managementInterfacePrevValue);
                                                        }
                                                        if (JSON.stringify(controlDataInterfacePrevData) != JSON.stringify(controlDataInterfaceData)) {
                                                            $('#control_data_interface_dropdown').data('contrailDropdown').setData(controlDataInterfaceData);
                                                            $('#control_data_interface_dropdown').data('contrailDropdown').value(controlDataInterfacePrevValue);
                                                        }
                                                    }
                                                }
                                            },
                                            columns: [
                                                {
                                                    id: "name", name: "Name", field: "name", width: 85,
                                                    editor: ContrailGrid.Editors.Text,
                                                    formatter: ContrailGrid.Formatters.Text,
                                                    validator: function (value) {
                                                        var valid = true,
                                                            interfaces = $('#server-interfaces-grid').data('contrailDynamicgrid')._grid.getData();

                                                        $.each(interfaces, function(interfaceKey, interfaceValue) {
                                                            if (interfaceValue.name == value) {
                                                                valid = false;
                                                                return;
                                                            }
                                                        });

                                                        return {
                                                            valid: valid,
                                                            message: (!valid) ? 'Duplicate name' : null
                                                        }

                                                    },
                                                    elementConfig: {
                                                        placeholder: 'Name'
                                                    }
                                                },
                                                {
                                                    id: "mac_address", name: "MAC Address", field: "mac_address", width: 130,
                                                    editor: ContrailGrid.Editors.Text,
                                                    formatter: ContrailGrid.Formatters.Text,
                                                    validator: function (value) {
                                                        var pattern = new RegExp(smwc.PATTERN_MAC_ADDRESS),
                                                            valid = pattern.test(value);

                                                        return {
                                                            valid: valid,
                                                            message: (!valid) ? smwm.getInvalidErrorMessage('subnet_mask') : null
                                                        }

                                                    },
                                                    elementConfig: {
                                                        placeholder: 'MAC Address'
                                                    }
                                                },
                                                {
                                                    id: "type", name: "Type", field: "type", width: 60,
                                                    defaultValue: 'physical',
                                                    editor: ContrailGrid.Editors.ContrailDropdown,
                                                    elementConfig: {
                                                        width: 'element',
                                                        placeholder: 'Select Type',
                                                        dataTextField: "text",
                                                        dataValueField: "value",
                                                        data: smwc.INTERFACE_TYPES
                                                    }

                                                },
                                                {
                                                    id: "dhcp",
                                                    name: "DHCP",
                                                    field: "dhcp",
                                                    width: 45,
                                                    editor: ContrailGrid.Editors.Checkbox,
                                                    editEnabler: function(item) {
                                                        var interfaces = $('#server-interfaces-grid').data('contrailDynamicgrid')._grid.getData(),
                                                            disableFlag = true;
                                                        $.each(interfaces, function(interfaceKey, interfaceValue) {
                                                            if (interfaceValue.member_interfaces != null && interfaceValue.member_interfaces.indexOf(item.name) != -1) {
                                                                disableFlag = false;
                                                                return;
                                                            }
                                                        });

                                                        return disableFlag;
                                                    },
                                                    formatter: ContrailGrid.Formatters.Checkbox
                                                },
                                                {
                                                    id: "ip_address",
                                                    name: "IP/Mask",
                                                    field: "ip_address",
                                                    width: 110,
                                                    editor: ContrailGrid.Editors.Text,
                                                    formatter: ContrailGrid.Formatters.Text,
                                                    validator: function (value) {
                                                        var pattern = new RegExp(smwc.PATTERN_SUBNET_MASK),
                                                            valid = pattern.test(value);

                                                        return {
                                                            valid: valid,
                                                            message: (!valid) ? smwm.getInvalidErrorMessage('subnet_mask') : null
                                                        }

                                                    },
                                                    elementConfig: {
                                                        placeholder: 'IP/Mask'
                                                    }
                                                },
                                                {
                                                    id: "default_gateway", name: "Gateway", field: "default_gateway", width: 70,
                                                    editor: ContrailGrid.Editors.Text,
                                                    formatter: ContrailGrid.Formatters.Text,
                                                    validator: function (value) {
                                                        var pattern = new RegExp(smwc.PATTERN_IP_ADDRESS),
                                                            valid = pattern.test(value);

                                                        return {
                                                            valid: valid,
                                                            message: (!valid) ? smwm.getInvalidErrorMessage('subnet_mask') : null
                                                        }

                                                    },
                                                    elementConfig: {
                                                        placeholder: 'Gateway'
                                                    }
                                                },
                                                {
                                                    id: "members",
                                                    name: "Members",
                                                    field: "member_interfaces",
                                                    width: 90,
                                                    editor: ContrailGrid.Editors.ContrailMultiselect,
                                                    formatter: function (r, c, v, cd, dc) {
                                                        return (dc.type == 'bond') ? ContrailGrid.Formatters.ContrailMultiselect(r, c, v, cd, dc) : '';
                                                    },
                                                    editEnabler: function (dc) {
                                                        return (dc.type == 'bond');
                                                    },
                                                    initSetData: function (args, $contrailMultiselect) {
                                                        var gridData = args.grid.getData(),
                                                            interfaceData = [];

                                                        $.each(gridData, function (gridDataKey, gridDataValue) {
                                                            if (gridDataValue.type == 'physical' && contrail.checkIfExist(gridDataValue.name) && gridDataValue.name != '' && !gridDataValue.dhcp) {
                                                                interfaceData.push(gridDataValue.name);
                                                            }
                                                        });

                                                        $contrailMultiselect.setData(interfaceData)

                                                    },
                                                    elementConfig: {
                                                        placeholder: 'Select Members',
                                                        width: 'element',
                                                        dataTextField: "id",
                                                        dataValueField: "id",
                                                        data: []
                                                    }
                                                },
                                                {
                                                    id: "tor", name: "TOR", field: "tor", width: 70,
                                                    editor: ContrailGrid.Editors.Text,
                                                    formatter: ContrailGrid.Formatters.Text,
                                                    elementConfig: {
                                                        placeholder: 'TOR'
                                                    }
                                                },
                                                {
                                                    id: "tor_port", name: "TOR Port", field: "tor_port", width: 70,
                                                    editor: ContrailGrid.Editors.Text,
                                                    formatter: ContrailGrid.Formatters.Text,
                                                    elementConfig: {
                                                        placeholder: 'TOR Port'
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            },
            {
                elementId: smwu.formatElementId([prefixId, smwl.TITLE_CONTRAIL_CONTROLLER]),
                title: smwl.TITLE_CONTRAIL_CONTROLLER,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {
                                    elementId: 'package_image_id',
                                    view: "FormDropdownView",
                                    viewConfig: {path: 'package_image_id', dataBindValue: 'package_image_id', class: "span6", elementConfig: {placeholder: smwl.SELECT_PACKAGE, dataTextField: "id", dataValueField: "id", dataSource: {type: 'remote', url: smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, 'filterInContrailControllerPackages')}}}
                                },
                                {
                                    elementId: 'control_data_interface',
                                    view: "FormDropdownView",
                                    viewConfig: {path: 'contrail.control_data_interface', dataBindValue: 'contrail().control_data_interface', class: "span6", elementConfig: {placeholder: smwl.TITLE_SELECT_CONTROL_DATA_INTERFACE, dataTextField: "id", dataValueField: "id", data: []}}
                                }
                            ]
                        }
                    ]
                }
            },
            {
                elementId: smwu.formatElementId([prefixId, smwl.TITLE_CONTRAIL_STORAGE]),
                title: smwl.TITLE_CONTRAIL_STORAGE,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {
                                    elementId: 'storage_repo_id',
                                    view: "FormDropdownView",
                                    viewConfig: {path: 'parameters.storage_repo_id', dataBindValue: 'parameters().storage_repo_id', class: "span6", elementConfig: {placeholder: smwl.SELECT_PACKAGE, dataTextField: "id", dataValueField: "id", dataSource: {type: 'remote', url: smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, 'filterInContrailStoragePackages')}}}
                                }
                            ]
                        },
                        {
                            columns: [
                                {
                                    elementId: 'storage_chassis_id',
                                    view: "FormDropdownView",
                                    viewConfig: {path: 'parameters.storage_chassis_id', dataBindValue: 'parameters().storage_chassis_id', class: "span6", elementConfig: {allowClear: true, placeholder: smwl.SELECT_CHASSIS_ID, dataTextField: "id", dataValueField: "id", dataSource: {type: 'remote', url: smwc.URL_CHASSIS_ID}}}
                                },
                                {
                                    elementId: 'storage_chassis_id_input',
                                    view: "FormInputView",
                                    viewConfig: {path: 'parameters.storage_chassis_id_input', dataBindValue: 'parameters().storage_chassis_id_input', class: "span6"}
                                }
                            ]
                        },
                        {
                            columns: [
                                {
                                    elementId: 'server-disks-grid',
                                    view: "FormDynamicGridView",
                                    viewConfig: {
                                        path: 'parameters.disks',
                                        class: "span12",
                                        modelAttributePath: 'parameters.disks',
                                        elementConfig: {
                                            options: {
                                                uniqueColumn: 'disk'
                                            },
                                            columns: [
                                                {
                                                    id: "disk", name: "Storage Disks", field: "disk", width: 720,
                                                    editor: ContrailGrid.Editors.Text,
                                                    formatter: ContrailGrid.Formatters.Text,
                                                    validator: function (value) {
                                                        var valid = true,
                                                            disks = $('#server-disks-grid').data('contrailDynamicgrid')._grid.getData();

                                                        $.each(disks, function(diskKey, diskValue) {
                                                            if (diskValue.disk == value) {
                                                                valid = false;
                                                                return
                                                            }
                                                        });

                                                        return {
                                                            valid: valid,
                                                            message: (!valid) ? 'Duplicate Disk' : null
                                                        }

                                                    },
                                                    elementConfig: {
                                                        placeholder: 'Disk Location'
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            },
            {
                elementId: smwu.formatElementId([prefixId, smwl.TITLE_PROVISIONING]),
                title: smwl.TITLE_PROVISIONING,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [

                                {
                                    elementId: 'cluster_id',
                                    view: "FormDropdownView",
                                    viewConfig: {path: 'cluster_id', dataBindValue: "cluster_id", class: "span6", elementConfig: {allowClear: true, placeholder: smwl.SELECT_CLUSTER, dataTextField: "id", dataValueField: "id", dataSource: {type: 'remote', url: smwu.getObjectUrl(smwc.CLUSTER_PREFIX_ID, smwc.CLUSTER_PREFIX_ID)}}}
                                },
                                {elementId: 'email', view: "FormInputView", viewConfig: {path: 'email', dataBindValue: 'email', class: "span6"}}
                            ]
                        },
                        {
                            columns: [
                                {
                                    elementId: 'base_image_id',
                                    view: "FormDropdownView",
                                    viewConfig: {path: 'base_image_id', dataBindValue: 'base_image_id', class: "span6", elementConfig: {placeholder: smwl.SELECT_IMAGE, dataTextField: "id", dataValueField: "id", dataSource: { type: 'remote', url: smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, 'filterInImages')}}}
                                },
                                {
                                    elementId: 'management_interface',
                                    view: "FormDropdownView",
                                    viewConfig: {
                                        path: 'network.management_interface', dataBindValue: 'network().management_interface', class: "span6",
                                        elementConfig: {
                                            placeholder: smwl.TITLE_SELECT_MANAGEMENT_INTERFACE, dataTextField: "id", dataValueField: "id",
                                            data: [],
                                            onInit: function (serverModel) {
                                                var managementInterfaces = [],
                                                    managementInterfaceValue = serverModel.attributes.network.management_interface,
                                                    controlDataInterfaces = [],
                                                    controlDataInterfaceValue = serverModel.attributes.contrail.control_data_interface,
                                                    bondMemberInterfaces = [];

                                                $.each(serverModel.attributes.network.interfaces, function(interfaceKey, interfaceValue) {
                                                    bondMemberInterfaces = bondMemberInterfaces.concat(interfaceValue.member_interfaces);
                                                });

                                                $.each(serverModel.attributes.network.interfaces, function(interfaceKey, interfaceValue) {
                                                    if (bondMemberInterfaces.indexOf(interfaceValue.name) == -1) {
                                                        if ((!contrail.checkIfExist(interfaceValue.type) || (contrail.checkIfExist(interfaceValue.type) &&interfaceValue.type == 'physical'))
                                                            && interfaceValue.dhcp) {
                                                            managementInterfaces.push({
                                                                id: interfaceValue.name,
                                                                text: interfaceValue.name
                                                            });
                                                        }

                                                        controlDataInterfaces.push({
                                                            id: interfaceValue.name,
                                                            text: interfaceValue.name
                                                        });
                                                    }
                                                });

                                                setTimeout(function(){
                                                    $('#management_interface_dropdown').data('contrailDropdown').setData(managementInterfaces);
                                                    $('#management_interface_dropdown').data('contrailDropdown').value(managementInterfaceValue);
                                                    serverModel.attributes.network.management_interface = managementInterfaceValue;

                                                    $('#control_data_interface_dropdown').data('contrailDropdown').setData(controlDataInterfaces);
                                                    $('#control_data_interface_dropdown').data('contrailDropdown').value(controlDataInterfaceValue);
                                                    serverModel.attributes.contrail.control_data_interface = controlDataInterfaceValue;

                                                }, 1000);
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            columns: [
                                {
                                    elementId: 'kernel_upgrade',
                                    view: 'FormDropdownView',
                                    viewConfig: {
                                        path: 'parameters.kernel_upgrade',
                                        dataBindValue: 'parameters().kernel_upgrade',
                                        class: "span6",
                                        elementConfig: {dataTextField: "text", dataValueField: "id", data: smwc.STATES_YES_NO}
                                    }
                                },
                                {elementId: 'kernel_version', view: "FormInputView", viewConfig: {path: 'parameters.kernel_version', dataBindValue: 'parameters().kernel_version', class: "span6"}}
                            ]
                        }
                    ]
                }
            }
        ]
        };

    };

    var configureServersViewConfig = {
        elementId: prefixId,
        view: "AccordianView",
        viewConfig: [
            {
                elementId: smwu.formatElementId([prefixId, smwl.TITLE_SYSTEM_MANAGEMENT]),
                title: smwl.TITLE_SYSTEM_MANAGEMENT,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {elementId: 'domain', view: "FormInputView", viewConfig: {path: "domain", dataBindValue: "domain", class: "span6", view: "FormInputView"}},
                                {elementId: 'partition', view: "FormInputView", viewConfig: {path: "parameters.partition", dataBindValue: "parameters().partition", class: "span6"}}
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'ipmi_username', view: "FormInputView", viewConfig: {path: 'ipmi_username', dataBindValue: 'ipmi_username', class: "span6"}},
                                {elementId: 'ipmi_password', view: "FormInputView", viewConfig: {path: 'ipmi_password',  type: 'password', dataBindValue: 'ipmi_password', class: "span6"}}
                            ]
                        }
                    ]
                }
            },
            {
                elementId: smwu.formatElementId([prefixId, smwl.TITLE_CONTRAIL_CONTROLLER]),
                title: smwl.TITLE_CONTRAIL_CONTROLLER,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {
                                    elementId: 'package_image_id',
                                    view: "FormDropdownView",
                                    viewConfig: {path: 'package_image_id', dataBindValue: 'package_image_id', class: "span6", elementConfig: {placeholder: smwl.SELECT_PACKAGE, dataTextField: "id", dataValueField: "id", dataSource: {type: 'remote', url: smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, 'filterInContrailControllerPackages')}}}
                                }
                            ]
                        }
                    ]
                }
            },
            {
                elementId: smwu.formatElementId([prefixId, smwl.TITLE_CONTRAIL_STORAGE]),
                title: smwl.TITLE_CONTRAIL_STORAGE,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {
                                    elementId: 'storage_repo_id',
                                    view: "FormDropdownView",
                                    viewConfig: {path: 'parameters.storage_repo_id', dataBindValue: 'parameters().storage_repo_id', class: "span6", elementConfig: {placeholder: smwl.SELECT_PACKAGE, dataTextField: "id", dataValueField: "id", dataSource: {type: 'remote', url: smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, 'filterInContrailStoragePackages')}}}
                                }
                            ]
                        },
                        {
                            columns: [
                                {
                                    elementId: 'storage_chassis_id',
                                    view: "FormDropdownView",
                                    viewConfig: {path: 'parameters.storage_chassis_id', dataBindValue: 'parameters().storage_chassis_id', class: "span6", elementConfig: {allowClear: true, placeholder: smwl.SELECT_CHASSIS_ID, dataTextField: "id", dataValueField: "id", dataSource: {type: 'remote', url: smwc.URL_CHASSIS_ID}}}
                                },
                                {
                                    elementId: 'storage_chassis_id_input',
                                    view: "FormInputView",
                                    viewConfig: {path: 'parameters.storage_chassis_id_input', dataBindValue: 'parameters().storage_chassis_id_input', class: "span6"}
                                }
                            ]
                        }
                    ]
                }
            },
            {
                elementId: smwu.formatElementId([prefixId, smwl.TITLE_PROVISIONING]),
                title: smwl.TITLE_PROVISIONING,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {
                                    elementId: 'cluster_id',
                                    view: "FormDropdownView",
                                    viewConfig: {path: 'cluster_id', dataBindValue: 'cluster_id', class: "span6", elementConfig: {placeholder: smwl.SELECT_CLUSTER, dataTextField: "id", dataValueField: "id", dataSource: {type: 'remote', url: smwu.getObjectUrl(smwc.CLUSTER_PREFIX_ID, smwc.CLUSTER_PREFIX_ID)}}}
                                },
                                {elementId: 'email', view: "FormInputView", viewConfig: {path: 'email', dataBindValue: 'email', class: "span6"}}
                            ]
                        },
                        {
                            columns: [
                                {
                                    elementId: 'base_image_id',
                                    view: "FormDropdownView",
                                    viewConfig: {path: 'base_image_id', dataBindValue: 'base_image_id', class: "span6", elementConfig: {placeholder: smwl.SELECT_IMAGE, dataTextField: "id", dataValueField: "id", dataSource: {type: 'remote', url: smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, 'filterInImages')}}}
                                }
                            ]
                        },
                        {
                            columns: [
                                {
                                    elementId: 'kernel_upgrade',
                                    view: 'FormDropdownView',
                                    viewConfig: {
                                        path: 'parameters.kernel_upgrade',
                                        dataBindValue: 'parameters().kernel_upgrade',
                                        class: "span6",
                                        elementConfig: {dataTextField: "text", dataValueField: "id", data: smwc.STATES_YES_NO}
                                    }
                                },
                                {elementId: 'kernel_version', view: "FormInputView", viewConfig: {path: 'parameters.kernel_version', dataBindValue: 'parameters().kernel_version', class: "span6"}}
                            ]
                        }
                    ]
                }
            }
        ]
    };

    var provisionServersViewConfig = {
        elementId: prefixId,
        view: "SectionView",
        viewConfig: {
            rows: [
                {
                    columns: [
                        {
                            elementId: 'package_image_id',
                            view: "FormDropdownView",
                            viewConfig: {path: 'package_image_id', dataBindValue: 'package_image_id', class: "span6", elementConfig: {placeholder: smwl.SELECT_PACKAGE, dataTextField: "id", dataValueField: "id", dataSource: {type: 'remote', url: smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, 'filterInContrailControllerPackages')}}}
                        }
                    ]
                }
            ]
        }
    };

    var reimageViewConfig = {
        elementId: prefixId,
        view: "SectionView",
        viewConfig: {
            rows: [
                {
                    columns: [
                        {
                            elementId: 'base_image_id',
                            view: "FormDropdownView",
                            viewConfig: {path: 'base_image_id', dataBindValue: 'base_image_id', class: "span6", elementConfig: {placeholder: smwl.SELECT_IMAGE, dataTextField: "id", dataValueField: "id", dataSource: {type: 'remote', url: smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, 'filterInImages')}}}
                        }
                    ]
                }
            ]
        }
    };

    var assignRolesViewConfig = {
        elementId: prefixId,
        view: "SectionView",
        viewConfig: {
            rows: [
                {
                    columns: [
                        {elementId: 'roles', view: "FormMultiselectView", viewConfig: {path: 'roles', dataBindValue: 'roles', class: "span12", elementConfig: {placeholder: smwl.SELECT_ROLES, data: smwc.ROLES_OBJECTS}}}
                    ]
                }
            ]
        }
    };

    return ServerEditView;
});