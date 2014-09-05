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
        editTemplate = contrail.getTemplate4Id("sm-edit-layout-template");

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
        }
    });

    var configureViewConfig = {
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
                                    elementId: 'id',
                                    view: "FormDropdownView",
                                    viewConfig: {path: 'id', dataBindValue: 'id', class: "span6", elementConfig: { dataTextField: "id", dataValueField: "id", dataSource: { type: 'remote', url: smUtils.getObjectUrl(smConstants.CLUSTER_PREFIX_ID, smConstants.CLUSTER_PREFIX_ID)}}}
                                },
                                {elementId: 'email', view: "FormInputView", viewConfig: {path: 'email', dataBindValue: 'email', class: "span6"}}

                            ]
                        },
                        {
                            columns: [
                                {elementId: 'domain', view: "FormInputView", viewConfig: {path: 'parameters.domain', dataBindValue: 'parameters().domain', class: "span6"}},
                                {elementId: 'keystone_tenant', view: "FormInputView", viewConfig: {path: 'parameters.keystone_tenant', dataBindValue: 'parameters().keystone_tenant', class: "span6"}}
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
                                {elementId: 'openstack_mgmt_ip', view: "FormInputView", viewConfig: {path: 'parameters.openstack_mgmt_ip', dataBindValue: 'parameters().openstack_mgmt_ip', class: "span6"}},
                                {elementId: 'openstack_passwd', view: "FormInputView", viewConfig: {path: 'parameters.openstack_passwd', dataBindValue: 'parameters().openstack_passwd', class: "span6"}}
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
                                {elementId: 'compute_non_mgmt_ip', view: "FormInputView", viewConfig: {path: 'parameters.compute_non_mgmt_ip', dataBindValue: 'parameters().compute_non_mgmt_ip', class: "span6"}},
                                {elementId: 'compute_non_mgmt_gway', view: "FormInputView", viewConfig: {path: 'parameters.compute_non_mgmt_gway', dataBindValue: 'parameters().compute_non_mgmt_gway', class: "span6"}}
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
                                    viewConfig: {path: 'base_image_id', class: "span6", dataBindValue: 'base_image_id', elementConfig: {dataTextField: "id", dataValueField: "id", dataSource: { type: 'remote', url: smUtils.getObjectUrl(smConstants.IMAGE_PREFIX_ID, smConstants.IMAGE_PREFIX_ID)}}}
                                },
                                {
                                    elementId: 'package_image_id',
                                    view: "FormDropdownView",
                                    viewConfig: {path: 'package_image_id', class: "span6", dataBindValue: 'package_image_id', elementConfig: {dataTextField: "id", dataValueField: "id", dataSource: { type: 'remote', url: smUtils.getObjectUrl(smConstants.IMAGE_PREFIX_ID, smConstants.IMAGE_PREFIX_ID)}}}
                                }
                            ]
                        }
                    ]
                }
            }
        ]
    };

    return ClusterEditView;
});