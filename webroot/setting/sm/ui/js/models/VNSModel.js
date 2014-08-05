/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'common/ui/js/models/ContrailModel'
], function (_, ContrailModel) {
    var VNSModel = ContrailModel.extend({
        saveConfig: function (form) {
            console.log(this.attributes);
            console.log(form);
        }
    });

    return VNSModel;
});
