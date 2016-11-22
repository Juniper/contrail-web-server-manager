/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */
define([
    "handlebars",
    "sm-labels"
], function (Handlebars, smwl) {
    Handlebars.registerHelper("getSMLabel", function (labelKey) {
        return smwl.get(labelKey);
    });

    Handlebars.registerHelper("filterServerByTagParams", function (queryKey, queryValue) {
        var queryParams = {"tag": {}};
        queryParams.tag[queryKey] = queryValue;
        return JSON.stringify({p: "setting_sm_servers", q: queryParams});
    });

    Handlebars.registerHelper("printJSON", function(jsonObject) {
        return JSON.stringify(jsonObject);
    });


    Handlebars.registerHelper("getKeyValue4Object", function(object, key) {
        return object[key];
    });
});
