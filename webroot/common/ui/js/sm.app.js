/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var smConstants, smGridConfig, smUtils, smLabels, smValidation;

require.config({
  baseUrl: '/',
  paths: {
    underscore: 'assets/underscore/underscore-min',
    backbone: 'assets/backbone/backbone-min',
    text: 'assets/requirejs/text',
    knockout: 'assets/knockout/knockout-3.0.0',
    knockback: 'assets/backbone/knockback.min',
    validation: 'common/ui/js//backbone-validation-amd'
  }
});

require([
    'underscore',
    'validation',
    'common/ui/js/constants',
    'common/ui/js/grid.config',
    'common/ui/js/utils',
    'common/ui/js/labels'
], function(_, validation, Constants, GridConfig, Utils, Labels) {
    smConstants = new Constants();
    smUtils = new Utils();
    smLabels = new Labels();
    smGridConfig = new GridConfig();
    smValidation = validation;
    _.extend(smValidation.callbacks, {
        valid: function (view, attr, selector) {
            /*
            var $el = $(view.modalElementId).find('[name=' + attr + ']'),
                $group = $el.closest('.form-element');

            $group.removeClass('has-error');
            $group.find('.help-block').html('').addClass('hidden');
            */
        },
        invalid: function (view, attr, error, selector) {
            /*
            var $el = $(view.modalElementId).find('[name=' + attr + ']'),
                $group = $el.closest('.form-element');
            $group.addClass('has-error');
            $group.find('.help-block').html(error).removeClass('hidden');
            */
        }
    });
});