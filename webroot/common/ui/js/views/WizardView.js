/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var WizardView = Backbone.View.extend({
        render: function () {
            var wizardTempl = contrail.getTemplate4Id("sm-wizard-view-template"),
                viewConfig = this.attributes.viewConfig,
                elId = this.attributes.elementId,
                validation = this.attributes.validation,
                lockEditingByDefault = this.attributes.lockEditingByDefault,
                self = this,
                childViewObj, childElId, steps;

            this.$el.html(wizardTempl({viewConfig: viewConfig, elementId: elId}));
            steps = viewConfig['steps'];

            this.$el.find("#" + elId).contrailWizard({
                headerTag: "h2",
                bodyTag: "section",
                transitionEffect: "slideLeft",
                titleTemplate: '<span class="number">#index#</span><span class="title"> #title#</span>',
                steps: steps,
                onInit: function (event, currentIndex) {
                    for (var i = 0; i < steps.length; i++) {
                        childViewObj = steps[i];
                        childElId = childViewObj['elementId'];
                        smUtils.renderView4Config($("#" + childElId), self.model, childViewObj, validation, lockEditingByDefault);
                    }
                }
            });

            this.$el.parents('.modal-body').css({'padding': '0'});

            this.$el.find('.actions').find('a').addClass('btn btn-mini')
            this.$el.find('.actions').find('a[href="#next"]').addClass('btn-primary');
            this.$el.find('.actions').find('a[href="#finish"]').addClass('btn-mini');

            $('.wizard > .steps > ul > li').css({
                'max-width': (100/steps.length) + '%'
            });

            var stepIndex = 0;
            $('.wizard > .steps ul li').each(function(key, value){
                if(steps[key].stepType == 'sub-step'){
                    $(this).addClass('subStep');
                    $(this).find('.number').text('');
                    $(this).find('.title').text('');

                }
                else {
                    $(this).find('.number').text(++stepIndex);
                }
            });
        }
    });

    return WizardView;
});