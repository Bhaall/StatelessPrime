"use strict";

angular.module('angular.prime').directive('puiAccordion', function () {
    return {
        restrict: 'A',
        compile: function (element, attrs) {
            return function postLink (scope, element, attrs) {

                var options = scope.$eval(attrs.puiAccordion) || {};
                options.activeIndex = options.activeIndex || 0;
                $(function () {
                    element.puiaccordion({
                        multiple: options.multiple
                        , activeIndex: options.activeIndex
                    });

                });

                var scopedOptions = attrs.puiAccordion && attrs.puiAccordion.trim().charAt(0) !== '{';
                if (scopedOptions || options.callback) {
                    // Listen for change events to enable binding
                    element.bind('puiaccordionchange', function (eventData, idx) {
                        var index = idx.index;
                        if (scopedOptions) {
                            scope.safeApply(read(index));
                        }
                        if (options.callback) {
                            options.callback(index);
                        }

                    });
                }
                if (scopedOptions) {
                    read(undefined); // initialize

                    scope.$watch(attrs.puiAccordion + '.activeIndex', function (value) {
                        var index = element.puiaccordion('getActiveIndex');
                        // Only select the panel if not already selected (otherwise additional collapse/expand)
                        if (value !== index) {
                            element.puiaccordion('select', value);
                        }


                    });
                }

                // Write data to the model
                function read (index) {
                    var idx = (index !== undefined) ? index : element.puiaccordion('getActiveIndex');
                    scope[attrs.puiAccordion].activeIndex = idx;
                }
            }
        }}
});
