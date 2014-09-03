/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'common/ui/js/views/FormInputView',
    'common/ui/js/views/FormGridView',
    'common/ui/js/views/FormMultiselectView',
    'common/ui/js/views/FormDropdownView'
], function (_, FormInputView, FormGridView, FormMultiselectView, FormDropdownView) {
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
                },
                footer: {
                    pager: {
                        options: {
                            pageSize: 50,
                            pageSizeSelect: [10, 50, 100]
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
        this.generateEditFormHTML = function (modalId, formModel, formConfig) {
            for (var k = 0; k < formConfig['groups'].length; k++) {
                var rows = formConfig['groups'][k]['rows'];
                for (var i = 0; i < rows.length; i++) {
                    var elements = rows[i]['elements'];
                    for (var j = 0; j < elements.length; j++) {
                        var elementId = elements[j]['id'],
                            path = elements[j]['path'],
                            dataBindValue = elements[j]['dataBindValue'],
                            el = $('#' + modalId).find('#' + elementId),
                            viewName = elements[j]['view'],
                            elementValue = (formModel != null) ? formModel.getValueByPath(path) : '',
                            labelValue = (elementId != null) ? smLabels.get(elementId) : smLabels.get(path),
                            elementConfig = elements[j]['elementConfig'],
                            validation = formConfig['validation'] ? formConfig['validation']: 'validation',
                            elementView;

                        switch (viewName) {
                            case "FormDropdownView":
                                elementView = new FormDropdownView({el: el, attributes: {label: labelValue, id: elementId, name: elementId, dataBindValue: dataBindValue, class: "span12", elementConfig: elementConfig}});
                                elementView.render();
                                break;
                            case "FormMultiselectView":
                                elementView = new FormMultiselectView({el: el, attributes: {label: labelValue, id: elementId, name: elementId, value: elementValue, class: "span12", elementConfig: elementConfig}});
                                elementView.render();
                                break;
                            case "FormInputView":
                                elementView = new FormInputView({el: el, attributes: {label: labelValue, id: elementId, name: elementId, dataBindValue: dataBindValue, class: "span12", path: path, validation: validation}});
                                elementView.render();
                                break;

                            case "FormGridView":
                                elementView = new FormGridView({el: el, attributes: {class: "span12", clusterId: elementValue}});
                                elementView.render();
                                break;

                            default:
                                elementView = new FormInputView({el: el, attributes: {label: labelValue, id: elementId, name: elementId, value: elementValue, class: "span12"}});
                                elementView.render();
                        }
                    }
                }
            }
        };
        this.getJSONValueByPath = function (path, obj) {
            path = path.replace(/\[(\w+)\]/g, '.$1');
            path = path.replace(/^\./, '');
            var pathArray = path.split('.');
            while (pathArray.length) {
                var property = pathArray.shift();
                if (obj != null && property in obj) {
                    obj = obj[property];
                } else {
                    return '-';
                }
            }
            if (contrail.checkIfExist(obj) && obj != '') {
                return obj;
            } else {
                return '-';
            }
        };

        this.getObjectDetailUrl = function (objectName, objectField) {
            return '/sm/objects/details/' + objectName + '?field=' + objectField;
        };

        this.getObjectUrl = function (objectName, objectField) {
            return '/sm/objects/' + objectName + '?field=' + objectField;
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
    };
    return Utils;
});
