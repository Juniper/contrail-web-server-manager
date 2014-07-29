/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function(_, Backbone, ClustersModel) {
    var SMUtils = function() {
        var self = this;
        this.renderGrid = function(options) {
            $(options.elementId).contrailGrid({
                header: {
                    title:{
                        text: options.titleText,
                        cssClass: 'blue',
                        iconCssClass: 'blue'
                    },
                    customControls: options['customControls'],
                    defaultControls: {
                        refreshable: false
                    }
                },
                columnHeader: {
                    columns: options.columns
                },
                body: {
                    options: {
                        autoRefresh: 600,
                        forceFitColumns: true,
                        checkboxSelectable: {
                            onNothingChecked: function(e){
                            },
                            onSomethingChecked: function(e){
                            }
                        },
                        actionCell:options['actions'],
                        detail: {
                            template: '<pre>{{{formatJSON2HTML this}}}</pre>'
                        }
                    },
                    dataSource: {
                        remote: {
                            ajaxConfig: {
                                url: options.url
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
            });
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
        this.createColumns4Grid = function(fieldsObj) {
            var key, columns = [];
            for (key in fieldsObj) {
                columns.push({ id: key, field: key, name: self.getGridTitle4Field(key), width:150, minWidth: 15 });
            }
        }
        this.getGridTitle4Field = function(field) {
            var title = field;
            return title;
        }
    }
    return SMUtils;
});
