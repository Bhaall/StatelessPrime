"use strict";

/*globals angular $ */

angular.module('angular.prime').directive('puiTabview', function () {
    return {
        restrict: 'A',
        compile: function (element, attrs) {
            return function postLink (scope, element, attrs) {
                var options = scope.$eval(attrs.puiTabview) || {};

                $(function () {
                    if (options.closeable === true) {
                        element.find('a').after('<span class="ui-icon ui-icon-close"></span>');
                    }
                    element.puitabview({
                        orientation: options.orientation || 'top'
                    });

                });
                if (options.callback) {
                    element.bind('puitabviewchange', function (eventData, index) {
                        options.callback(index);
                    });
                }

                if (options.activeElement !== undefined && attrs.puiTabview.trim().charAt(0) !== '{' ) {
                    scope.$watch(attrs.puiTabview+'.activeElement', function (value) {
                        $(function () {
                            if (angular.isNumber(value)) {
                                element.puitabview('select', value);
                            }
                        });
                    });
                }

            }
        }
    }
});

