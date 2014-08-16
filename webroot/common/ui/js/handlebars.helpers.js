/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

Handlebars.registerHelper('getSMLabel', function(labelKey){
    var keyArray = labelKey.split('.');
    return smLabels.get(keyArray[keyArray.length - 1]);
});