"use strict";

/*globals angular $ */

angular.module('angular.prime').directive('puiMenubar', function () {
    return {
        restrict: 'A',
        compile: function (element, attrs) {
            return function postLink (scope, element, attrs) {

                var options = scope.$eval(attrs.puiMenu) || {};
                if (element.find("h3").length > 0) {
                    console.log("Warning: ")
                }
                element.puimenubar({
                    autoDisplay: options.autoDisplay
                });

            }
        }
    }
})
;"use strict";

/*globals $ PUI */
/**
 * PrimeUI Menubar Widget
 */

$(function() {

    $.widget("primeui.puimenubar", $.primeui.puitieredmenu, {

        options: {
            autoDisplay: true
        },

        _create: function() {
            this._super();
            this.element.parent().removeClass('pui-tieredmenu').
                addClass('pui-menubar');
        },

        _showSubmenu: function(menuitem, submenu) {
            var win = $(window),
                submenuOffsetTop = null,
                submenuCSS = {
                    'z-index': ++PUI.zindex
                };

            if(menuitem.parent().hasClass('pui-menu-child')) {
                submenuCSS.left = menuitem.outerWidth();
                submenuCSS.top = 0;
                submenuOffsetTop = menuitem.offset().top - win.scrollTop();
            }
            else {
                submenuCSS.left = 0;
                submenuCSS.top = menuitem.outerHeight();
                menuitem.offset().top - win.scrollTop();
                submenuOffsetTop = menuitem.offset().top + submenuCSS.top - win.scrollTop();
            }

            //adjust height within viewport
            submenu.css('height', 'auto');
            if((submenuOffsetTop + submenu.outerHeight()) > win.height()) {
                submenuCSS.overflow = 'auto';
                submenuCSS.height = win.height() - (submenuOffsetTop + 20);
            }

            submenu.css(submenuCSS).show();
        }
    });

});

