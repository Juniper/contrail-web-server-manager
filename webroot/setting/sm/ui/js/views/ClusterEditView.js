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
                that.model.configure(modalId); // TODO: Release binding on successful configure
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
                smValidation.unbind(that);
                $("#" + modalId).modal('hide');
            }});

            smUtils.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, configureViewConfig, "configureValidation");

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smValidation.bind(this);
        },

        renderProvision: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-840', 'title': options['title'], 'body': editLayout, 'onSave': function () {
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
            var wizardLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smUtils.createWizardModal({'modalId': modalId, 'className': 'modal-840', 'title': options['title'], 'body': wizardLayout, 'onSave': function () {
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
                smValidation.unbind(that);
                $("#" + modalId).modal('hide');
            }});

            console.log(this.model);

            smUtils.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, addServerViewConfig);

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smValidation.bind(this);
        }
    });

    var configureViewConfig = {
        elementId: prefixId,
        view: "AccordianView",
        viewConfig: [
            {
                elementId: smUtils.formatElementId([prefixId, smLabels.TITLE_DETAILS]).toLowerCase(),
                title: smLabels.TITLE_DETAILS,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {elementId: 'id', view: "FormInputView", viewConfig: {path: 'id', dataBindValue: 'id', class: "span6"}},
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

    var provisionViewConfig = {
        elementId: prefixId,
        view: "AccordianView",
        viewConfig: [
            {
                elementId: (prefixId + '_' + smLabels.TITLE_ROLES).toLowerCase(),
                title: smLabels.TITLE_ROLES,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {elementId: 'roles-configuration', view: "FormGridView", viewConfig: {path: 'id', class: "span12"} }
                            ]
                        }
                    ]
                }
            },
            {
                elementId: (prefixId + '_' + smLabels.TITLE_IMAGE + '-' + smLabels.TITLE_CONFIGURATIONS).toLowerCase(),
                title: smLabels.TITLE_IMAGE + ' ' + smLabels.TITLE_CONFIGURATIONS,
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
            }
        ]
    };

    var addServerViewConfig = {
        elementId: prefixId + "-wizard",
        view: "WizardView",
        viewConfig: {
            steps: [
                {
                    elementId: (prefixId + '_' + smLabels.TITLE_FILTER).toLowerCase(),
                    view: "SectionView",
                    title: smLabels.TITLE_FILTER_SERVERS,
                    viewConfig: {
                        rows: [
                            {
                                columns: [
                                    {
                                        elementId: 'datacenter',
                                        view: "FormMultiselectView",
                                        viewConfig: {path: "tag.datacenter", dataBindValue: "tag().datacenter", class: "span6", elementConfig: {placeholder: (smLabels.TITLE_SELECT + ' ' + smLabels.get('datacenter')), dataSource: { type: 'remote', url: '/sm/tags/values/datacenter'}}}
                                    },
                                    {
                                        elementId: 'floor',
                                        view: "FormMultiselectView",
                                        viewConfig: {path: 'tag.floor', dataBindValue: 'tag().floor', class: "span6", elementConfig: {placeholder: (smLabels.TITLE_SELECT + ' ' + smLabels.get('floor')), dataSource: { type: 'remote', url: '/sm/tags/values/floor'}}}
                                    }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        elementId: 'hall',
                                        view: "FormMultiselectView",
                                        viewConfig: {path: "tag.hall", dataBindValue: "tag().hall", class: "span6", elementConfig: {placeholder: (smLabels.TITLE_SELECT + ' ' + smLabels.get('hall')), dataSource: { type: 'remote', url: '/sm/tags/values/hall'}}}
                                    },
                                    {
                                        elementId: 'rack',
                                        view: "FormMultiselectView",
                                        viewConfig: {path: 'tag.rack', dataBindValue: 'tag().rack', class: "span6", elementConfig: {placeholder: (smLabels.TITLE_SELECT + ' ' + smLabels.get('rack')), dataSource: { type: 'remote', url: '/sm/tags/values/rack'}}}
                                    }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        elementId: 'user_tag',
                                        view: "FormMultiselectView",
                                        viewConfig: {path: "tag.user_tag", dataBindValue: "tag().user_tag", class: "span6", elementConfig: {placeholder: (smLabels.TITLE_SELECT + ' ' + smLabels.get('user_tag')), dataSource: { type: 'remote', url: '/sm/tags/values/user_tag'}}}
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    elementId: (prefixId + '_' + smLabels.TITLE_SERVERS).toLowerCase(),
                    title: smLabels.TITLE_SERVERS,
                    view: "SectionView",
                    viewConfig: {
                        rows: [
                            {
                                columns: [
                                    {elementId: 'filtered-servers', view: "FormGridView", viewConfig: {path: 'id', class: "span12"} }
                                ]
                            }
                        ]
                    }
                },
                {
                    elementId: (prefixId + '_' + smLabels.TITLE_CONFIRM).toLowerCase(),
                    title: smLabels.TITLE_CONFIRM,
                    view: "SectionView",
                    viewConfig: {
                        rows: [
                            {
                                columns: [
                                    {elementId: 'confirm-servers', view: "FormGridView", viewConfig: {path: 'id', class: "span12"} }
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    };

    return ClusterEditView;
});