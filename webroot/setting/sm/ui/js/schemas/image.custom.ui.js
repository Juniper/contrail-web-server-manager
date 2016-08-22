/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([], function () {

    const customImagesSchema = {
        "properties": {
            "type": {
                "view" : "FormDropdownView",
                "elementConfig" : {
                    "placeholder" : smwl.SELECT_TYPE,
                    "data" : smwc.IMAGE_TYPES
                }
            }
        }
    };
    return customImagesSchema;
});
