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

        constructor: function (modelConfig) {
            var model, errorAttributes, _this = this;

            errorAttributes = getErrorAttributes(modelConfig);
            modelConfig = _.extend({}, this.defaultConfig, modelConfig, errorAttributes);

            model = new Backbone.Model(modelConfig);
            model = _.extend(model, this.validations);

            Knockback.ViewModel.prototype.constructor.call(this, model);

            delete this.validations;
            return this;
        },

        getValueByPath: function (path) {
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
        },

        validateAttr: function (attributePath, validation) {
            var attrObj = getAttributeFromPath(attributePath),
                attrError = attrObj['attr_error'],
                attr = attrObj['attr'],
                attrErrorObj = {}, isValid;
            isValid = this.model().isValid(attributePath, validation);
            attrErrorObj[attrError] = isValid == true ? false : isValid;
            this.model().set(attrErrorObj);
        }
    });

    var getErrorAttributes = function (attributes) {
        var flattenAttributes = smUtils.flattenObject(attributes),
            errorAttributes = {};

        _.each(flattenAttributes, function (value, key) {
            var keyArray = key.split('.');
            errorAttributes[keyArray[keyArray.length - 1] + "_error"] = false;
        });

        return errorAttributes;
    };

    var getAttributeFromPath = function (attributePath) {
        var attributePathArray = attributePath.split('.'),
            attribute = attributePathArray[attributePathArray.length - 1];
        return {
            'attr': attribute,
            'attr_error': attribute + '_error'
        };
    };

    return ContrailViewModel;
});