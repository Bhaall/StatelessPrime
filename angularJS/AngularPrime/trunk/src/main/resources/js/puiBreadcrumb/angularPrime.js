"use strict";

/*globals angular $ */

angular.module('angular.prime').directive('puiBreadcrumb', function () {
    return {
        restrict: 'A',
        compile: function (element, attrs) {
            return function postLink(scope, element, attrs) {

                var options = scope.$eval(attrs.puiBreadcrumb) || {};
                element.puibreadcrumb({
                    homeIcon: options.homeIcon
                });

            }
        }
    }
})
