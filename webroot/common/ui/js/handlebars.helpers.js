/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

Handlebars.registerHelper('getSMLabel', function (labelKey) {
    return smLabels.get(labelKey);
});

Handlebars.registerHelper('getJSONValueByPath', function (path, obj) {
    return smUtils.getJSONValueByPath(path, obj);
});

Handlebars.registerHelper('filterServerByTagParams', function (queryKey, queryValue) {
    var queryParams = {'tag': {}};
    queryParams['tag'][queryKey] = queryValue;
    return JSON.stringify({p: 'setting_sm_servers', q: queryParams});
});

Handlebars.registerHelper('printJSON', function(jsonObject) {
    return JSON.stringify(jsonObject);
});

