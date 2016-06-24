/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function (_) {
    var Messages = function () {
        this.getInvalidErrorMessage = function(fieldKey) {
            return "Please enter a valid " + smwl.getInLowerCase(fieldKey) + '.';
        };
        this.getShortInvalidErrorMessage = function(fieldKey) {
            return "Invalid " + smwl.getInLowerCase(fieldKey) + '.';
        };
        this.getRequiredMessage = function(fieldKey) {
            return smwl.getFirstCharUpperCase(fieldKey) + ' is required.';
        };
        this.getResolveErrorsMessage = function(fieldKey) {
            return "Please resolve all " + fieldKey + " errors.";
        };
        this.NO_SERVERS_2_SELECT = 'No servers to select.';
        this.NO_SERVERS_SELECTED = 'No servers selected.';
        this.NO_TAGS_FOUND = 'No tags found.';
        this.NO_TAGS_CONFIGURED = 'No tags configured.';
        this.SHOULD_BE_VALID = '{0} should have valid ';

        this.get = function () {
            var args = arguments;
            return args[0].replace(/\{(\d+)\}/g, function (m, n) {
                n = parseInt(n) + 1;
                return args[n];
            });
        };
    };
    return Messages;
});