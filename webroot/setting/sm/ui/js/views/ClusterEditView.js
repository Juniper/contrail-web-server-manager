/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var prefixId = smConstants.CLUSTER_PREFIX_ID,
        modalId = 'configure-' + prefixId,
        editTemplate = contrail.getTemplate4Id("sm-edit-layout-template");

    var ClusterEditView = Backbone.View.extend({
        renderConfigure: function (options) {
            var editLayout = editTemplate(configureLayoutConfig),
                that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                var clusterForm = $('#' + modalId).find('#sm-cluster-edit-form').serializeObject();
                that.model.saveConfig(clusterForm);
            }});

            smUtils.generateEditFormHTML(modalId, this.model, configureLayoutConfig);

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
                            {id: 'id', path: 'parameters.id', class: "span6", view: "FormInputView"},
                            {id: 'email', path: 'parameters.email', class: "span6", view: "FormInputView"}
                        ]
                    },
                    {
                        elements: [
                            {id: 'domain', path: 'parameters.domain', class: "span6", view: "FormInputView"},
                            {id: 'keystone_tenant', path: 'parameters.keystone_tenant', class: "span6", view: "FormInputView"}
                        ]
                    },
                    {
                        elements: [
                            {id: 'gateway', path: 'parameters.gateway', class: "span6", view: "FormInputView"},
                            {id: 'subnet_mask', path: 'parameters.subnet_mask', class: "span6", view: "FormInputView"}
                        ]
                    },
                    {
                        elements: [
                            {id: 'openstack_mgmt_ip', path: 'parameters.openstack_mgmt_ip', class: "span6", view: "FormInputView"},
                            {id: 'openstack_passwd', path: 'parameters.openstack_passwd', class: "span6", view: "FormInputView"}
                        ]
                    }
                ]
            },
            {
                title: smLabels.TITLE_CONFIGURATIONS,
                rows: [
                    {
                        elements: [
                            {id: 'analytics_data_ttl', path: 'parameters.analytics_data_ttl', class: "span6", view: "FormInputView"},
                            {id: 'ext_bgp', path: 'parameters.ext_bgp', class: "span6", view: "FormInputView"}
                        ]
                    },
                    {
                        elements: [
                            {id: 'router_asn', path: 'parameters.router_asn', class: "span6", view: "FormInputView"},
                            {id: 'multi_tenancy', path: 'parameters.multi_tenancy', class: "span6", view: "FormInputView"}
                        ]
                    },
                    {
                        elements: [
                            {id: 'haproxy', path: 'parameters.haproxy', class: "span6", view: "FormInputView"},
                            {id: 'use_certificates', path: 'parameters.use_certificates', class: "span6", view: "FormInputView"}
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

    var provisionLayoutConfig = {
        prefixId: prefixId,
        groups: [
            {
                title: "Roles",
                rows: [
                    {
                        elements: [
                            {id: 'roles-configuration', path: 'id', class: "span12", view: "FormGridView"}
                        ]
                    }
                ]
            },
            {
                title: "Image Configurations",
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

    return ClusterEditView;
});