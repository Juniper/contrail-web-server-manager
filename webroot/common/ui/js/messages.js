/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function (_) {
    var Messages = function () {
        this.getInvalidErrorMessage = function(fieldKey) {
            return "Please enter a valid " + smLabels.getInLowerCase(fieldKey) + '.';
        };

    };
    return Messages;
});