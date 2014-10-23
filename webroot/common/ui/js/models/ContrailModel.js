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
                editingLockAttrs, _this = this,
                modelAttributes = (modelConfig == null) ? this.defaultConfig : modelConfig;

            errorAttributes = generateAttributes(modelAttributes, smConstants.ERROR_SUFFIX_ID, false);
            editingLockAttrs = generateAttributes(modelAttributes, smConstants.LOCKED_SUFFIX_ID, true);

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

        initLockAttr: function (attributePath, lockFlag) {
            var attribute = getAttributeFromPath(attributePath),
                locks = this.model().get("locks"),
                errors = this.model().get("errors"),
                lockObj = {}, attrErrorObj = {};

            lockObj[attribute + smConstants.LOCKED_SUFFIX_ID] = lockFlag;
            locks.set(lockObj);

            attrErrorObj[attribute + smConstants.ERROR_SUFFIX_ID] = false
            errors.set(attrErrorObj);
        },

        toggleLockAttr: function(attributePath) {
            var attribute = getAttributeFromPath(attributePath),
                locks = this.model().get("locks"),
                lockedStatus = locks.attributes[attribute + smConstants.LOCKED_SUFFIX_ID],
                lockObj = {};

            lockObj[attribute + smConstants.LOCKED_SUFFIX_ID] = !lockedStatus;
            locks.set(lockObj);
        },

        showErrorAttr: function(attributePath, msg) {
            var attribute = getAttributeFromPath(attributePath),
                errors = this.model().get("errors"),
                errorObj = {};

            errorObj[attribute + smConstants.ERROR_SUFFIX_ID] = msg;
            errors.set(errorObj);
        },

        getLockCSS: function(attributePath) {
            var attribute = getAttributeFromPath(attributePath),
                locks = this.model().get("locks"),
                lockedStatus = locks.attributes[attribute + smConstants.LOCKED_SUFFIX_ID];

            return (lockedStatus) ? 'icon-muted' : '';
        },

       checkIfInputDisabled: function(disabledFlag, lockFlag) {
            return disabledFlag || lockFlag;
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