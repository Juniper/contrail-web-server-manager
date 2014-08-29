/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'knockback'
], function (_, Backbone, Knockback) {

    var prefixId = smConstants.SERVER_PREFIX_ID,
        modalId = 'configure-' + prefixId,
        editTemplate = contrail.getTemplate4Id("sm-edit-layout-template");

    var ServerEditView = Backbone.View.extend({

        renderConfigure: function (options) {
            var editLayout = editTemplate(configureServerLayoutConfig),
                that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                var serverForm = $('#' + modalId).find('#sm-server-edit-form').serializeObject();
                that.model.saveConfig(serverForm);
            }});

            smUtils.generateEditFormHTML(modalId, this.model, configureServerLayoutConfig);

            Knockback.applyBindings(this.model, document.getElementById(modalId));

            $('#sm-server-accordion').accordion({
                heightStyle: "content"
            });
        },

        renderConfigureServers: function (options) {
            var editLayout = editTemplate(configureServerCollectionLayoutConfig),
                that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {

            }});

            smUtils.generateEditFormHTML(modalId, this.model, configureServerCollectionLayoutConfig);

            Knockback.applyBindings(this.model, document.getElementById(modalId));

            $('#sm-server-accordion').accordion({
                heightStyle: "content"
            });
        },

        renderProvisionServers: function (options) {
            var editLayout = editTemplate(provisionServersLayoutConfig),
                that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {

            }});

            smUtils.generateEditFormHTML(modalId, this.model, provisionServersLayoutConfig);

            Knockback.applyBindings(this.model, document.getElementById(modalId));
        },

        renderTagServers: function (options) {
            var tagServersConfig = {prefixId: 'server', groups: [
                    {rows: editTagLayoutRows}
                ]},
                editLayout = editTemplate(tagServersConfig),
                that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {

            }});

            smUtils.generateEditFormHTML(modalId, this.model, tagServersConfig);

            Knockback.applyBindings(this.model, document.getElementById(modalId));
        },

        renderEditRoles: function (options) {
            var editLayout = editTemplate(editRolesLayoutConfig),
                that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {

            }});

            smUtils.generateEditFormHTML(modalId, this.model, editRolesLayoutConfig);

            Knockback.applyBindings(this.model, document.getElementById(modalId));
        }
    });

    var editTagLayoutRows = [
        {
            elements: [
                {id: 'datacenter', path: "tag.datacenter", dataBindValue: "tag().datacenter", class: "span6", view: "FormInputView"},
                {id: 'floor', path: 'tag.floor', dataBindValue: 'tag().floor', class: "span6", view: "FormInputView"}
            ]
        },
        {
            elements: [
                {id: 'hall', path: "tag.hall", dataBindValue: "tag().hall", class: "span6", view: "FormInputView"},
                {id: 'rack', path: 'tag.rack', dataBindValue: 'tag().rack', class: "span6", view: "FormInputView"}
            ]
        },
        {
            elements: [
                {id: 'user_tag', path: "tag.user_tag", dataBindValue: "tag().user_tag", class: "span6", view: "FormInputView"}
            ]
        }
    ];

    var configureServerLayoutConfig = {
        prefixId: 'server',
        groups: [
            {
                title: smLabels.TITLE_DETAILS,
                rows: [
                    {
                        elements: [
                            {id: 'id', path: "id", dataBindValue: "id", class: "span6", view: "FormInputView"},
                            {id: 'cluster_id', path: 'cluster_id', class: "span6", view: "FormDropdownView", elementConfig: {
                                dataTextField: "id",
                                dataValueField: "id",
                                dataSource: {
                                    type: 'remote',
                                    url: smUtils.getObjectUrl(smConstants.CLUSTER_PREFIX_ID, smConstants.CLUSTER_PREFIX_ID)
                                }
                            }}
                        ]
                    },
                    {
                        elements: [
                            {id: 'host_name', path: "host_name", dataBindValue: "host_name", class: "span6", view: "FormInputView"},
                            {id: 'email', path: 'email', dataBindValue: 'email', class: "span6", view: "FormInputView"}
                        ]
                    }
                ]
            },
            {
                title: smLabels.TITLE_SYSTEM,
                rows: [
                    {
                        elements: [
                            {id: 'ip_address', path: "ip_address", dataBindValue: "ip_address", class: "span6", view: "FormInputView"},
                            {id: 'power_address', path: 'power_address', dataBindValue: 'power_address', class: "span6", view: "FormInputView"}
                        ]
                    },
                    {
                        elements: [
                            {id: 'gateway', path: "gateway", dataBindValue: "gateway", class: "span6", view: "FormInputView"},
                            {id: 'subnet_mask', path: 'subnet_mask', dataBindValue: 'subnet_mask', class: "span6", view: "FormInputView"}
                        ]
                    },
                    {
                        elements: [
                            {id: 'mac_address', path: 'mac_address', dataBindValue: 'mac_address', class: "span6", view: "FormInputView"},
                            {id: 'interface_name', path: 'parameters.interface_name', dataBindValue: 'parameters().interface_name', class: "span6", view: "FormInputView"}
                        ]
                    },
                    {
                        elements: [
                            {id: 'domain', path: "domain", dataBindValue: "domain", class: "span6", view: "FormInputView"}
                        ]
                    }
                ]
            },
            {
                title: smLabels.TITLE_TAGS,
                rows: editTagLayoutRows
            },
            {
                title: smLabels.TITLE_ROLES,
                rows: [
                    {
                        elements: [
                            {id: 'roles', path: 'roles', dataBindValue: 'roles', class: "span12", view: "FormMultiselectView", elementConfig: {data: smConstants.ROLES_OBJECTS}}
                        ]
                    }
                ]
            },
            {
                title: smLabels.TITLE_CONFIGURATIONS,
                rows: [
                    {
                        elements: [
                            {id: 'base_image_id', path: 'base_image_id', dataBindValue: 'base_image_id', class: "span6", view: "FormDropdownView", elementConfig: {
                                dataTextField: "id",
                                dataValueField: "id",
                                dataSource: {
                                    type: 'remote',
                                    url: smUtils.getObjectUrl(smConstants.IMAGE_PREFIX_ID, smConstants.IMAGE_PREFIX_ID)
                                }
                            }},
                            {id: 'package_image_id', path: 'package_image_id', dataBindValue: 'package_image_id', class: "span6", view: "FormDropdownView", elementConfig: {
                                dataTextField: "id",
                                dataValueField: "id",
                                dataSource: {
                                    type: 'remote',
                                    url: smUtils.getObjectUrl(smConstants.IMAGE_PREFIX_ID, smConstants.IMAGE_PREFIX_ID)
                                }
                            }}
                        ]
                    },
                    {
                        elements: [
                            {id: 'compute_non_mgmt_ip', path: 'parameters.compute_non_mgmt_ip', dataBindValue: 'parameters().compute_non_mgmt_ip', class: "span6", view: "FormInputView"},
                            {id: 'compute_non_mgmt_gway', path: 'parameters.compute_non_mgmt_gway', dataBindValue: 'parameters().compute_non_mgmt_gway', class: "span6", view: "FormInputView"}
                        ]
                    }
                ]
            }
        ]
    };

    var configureServerCollectionLayoutConfig = {
        prefixId: prefixId,
        groups: [
            {
                title: smLabels.TITLE_DETAILS,
                rows: [
                    {
                        elements: [
                            {id: 'cluster_id', path: 'cluster_id', dataBindValue: 'cluster_id', class: "span6", view: "FormDropdownView", elementConfig: {
                                dataTextField: "id",
                                dataValueField: "id",
                                dataSource: {
                                    type: 'remote',
                                    url: smUtils.getObjectUrl(smConstants.CLUSTER_PREFIX_ID, smConstants.CLUSTER_PREFIX_ID)
                                }
                            }},
                            {id: 'email', path: 'email', dataBindValue: 'email', class: "span6", view: "FormInputView"}
                        ]
                    }
                ]
            },
            {
                title: smLabels.TITLE_SYSTEM,
                rows: [
                    {
                        elements: [
                            {id: 'gateway', path: "gateway", dataBindValue: "gateway", class: "span6", view: "FormInputView"},
                            {id: 'subnet_mask', path: 'subnet_mask', dataBindValue: 'subnet_mask', class: "span6", view: "FormInputView"}
                        ]
                    },
                    {
                        elements: [
                            {id: 'interface_name', path: 'parameters.interface_name', dataBindValue: 'parameters().interface_name', class: "span6", view: "FormInputView"},
                            {id: 'domain', path: "domain", dataBindValue: "domain", class: "span6", view: "FormInputView"}
                        ]
                    }
                ]
            },
            {
                title: smLabels.TITLE_TAGS,
                rows: editTagLayoutRows
            },
            {
                title: smLabels.TITLE_ROLES,
                rows: [
                    {
                        elements: [
                            {id: 'roles', path: 'roles', dataBindValue: 'roles', class: "span12", view: "FormMultiselectView", elementConfig: {data: smConstants.ROLES_OBJECTS}}
                        ]
                    }
                ]
            },
            {
                title: smLabels.TITLE_CONFIGURATIONS,
                rows: [
                    {
                        elements: [
                            {id: 'base_image_id', path: 'base_image_id', dataBindValue: 'base_image_id', class: "span6", view: "FormDropdownView", elementConfig: {
                                dataTextField: "id",
                                dataValueField: "id",
                                dataSource: {
                                    type: 'remote',
                                    url: smUtils.getObjectUrl(smConstants.IMAGE_PREFIX_ID, smConstants.IMAGE_PREFIX_ID)
                                }
                            }},
                            {
                                id: 'package_image_id', path: 'package_image_id', dataBindValue: 'package_image_id', class: "span6", view: "FormDropdownView", elementConfig: {
                                dataTextField: "id",
                                dataValueField: "id",
                                dataSource: {
                                    type: 'remote',
                                    url: smUtils.getObjectUrl(smConstants.IMAGE_PREFIX_ID, smConstants.IMAGE_PREFIX_ID)
                                }
                            }
                            }
                        ]
                    }
                ]
            }
        ]
    };

    var provisionServersLayoutConfig = {
        prefixId: prefixId,
        groups: [
            {
                rows: [
                    {
                        elements: [
                            {id: 'base_image_id', path: 'base_image_id', dataBindValue: 'base_image_id', class: "span6", view: "FormDropdownView", elementConfig: {
                                dataTextField: "id",
                                dataValueField: "id",
                                dataSource: {
                                    type: 'remote',
                                    url: smUtils.getObjectUrl(smConstants.IMAGE_PREFIX_ID, smConstants.IMAGE_PREFIX_ID)
                                }
                            }},
                            {id: 'package_image_id', path: 'package_image_id', dataBindValue: 'package_image_id', class: "span6", view: "FormDropdownView", elementConfig: {
                                dataTextField: "id",
                                dataValueField: "id",
                                dataSource: {
                                    type: 'remote',
                                    url: smUtils.getObjectUrl(smConstants.IMAGE_PREFIX_ID, smConstants.IMAGE_PREFIX_ID)
                                }
                            }}
                        ]
                    }
                ]
            }
        ]
    };

    var editRolesLayoutConfig = {
        prefixId: prefixId,
        groups: [
            {
                rows: [
                    {
                        elements: [
                            {id: 'roles', path: 'roles', dataBindValue: 'roles', class: "span12", view: "FormMultiselectView", elementConfig: {data: smConstants.ROLES_OBJECTS}}
                        ]
                    }
                ]
            }
        ]
    };

    return ServerEditView;
});