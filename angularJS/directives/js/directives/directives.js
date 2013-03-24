"use strict";

demo.directive('myDir1L', function version1() {
    return {
        restrict: 'EA'
        /*, replace: true*/  // uncomment this to see the effect on the resulting DOM structure.
        , scope: {title: '@title'}
        , template: '<div > <span >Panel title {{title}}</span></div>'
    };
}).directive('myDir2L', function version2() {
        return {
            restrict: 'EA'
            , replace: false
            , scope: {title: '@title'}
            , template: '<div > <span >Panel title {{title}}</span><div ng-transclude></div></div>'
            , transclude: true
        }
    });


demo.directive('myDir1', function version1() {
    return {
        restrict: 'EA'
        /*, replace: true*/  // uncomment this to see the effect on the resulting DOM structure.
        , scope: {title: '@title'}
        , template: '<div class="pui-panel-titlebar ui-widget-header ui-helper-clearfix ui-corner-all">' +
            '<span class="ui-panel-title">Panel title {{title}}</span></div>'
    };
}).directive('myDir2', function version2() {
        return {
            restrict: 'EA'
            , replace: false
            , scope: {title: '@title'}
            , template: '<div class="pui-panel-titlebar ui-widget-header ui-helper-clearfix ui-corner-all">' +
                '<span class="ui-panel-title">Panel title {{title}}</span><div class="pui-panel-content ui-widget-content" ng-transclude></div></div>'
            , transclude: true
        }
    });


