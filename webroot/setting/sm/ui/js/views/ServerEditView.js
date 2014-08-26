/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {

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
        },

        renderTagServers: function (options) {
            var tagServersConfig = {prefixId: 'server', groups: [{rows: editTagLayoutRows}]},
                editLayout = editTemplate(tagServersConfig),
                that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {

            }});

            smUtils.generateEditFormHTML(modalId, this.model, tagServersConfig);
        },

        renderEditRoles: function (options) {
            var editLayout = editTemplate(editRolesLayoutConfig),
                that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {

            }});

            smUtils.generateEditFormHTML(modalId, this.model, editRolesLayoutConfig);
        }
    });

    var editTagLayoutRows = [
        {
            elements: [
                {id: 'datacenter', path: "tag.datacenter", class: "span6", view: "FormInputView"},
                {id: 'floor', path: 'tag.floor', class: "span6", view: "FormInputView"}
            ]
        },
        {
            elements: [
                {id: 'hall', path: "tag.hall", class: "span6", view: "FormInputView"},
                {id: 'rack', path: 'tag.rack', class: "span6", view: "FormInputView"}
            ]
        },
        {
            elements: [
                {id: 'user_tag', path: "tag.user_tag", class: "span6", view: "FormInputView"}
            ]
        }
    ];

    var configureServerLayoutConfig = {
        prefixId: 'server',
        groups: [
            {
                title: "Details",
                rows: [
                    {
                        elements: [
                            {id: 'id', path: "id", class: "span6", view: "FormInputView"},
                            {id: 'cluster_id', path: 'cluster_id', class: "span6", view: "FormInputView"}
                        ]
                    },
                    {
                        elements: [
                            {id: 'host_name', path: "host_name", class: "span6", view: "FormInputView"},
                            {id: 'email', path: 'email', class: "span6", view: "FormInputView"}
                        ]
                    }
                ]
            },
            {
                title: "System",
                rows: [
                    {
                        elements: [
                            {id: 'ip_address', path: "ip_address", class: "span6", view: "FormInputView"},
                            {id: 'power_address', path: 'power_address', class: "span6", view: "FormInputView"}
                        ]
                    },
                    {
                        elements: [
                            {id: 'gateway', path: "gateway", class: "span6", view: "FormInputView"},
                            {id: 'subnet_mask', path: 'subnet_mask', class: "span6", view: "FormInputView"}
                        ]
                    },
                    {
                        elements: [
                            {id: 'mac', path: 'mac', class: "span6", view: "FormInputView"},
                            {id: 'ifname', path: 'parameters.ifname', class: "span6", view: "FormInputView"}
                        ]
                    },
                    {
                        elements: [
                            {id: 'domain', path: "domain", class: "span6", view: "FormInputView"}
                        ]
                    }
                ]
            },
            {
                title: "Tags",
                rows: editTagLayoutRows
            },
            {
                title: "Roles",
                rows: [
                    {
                        elements: [
                            {id: 'roles', path: 'roles', class: "span12", view: "FormMultiselectView", elementConfig: {data: smConstants.ROLES_OBJECTS}}
                        ]
                    }
                ]
            },
            {
                title: "Configurations",
                rows: [
                    {
                        elements: [
                            {id: 'base_image_id', path: 'base_image_id', class: "span6", view: "FormInputView"},
                            {id: 'package_image_id', path: 'package_image_id', class: "span6", view: "FormInputView"}
                        ]
                    },
                    {
                        elements: [
                            {id: 'compute_non_mgmt_ip', path: 'parameters.compute_non_mgmt_ip', class: "span6", view: "FormInputView"},
                            {id: 'compute_non_mgmt_gway', path: 'parameters.compute_non_mgmt_gway', class: "span6", view: "FormInputView"}
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
                            {id: 'cluster_id', path: 'cluster_id', class: "span6", view: "FormInputView"},
                            {id: 'email', path: 'email', class: "span6", view: "FormInputView"}
                        ]
                    }
                ]
            },
            {
                title: smLabels.TITLE_SYSTEM,
                rows: [
                    {
                        elements: [
                            {id: 'gateway', path: "gateway", class: "span6", view: "FormInputView"},
                            {id: 'subnet_mask', path: 'subnet_mask', class: "span6", view: "FormInputView"}
                        ]
                    },
                    {
                        elements: [
                            {id: 'interface_name', path: 'parameters.interface_name', class: "span6", view: "FormInputView"},
                            {id: 'domain', path: "domain", class: "span6", view: "FormInputView"}
                        ]
                    }
                ]
            },
            {
                title: smLabels.TITLE_TAGS,
                rows: editTagLayoutRows
            },
            {
                title: "Roles",
                rows: [
                    {
                        elements: [
                            {id: 'roles', path: 'roles', class: "span12", view: "FormMultiselectView", elementConfig: {data: smConstants.ROLES_OBJECTS}}
                        ]
                    }
                ]
            },
            {
                title: smLabels.TITLE_CONFIGURATIONS,
                rows: [
                    {
                        elements: [
                            {id: 'base_image_id', path: 'base_image_id', class: "span6", view: "FormInputView"},
                            {id: 'package_image_id', path: 'package_image_id', class: "span6", view: "FormInputView"}
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
                            {id: 'base_image_id', path: 'base_image_id', class: "span6", view: "FormInputView"},
                            {id: 'package_image_id', path: 'package_image_id', class: "span6", view: "FormInputView"}
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
                            {id: 'roles', path: 'roles', class: "span12", view: "FormMultiselectView", elementConfig: {data: smConstants.ROLES_OBJECTS}}
                        ]
                    }
                ]
            }
        ]
    };

    return ServerEditView;
});