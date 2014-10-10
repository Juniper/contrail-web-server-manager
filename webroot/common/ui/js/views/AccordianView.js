/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'knockout'
], function (_, Backbone, Knockout) {
    var AccordianView = Backbone.View.extend({
        render: function () {
            var accordianTempl = contrail.getTemplate4Id("sm-accordian-view-template"),
                viewConfig = this.attributes.viewConfig,
                elId = this.attributes.elementId,
                validation = this.attributes.validation,
                lockEditingByDefault = this.attributes.lockEditingByDefault,
                errorObj = this.model.model().get("errors"),
                childViewObj, childElId, childElIdArray;

            this.$el.html(accordianTempl({viewConfig: viewConfig, elementId: elId}));

            for (var i = 0; i < viewConfig.length; i++) {
                childViewObj = viewConfig[i];
                childElId = childViewObj['elementId'];
                errorObj['attributes'][childElId + '_error'] = getKOComputedError(viewConfig[i], this);
                smUtils.renderView4Config(this.$el.find("#" + childElId), this.model, childViewObj, validation, lockEditingByDefault);
            }

            this.model.showErrorAttr(elId, false);

            this.$el.find("#" + elId).accordion({
                heightStyle: "content",
                collapsible: true
            });
        }
    });

    var getKOComputedError = function (childViewObj, that) {
        var childElIdArray = getElementIds4Section(childViewObj['viewConfig']),
            koComputedFunc = Knockout.computed(function () {
                var value = false;
                for(var i = 0; i < childElIdArray.length; i ++) {
                    var item = childElIdArray[i],
                        errorName = item + '_error';
                    if(item != null && this.model.errors()[errorName] != null) {
                        var idError = this.model.errors()[errorName]();

                        if (idError) {
                            value = true;
                        }
                    }
                };
                return value;
            }, that);

        return koComputedFunc;
    };

    var getElementIds4Section = function (sectionConfig) {
        var rows = sectionConfig['rows'],
            columns, elementIds = [];
        for (var i = 0; i < rows.length; i++) {
            columns = rows[i]['columns'];
            for (var j = 0; j < columns.length; j++) {
                elementIds.push(columns[j]['elementId']);
            }
        }
        return elementIds;
    };

    return AccordianView;
});