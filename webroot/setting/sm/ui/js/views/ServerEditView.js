/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    "underscore",
    "contrail-view",
    "knockback",
    "text!sm-basedir/setting/sm/ui/js/schemas/server.json"
], function (_, ContrailView, Knockback, defaultSchema) {

    defaultSchema = JSON.parse(defaultSchema);
    var prefixId = smwc.SERVER_PREFIX_ID,
        modalId = "configure-" + prefixId,
        editTemplate = contrail.getTemplate4Id(cowc.TMPL_EDIT_FORM);

    var ServerEditView = ContrailView.extend({

        renderReimage: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                self = this;

            cowu.createModal({"modalId": modalId, "className": "modal-700", "title": options.title, "body": editLayout, "onSave": function () {
                self.model.reimage(options.checkedRows, {
                    init: function () {
                        self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                        cowu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options.callback();
                        $("#" + modalId).modal("hide");
                    },
                    error: function (error) {
                        cowu.disableModalLoading(modalId, function () {
                            self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, error.responseText);
                        });
                    }
                }); // TODO: Release binding on successful configure
            }, "onCancel": function () {
                Knockback.release(self.model, document.getElementById(modalId));
                kbValidation.unbind(self);
                $("#" + modalId).modal("hide");
            }});

            self.renderView4Config($("#" + modalId).find("#" + prefixId + "-form"), this.model, reimageViewConfig, null, null, null, function() {
                self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                Knockback.applyBindings(self.model, document.getElementById(modalId));
                kbValidation.bind(self);
            });
        },

        renderConfigure: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                disableId, modelAttr, self = this;

            cowu.createModal({"modalId": modalId, "className": "modal-980", "title": options.title, "body": editLayout, "onSave": function () {
                self.model.configure(options.checkedRows, {
                    init: function () {
                        self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                        cowu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options.callback();
                        $("#" + modalId).modal("hide");
                        cowch.reset();
                    },
                    error: function (error) {
                        cowu.disableModalLoading(modalId, function () {
                            self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, error.responseText);
                        });
                    }
                });
            }, "onCancel": function () {
                Knockback.release(self.model, document.getElementById(modalId));
                kbValidation.unbind(self);
                $("#" + modalId).modal("hide");
            }});

            modelAttr = this.model.model().get("id");
            disableId = (modelAttr == null || modelAttr == "") ? false : true;

            self.renderView4Config($("#" + modalId).find("#" + prefixId + "-form"), this.model, getConfigureViewConfig(disableId), smwc.KEY_CONFIGURE_VALIDATION, null, null, function() {
                self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                Knockback.applyBindings(self.model, document.getElementById(modalId));
                kbValidation.bind(self, {collection: self.model.model().attributes.interfaces});
                kbValidation.bind(self, {collection: self.model.model().attributes.switches});
            });
        },

        renderConfigureServers: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                self = this;

            cowu.createModal({"modalId": modalId, "className": "modal-700", "title": options.title, "body": editLayout, "onSave": function () {
                self.model.configureServers(options.checkedRows, {
                    init: function () {
                        self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                        cowu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options.callback();
                        $("#" + modalId).modal("hide");
                        cowch.reset();
                    },
                    error: function (error) {
                        cowu.disableModalLoading(modalId, function () {
                            self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, error.responseText);
                        });
                    }
                });
            }, "onCancel": function () {
                Knockback.release(self.model, document.getElementById(modalId));
                kbValidation.unbind(self);
                $("#" + modalId).modal("hide");
            }});

            self.renderView4Config($("#" + modalId).find("#" + prefixId + "-form"), this.model, configureServersViewConfig, smwc.KEY_CONFIGURE_VALIDATION, true, null, function() {
                self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                Knockback.applyBindings(self.model, document.getElementById(modalId));
                kbValidation.bind(self);
            });
        },

        renderAddServer: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                self = this;

            cowu.createModal({"modalId": modalId, "className": "modal-980", "title": options.title, "body": editLayout, "onSave": function () {
                self.model.createServer({
                    init: function () {
                        self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                        cowu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options.callback();
                        $("#" + modalId).modal("hide");
                        cowch.reset();
                    },
                    error: function (error) {
                        cowu.disableModalLoading(modalId, function () {
                            self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, error.responseText);
                        });
                    }
                }, "POST");
            }, "onCancel": function () {
                Knockback.release(self.model, document.getElementById(modalId));
                kbValidation.unbind(self);
                $("#" + modalId).modal("hide");
            }});

            self.renderView4Config($("#" + modalId).find("#" + prefixId + "-form"), this.model, getConfigureViewConfig(false), smwc.KEY_CONFIGURE_VALIDATION, null, null, function() {
                self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                Knockback.applyBindings(self.model, document.getElementById(modalId));
                kbValidation.bind(self, {collection: self.model.model().attributes.interfaces});
                kbValidation.bind(self, {collection: self.model.model().attributes.switches});
            });
        },

        renderProvisionServers: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                self = this;

            cowu.createModal({"modalId": modalId, "className": "modal-700", "title": options.title, "body": editLayout, "onSave": function () {
                self.model.provision(options.checkedRows, {
                    init: function () {
                        self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                        cowu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options.callback();
                        $("#" + modalId).modal("hide");
                    },
                    error: function (error) {
                        cowu.disableModalLoading(modalId, function () {
                            self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, error.responseText);
                        });
                    }
                });
                // TODO: Release binding on successful configure
            }, "onCancel": function () {
                Knockback.release(self.model, document.getElementById(modalId));
                kbValidation.unbind(self);
                $("#" + modalId).modal("hide");
            }});

            self.renderView4Config($("#" + modalId).find("#" + prefixId + "-form"), this.model, provisionServersViewConfig, null, null, null, function() {
                self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                Knockback.applyBindings(self.model, document.getElementById(modalId));
                kbValidation.bind(self);
            });
        },

        renderTagServers: function (options) {
            var self = this;

            getTagServersViewConfigRows(function (tagServersViewConfigRows) {

                var lockEditingByDefault = options.lockEditingByDefault;

                if(tagServersViewConfigRows.length == 0){
                    cowu.createModal({
                        "modalId": modalId, "className": "modal-700", "title": options.title, "body": smwm.NO_TAGS_CONFIGURED,
                        "onClose": function () {
                            $("#" + modalId).modal("hide");
                        }
                    });
                } else {
                    var editLayout = editTemplate({prefixId: prefixId}),
                        editTagViewConfig = {
                            elementId: (prefixId + "_" + smwl.TITLE_TAG).toLowerCase(),
                            view: "SectionView",
                            viewConfig: {
                                rows: tagServersViewConfigRows
                            }
                        };

                    cowu.createModal({
                        "modalId": modalId, "className": "modal-700", "title": options.title, "body": editLayout,
                        "onSave": function () {
                            self.model.editTags(options.checkedRows, {
                                init: function () {
                                    self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                                    cowu.enableModalLoading(modalId);
                                },
                                success: function () {
                                    options.callback();
                                    $("#" + modalId).modal("hide");
                                    cowch.reset();
                                },
                                error: function (error) {
                                    cowu.disableModalLoading(modalId, function () {
                                        self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, error.responseText);
                                    });
                                }
                            }); // TODO: Release binding on successful configure
                        }, "onCancel": function () {
                            Knockback.release(self.model, document.getElementById(modalId));
                            kbValidation.unbind(self);
                            $("#" + modalId).modal("hide");
                        }
                    });

                    self.renderView4Config($("#" + modalId).find("#" + prefixId + "-form"), self.model, editTagViewConfig, "editTagsValidation", lockEditingByDefault, null, function() {
                        self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                        Knockback.applyBindings(self.model, document.getElementById(modalId));
                    });
                }
            });
        },

        renderAssignRoles: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                self = this;

            cowu.createModal({"modalId": modalId, "className": "modal-700", "title": options.title, "body": editLayout, "onSave": function () {
                self.model.editRoles(options.checkedRows, {
                    init: function () {
                        self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                        cowu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options.callback();
                        $("#" + modalId).modal("hide");
                        cowch.reset();
                    },
                    error: function (error) {
                        cowu.disableModalLoading(modalId, function () {
                            self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, error.responseText);
                        });
                    }
                }); // TODO: Release binding on successful configure
            }, "onCancel": function () {
                Knockback.release(self.model, document.getElementById(modalId));
                kbValidation.unbind(self);
                $("#" + modalId).modal("hide");
            }});

            self.renderView4Config($("#" + modalId).find("#" + prefixId + "-form"), this.model, assignRolesViewConfig, null, null, null, function() {
                self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                Knockback.applyBindings(self.model, document.getElementById(modalId));
            });
        },

        renderDeleteServer: function (options) {
            var textTemplate = contrail.getTemplate4Id("sm-delete-server-template"),
                elId = "deleteServer",
                self = this,
                checkedRows = options.checkedRows,
                serversToBeDeleted = {"serverId": [], "elementId": elId};
            serversToBeDeleted.serverId.push(checkedRows.id);

            cowu.createModal({"modalId": modalId, "className": "modal-700", "title": options.title, "btnName": "Confirm", "body": textTemplate(serversToBeDeleted), "onSave": function () {
                self.model.deleteServer(options.checkedRows, {
                    init: function () {
                        self.model.showErrorAttr(elId, false);
                        cowu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options.callback();
                        $("#" + modalId).modal("hide");
                    },
                    error: function (error) {
                        cowu.disableModalLoading(modalId, function () {
                            self.model.showErrorAttr(elId, error.responseText);
                        });
                    }
                });
            }, "onCancel": function () {
                $("#" + modalId).modal("hide");
            }});

            self.model.showErrorAttr(elId, false);
            Knockback.applyBindings(this.model, document.getElementById(modalId));
            kbValidation.bind(this);
        },

        renderRunInventory: function (options) {
            var textTemplate = contrail.getTemplate4Id("sm-server-run-inventory-template"),
                elId = "runInventoryServer",
                self = this,
                checkedRows = options.checkedRows,
                runInventoryServers = {"serverId": [], "elementId": elId};
            runInventoryServers.serverId.push(checkedRows.id);

            cowu.createModal({"modalId": modalId, "className": "modal-700", "title": options.title, "btnName": "Confirm", "body": textTemplate(runInventoryServers), "onSave": function () {
                self.model.runInventory(options.checkedRows, {
                    init: function () {
                        self.model.showErrorAttr(elId, false);
                        cowu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options.callback();
                        $("#" + modalId).modal("hide");
                    },
                    error: function (error) {
                        cowu.disableModalLoading(modalId, function () {
                            self.model.showErrorAttr(elId, error.responseText);
                        });
                    }
                });
            }, "onCancel": function () {
                $("#" + modalId).modal("hide");
            }});

            this.model.showErrorAttr(elId, false);
            Knockback.applyBindings(this.model, document.getElementById(modalId));
            kbValidation.bind(this);
        }
    });

    function getTagServersViewConfigRows(callback) {
        var ajaxConfig = {type: "GET", cache: "true", url: smwc.URL_TAG_NAMES},
            tagServersViewConfigRows = [];

        contrail.ajaxHandler(ajaxConfig, function () {}, function (response) {
            var row, isNewRow, tagName;
            for (var i = 0; response != null && i < response.length; i++) {
                isNewRow = ((i % 2) == 0) ? true : false;
                tagName = response[i];
                if (isNewRow) {
                    row = {columns: []};
                    tagServersViewConfigRows.push(row);
                }
                row.columns.push({
                    elementId: tagName, view: "FormInputView",
                    viewConfig: {path: "tag." + tagName, dataBindValue: "tag()." + tagName, class: "col-xs-6"}
                });
            }
            callback(tagServersViewConfigRows);
        }, function () {
            callback(tagServersViewConfigRows);
        });
    }

    function getConfigureViewConfig(disableId) {
        return {
            elementId: prefixId,
            view: "AccordianView",
            viewConfig: [
            {
                elementId: cowu.formatElementId([prefixId, smwl.TITLE_SYSTEM_MANAGEMENT]),
                title: smwl.TITLE_SYSTEM_MANAGEMENT,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {
                                    elementId: "id", view: "FormInputView",
                                    viewConfig: {
                                        help: {
                                            target: "tooltip",
                                            content: defaultSchema.properties.id.description
                                        },
                                        disabled: disableId, path: "id", dataBindValue: "id", class: "col-xs-6"
                                    }
                                },
                                {
                                    elementId: "password", view: "FormInputView",
                                    viewConfig: {
                                        help: {
                                            target: "tooltip",
                                            content: defaultSchema.properties.password.description
                                        },
                                        path: "password", type: "password", dataBindValue: "password", class: "col-xs-6"
                                    }
                                }
                            ]
                        },
                        {
                            columns: [
                                {
                                    elementId: "domain", view: "FormInputView",
                                    viewConfig: {
                                        help: {
                                            target: "tooltip",
                                            content: defaultSchema.properties.domain.description
                                        },
                                        path: "domain", dataBindValue: "domain", class: "col-xs-6", view: "FormInputView"
                                    }
                                },
                                {
                                    elementId: "partition", view: "FormInputView",
                                    viewConfig: {
                                        help: {
                                            target: "tooltip",
                                            content: defaultSchema.properties.parameters.properties.partition.description
                                        },
                                        path: "parameters.partition", dataBindValue: "parameters().partition", class: "col-xs-6", view: "FormInputView"
                                    }
                                }
                            ]
                        },
                        {
                            columns: [
                                {
                                    elementId: "ipmi_address", view: "FormInputView",
                                    viewConfig: {
                                        help: {
                                            target: "tooltip",
                                            content: defaultSchema.properties.ipmi_address.description
                                        },
                                        path: "ipmi_address", dataBindValue: "ipmi_address", class: "col-xs-6"
                                    }
                                },
                                {
                                    elementId: "ipmi_interface",
                                    view: "FormDropdownView",
                                    viewConfig: {
                                        path: "ipmi_interface",
                                        dataBindValue: "ipmi_interface",
                                        class: "col-xs-6",
                                        elementConfig: {defaultValueId: 0, dataTextField: "text", dataValueField: "id", data: smwc.IPMI_INTERFACE_TYPES}
                                    }
                                }
                            ]
                        },
                        {
                            columns: [
                                {
                                    elementId: "ipmi_username", view: "FormInputView",
                                    viewConfig: {
                                        help: {
                                            target: "tooltip",
                                            content: defaultSchema.properties.ipmi_username.description
                                        },
                                        path: "ipmi_username", dataBindValue: "ipmi_username", class: "col-xs-6"
                                    }
                                },
                                {
                                    elementId: "ipmi_password", view: "FormInputView",
                                    viewConfig: {
                                        help: {
                                            target: "tooltip",
                                            content: defaultSchema.properties.ipmi_password.description
                                        },
                                        path: "ipmi_password", type: "password", dataBindValue: "ipmi_password", class: "col-xs-6"
                                    }
                                }
                            ]
                        }
                    ]
                }
            },
            {
                elementId: cowu.formatElementId([prefixId, smwl.TITLE_PHYSICAL_INTERFACES]),
                title: smwl.TITLE_PHYSICAL_INTERFACES,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {
                                    elementId: "interfaces",
                                    view: "FormEditableGridView",
                                    viewConfig: {
                                        path: "interfaces",
                                        class: "col-xs-12",
                                        validation: "physicalValidation",
                                        collection: "filterInterfaces('physical')",
                                        columns: [
                                            {
                                                elementId: "name", name: "Name", view: "FormInputView", class: "",
                                                viewConfig: {templateId: cowc.TMPL_EDITABLE_GRID_INPUT_VIEW, width: 170,path: "name", dataBindValue: "name()"}
                                            },
                                            {
                                                elementId: "ip_address", name: "IP/Mask", view: "FormInputView", class: "",
                                                viewConfig: {templateId: cowc.TMPL_EDITABLE_GRID_INPUT_VIEW, width: 155, path: "ip_address", dataBindValue: "ip_address()"}
                                            },
                                            {
                                                elementId: "mac_address", name: "MAC Address", view: "FormInputView", class: "",
                                                viewConfig: {templateId: cowc.TMPL_EDITABLE_GRID_INPUT_VIEW, width: 160, path: "mac_address", dataBindValue: "mac_address()"}
                                            },
                                            {
                                                elementId: "default_gateway", name: "Gateway", view: "FormInputView", class: "",
                                                viewConfig: {templateId: cowc.TMPL_EDITABLE_GRID_INPUT_VIEW, width: 130, path: "default_gateway", dataBindValue: "default_gateway()"}
                                            },
                                            {
                                                elementId: "dhcp", name: "DHCP", view: "FormCheckboxView", class: "",
                                                viewConfig: {templateId: cowc.TMPL_EDITABLE_GRID_CHECKBOX_VIEW, width: 50, path: "dhcp", dataBindValue: "dhcp()"}},
                                            {
                                                elementId: "tor", name: "TOR", view: "FormInputView", class: "",
                                                viewConfig: {templateId: cowc.TMPL_EDITABLE_GRID_INPUT_VIEW, width: 130, path: "tor", dataBindValue: "tor()"}
                                            },
                                            {
                                                elementId: "tor_port", name: "TOR Port", view: "FormInputView", class: "",
                                                viewConfig: {templateId: cowc.TMPL_EDITABLE_GRID_INPUT_VIEW, width: 70, path: "tor_port", dataBindValue: "tor_port()"}
                                            }
                                        ],
                                        rowActions: [
                                            {onClick: "function() { $root.deleteInterface($data, this); }", iconClass: "fa fa-minus"}
                                        ],
                                        gridActions: [
                                            {onClick: "function() { addInterface('physical'); }", buttonTitle: "Add"}
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                }
            },
            {
                elementId: cowu.formatElementId([prefixId, smwl.TITLE_BOND_INTERFACES]),
                title: smwl.TITLE_BOND_INTERFACES,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {
                                    elementId: "interfaces",
                                    view: "FormEditableGridView",
                                    viewConfig: {
                                        path: "interfaces",
                                        class: "col-xs-12",
                                        validation: "bondValidation",
                                        collection: "filterInterfaces('bond')",
                                        columns: [
                                            {
                                                elementId: "name", name: "Name", view: "FormInputView", class: "",
                                                viewConfig: {templateId: cowc.TMPL_EDITABLE_GRID_INPUT_VIEW, width: 200, path: "name", dataBindValue: "name()"}
                                            },
                                            {
                                                elementId: "ip_address", name: "IP/Mask", view: "FormInputView", class: "",
                                                viewConfig: {templateId: cowc.TMPL_EDITABLE_GRID_INPUT_VIEW, width: 200, path: "ip_address", dataBindValue: "ip_address()"}
                                            },
                                            {
                                                elementId: "dhcp", name: "DHCP", view: "FormCheckboxView", class: "",
                                                viewConfig: {templateId: cowc.TMPL_EDITABLE_GRID_CHECKBOX_VIEW, width: 50, path: "dhcp", dataBindValue: "dhcp()"}
                                            },
                                            {
                                                elementId: "member_interfaces", name: "Members", view: "FormMultiselectView", class: "",
                                                viewConfig: {
                                                    templateId: cowc.TMPL_EDITABLE_GRID_MULTISELECT_VIEW,
                                                    path: "member_interfaces", width: 300,
                                                    dataBindValue: "member_interfaces()",
                                                    dataBindOptionList: "$root.getMemberInterfaces()",
                                                    elementConfig: {placeholder: smwl.SELECT_MEMBERS}
                                                }
                                            }
                                        ],
                                        rowActions: [
                                            {onClick: "function() { $root.deleteInterface($data, this); }", iconClass: "fa fa-minus"}
                                        ],
                                        gridActions: [
                                            {onClick: "function() { addInterface('bond'); }", buttonTitle: "Add"}
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                }
            },
            {
                elementId: cowu.formatElementId([prefixId, smwl.TITLE_OVS_SWITCHES]),
                title: smwl.TITLE_OVS_SWITCHES,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {
                                    elementId: "switches",
                                    view: "FormEditableGridView",
                                    viewConfig: {
                                        path: "switches",
                                        class: "col-xs-12",
                                        validation: "topOfRackValidation",
                                        collection: "switches",
                                        columns: [
                                            {
                                                elementId: "switch_id", name: "ID", view: "FormInputView", class: "",
                                                viewConfig: {templateId: cowc.TMPL_EDITABLE_GRID_INPUT_VIEW, width: 50,path: "switch_id", dataBindValue: "switch_id()"}
                                            },
                                            {
                                                elementId: "ip_address", name: "IP Address", view: "FormInputView", class: "",
                                                viewConfig: {templateId: cowc.TMPL_EDITABLE_GRID_INPUT_VIEW, width: 130, path: "ip_address", dataBindValue: "ip_address()"}
                                            },
                                            {
                                                elementId: "switch_name", name: "Name", view: "FormInputView", class: "",
                                                viewConfig: {templateId: cowc.TMPL_EDITABLE_GRID_INPUT_VIEW, width: 130, path: "switch_name", dataBindValue: "switch_name()"}
                                            },
                                            {
                                                elementId: "vendor_name", name: "Vendor", view: "FormInputView", class: "",
                                                viewConfig: {templateId: cowc.TMPL_EDITABLE_GRID_INPUT_VIEW, width: 130, path: "vendor_name", dataBindValue: "vendor_name()"}
                                            },
                                            {
                                                elementId: "product_name", name: "Product", view: "FormInputView", class: "",
                                                viewConfig: {templateId: cowc.TMPL_EDITABLE_GRID_INPUT_VIEW, width: 130, path: "product_name", dataBindValue: "product_name()"}
                                            },
                                            {
                                                elementId: "ovs_port", name: "Port", view: "FormInputView", class: "",
                                                viewConfig: {templateId: cowc.TMPL_EDITABLE_GRID_INPUT_VIEW, width: 100, path: "ovs_port", dataBindValue: "ovs_port()"}
                                            },
                                            {
                                                elementId: "ovs_protocol", name: "Protocol", view: "FormDropdownView", class: "",
                                                viewConfig: {
                                                    templateId: cowc.TMPL_EDITABLE_GRID_DROPDOWN_VIEW, path: "ovs_protocol", width: 100, dataBindValue: "ovs_protocol()",
                                                    elementConfig: {placeholder: smwl.SELECT_PROTOCOL, defaultValueId: 0, dataTextField: "text", dataValueField: "id", data: smwc.OVS_PROTOCOLS}
                                                }
                                            },
                                            {
                                                elementId: "http_server_port", name: "HTTP Port", view: "FormInputView", class: "",
                                                viewConfig: {templateId: cowc.TMPL_EDITABLE_GRID_INPUT_VIEW, width: 100, path: "http_server_port", dataBindValue: "http_server_port()"}
                                            },
                                            {
                                                elementId: "keepalive_time", name: "Keepalive Time", view: "FormInputView", class: "",
                                                viewConfig: {templateId: cowc.TMPL_EDITABLE_GRID_INPUT_VIEW, width: 140, path: "keepalive_time", dataBindValue: "keepalive_time()"}
                                            }
                                        ],
                                        rowActions: [
                                            {onClick: "function() { $root.deleteSwitch($data, this); }", iconClass: "fa fa-minus"}
                                        ],
                                        gridActions: [
                                            {onClick: "function() { addSwitch(); }", buttonTitle: "Add"}
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                }
            },
            {
                elementId: cowu.formatElementId([prefixId, smwl.TITLE_CONTRAIL_STORAGE]),
                title: smwl.TITLE_CONTRAIL_STORAGE,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {
                                    elementId: "storage_repo_id",
                                    view: "FormDropdownView",
                                    viewConfig: {
                                        help: {
                                            target: "tooltip",
                                            content: defaultSchema.properties.parameters.properties.provision.properties.contrail.properties.storage.properties.storage_repo_id.description
                                        },
                                        path: "parameters.provision.contrail.storage.storage_repo_id", dataBindValue: "parameters().provision.contrail.storage.storage_repo_id", class: "col-xs-6", elementConfig: {placeholder: smwl.SELECT_REPO_ID, dataTextField: "id", dataValueField: "id", dataSource: {type: "remote", url: smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, "filterInContrailStoragePackages")}}
                                    }
                                }
                            ]
                        },
                        {
                            columns: [
                                {
                                    elementId: "storage_chassis_id",
                                    view: "FormDropdownView",
                                    viewConfig: {
                                        help: {
                                            target: "tooltip",
                                            content: defaultSchema.properties.parameters.properties.provision.properties.contrail.properties.storage.properties.storage_chassis_id.description
                                        },
                                        path: "parameters.provision.contrail.storage.storage_chassis_id", dataBindValue: "parameters().provision.contrail.storage.storage_chassis_id", class: "col-xs-6", elementConfig: {allowClear: true, placeholder: smwl.SELECT_CHASSIS_ID, dataTextField: "id", dataValueField: "id", dataSource: {type: "remote", url: smwc.URL_CHASSIS_ID}}
                                    }
                                },
                                {
                                    elementId: "storage_chassis_id_input",
                                    view: "FormInputView",
                                    viewConfig: {path: "parameters.provision.contrail.storage.storage_chassis_id_input", dataBindValue: "parameters().provision.contrail.storage.storage_chassis_id_input", class: "col-xs-6"}
                                }
                            ]
                        },
                        {
                            columns: [
                                {
                                    elementId: "storage_osd_disks",
                                    view: "FormEditableGridView",
                                    viewConfig: {
                                        path: "parameters.provision.contrail.storage.storage_osd_disks",
                                        class: "col-xs-12",
                                        validation: "",
                                        collection: "getStorageDisks()",
                                        columns: [
                                            {
                                                elementId: "disk", name: "Storage Disks", view: "FormInputView", class: "", width: 800,
                                                viewConfig: {templateId: cowc.TMPL_EDITABLE_GRID_INPUT_VIEW, path: "disk", dataBindValue: "disk()"}
                                            }
                                        ],
                                        rowActions: [
                                            {onClick: "function() { $root.deleteDisk($data, this); }", iconClass: "fa fa-minus"}
                                        ],
                                        gridActions: [
                                            {onClick: "function() { addDisk(); }", buttonTitle: "Add"}
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                }
            },
            {
                elementId: cowu.formatElementId([prefixId, smwl.TITLE_PROVISIONING]),
                title: smwl.TITLE_PROVISIONING,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [

                                {
                                    elementId: "cluster_id",
                                    view: "FormDropdownView",
                                    viewConfig: {
                                        help: {
                                            target: "tooltip",
                                            content: defaultSchema.properties.cluster_id.description
                                        },
                                        path: "cluster_id",
                                        dataBindValue: "cluster_id",
                                        class: "col-xs-6",
                                        elementConfig: {
                                            allowClear: true,
                                            placeholder: smwl.SELECT_CLUSTER,
                                            dataTextField: "id",
                                            dataValueField: "id",
                                            dataSource: {
                                                type: "remote",
                                                url: smwu.getObjectUrl(smwc.CLUSTER_PREFIX_ID, smwc.CLUSTER_PREFIX_ID)
                                            }
                                        }
                                    }
                                },
                                {
                                    elementId: "email",
                                    view: "FormInputView",
                                    viewConfig: {path: "email", dataBindValue: "email", class: "col-xs-6"}
                                }
                            ]
                        },
                        {
                            columns: [
                                {
                                    elementId: "base_image_id",
                                    view: "FormDropdownView",
                                    viewConfig: {
                                        path: "base_image_id",
                                        dataBindValue: "base_image_id",
                                        class: "col-xs-6",
                                        elementConfig: {
                                            placeholder: smwl.SELECT_IMAGE,
                                            dataTextField: "id",
                                            dataValueField: "id",
                                            dataSource: {
                                                type: "remote",
                                                url: smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, "filterInImages")
                                            }
                                        }
                                    }
                                },
                                {
                                    elementId: "package_image_id",
                                    view: "FormDropdownView",
                                    viewConfig: {
                                        path: "package_image_id", dataBindValue: "package_image_id",
                                        class: "col-xs-6",
                                        elementConfig: {placeholder: smwl.SELECT_PACKAGE, dataTextField: "id", dataValueField: "id", dataSource: {type: "remote", url: smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, "filterInContrailControllerPackages")}}}
                                }
                            ]
                        },
                        {
                            columns: [
                                {
                                    elementId: "management_interface",
                                    view: "FormDropdownView",
                                    viewConfig: {
                                        help: {
                                            target: "tooltip",
                                            content: defaultSchema.properties.network.properties.management_interface.description
                                        },
                                        path: "network.management_interface",
                                        dataBindValue: "network().management_interface",
                                        dataBindOptionList: "$root.getManagementInterfaces()",
                                        class: "col-xs-6",
                                        elementConfig: {
                                            placeholder: smwl.TITLE_SELECT_MANAGEMENT_INTERFACE,
                                            dataTextField: "id", dataValueField: "id",
                                            defaultValueId: 0,
                                        }
                                    }
                                },
                                {
                                    elementId: "control_data_interface",
                                    view: "FormDropdownView",
                                    viewConfig: {
                                        path: "contrail.control_data_interface",
                                        dataBindValue: "contrail().control_data_interface",
                                        dataBindOptionList: "$root.getControlDataInterfaces()",
                                        class: "col-xs-6",
                                        elementConfig: {
                                            placeholder: smwl.TITLE_SELECT_CONTROL_DATA_INTERFACE,
                                            defaultValueId: 0
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            },
        ]
        };
    }

    var configureServersViewConfig = {
        elementId: prefixId,
        view: "AccordianView",
        viewConfig: [
            {
                elementId: cowu.formatElementId([prefixId, smwl.TITLE_SYSTEM_MANAGEMENT]),
                title: smwl.TITLE_SYSTEM_MANAGEMENT,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {
                                    elementId: "domain", view: "FormInputView",
                                    viewConfig: {
                                        help: {
                                            target: "tooltip",
                                            content: defaultSchema.properties.domain.description
                                        },
                                        path: "domain", dataBindValue: "domain", class: "col-xs-6", view: "FormInputView"
                                    }
                                }
                            ]
                        },
                        {
                            columns: [
                                {
                                    elementId: "ipmi_username", view: "FormInputView",
                                    viewConfig: {
                                        help: {
                                            target: "tooltip",
                                            content: defaultSchema.properties.domain.description
                                        },
                                        path: "ipmi_username", dataBindValue: "ipmi_username", class: "col-xs-6"
                                    }
                                },
                                {
                                    elementId: "ipmi_password", view: "FormInputView",
                                    viewConfig: {
                                        help: {
                                            target: "tooltip",
                                            content: defaultSchema.properties.domain.description
                                        },
                                        path: "ipmi_password", type: "password", dataBindValue: "ipmi_password", class: "col-xs-6"
                                    }
                                }
                            ]
                        }
                    ]
                }
            },

            {
                elementId: cowu.formatElementId([prefixId, smwl.TITLE_CONTRAIL_CONTROLLER]),
                title: smwl.TITLE_CONTRAIL_CONTROLLER,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {
                                    elementId: "package_image_id",
                                    view: "FormDropdownView",
                                    viewConfig: {path: "package_image_id", dataBindValue: "package_image_id", class: "col-xs-6", elementConfig: {placeholder: smwl.SELECT_PACKAGE, dataTextField: "id", dataValueField: "id", dataSource: {type: "remote", url: smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, "filterInContrailControllerPackages")}}}
                                }
                            ]
                        }
                    ]
                }
            },
            {
                elementId: cowu.formatElementId([prefixId, smwl.TITLE_CONTRAIL_STORAGE]),
                title: smwl.TITLE_CONTRAIL_STORAGE,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {
                                    elementId: "storage_repo_id",
                                    view: "FormDropdownView",
                                    viewConfig: {
                                        help: {
                                            target: "tooltip",
                                            content: defaultSchema.properties.parameters.properties.provision.properties.contrail.properties.storage.properties.storage_repo_id.description
                                        },
                                        path: "parameters.provision.contrail.storage.storage_repo_id", dataBindValue: "parameters().provision.contrail.storage.storage_repo_id", class: "col-xs-6", elementConfig: {placeholder: smwl.SELECT_PACKAGE, dataTextField: "id", dataValueField: "id", dataSource: {type: "remote", url: smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, "filterInContrailStoragePackages")}}
                                    }
                                }
                            ]
                        },
                        {
                            columns: [
                                {
                                    elementId: "storage_chassis_id",
                                    view: "FormDropdownView",
                                    viewConfig: {
                                        help: {
                                            target: "tooltip",
                                            content: defaultSchema.properties.parameters.properties.provision.properties.contrail.properties.storage.properties.storage_chassis_id.description
                                        },
                                        path: "parameters.provision.contrail.storage.storage_chassis_id", dataBindValue: "parameters().provision.contrail.storage.storage_chassis_id", class: "col-xs-6", elementConfig: {allowClear: true, placeholder: smwl.SELECT_CHASSIS_ID, dataTextField: "id", dataValueField: "id", dataSource: {type: "remote", url: smwc.URL_CHASSIS_ID}}
                                    }
                                },
                                {
                                    elementId: "storage_chassis_id_input",
                                    view: "FormInputView",
                                    viewConfig: {path: "parameters.provision.contrail.storage.storage_chassis_id_input", dataBindValue: "parameters().provision.contrail.storage.storage_chassis_id_input", class: "col-xs-6"}
                                }
                            ]
                        }
                    ]
                }
            },
            {
                elementId: cowu.formatElementId([prefixId, smwl.TITLE_PROVISIONING]),
                title: smwl.TITLE_PROVISIONING,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {
                                    elementId: "cluster_id",
                                    view: "FormDropdownView",
                                    viewConfig: {
                                        help: {
                                            target: "tooltip",
                                            content: defaultSchema.properties.cluster_id.description
                                        },
                                        path: "cluster_id", dataBindValue: "cluster_id", class: "col-xs-6", elementConfig: {placeholder: smwl.SELECT_CLUSTER, dataTextField: "id", dataValueField: "id", dataSource: {type: "remote", url: smwu.getObjectUrl(smwc.CLUSTER_PREFIX_ID, smwc.CLUSTER_PREFIX_ID)}}
                                    }
                                },
                                {elementId: "email", view: "FormInputView", viewConfig: {path: "email", dataBindValue: "email", class: "col-xs-6"}}
                            ]
                        },
                        {
                            columns: [
                                {
                                    elementId: "base_image_id",
                                    view: "FormDropdownView",
                                    viewConfig: {path: "base_image_id", dataBindValue: "base_image_id", class: "col-xs-6", elementConfig: {placeholder: smwl.SELECT_IMAGE, dataTextField: "id", dataValueField: "id", dataSource: {type: "remote", url: smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, "filterInImages")}}}
                                }
                            ]
                        },
                        {
                            columns: [
                                {
                                    elementId: "kernel_upgrade",
                                    view: "FormDropdownView",
                                    viewConfig: {
                                        path: "parameters.kernel_upgrade",
                                        dataBindValue: "parameters().kernel_upgrade",
                                        class: "col-xs-6",
                                        elementConfig: {dataTextField: "text", dataValueField: "id", data: smwc.STATES_YES_NO}
                                    }
                                },
                                {
                                    elementId: "kernel_version", view: "FormInputView",
                                    viewConfig: {path: "parameters.kernel_version", dataBindValue: "parameters().kernel_version", class: "col-xs-6"}
                                }
                            ]
                        }
                    ]
                }
            },

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
                            elementId: "package_image_id",
                            view: "FormDropdownView",
                            viewConfig: {path: "package_image_id", dataBindValue: "package_image_id", class: "col-xs-6", elementConfig: {placeholder: smwl.SELECT_PACKAGE, dataTextField: "id", dataValueField: "id", dataSource: {type: "remote", url: smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, "filterInPackages")}}}
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
                            elementId: "base_image_id",
                            view: "FormDropdownView",
                            viewConfig: {path: "base_image_id", dataBindValue: "base_image_id", class: "col-xs-6", elementConfig: {placeholder: smwl.SELECT_IMAGE, dataTextField: "id", dataValueField: "id", dataSource: {type: "remote", url: smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, "filterInImages")}}}
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
                        {
                            elementId: "roles", view: "FormMultiselectView",
                            viewConfig: {path: "roles", dataBindValue: "roles", class: "col-xs-12", elementConfig: {placeholder: smwl.SELECT_ROLES, data: smwc.ROLES_OBJECTS}}
                        }
                    ]
                }
            ]
        }
    };

    return ServerEditView;
});
