/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    "underscore",
    "contrail-model",
    "sm-constants",
    "sm-labels",
    "sm-utils",
    "sm-model-config"
], function (_, ContrailModel, smwc, smwl, smwu, smwmc) {
    var DhcpHostModel = ContrailModel.extend({

        defaultConfig: smwmc.getDhcpHostModel(),

        deleteDhcpHost: function (checkedRow, callbackObj) {
            var ajaxConfig = {},
                hostFqdn = checkedRow.host_fqdn;

            ajaxConfig.type = "DELETE";
            ajaxConfig.url = smwc.URL_OBJ_DHCP_HOST_ID + hostFqdn;

            contrail.ajaxHandler(ajaxConfig, function () {
                if (contrail.checkIfFunction(callbackObj.init)) {
                    callbackObj.init();
                }
            }, function () {
                if (contrail.checkIfFunction(callbackObj.success)) {
                    callbackObj.success();
                }
            }, function (error) {
                console.log(error);
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(error);
                }
            });
        }
    });

    return DhcpHostModel;
});
