"use strict";

var Helper = {
    findChild: function(element, className) {
        var result = null;
        angular.forEach(element.children(), function(value, key) {
            if (value.className.indexOf(className) !== -1) {
                result = value;
            }
        });
        return result;
    }

};

var myPanel = {
    create: function (element, options) {
        element.addClass('pui-panel ui-widget ui-widget-content ui-corner-all')
            .contents().wrap('<div class="pui-panel-content ui-widget-content" />');
        var title = element.attr('title');

        element.prepend('<div class="pui-panel-titlebar ui-widget-header ui-helper-clearfix ui-corner-all"><span class="ui-panel-title">'
                + title + '</span></div>')
            .removeAttr('title');

        this.header = angular.element(Helper.findChild(element, 'pui-panel-titlebar'));

        if(options.collapse) {
            this.toggler = angular.element('<a class="pui-panel-titlebar-icon ui-corner-all ui-state-default" href="#"><span class="ui-icon ui-icon-minusthick"></span></a>')
                .bind('click', function (e) {
                    var content = Helper.findChild(element, 'pui-panel-content');
                    var icon = this.children[0];
                    if (content.style.display === 'none') {
                        content.style.display = '';
                        icon.className = 'ui-icon ui-icon-minusthick';
                    } else {
                        content.style.display = 'none';
                        icon.className = 'ui-icon ui-icon-plusthick';
                    }
                    e.preventDefault();
                });

            this.titleSpan = angular.element(Helper.findChild(this.header, 'ui-panel-title'));
            this.titleSpan.after(this.toggler);

        }

    }
    , show: function(element) {
        var content = Helper.findChild(element, 'pui-panel-content');
        var header = angular.element(Helper.findChild(element, 'pui-panel-titlebar'));
        var titlebar = angular.element(Helper.findChild(header, 'pui-panel-titlebar-icon'));
        var icon = Helper.findChild(titlebar, 'ui-icon');
        if (content.style.display === 'none') {
            content.style.display = '';
            icon.className = 'ui-icon ui-icon-minusthick';
        }
    }
    , hide: function(element) {
        var content = Helper.findChild(element, 'pui-panel-content');
        var header = angular.element(Helper.findChild(element, 'pui-panel-titlebar'));
        var titlebar = angular.element(Helper.findChild(header, 'pui-panel-titlebar-icon'));
        var icon = Helper.findChild(titlebar, 'ui-icon');
        if (content.style.display !== 'none') {
            content.style.display = 'none';
            icon.className = 'ui-icon ui-icon-plusthick';
        }

    }
    , setTitle: function(titleValue) {
        this.titleSpan.html(titleValue);
    }};

var myPanelLight = {
    create: function (element, options) {
        element.addClass('pui-panel ')
            .contents().wrap('<div class="pui-panel-content" />');
        var title = element.attr('title');

        element.prepend('<div class="pui-panel-titlebar "><span class="ui-panel-title">'
                + title + '</span></div>')
            .removeAttr('title');

        this.header = angular.element(Helper.findChild(element, 'pui-panel-titlebar'));

        if(options.collapse) {
            this.toggler = angular.element('<a href="#"> X</a>').bind('click', function (e) {
                Helper.findChild(element, 'pui-panel-content').style.display = "none";
                e.preventDefault();
            });

            this.titleSpan = angular.element(Helper.findChild(this.header, 'ui-panel-title'));
            this.titleSpan.after(this.toggler);
        }
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
    }).directive('myDir4L', function version4() {
        return {
            restrict: 'A'
            , compile: function (element, attrs) {
                var options = {
                    collapse: 'collapsable' === attrs.myDir4L
                };
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
    }).directive('myDir4', function version4() {
        return {
            restrict: 'A'
            , compile: function (element, attrs) {
                var options = {
                    collapse: 'collapsable' === attrs.myDir4
                };
                myPanel.create(element, options);
            }
        };
    }).directive('myDir5', function version5 () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var options = scope.$eval(attrs.myDir5) || {};
                if (angular.isObject(options)) {
                    options.collapse = true;
                } else {
                    options = {
                        collapse: 'collapsable' === attrs.myDir5
                    };
                }

                myPanel.create(element, options);

            }
        };
    }).directive('myDir6', function version6 () {
        return {
            restrict: 'A'
            , link: function (scope, element, attrs) {
                var options = scope.$eval(attrs.myDir6) || {};
                if (angular.isObject(options)) {
                    options.collapse = true;
                } else {
                    options = {
                        collapse: 'collapsable' === attrs.myDir6
                    };
                }

                myPanel.create(element, options);

                if (angular.isDefined(options.collapsed)) {
                    scope.$watch(attrs.myDir6 + '.collapsed', function (value) {
                        if (value === false) {
                            myPanel.show(element);
                        } else {
                            myPanel.hide(element);
                        }
                    });
                }


                scope.$watch(attrs.title, function (title) {
                    myPanel.setTitle(title);
                })


            }
        };
    });

