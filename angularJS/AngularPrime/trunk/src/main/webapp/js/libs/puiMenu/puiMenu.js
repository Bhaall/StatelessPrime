"use strict";

/*globals angular $ */

angular.module('angular.prime').directive('puiMenu', function () {
    return {
        restrict: 'A',
        compile: function (element, attrs) {
            return function postLink (scope, element, attrs) {

                var options = scope.$eval(attrs.puiMenu) || {};
                options.popup = false;
                if (options.trigger) {
                    var triggerElement = $(options.trigger);
                    if (triggerElement != undefined) {
                        options.popup = true;
                        options.trigger = triggerElement;
                    } else {
                        options.trigger = null;
                    }

                }
                element.puimenu({
                    popup : options.popup
                    ,trigger : options.trigger
                });
            }
        }
    }
})
;"use strict";

/*globals $ */
/**
 * PrimeUI Menu widget
 */
$(function() {

    $.widget("primeui.puimenu", $.primeui.puibasemenu, {

        options: {

        },

        _create: function() {
            this.element.addClass('pui-menu-list ui-helper-reset').
                wrap('<div class="pui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix" />');

            this.element.children('li').each(function() {
                var listItem = $(this);

                if(listItem.children('h3').length > 0) {
                    listItem.addClass('ui-widget-header ui-corner-all');
                }
                else {
                    listItem.addClass('pui-menuitem ui-widget ui-corner-all');
                    var menuitemLink = listItem.children('a'),
                        icon = menuitemLink.data('icon');

                    menuitemLink.addClass('pui-menuitem-link ui-corner-all').contents().wrap('<span class="ui-menuitem-text" />');

                    if(icon) {
                        menuitemLink.prepend('<span class="pui-menuitem-icon ui-icon ' + icon + '"></span>');
                    }
                }
            });

            this.menuitemLinks = this.element.find('.pui-menuitem-link:not(.ui-state-disabled)');

            this._bindEvents();

            this._super();
        },

        _bindEvents: function() {
            var $this = this;

            this.menuitemLinks.on('mouseenter.pui-menu', function(e) {
                $(this).addClass('ui-state-hover');
            })
                .on('mouseleave.pui-menu', function(e) {
                    $(this).removeClass('ui-state-hover');
                });

            if(this.options.popup) {
                this.menuitemLinks.on('click.pui-menu', function() {
                    $this.hide();
                });
            }
        }
    });
});
