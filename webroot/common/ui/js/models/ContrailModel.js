/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'knockout',
    'knockback'
], function (_, Backbone, Knockout, Knockback) {
    var ContrailViewModel = Knockback.ViewModel.extend({

        constructor: function(modelConfig) {
            var model = new Backbone.Model(modelConfig);
            Knockback.ViewModel.prototype.constructor.call(this, model);
            return this;
        },

        getValueByPath: function(path) {
            var obj = this.model().attributes;
            path = path.replace(/\[(\w+)\]/g, '.$1');
            path = path.replace(/^\./, '');
            var pathArray = path.split('.');
            while (pathArray.length) {
                var property = pathArray.shift();
                if (obj != null && property in obj) {
                    obj = obj[property];
                } else {
                    return;
                }
            }
            return obj;
        }
    });

    return ContrailViewModel;
});