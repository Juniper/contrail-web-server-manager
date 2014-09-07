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
        editTemplate = contrail.getTemplate4Id("sm-edit-form-template");

    var ServerEditView = Backbone.View.extend({

        renderConfigure: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                that.model.configure(modalId); // TODO: Release binding on successful configure
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
                smValidation.unbind(that);
                $("#" + modalId).modal('hide');
            }});

            smUtils.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, configureServerViewConfig, "configureValidation");

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smValidation.bind(this);
        },

        renderConfigureServers: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {

            }, 'onCancel': function () {
                $("#" + modalId).modal('hide');
            }});

            smUtils.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, configureCollectionViewConfig, "configureValidation");

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smValidation.bind(this);
        },

        renderProvisionServers: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {

            }, 'onCancel': function () {
                $("#" + modalId).modal('hide');
            }});

            smUtils.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, provisionServersViewConfig);

            Knockback.applyBindings(this.model, document.getElementById(modalId));
        },

        renderTagServers: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                editTagViewConfig = {
                    elementId: (prefixId + '_' + smLabels.TITLE_TAG).toLowerCase(),
                    view: "SectionView",
                    viewConfig: {
                        rows: editTagViewConfigRows
                    }
                }, that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {

            }, 'onCancel': function () {
                $("#" + modalId).modal('hide');
            }});

            smUtils.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, editTagViewConfig);

            Knockback.applyBindings(this.model, document.getElementById(modalId));
        },

        renderEditRoles: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {

            }, 'onCancel': function () {
                $("#" + modalId).modal('hide');
            }});

            smUtils.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, editRolesViewConfig);

            Knockback.applyBindings(this.model, document.getElementById(modalId));
        }
    });

    var editTagViewConfigRows = [
        {
            columns: [
                {elementId: 'datacenter', view: "FormInputView", viewConfig: {path: "tag.datacenter", dataBindValue: "tag().datacenter", class: "span6"}},
                {elementId: 'floor', view: "FormInputView", viewConfig: {path: 'tag.floor', dataBindValue: 'tag().floor', class: "span6"}}
            ]
        },
        {
            columns: [
                {elementId: 'hall', view: "FormInputView", viewConfig: {path: "tag.hall", dataBindValue: "tag().hall", class: "span6"}},
                {elementId: 'rack', view: "FormInputView", viewConfig: {path: 'tag.rack', dataBindValue: 'tag().rack', class: "span6"}}
            ]
        },
        {
            columns: [
                {elementId: 'user_tag', view: "FormInputView", viewConfig: {path: "tag.user_tag", dataBindValue: "tag().user_tag", class: "span6"}}
            ]
        }
    ];

    var configureServerViewConfig = {
        elementId: prefixId,
        view: "AccordianView",
        viewConfig: [
            {
                elementId: (prefixId + '_' + smLabels.TITLE_DETAILS).toLowerCase(),
                title: smLabels.TITLE_DETAILS,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {elementId: 'id', view: "FormInputView", viewConfig: {path: "id", dataBindValue: "id", class: "span6"}},
                                {
                                    elementId: 'cluster_id',
                                    view: "FormDropdownView",
                                    viewConfig: {path: 'cluster_id', dataBindValue: "cluster_id", class: "span6", elementConfig: {placeholder: smLabels.SELECT_CLUSTER, dataTextField: "id", dataValueField: "id", dataSource: {type: 'remote', url: smUtils.getObjectUrl(smConstants.CLUSTER_PREFIX_ID, smConstants.CLUSTER_PREFIX_ID)}}}
                                }
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'host_name', view: "FormInputView", viewConfig: {path: "host_name", dataBindValue: "host_name", class: "span6"}},
                                {elementId: 'email', view: "FormInputView", viewConfig: {path: 'email', dataBindValue: 'email', class: "span6"}}
                            ]
                        }
                    ]
                }
            },
            {
                elementId: (prefixId + '_' + smLabels.TITLE_SYSTEM).toLowerCase(),
                title: smLabels.TITLE_SYSTEM,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {elementId: 'ip_address', view: "FormInputView", viewConfig: {path: "ip_address", dataBindValue: "ip_address", class: "span6"}},
                                {elementId: 'ipmi_address', view: "FormInputView", viewConfig: {path: 'ipmi_address', dataBindValue: 'ipmi_address', class: "span6"}}
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'gateway', view: "FormInputView", viewConfig: {path: "gateway", dataBindValue: "gateway", class: "span6"}},
                                {elementId: 'subnet_mask', view: "FormInputView", viewConfig: {path: 'subnet_mask', dataBindValue: 'subnet_mask', class: "span6"}}
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'mac_address', view: "FormInputView", viewConfig: {path: 'mac_address', dataBindValue: 'mac_address', class: "span6"}},
                                {elementId: 'interface_name', view: "FormInputView", viewConfig: {path: 'parameters.interface_name', dataBindValue: 'parameters().interface_name', class: "span6"}}
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'domain', view: "FormInputView", viewConfig: {path: "domain", dataBindValue: "domain", class: "span6", view: "FormInputView"}}
                            ]
                        }
                    ]
                }
            },
            {
                elementId: (prefixId + '_' + smLabels.TITLE_TAG).toLowerCase(),
                view: "SectionView",
                title: smLabels.TITLE_TAG,
                viewConfig: {
                    rows: editTagViewConfigRows
                }
            },
            {
                elementId: (prefixId + '_' + smLabels.TITLE_ROLES).toLowerCase(),
                title: smLabels.TITLE_ROLES,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {elementId: 'roles', view: "FormMultiselectView", viewConfig: {path: 'roles', dataBindValue: 'roles', class: "span12", elementConfig: {placeholder: smLabels.SELECT_ROLES, data: smConstants.ROLES_OBJECTS}}}
                            ]
                        }
                    ]
                }
            },
            {
                elementId: (prefixId + '_' + smLabels.TITLE_CONFIGURATIONS).toLowerCase(),
                title: smLabels.TITLE_CONFIGURATIONS,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {
                                    elementId: 'base_image_id',
                                    view: "FormDropdownView",
                                    viewConfig: {path: 'base_image_id', dataBindValue: 'base_image_id', class: "span6", elementConfig: {placeholder: smLabels.SELECT_IMAGE, dataTextField: "id", dataValueField: "id", dataSource: { type: 'remote', url: smUtils.getObjectUrl(smConstants.IMAGE_PREFIX_ID, smConstants.IMAGE_PREFIX_ID)}}}
                                },
                                {
                                    elementId: 'package_image_id',
                                    view: "FormDropdownView",
                                    viewConfig: {path: 'package_image_id', dataBindValue: 'package_image_id', class: "span6", elementConfig: {placeholder: smLabels.SELECT_PACKAGE, dataTextField: "id", dataValueField: "id", dataSource: {type: 'remote', url: smUtils.getObjectUrl(smConstants.IMAGE_PREFIX_ID, smConstants.IMAGE_PREFIX_ID)}}}
                                }
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'compute_non_mgmt_ip', view: "FormInputView", viewConfig: {path: 'parameters.compute_non_mgmt_ip', dataBindValue: 'parameters().compute_non_mgmt_ip', class: "span6"}},
                                {elementId: 'compute_non_mgmt_gway', view: "FormInputView", viewConfig: {path: 'parameters.compute_non_mgmt_gway', dataBindValue: 'parameters().compute_non_mgmt_gway', class: "span6"}}
                            ]
                        }
                    ]
                }
            }
        ]
    };

    var configureCollectionViewConfig = {
        elementId: prefixId,
        view: "AccordianView",
        viewConfig: [
            {
                elementId: (prefixId + '_' + smLabels.TITLE_DETAILS).toLowerCase(),
                title: smLabels.TITLE_DETAILS,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {
                                    elementId: 'cluster_id',
                                    view: "FormDropdownView",
                                    viewConfig: {path: 'cluster_id', dataBindValue: 'cluster_id', class: "span6", elementConfig: {placeholder: smLabels.SELECT_CLUSTER, dataTextField: "id", dataValueField: "id", dataSource: {type: 'remote', url: smUtils.getObjectUrl(smConstants.CLUSTER_PREFIX_ID, smConstants.CLUSTER_PREFIX_ID)}}}
                                },
                                {elementId: 'email', view: "FormInputView", viewConfig: {path: 'email', dataBindValue: 'email', class: "span6"}}
                            ]
                        }
                    ]
                }
            },
            {
                elementId: (prefixId + '_' + smLabels.TITLE_SYSTEM).toLowerCase(),
                title: smLabels.TITLE_SYSTEM,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {elementId: 'gateway', view: "FormInputView", viewConfig: {path: "gateway", dataBindValue: "gateway", class: "span6"}},
                                {elementId: 'subnet_mask', view: "FormInputView", viewConfig: {path: 'subnet_mask', dataBindValue: 'subnet_mask', class: "span6"}}
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'interface_name', view: "FormInputView", viewConfig: {path: 'parameters.interface_name', dataBindValue: 'parameters().interface_name', class: "span6"}},
                                {elementId: 'domain', view: "FormInputView", viewConfig: {path: "domain", dataBindValue: "domain", class: "span6"}}
                            ]
                        }
                    ]
                }
            },
            {
                elementId: (prefixId + '_' + smLabels.TITLE_TAG).toLowerCase(),
                view: "SectionView",
                title: smLabels.TITLE_TAG,
                viewConfig: {
                    rows: editTagViewConfigRows
                }
            },
            {
                elementId: (prefixId + '_' + smLabels.TITLE_ROLES).toLowerCase(),
                title: smLabels.TITLE_ROLES,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {elementId: 'roles', view: "FormMultiselectView", viewConfig: {path: 'roles', dataBindValue: 'roles', class: "span12", elementConfig: {placeholder: smLabels.SELECT_ROLES, data: smConstants.ROLES_OBJECTS}}}
                            ]
                        }
                    ]
                }
            },
            {
                elementId: (prefixId + '_' + smLabels.TITLE_CONFIGURATIONS).toLowerCase(),
                title: smLabels.TITLE_CONFIGURATIONS,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {
                                    elementId: 'base_image_id',
                                    view: "FormDropdownView",
                                    viewConfig: {path: 'base_image_id', dataBindValue: 'base_image_id', class: "span6", elementConfig: {placeholder: smLabels.SELECT_IMAGE, dataTextField: "id", dataValueField: "id", dataSource: {type: 'remote', url: smUtils.getObjectUrl(smConstants.IMAGE_PREFIX_ID, smConstants.IMAGE_PREFIX_ID)}}}
                                },
                                {
                                    elementId: 'package_image_id',
                                    view: "FormDropdownView",
                                    viewConfig: {path: 'package_image_id', dataBindValue: 'package_image_id', class: "span6", elementConfig: {placeholder: smLabels.SELECT_PACKAGE, dataTextField: "id", dataValueField: "id", dataSource: {type: 'remote', url: smUtils.getObjectUrl(smConstants.IMAGE_PREFIX_ID, smConstants.IMAGE_PREFIX_ID)}}}
                                }
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
                            elementId: 'base_image_id',
                            view: "FormDropdownView",
                            viewConfig: {path: 'base_image_id', dataBindValue: 'base_image_id', class: "span6", elementConfig: {placeholder: smLabels.SELECT_IMAGE, dataTextField: "id", dataValueField: "id", dataSource: {type: 'remote', url: smUtils.getObjectUrl(smConstants.IMAGE_PREFIX_ID, smConstants.IMAGE_PREFIX_ID)}}}
                        },
                        {
                            elementId: 'package_image_id',
                            view: "FormDropdownView",
                            viewConfig: {path: 'package_image_id', dataBindValue: 'package_image_id', class: "span6", elementConfig: {placeholder: smLabels.SELECT_PACKAGE, dataTextField: "id", dataValueField: "id", dataSource: {type: 'remote', url: smUtils.getObjectUrl(smConstants.IMAGE_PREFIX_ID, smConstants.IMAGE_PREFIX_ID)}}}
                        }
                    ]
                }
            ]
        }
    };

    var editRolesViewConfig = {
        elementId: prefixId,
        view: "SectionView",
        viewConfig: {
            rows: [
                {
                    columns: [
                        {elementId: 'roles', view: "FormMultiselectView", viewConfig: {path: 'roles', dataBindValue: 'roles', class: "span12", elementConfig: {placeholder: smLabels.SELECT_ROLES, data: smConstants.ROLES_OBJECTS}}}
                    ]
                }
            ]
        }
    };

    return ServerEditView;
});