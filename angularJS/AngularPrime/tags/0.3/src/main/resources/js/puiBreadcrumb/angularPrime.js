"use strict";

/*globals angular $ */

angular.module('angular.prime').directive('puiBreadcrumb', ['$compile',
                                                    function ($compile) {
    return {
        restrict: 'A',
        compile: function (element, attrs) {
            return function postLink(scope, element, attrs) {

                var options = scope.$eval(attrs.puiBreadcrumb) || {};
                var dynamicBreadcrumb = angular.isArray(options) || angular.isArray(options.items);
                var breadcrumbItems = [];
                var initialCall = true;

                function renderBreadcrumb() {
                    var htmlContents = '';
                    var globalActionText = null;
                    angular.forEach(breadcrumbItems, function (breadcrumbItem) {
                        var actionText = breadcrumbItem.onclick;
                        if (actionText === undefined && globalActionText != null) {
                            actionText = globalActionText;
                        }
                        if (breadcrumbItem.globalAction)  {
                            globalActionText = actionText;
                        }
                        var hasPlaceholder = actionText != undefined && actionText.indexOf('{id}') > -1;
                        if (hasPlaceholder) {
                            actionText = actionText.replace('{id}', breadcrumbItem.id);
                        }

                        htmlContents = htmlContents + '<li id="' + breadcrumbItem.id + '"><a ';
                        if (actionText != undefined) {
                            htmlContents = htmlContents + 'ng-click="' + actionText +'"';
                        }
                        htmlContents = htmlContents + '>' + breadcrumbItem.label + '</a></li>';
                    });
                    element.html(htmlContents);
                    $compile(element.contents())(scope);
                    $(function () {
                        if (!initialCall) {
                            element.puibreadcrumb('destroy', {});
                            element.unwrap();
                        }
                        element.puibreadcrumb({

                        });
                        initialCall = false;

                    });
                }

                if (dynamicBreadcrumb) {

                    if (angular.isArray(options)) {
                        scope.$watch(attrs.puiBreadcrumb, function(x) {
                            breadcrumbItems = x;
                            renderBreadcrumb();
                        }, true);

                    } else {
                        scope.$watch(attrs.puiBreadcrumb+'.items', function(x) {
                            breadcrumbItems = x;
                            renderBreadcrumb();
                        }, true);
                    }

                } else {
                    element.puibreadcrumb({
                        homeIcon: options.homeIcon
                    });

                }

            }
        }
    }
}])
