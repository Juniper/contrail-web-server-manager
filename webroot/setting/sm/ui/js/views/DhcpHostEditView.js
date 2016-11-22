/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    "underscore",
    "contrail-view",
    "knockback",
    "sm-constants",
    "sm-labels"
], function (_, ContrailView, Knockback, smwc, smwl) {
    var prefixId = smwc.DHCP_HOST_PREFIX_ID,
        modalId = "configure-" + prefixId;

    var DhcpHostEditView = ContrailView.extend({

        renderDeleteDhcpHost: function (options) {
            var textTemplate = contrail.getTemplate4Id(smwc.TMPL_DELETE_DHCP_HOST),
                elId = "deleteDhcpHost",
                self = this,
                checkedRows = options.checkedRows,
                hostFqdnToBeDeleted = {"hostFqdn": [], "elementId": elId};

            hostFqdnToBeDeleted.hostFqdn.push(checkedRows.host_fqdn);

            cowu.createModal({"modalId": modalId, "className": "modal-700", "title": options.title, "btnName": "Confirm", "body": textTemplate(hostFqdnToBeDeleted), "onSave": function () {
                self.model.deleteDhcpHost(options.checkedRows,{
                    init: function () {
                        self.model.showErrorAttr(elId, false);
                        cowu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options.callback();
                        $("#" + modalId).modal("hide");
                    },
                    error: function (error) {
                        cowu.disableModalLoading(modalId, function () {
                            self.model.showErrorAttr(elId, error.responseText);
                        });
                    }
                });
            }, "onCancel": function () {
                $("#" + modalId).modal("hide");
            }});

            this.model.showErrorAttr(elId, false);
            Knockback.applyBindings(this.model, document.getElementById(modalId));
            kbValidation.bind(this);
        }
    });

    return DhcpHostEditView;
});
