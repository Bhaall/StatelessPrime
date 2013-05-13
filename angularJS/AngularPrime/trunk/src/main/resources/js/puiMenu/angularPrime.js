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
