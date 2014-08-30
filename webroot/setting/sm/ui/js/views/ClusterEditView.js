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
            var editLayout = editTemplate(configureLayoutConfig),
                that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                var clusterForm = $('#' + modalId).find('#sm-cluster-edit-form').serializeObject();
                that.model.configure(modalId);
                // TODO: Release binding on successful configure
            }, 'onCancel': function() {
                Knockback.release(that.model, document.getElementById(modalId)); //TODO: Release of binding not working
                smValidation.unbind(that);
                $("#" + modalId).modal('hide');
            }});

            smUtils.generateEditFormHTML(modalId, this.model, configureLayoutConfig);

            smValidation.bind(this);

            Knockback.applyBindings(this.model, document.getElementById(modalId));

            $('#sm-cluster-accordion').accordion({
                heightStyle: "content"
            });
        },
        renderProvision: function (options) {
            var editLayout = editTemplate(provisionLayoutConfig),
                that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-840', 'title': options['title'], 'body': editLayout, 'onSave': function () {
            }});

            smUtils.generateEditFormHTML(modalId, this.model, provisionLayoutConfig);

            $('#sm-cluster-accordion').accordion({
                heightStyle: "content"
            });
        }
    });

    var configureLayoutConfig = {
        prefixId: prefixId,
        groups: [
            {
                title: smLabels.TITLE_DETAILS,
                rows: [
                    {
                        elements: [
                            {
                                id: 'id',
                                path: 'id',
                                dataBindValue: 'id',
                                class: "span6",
                                view: "FormDropdownView",
                                elementConfig: {
                                    dataTextField: "id",
                                    dataValueField: "id",
                                    dataSource: {
                                        type: 'remote',
                                        url: smUtils.getObjectUrl(smConstants.CLUSTER_PREFIX_ID, smConstants.CLUSTER_PREFIX_ID)
                                    }
                                }},
                            {id: 'email', path: 'email', dataBindValue: 'email', class: "span6", view: "FormInputView"}
                        ]
                    },
                    {
                        elements: [
                            {id: 'domain', path: 'parameters.domain', dataBindValue: 'parameters().domain', class: "span6", view: "FormInputView"},
                            {id: 'keystone_tenant', path: 'parameters.keystone_tenant', dataBindValue: 'parameters().keystone_tenant', class: "span6", view: "FormInputView"}
                        ]
                    },
                    {
                        elements: [
                            {id: 'gateway', path: 'parameters.gateway', dataBindValue: 'parameters().gateway', class: "span6", view: "FormInputView"},
                            {id: 'subnet_mask', path: 'parameters.subnet_mask', dataBindValue: 'parameters().subnet_mask', class: "span6", view: "FormInputView"}
                        ]
                    },
                    {
                        elements: [
                            {id: 'openstack_mgmt_ip', path: 'parameters.openstack_mgmt_ip', dataBindValue: 'parameters().openstack_mgmt_ip', class: "span6", view: "FormInputView"},
                            {id: 'openstack_passwd', path: 'parameters.openstack_passwd', dataBindValue: 'parameters().openstack_passwd', class: "span6", view: "FormInputView"}
                        ]
                    }
                ]
            },
            {
                title: smLabels.TITLE_CONFIGURATIONS,
                rows: [
                    {
                        elements: [
                            {id: 'analytics_data_ttl', path: 'parameters.analytics_data_ttl', dataBindValue: 'parameters().analytics_data_ttl', class: "span6", view: "FormInputView"},
                            {id: 'ext_bgp', path: 'parameters.ext_bgp', dataBindValue: 'parameters().ext_bgp', class: "span6", view: "FormInputView"}
                        ]
                    },
                    {
                        elements: [
                            {id: 'router_asn', path: 'parameters.router_asn', dataBindValue: 'parameters().router_asn', class: "span6", view: "FormInputView"},
                            {id: 'multi_tenancy', path: 'parameters.multi_tenancy', dataBindValue: 'parameters().multi_tenancy', class: "span6", view: "FormDropdownView", elementConfig: {data: smConstants.FLAGS}}
                        ]
                    },
                    {
                        elements: [
                            {id: 'haproxy', path: 'parameters.haproxy', dataBindValue: 'parameters().haproxy', class: "span6", view: "FormDropdownView", elementConfig: {data: smConstants.STATES}},
                            {id: 'use_certificates', path: 'parameters.use_certificates', dataBindValue: 'parameters().use_certificates', class: "span6", view: "FormDropdownView", elementConfig: {data: smConstants.FLAGS}}
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

    var provisionLayoutConfig = {
        prefixId: prefixId,
        groups: [
            {
                title: smLabels.TITLE_ROLES,
                rows: [
                    {
                        elements: [
                            {id: 'roles-configuration', path: 'id', class: "span12", view: "FormGridView"}
                        ]
                    }
                ]
            },
            {
                title: smLabels.TITLE_IMAGE + ' ' + smLabels.TITLE_CONFIGURATIONS,
                rows: [
                    {
                        elements: [
                            {id: 'base_image_id', path: 'base_image_id', class: "span6", view: "FormDropdownView", elementConfig: {
                                dataTextField: "id",
                                dataValueField: "id",
                                dataSource: {
                                    type: 'remote',
                                    url: smUtils.getObjectUrl(smConstants.CLUSTER_PREFIX_ID, smConstants.CLUSTER_PREFIX_ID)
                                }
                            }},
                            {id: 'package_image_id', path: 'package_image_id', class: "span6", view: "FormDropdownView", elementConfig: {
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

    return ClusterEditView;
});