/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    var ClusterEditView = Backbone.View.extend({

        render: function (options) {
            var prefixId = smConstants.CLUSTER_PREFIX_ID,
                modalId = 'configure-' + prefixId,
                editTemplate = contrail.getTemplate4Id("sm-edit-layout-template"),
                editLayout = editTemplate(editLayoutConfig);

            var that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                var vnsForm = $('#' + modalId).find('#sm-cluster-edit-form').serializeObject();
                that.model.saveConfig(vnsForm);
            }});

            smUtils.generateEditFormHTML(modalId, this.model, editLayoutConfig);

            $('#sm-cluster-accordion').accordion({
                heightStyle: "content"
            });
        }
    });

    var editLayoutConfig = {
        prefixId: 'cluster',
        groups: [
            {
                title: "Details",
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
                title: "Configurations",
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

    return ClusterEditView;
});