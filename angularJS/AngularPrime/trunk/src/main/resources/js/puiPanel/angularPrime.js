"use strict";

/*globals angular $ */

angular.module('angular.prime').directive('puiPanel', ['$interpolate', function ($interpolate) {
    return {
        restrict: 'A',
        compile: function (element, attrs) {
            return function postLink (scope, element, attrs) {
                var options = scope.$eval(attrs.puiPanel) || {};

                var titleWatches = [];
                if (element.attr('title')) {
                    var parsedExpression = $interpolate(element.attr('title'));
                    element.attr('title', scope.$eval(parsedExpression));
                    angular.forEach(parsedExpression.parts, function(part) {
                        if (angular.isFunction(part)) {
                            titleWatches.push(part.exp);
                        }
                    }, titleWatches)
                }

                $(function () {
                    element.puipanel({
                        toggleable: options.collapsed !== undefined
                        , closable: options.closable || false
                        , toggleOrientation: options.toggleOrientation || 'vertical'
                        , toggleDuration : options.toggleDuration || 'normal'
                        , closeDuration : options.closeDuration || 'normal'
                    });
                });
                if (options.collapsed !== undefined && attrs.puiPanel.trim().charAt(0) !== '{' ) {
                    scope.$watch(attrs.puiPanel+'.collapsed', function (value) {
                        $(function () {
                            if (value === false) {
                                element.puipanel('expand');
                            }
                            if (value === true) {
                                element.puipanel('collapse');
                            }
                        });

                    });
                }

                angular.forEach(titleWatches, function(watchValue) {
                    scope.$watch(watchValue, function (value) {
                        $(function () {
                            element.puipanel('setTitle', scope.$eval(parsedExpression));
                        });
                    });
                });


            }

        }
    }
}]);