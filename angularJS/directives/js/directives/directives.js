"use strict";

var myPanel = {
    create: function (element, options) {
        element.addClass('pui-panel ui-widget ui-widget-content ui-corner-all')
            .contents().wrap('<div class="pui-panel-content ui-widget-content" />');
        var title = element.attr('title');

        element.prepend('<div class="pui-panel-titlebar ui-widget-header ui-helper-clearfix ui-corner-all"><span class="ui-panel-title">'
                + title + '</span></div>')
            .removeAttr('title');

    }
};

var myPanelLight = {
    create: function (element, options) {
        element.addClass('pui-panel ')
            .contents().wrap('<div class="pui-panel-content" />');
        var title = element.attr('title');

        element.prepend('<div class="pui-panel-titlebar "><span class="ui-panel-title">'
                + title + '</span></div>')
            .removeAttr('title');

    }



};

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
    }).directive('myDir3L', function version3() {
        return {
            restrict: 'A'
            , compile: function (element, attrs) {
                var options = {};
                myPanelLight.create(element, options);
            }
        };
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
    }).directive('myDir3', function version3() {
        return {
            restrict: 'A'
            , compile: function (element, attrs) {
                var options = {};
                myPanel.create(element, options);
            }
        };
    });

