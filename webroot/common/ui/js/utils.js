/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'common/ui/js/views/FormInputView',
    'common/ui/js/views/FormGridView',
    'common/ui/js/views/FormMultiselectView',
    'common/ui/js/views/FormDropdownView',
    'common/ui/js/views/AccordianView',
    'common/ui/js/views/SectionView',
    'common/ui/js/views/WizardView'
], function (_, FormInputView, FormGridView, FormMultiselectView, FormDropdownView, AccordianView, SectionView, WizardView) {
    var Utils = function () {
        var self = this;
        this.renderGrid = function (elementId, gridConfig) {
            $(elementId).contrailGrid($.extend(true, {
                header: {
                    title: {
                        cssClass: 'blue',
                        iconCssClass: 'blue'
                    },
                    defaultControls: {
                        refreshable: false,
                        collapseable: false
                    }
                },
                columnHeader: {
                },
                body: {
                    options: {
                        autoRefresh: 600,
                        forceFitColumns: true,
                        checkboxSelectable: true,
                        detail: {
                            template: '<pre>{{{formatJSON2HTML this}}}</pre>'
                        }
                    },
                    dataSource: {
                        remote: {
                            ajaxConfig: {
                            },
                            serverSidePagination: false
                        }
                    }
                }
            }, gridConfig));
        };
        this.renderJSONEditor = function (options) {
            var modalId = 'configure-' + options['prefixId'];
            $.contrailBootstrapModal({
                id: modalId,
                className: options['className'],
                title: options['title'],
                body: '<div id="' + options['prefixId'] + '-pane-container"><pre>' + JSON.stringify(options['model'].attributes, null, " ") + '</pre></div>',
                footer: [
                    {
                        id: 'cancelBtn',
                        title: 'Cancel',
                        onclick: 'close'
                    },
                    {
                        className: 'btn-primary',
                        title: 'Save',
                        onclick: function () {
                            $("#" + modalId).modal('hide');
                            options['onSave']();
                        }
                    }
                ],
                onEnter: function () {
                    console.log("onEnter");
                    $("#" + modalId).modal('hide');
                }
            });
        };
        this.createModal = function (options) {
            var modalId = options['modalId'];
            $.contrailBootstrapModal({
                id: modalId,
                className: options['className'],
                title: options['title'],
                body: options['body'],
                footer: [
                    {
                        id: 'cancelBtn',
                        title: 'Cancel',
                        onclick: function () {
                            options['onCancel']();
                        }
                    },
                    {
                        className: 'btn-primary',
                        title: 'Save',
                        onclick: function () {
                            options['onSave']();
                        }
                    }
                ],
                onEnter: function () {
                    options['onCancel']();
                }
            });
        };

        this.createWizardModal = function (options) {
            var modalId = options['modalId'];
            $.contrailBootstrapModal({
                id: modalId,
                className: options['className'],
                title: options['title'],
                body: options['body'],
                footer: false,
                onEnter: function () {
                    options['onCancel']();
                }
            });
        };

        this.createColumns4Grid = function (fieldsObj) {
            var key, columns = [];
            for (key in fieldsObj) {
                columns.push({ id: key, field: key, name: self.getGridTitle4Field(key), width: 150, minWidth: 15 });
            }
        };
        this.getGridTitle4Field = function (field) {
            var title = field;
            return title;
        };
        this.getJSONValueByPath = function (jsonPath, jsonObj) {
            var path = jsonPath.replace(/\[(\w+)\]/g, '.$1');
            path = path.replace(/^\./, '');

            var pathArray = path.split('.'),
                obj = jsonObj;

            while (pathArray.length) {
                var property = pathArray.shift();
                if (obj != null && property in obj) {
                    obj = obj[property];
                } else {
                    return '-';
                }
            }

            if (contrail.checkIfExist(obj)) {
                obj = obj.toString().trim();
                if (obj !== '' || obj === 0) {
                    return obj;
                }
            }

            return '-';
        };

        this.getObjectDetailUrl = function (objectName, postProcessor) {
            var url = '/sm/objects/details/' + objectName;
            url += (postProcessor != null) ? ("?postProcessor=" + postProcessor) : '';
            return url;
        };

        this.getObjectUrl = function (objectName) {
            return '/sm/objects/' + objectName;
        };

        this.getTagsUrl = function (qs) {
            var url = '/sm/tags/values/';
            url += (qs != null) ? qs : '';
            return url;
        };

        this.getTagValueUrl = function (value) {
            return '/sm/tags/values/' + value;
        };

        this.formatElementId = function (strArray) {
            var elId = '',
                str = strArray.join('_');
            elId = str.split(" ").join("_");
            return elId.toLowerCase();

        };

        this.flattenObject = function (object, intoObject, prefix) {
            var self = this;
            intoObject = intoObject || {};
            prefix = prefix || '';

            _.each(object, function (value, key) {
                if (object.hasOwnProperty(key)) {
                    if (value && typeof value === 'object' && !(value instanceof Array || value instanceof Date || value instanceof RegExp || value instanceof Backbone.Model || value instanceof Backbone.Collection)) {
                        self.flattenObject(value, intoObject, prefix + key + '.');
                    } else {
                        intoObject[prefix + key] = value;
                    }
                }
            });

            return intoObject;
        };

        this.getEditConfigObj = function (configObj, locks){
            var lock = null,
                testobj = $.extend(true, {}, configObj);

            delete testobj.errors;
            delete testobj.locks;

            $.each(testobj, function (attribute, value) {
                if (_.isArray(value)) {
                    if (contrail.checkIfExist(locks[attribute + '_locked'])) {
                        lock = locks[attribute + '_locked'];
                        if (lock === true) {
                            delete testobj[attribute];
                        }
                    } else {
                        delete testobj[attribute];
                    }
                }
                // check if value is a key or object
                // if object make a recursive call on value
                else if (_.isObject(value)) {
                    testobj[attribute] = smUtils.getEditConfigObj(value, locks);
                    if ($.isEmptyObject(testobj[attribute])) {
                        delete testobj[attribute];
                    }
                }
                // if we reach here :- then value is a key
                // now we check if the value is locked
                // we check it from the 'locks'
                else {
                    if (contrail.checkIfExist(locks[attribute + '_locked'])) {
                        lock = locks[attribute + '_locked'];
                        if (lock === true) {
                            delete testobj[attribute];
                        }
                    } else {
                        delete testobj[attribute];
                    }
                }
            });
            return testobj;
        };

        this.renderView4Config = function (parentElement, model, viewObj, validation, lockEditingByDefault) {
            var viewName = viewObj['view'],
                elementId = viewObj['elementId'],
                validation = (validation != null) ? validation : 'validation',
                viewAttributes = {viewConfig: viewObj['viewConfig'], elementId: elementId, validation: validation, lockEditingByDefault: lockEditingByDefault},
                elementView;

            switch (viewName) {
                case "AccordianView":
                    elementView = new AccordianView({el: parentElement, model: model, attributes: viewAttributes});
                    elementView.render();
                    break;

                case "SectionView":
                    elementView = new SectionView({el: parentElement, model: model, attributes: viewAttributes});
                    elementView.render();
                    break;

                case "FormDropdownView":
                    elementView = new FormDropdownView({el: parentElement, model: model, attributes: viewAttributes});
                    elementView.render();
                    break;

                case "FormInputView":
                    elementView = new FormInputView({el: parentElement, model: model, attributes: viewAttributes});
                    elementView.render();
                    break;

                case "FormMultiselectView":
                    elementView = new FormMultiselectView({el: parentElement, model: model, attributes: viewAttributes});
                    elementView.render();
                    break;

                case "FormGridView":
                    elementView = new FormGridView({el: parentElement, model: model, attributes: viewAttributes});
                    elementView.render();
                    break;

                case "WizardView":
                    elementView = new WizardView({el: parentElement, model: model, attributes: viewAttributes});
                    elementView.render();
                    break;

            }
        };
    };
    return Utils;
});
