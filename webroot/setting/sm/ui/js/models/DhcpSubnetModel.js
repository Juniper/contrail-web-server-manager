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
    var DhcpSubnetModel = ContrailModel.extend({

        defaultConfig: smwmc.getDhcpSubnetModel(),

        deleteDhcpSubnet: function (checkedRow, callbackObj) {
            var ajaxConfig = {},
                subnetAddress = checkedRow.subnet_address;

            ajaxConfig.type = "DELETE";
            ajaxConfig.url = smwc.URL_OBJ_DHCP_SUBNET_ID + subnetAddress;

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

    return DhcpSubnetModel;
});
