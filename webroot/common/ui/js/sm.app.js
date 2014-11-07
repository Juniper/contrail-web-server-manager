/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var smwc, smwgc, smwu, smwl, smwv, smwm, smwmc;

require.config({
    baseUrl: '/',
    paths: {
        underscore: 'assets/underscore/underscore-min',
        backbone: 'assets/backbone/backbone-min',
        text: 'assets/requirejs/text',
        knockout: 'assets/knockout/knockout-3.0.0',
        knockback: 'assets/backbone/knockback.min',
        validation: 'assets/backbone/backbone-validation-amd'
    }
});

require([
    'underscore',
    'validation',
    'common/ui/js/constants',
    'common/ui/js/grid.config',
    'common/ui/js/utils',
    'common/ui/js/labels',
    'common/ui/js/messages',
    'common/ui/js/model.config',
    'knockout'
], function (_, validation, Constants, GridConfig, Utils, Labels, Messages, DeafultModelConfig, Knockout) {
    smwc = new Constants();
    smwu = new Utils();
    smwl = new Labels();
    smwm = new Messages();
    smwgc = new GridConfig();
    smwmc = new DeafultModelConfig();
    smwv = validation;
    initSMWebCache();
    initBackboneValidation(_);
    initCustomKOBindings(Knockout);
    initDomEvents();
});

function initSMWebCache() {
    var ajaxConfig = {type: "GET", cache: "true", url: smwc.URL_TAG_NAMES};
    contrail.ajaxHandler(ajaxConfig, function () {}, function (response) {
        for (var i = 0; response != null && i < response.length; i++) {
            smwc.CACHED_TAG_COLORS[response[i]] = i;
        }
    });
};

function initBackboneValidation(_) {
    _.extend(smwv.callbacks, {
        valid: function (view, attr, selector) {
            /*
             var $el = $(view.modalElementId).find('[name=' + attr + ']'),
             $group = $el.closest('.form-element');

             $group.removeClass('has-error');
             $group.find('.help-block').html('').addClass('hidden');
             */
        },
        invalid: function (view, attr, error, selector, validation) {
            var model = view.model;
            model.validateAttr(attr, validation);
            /*
             var $el = $(view.modalElementId).find('[name=' + attr + ']'),
             $group = $el.closest('.form-element');
             $group.addClass('has-error');
             $group.find('.help-block').html(error).removeClass('hidden');
             */
        }
    });
};

function initCustomKOBindings(Knockout) {
    Knockout.bindingHandlers.contrailDropdown = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var valueObj = valueAccessor(),
                allBindings = allBindingsAccessor(),
                dropDown = $(element).contrailDropdown(valueObj).data('contrailDropdown');

            if (allBindings.value) {
                var value = Knockout.utils.unwrapObservable(allBindings.value);
                if(typeof value === 'function') {
                    dropDown.value(value());
                } else {
                    dropDown.value(value);
                }
            }
            else {
                dropDown.value('');
            }

            Knockout.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).select2('destroy');
            });
        },
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            $(element).trigger('change');
        }
    };

    Knockout.bindingHandlers.contrailMultiselect = {
        init  : function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var valueObj = valueAccessor(),
                allBindings = allBindingsAccessor(),
                lookupKey = allBindings.lookupKey,
                multiselect = $(element).contrailMultiselect(valueObj).data('contrailMultiselect');

            if (allBindings.value) {
                var value = Knockout.utils.unwrapObservable(allBindings.value);
                if (typeof value === 'function') {
                    multiselect.value(value());
                } else {
                    multiselect.value(value);
                }
            }

            Knockout.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).select2('destroy');
            });
        },
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            $(element).trigger('change');
        }
    };

    var updateSelect2 = function (element) {
        var el = $(element);
        if (el.data('select2')) {
            el.trigger('change');
        }
    }
    var updateSelect2Options = Knockout.bindingHandlers['options']['update'];

    Knockout.bindingHandlers['options']['update'] = function (element) {
        var r = updateSelect2Options.apply(null, arguments);
        updateSelect2(element);
        return r;
    };

    var updateSelect2SelectedOptions = Knockout.bindingHandlers['selectedOptions']['update'];

    Knockout.bindingHandlers['selectedOptions']['update'] = function (element) {
        var r = updateSelect2SelectedOptions.apply(null, arguments);
        updateSelect2(element);
        return r;
    };
};

function initDomEvents() {
    $(document)
        .off('click', '.group-detail-action-item', function(event) {})
        .on('click', '.group-detail-action-item', function(event) {
            if (!$(this).hasClass('selected')) {
                var thisParent = $(this).parents('.group-detail-container'),
                    newSelectedView = $(this).data('view');

                thisParent.find('.group-detail-item').hide();
                thisParent.find('.group-detail-' + newSelectedView).show();

                thisParent.find('.group-detail-action-item').removeClass('selected');
                $(this).addClass('selected');

                if (contrail.checkIfExist($(this).parents('.slick-row-detail').data('cgrid'))) {
                    $(this).parents('.contrail-grid').data('contrailGrid').adjustDetailRowHeight($(this).parents('.slick-row-detail').data('cgrid'));
                }
            }
        });

    $(document)
        .off('click', '.input-type-toggle-action', function(event) {})
        .on('click', '.input-type-toggle-action', function(event) {
            var input = $(this).parent().find('input');
            if(input.prop('type') == 'text') {
                input.prop('type', 'password');
                $(this).removeClass('blue');
            } else {
                input.prop('type', 'text');
                $(this).addClass('blue');
            }
        });
}