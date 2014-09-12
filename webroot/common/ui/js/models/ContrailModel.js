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
            var model, errorAttributes,
                editingLockAttrs, _this = this;

            errorAttributes = generateAttributes(modelConfig, smConstants.ERROR_SUFFIX_ID, false);
            editingLockAttrs = generateAttributes(modelConfig, smConstants.LOCKED_SUFFIX_ID, true);
            modelConfig = $.extend(true, {}, this.defaultConfig, modelConfig, {errors: new Backbone.Model(errorAttributes), locks: new Backbone.Model(editingLockAttrs)});

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
            var attr = getAttributeFromPath(attributePath),
                errors = this.model().get("errors"),
                attrErrorObj = {}, isValid;

            isValid = this.model().isValid(attributePath, validation);
            attrErrorObj[attr + smConstants.ERROR_SUFFIX_ID] = (isValid == true) ? false : isValid;
            errors.set(attrErrorObj);
        },

        unlockAttr4Editing: function (attributePath) {
            var attribute = getAttributeFromPath(attributePath),
                locks = this.model().get("locks"),
                lockObj = {};

            lockObj[attribute + smConstants.LOCKED_SUFFIX_ID] = false;
            console.log(lockObj);
            locks.set(lockObj);
        }
    });

    var generateAttributes = function (attributes, suffix, defaultValue) {
        var flattenAttributes = smUtils.flattenObject(attributes),
            errorAttributes = {};

        _.each(flattenAttributes, function (value, key) {
            var keyArray = key.split('.');
            errorAttributes[keyArray[keyArray.length - 1] + suffix] = defaultValue;
        });

        return errorAttributes;
    };

    var getAttributeFromPath = function (attributePath) {
        var attributePathArray = attributePath.split('.'),
            attribute = attributePathArray[attributePathArray.length - 1];

        return attribute;
    };

    return ContrailViewModel;
});