/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'common/ui/js/models/ContrailModel'
], function (_, ContrailModel) {
    var ServerModel = ContrailModel.extend({
        saveConfig: function (form) {
            console.log(this.model().attributes);
            console.log(form);
        }
    });

    return ServerModel;
});
