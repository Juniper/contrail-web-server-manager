/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    var RepoEditView = Backbone.View.extend({

        render: function (options) {
            var prefixId = smConstants.REPO_PREFIX_ID,
                modalId = 'configure-' + prefixId,
                editTemplate = contrail.getTemplate4Id("sm-edit-layout-template"),
                editLayout = editTemplate(editLayoutConfig);

            var that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                var repoForm = $('#' + modalId).find('#sm-repo-edit-form').serializeObject();
                that.model.saveConfig(repoForm);
            }});

            smUtils.generateEditFormHTML(modalId, this.model, editLayoutConfig);

            $('#sm-repo-accordion').accordion({
                heightStyle: "content"
            });
        }
    });

    var editLayoutConfig = {
        prefixId: smConstants.REPO_PREFIX_ID,
        groups: [
            {
                title: "Details",
                rows: [
                    {
                        elements: [
                            {id: 'type', path: "type", class: "span6", view: "FormInputView"},
                            {id: 'version', path: 'version', class: "span6", view: "FormInputView"}
                        ]
                    },
                    {
                        elements: [
                            {id: 'path', path: "path", class: "span12", view: "FormInputView"}
                        ]
                    }
                ]
            }
        ]
    };

    return RepoEditView;
});