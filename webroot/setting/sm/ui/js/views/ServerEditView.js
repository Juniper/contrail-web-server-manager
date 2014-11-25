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

            smwu.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                that.model.configure(options['checkedRows'], {
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

            smwu.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                that.model.createServers({
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
                }, "POST");
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
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
                                {elementId: 'mac_address', view: "FormInputView", viewConfig: {path: 'mac_address', dataBindValue: 'mac_address', class: "span6"}}
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
                                {elementId: 'ip_address', view: "FormInputView", viewConfig: {path: "ip_address", dataBindValue: "ip_address", class: "span6"}},
                                {elementId: 'password', view: "FormInputView", viewConfig: {path: 'password', type: 'password', dataBindValue: 'password', class: "span6"}}
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
                                {elementId: 'gateway', view: "FormInputView", viewConfig: {path: "gateway", dataBindValue: "gateway", class: "span6"}},
                                {elementId: 'subnet_mask', view: "FormInputView", viewConfig: {path: 'subnet_mask', dataBindValue: 'subnet_mask', class: "span6"}}
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
                                    elementId: 'package_image_id',
                                    view: "FormDropdownView",
                                    viewConfig: {path: 'package_image_id', dataBindValue: 'package_image_id', class: "span6", elementConfig: {placeholder: smwl.SELECT_PACKAGE, dataTextField: "id", dataValueField: "id", dataSource: {type: 'remote', url: smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, 'filterInPackages')}}}
                                }
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
                                {elementId: 'interface_name', view: "FormInputView", viewConfig: {path: 'parameters.interface_name', dataBindValue: 'parameters().interface_name', class: "span6"}},
                                {elementId: 'intf_bond', view: "FormInputView", viewConfig: {path: 'intf_bond', dataBindValue: 'intf_bond', class: "span6"}}
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'intf_data', view: "FormInputView", viewConfig: {path: 'intf_data', dataBindValue: 'intf_data', class: "span6"}},
                                {elementId: 'intf_control', view: "FormInputView", viewConfig: {path: 'intf_control', dataBindValue: 'intf_control', class: "span6"}}
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
                elementId: smwu.formatElementId([prefixId, smwl.TITLE_DETAILS]),
                title: smwl.TITLE_DETAILS,
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
                                    elementId: 'base_image_id',
                                    view: "FormDropdownView",
                                    viewConfig: {path: 'base_image_id', dataBindValue: 'base_image_id', class: "span6", elementConfig: {placeholder: smwl.SELECT_IMAGE, dataTextField: "id", dataValueField: "id", dataSource: {type: 'remote', url: smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, 'filterInImages')}}}
                                },
                                {
                                    elementId: 'package_image_id',
                                    view: "FormDropdownView",
                                    viewConfig: {path: 'package_image_id', dataBindValue: 'package_image_id', class: "span6", elementConfig: {placeholder: smwl.SELECT_PACKAGE, dataTextField: "id", dataValueField: "id", dataSource: {type: 'remote', url: smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, 'filterInPackages')}}}
                                }
                            ]
                        }
                    ]
                }
            },
            {
                elementId: smwu.formatElementId([prefixId, smwl.TITLE_SYSTEM_MANAGEMENT]),
                title: smwl.TITLE_SYSTEM_MANAGEMENT,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {elementId: 'domain', view: "FormInputView", viewConfig: {path: "domain", dataBindValue: "domain", class: "span6", view: "FormInputView"}}
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'ipmi_username', view: "FormInputView", viewConfig: {path: 'ipmi_username', dataBindValue: 'ipmi_username', class: "span6"}},
                                {elementId: 'ipmi_password', view: "FormInputView", viewConfig: {path: 'ipmi_password',  type: 'password', dataBindValue: 'ipmi_password', class: "span6"}}
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'gateway', view: "FormInputView", viewConfig: {path: "gateway", dataBindValue: "gateway", class: "span6"}},
                                {elementId: 'subnet_mask', view: "FormInputView", viewConfig: {path: 'subnet_mask', dataBindValue: 'subnet_mask', class: "span6"}}
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
                            viewConfig: {path: 'package_image_id', dataBindValue: 'package_image_id', class: "span6", elementConfig: {placeholder: smwl.SELECT_PACKAGE, dataTextField: "id", dataValueField: "id", dataSource: {type: 'remote', url: smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, 'filterInPackages')}}}
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