/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'common/ui/js/models/ContrailModel'
], function (_, ContrailModel) {
    var ImageModel = ContrailModel.extend({
        saveConfig: function () {
            console.log(this.attributes);
        }
    });

    return ImageModel;
});
