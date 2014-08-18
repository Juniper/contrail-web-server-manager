/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    var ServerEditView = Backbone.View.extend({

        render: function (options) {
            var prefixId = smConstants.SERVER_PREFIX_ID,
                modalId = 'configure-' + prefixId,
                editTemplate = contrail.getTemplate4Id("sm-edit-layout-template"),
                editLayout = editTemplate(editLayoutConfig);

            var that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                var serverForm = $('#' + modalId).find('#sm-server-edit-form').serializeObject();
                that.model.saveConfig(serverForm);
            }});

            smUtils.generateEditFormHTML(modalId, this.model, editLayoutConfig)

            $('#sm-server-accordion').accordion({
                heightStyle: "content"
            });
        }
    });

    var editLayoutConfig = {
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
                            {id: 'ifname', path:'parameters.ifname', class: "span6", view: "FormInputView"}
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
                rows: [
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

  return ServerEditView;
});