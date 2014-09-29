/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'common/ui/js/models/ContrailModel'
], function (_, ContrailModel) {
    var PackageModel = ContrailModel.extend({
        defaultConfig: {
            'version': null,
            'path': null,
            'type': null,
            'parameters': {}
        },
        configure: function (modalId) {
            if (this.model().isValid(true)) {
                // TODO: Check for form-level validation if required
                if (true) {
                    console.log(this.model().attributes);
                    $("#" + modalId).modal('hide');
                } else {
                    // TODO: Show form-level error message if any
                }
            }
        }
    });

    return PackageModel;
});
