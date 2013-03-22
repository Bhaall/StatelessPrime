angularPrime.run(function ($rootScope) {

    $rootScope.safeApply = function(fn) {
      var phase = this.$root.$$phase;
      if(phase == '$apply' || phase == '$digest') {
        if(fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };

    var growl;

    $rootScope.initializeGrowl = function () {
        if ($rootScope.growl == undefined) {
            $(function () {
                $rootScope.growl = $('#growl');
                $rootScope.growl.puigrowl();
            });
        }

    };

    $rootScope.showInfoMessage = function (title, msg) {
        $rootScope.initializeGrowl();
        $rootScope.growl.puigrowl('show', [
            {severity: 'info', summary: title, detail: msg}
        ]);
    };

    $rootScope.showWarnMessage = function (title, msg) {
        $rootScope.initializeGrowl();
        $rootScope.growl.puigrowl('show', [
            {severity: 'warn', summary: title, detail: msg}
        ]);
    };

    $rootScope.showErrorMessage = function (title, msg) {
        $rootScope.initializeGrowl();
        $rootScope.growl.puigrowl('show', [
            {severity: 'error', summary: title, detail: msg}
        ]);
    };

});

angularPrime.directive('puiPanel', function () {
        return  function (scope, element, attrs) {
            $(function () {
                var options = scope.$eval(attrs.puiPanel) || {};

                element.puipanel({
                    toggleable: options.collapsed !== undefined
                    , closable: options.closable||false
                    , toggleOrientation: options.toggleOrientation || 'vertical'
                });
                if (options.collapsed === 'true') {
                    element.puipanel('toggle');
                }
            });
        }
});

angularPrime.directive('puiButton', function () {
        return  function (scope, element, attrs) {
            $(function () {
                var options = scope.$eval(attrs.puiButton)||{};
                element.puibutton({
                    icon: options.icon,
                    iconPos: options.iconPosition||'left'
                });
            });
            if (attrs.puiDisabled) {
                scope.$watch(attrs.puiDisabled, function (value) {
                    if (value === false) {
                        $(function () {
                            element.puibutton('enable');
                        });
                    } else {
                        $(function () {
                            element.puibutton('disable');
                        });

                    }
                });
            }
        }

    }

);

angularPrime.directive('puiInput', function () {
    return {
        restrict: 'A',
        require: '?ngModel', // get a hold of NgModelController
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) {
                return;
            } // do nothing if no ng-model

            $(function () {
                var checkbox = false;
                var htmlElementName = element[0].nodeName;
                if ('INPUT' === htmlElementName) {
                    if (attrs.type == 'password') {
                        var options = scope.$eval(attrs.puiInput)||{};
                        element.puipassword( {
                            inline: options.inline||false
                        });

                    } else {
                        if (attrs.type == 'checkbox') {
                            element.puicheckbox();
                            // TODO Check why checked attribute not picked up
                            if (attrs.checked) {
                                element.puicheckbox('check', true, true);
                            }
                            checkbox = true;
                        } else {
                            element.puiinputtext();
                        }
                    }

                }
                if ('TEXTAREA' === htmlElementName) {
                    var autoResize = false;
                    if (attrs.puiAutoResize !== undefined) {
                        autoResize = true;
                    }
                    if (attrs.puiCounter) {
                        var counterOptions = angular.fromJson(attrs.puiCounter);
                        element.puiinputtextarea({
                            counter: $(counterOptions.display), counterTemplate: counterOptions.template, maxlength: counterOptions.maxLength});

                    } else {
                        element.puiinputtextarea({
                            autoResize: autoResize
                        });
                    }
                }
                if (checkbox) {
                    // Specify how UI should be updated
                    ngModel.$render = function () {
                        $(function () {
                            if (ngModel.$viewValue) {
                                element.puicheckbox('check', true, true);
                            } else {
                                element.puicheckbox('uncheck', true, true);
                            }

                        });

                    };


                    // Listen for change events to enable binding
                    element.bind('puicheckboxchange', function () {
                        $(function () {
                            read();
                        });
                    });

                    // Write data to the model
                    function read() {
                        $(function () {
                            var checked = element.puicheckbox('isChecked');
                            var viewValue = element.val();
                            if (!checked) {
                                viewValue = null;
                            }
                            scope.safeApply( function() {ngModel.$setViewValue(viewValue);});
                        });

                    }

                    read(); // initialize
                }
            });

        }
    }
});

