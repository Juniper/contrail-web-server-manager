/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    "sm-labels"
], function (smwl) {
    var Messages = {
        getInvalidErrorMessage : function(fieldKey) {
            return "Please enter a valid " + smwl.getInLowerCase(fieldKey) + ".";
        },
        getShortInvalidErrorMessage : function(fieldKey) {
            return "Invalid " + smwl.getInLowerCase(fieldKey) + ".";
        },
        getRequiredMessage : function(fieldKey) {
            return smwl.getFirstCharUpperCase(fieldKey) + " is required.";
        },
        getResolveErrorsMessage : function(fieldKey) {
            return "Please resolve all " + fieldKey + " errors.";
        },
        NO_SERVERS_2_SELECT : "No servers to select.",
        NO_SERVERS_SELECTED : "No servers selected.",
        NO_TAGS_FOUND : "No tags found.",
        NO_TAGS_CONFIGURED : "No tags configured.",
        SHOULD_BE_VALID : "{0} should have valid ",

        get : function () {
            var args = arguments;
            return args[0].replace(/\{(\d+)\}/g, function (m, n) {
                n = parseInt(n) + 1;
                return args[n];
            });
        }
    };
    return Messages;
});
