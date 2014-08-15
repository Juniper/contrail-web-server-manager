/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'common/ui/js/views/FormInputView'
], function(_, FormInputView) {
    var SMUtils = function() {
        var self = this;
        this.renderGrid = function(options) {
        	$(options.elementId).contrailGrid($.extend(true,{
                header: {
                    title:{
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
                            pageSize:50,
                            pageSizeSelect: [10,50,100]
                        }
                    }
                }
            },options.gridConfig));
        },
        this.renderJSONEditor = function(options) {
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
                        onclick: function() {
                            $("#" + modalId).modal('hide');
                            options['onSave']();
                        }
                    }
                ],
                onEnter: function() {
                    console.log("onEnter");
                    $("#" + modalId).modal('hide');
                }
            });
        },
        this.createModal = function(options) {
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
                        onclick: 'close'
                    },
                    {
                        className: 'btn-primary',
                        title: 'Save',
                        onclick: function() {
                            $("#" + modalId).modal('hide');
                            options['onSave']();
                        }
                    }
                ],
                onEnter: function() {
                    console.log("onEnter");
                    $("#" + modalId).modal('hide');
                }
            });
        },
        this.createColumns4Grid = function(fieldsObj) {
            var key, columns = [];
            for (key in fieldsObj) {
                columns.push({ id: key, field: key, name: self.getGridTitle4Field(key), width:150, minWidth: 15 });
            }
        }
        this.getGridTitle4Field = function(field) {
            var title = field;
            return title;
        },
        this.generateEditFormHTML = function(modalId, formModel, formConfig) {
            for (var k = 0; k < formConfig['groups'].length; k++) {
                var rows = formConfig['groups'][k]['rows'];
                for (var i = 0; i < rows.length; i++) {
                    var elements = rows[i]['elements'];
                    for (var j = 0; j < elements.length; j++) {
                        var elementId = elements[j]['id'],
                            path = elements[j]['path'],
                            el = $('#' + modalId).find('#' + elementId),
                            viewName = elements[j]['view'],
                            elementView;

                        switch(viewName) {
                            case "FormInputView":
                                var elementView = new FormInputView({el: el, attributes: {label: smLabels.get(elementId), id: elementId, name: elementId, value: formModel.getValueByPath(path)}});
                                elementView.render();
                                break;

                            default:
                                var elementView = new FormInputView({el: el, attributes: {label: smLabels.get(elementId), id: elementId, name: elementId, value: formModel.getValueByPath(path)}});
                                elementView.render();
                        }
                    }
                }
            }
        }
    }
    return SMUtils;
});
