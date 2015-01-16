/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

Handlebars.registerHelper('getSMLabel', function (labelKey) {
    return smwl.get(labelKey);
});

Handlebars.registerHelper('getJSONValueByPath', function (path, obj) {
    return cowu.getJSONValueByPath(path, obj);
});

Handlebars.registerHelper('IfValidJSONValueByPath', function (path, obj, index, options) {
    var result = (cowu.getJSONValueByPath(path, obj) != "-") ? true : false;
    if(result || index == 0) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper('filterServerByTagParams', function (queryKey, queryValue) {
    var queryParams = {'tag': {}};
    queryParams['tag'][queryKey] = queryValue;
    return JSON.stringify({p: 'setting_sm_servers', q: queryParams});
});

Handlebars.registerHelper('printJSON', function(jsonObject) {
    return JSON.stringify(jsonObject);
});


Handlebars.registerHelper('getKeyValue4Object', function(object, key) {
    return object[key];
});
