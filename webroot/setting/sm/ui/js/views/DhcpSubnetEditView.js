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
    var prefixId = smwc.DHCP_SUBNET_PREFIX_ID,
        modalId = "configure-" + prefixId;

    var DhcpSubnetEditView = ContrailView.extend({

        renderDeleteDhcpSubnet: function (options) {
            var textTemplate = contrail.getTemplate4Id(smwc.TMPL_DELETE_DHCP_SUBNET),
                elId = "deleteDhcpSubnet",
                self = this,
                checkedRows = options.checkedRows,
                subnetAddressToBeDeleted = {"subnetAddress": [], "elementId": elId};

            subnetAddressToBeDeleted.subnetAddress.push(checkedRows.subnet_address);

            cowu.createModal({"modalId": modalId, "className": "modal-700", "title": options.title, "btnName": "Confirm", "body": textTemplate(subnetAddressToBeDeleted), "onSave": function () {
                self.model.deleteDhcpSubnet(options.checkedRows,{
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

    return DhcpSubnetEditView;
});
