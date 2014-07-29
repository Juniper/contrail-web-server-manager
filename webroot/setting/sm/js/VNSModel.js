/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var VNSModel = Backbone.Model.extend({
        saveConfig: function () {
            console.log(this.attributes);
        }
    });

    return VNSModel;
});