angularPrime.directive('puiFieldset', function () {
    return  function (scope, element, attrs) {
        $(function () {

            var options = scope.$eval(attrs.puiFieldset) || {};
            var toggleable = options.collapsed !== undefined;
            element.puifieldset({
                toggleable: toggleable
            });
            if (options.collapsed === true) {
                element.puifieldset('toggle');
            }
        });
    }
});

angularPrime.directive('puiRating', function () {
    return {
        restrict: 'A',
        require: '?ngModel', // get a hold of NgModelController
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) {
                return;
            } // do nothing if no ng-model
            $(function () {

                // Specify how UI should be updated
                ngModel.$render = function () {
                    element.puirating('setValue', ngModel.$viewValue)
                };

                // Listen for change events to enable binding
                element.bind('puiratingrate', function () {
                    scope.safeApply(read());
                });

                read(); // initialize

                // Write data to the model
                function read() {
                    ngModel.$setViewValue(element.val());
                }

                var hasCancel = true;
                var isReadonly = false;
                var isDisabled = false;

                if (attrs.puiCancel ) {
                    hasCancel = attrs.puiCancel === 'true';
                }

                element.puirating({
                    cancel : hasCancel
                    , readonly : isReadonly
                    , disabled : isDisabled
                });

                element.hide();

            });
        }
    };

});

angularPrime.directive('puiAccordion', function () {
        return  function (scope, element, attrs) {
            $(function () {
                var multiple = attrs.puiAccordion === 'multiple';
                element.puiaccordion({
                    multiple: multiple
                });

            });
        }
});

angularPrime.directive('puiSpinner', function () {
    return  function (scope, element, attrs) {
        $(function () {
                var options = scope.$eval(attrs.puiSpinner)||{};
                element.puispinner({
                    step : options.step,
                    prefix :  options.prefix,
                    suffix :  options.suffix,
                    min : options.min,
                    max : options.max
                });
            });

        }
});

angularPrime.directive('puiGalleria', function () {
        return  function (scope, element, attrs) {
            var options = scope.$eval(attrs.puiGalleria) || {};
            $(function () {
                element.puigalleria({
                    panelWidth: options.panelWidth,
                    panelHeight: options.panelHeight
                });
            });

        }
});

angularPrime.directive('puiDialog', function () {
        return  function (scope, element, attrs) {
            var modal = true;
            if (attrs.puiModal == 'false') {
                modal = false;
            }
            $(function () {
                element.puidialog({
                    showEffect: 'fade',
                    hideEffect: 'fade',
                    minimizable: true,
                    maximizable: true,
                    modal: modal
                });
            });
            if (attrs.puiDialog) {
                scope.$watch(attrs.puiDialog, function (value) {
                    if (value === false) {
                        $(function () {
                            element.puidialog('hide');
                        });
                    } else {
                        $(function () {
                            element.puidialog('show');
                        });

                    }
                });
            }
            // required  when you close the dialog with the close icon.
            element.bind("puidialogafterhide", function () {
                scope.$apply(function () {
                    scope[attrs.puiDialog] = false;
                });
            });
        }

    }

);

angularPrime.directive('puiTabview', function () {
        return  function (scope, element, attrs) {
            var options = scope.$eval(attrs.puiTabview) || {};
            $(function () {
                if (options.closeable === true) {
                    element.find('a').after('<span class="ui-icon ui-icon-close"></span>');
                }
                element.puitabview({
                    orientation: options.orientation || 'top'
                });

            });
        }
});
