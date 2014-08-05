/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    var VNSEditView = Backbone.View.extend({

        render: function () {
            var prefixId = smConstants.VNS_PREFIX_ID,
                modalId = 'configure-' + prefixId,
                editTemplate = contrail.getTemplate4Id("sm-edit-layout-template"),
                editLayout = editTemplate(editLayoutConfig);

            var that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-700', 'title': "Configure VNS", 'body': editLayout, 'onSave': function () {
                var vnsForm = $('#' + modalId).find('#sm-vns-edit-form').serializeObject();
                that.model.saveConfig(vnsForm);
            }});

            smUtils.generateEditFormHTML(modalId, this.model, editLayoutConfig)

            $('#sm-vns-accordion').accordion({
                heightStyle: "content"
            });
        }
    });

    var editLayoutConfig = {
        prefixId: 'vns',
        groups: [
            {
                title: "Contrail",
                rows: [
                    {
                        elements: [
                            {id: 'analytics_data_ttl', path: 'vns_params.analytics_data_ttl', class: "span6", view: "FormInputView"},
                            {id: 'ext_bgp', path: 'vns_params.ext_bgp', class: "span6", view: "FormInputView"}
                        ]
                    },
                ]
            },
            {
                title: "Openstack",
                rows: [
                    {
                        elements: [
                            {id: 'domain', path: 'vns_params.domain', class: "span6", view: "FormInputView"},
                            {id: 'gway', path: 'vns_params.gway', class: "span6", view: "FormInputView"}
                        ]
                    },
                    {
                        elements: [
                            {id: 'openstack_mgmt_ip', path: 'vns_params.openstack_mgmt_ip', class: "span6", view: "FormInputView"},
                            {id: 'openstack_passwd', path: 'vns_params.openstack_passwd', class: "span6", view: "FormInputView"}
                        ]
                    },
                    {
                        elements: [
                            {id: 'compute_non_mgmt_ip', path: 'vns_params.compute_non_mgmt_ip', class: "span6", view: "FormInputView"},
                            {id: 'compute_non_mgmt_gway', path: 'vns_params.compute_non_mgmt_gway', class: "span6", view: "FormInputView"}
                        ]
                    }
                ]
            }
        ]
    };

    return VNSEditView;
});