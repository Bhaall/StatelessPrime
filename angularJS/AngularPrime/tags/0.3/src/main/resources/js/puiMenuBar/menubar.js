"use strict";

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
            submenu.css('z-index', ++PUI.zindex);

            if(menuitem.parent().hasClass('pui-menu-child')) {    //submenu menuitem
                var win = $(window),
                    offset = menuitem.offset(),
                    menuitemTop = offset.top,
                    submenuHeight = submenu.outerHeight(),
                    menuitemHeight = menuitem.outerHeight(),
                    top = (menuitemTop + submenuHeight) > (win.height() + win.scrollTop()) ? (-1 * submenuHeight) + menuitemHeight : 0;  //viewport check

                submenu.css({
                    'left': menuitem.outerWidth(),
                    'top': top,
                    'z-index': ++PUI.zindex
                }).show();
            }
            else {
                submenu.css({                                    //root menuitem
                    'left': 0
                    ,'top': menuitem.outerHeight()
                });

            }

            submenu.show();
        }
    });

});
