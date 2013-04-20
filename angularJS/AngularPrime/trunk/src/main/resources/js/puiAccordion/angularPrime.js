"use strict";

/*globals angular $ console*/

angular.module('angular.prime').directive('puiAccordion', ['$http', '$templateCache', '$compile',
                                                  function ($http, $templateCache, $compile) {
    return {
        restrict: 'A',
        compile: function (element, attrs) {

            return function postLink (scope, element, attrs) {

                var options = scope.$eval(attrs.puiAccordion) || {};
                var dynamicPanels = angular.isArray(options) || angular.isArray(options.urls);
                var content = [];
                var urls = [];
                var remaining;
                var initialCall = true;

                function renderAccordion(panels) {
                    var htmlContent = '';
                    angular.forEach(panels, function(panelContent) {
                       htmlContent = htmlContent + panelContent;
                    });
                    element.html(htmlContent);
                    $compile(element.contents())(scope);
                    $(function () {
                        if (!initialCall) {
                            element.puiaccordion('destroy', {});
                        }
                        element.puiaccordion({
                            multiple: options.multiple, activeIndex: options.activeIndex
                        });
                        initialCall = false;

                    });
                }

                function loadHtmlContents(idx, url) {
                    $http.get(url, {cache: $templateCache}).success(function (response) {
                        content[idx] = response;
                        remaining--;
                        if (remaining === 0) {
                            renderAccordion(content);
                        }
                    }).error(function () {
                            console.error('error loading included file for panel of accordion');
                        });

                }

                function loadAndRenderAccordion() {
                    remaining = urls.length;
                    for (var i = 0; i < urls.length; i++) {
                        loadHtmlContents(i, urls[i]);
                    }
                }

                if (dynamicPanels) {

                    if (angular.isArray(options)) {
                        scope.$watch(attrs.puiAccordion, function(x) {
                            urls = x;
                            loadAndRenderAccordion();
                        }, true);

                    } else {
                        scope.$watch(attrs.puiAccordion+'.urls', function(x) {
                            urls = x;
                            loadAndRenderAccordion();
                        }, true);
                    }

                    loadAndRenderAccordion();


                } else {
                    options.activeIndex = options.activeIndex || 0;
                    $(function () {
                        element.puiaccordion({
                            multiple: options.multiple, activeIndex: options.activeIndex
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


                }
                // Write data to the model
                function read (index) {
                    var idx = (index !== undefined) ? index : element.puiaccordion('getActiveIndex');
                    scope[attrs.puiAccordion].activeIndex = idx;
                }
            }
        }}
}]);

