"use strict";

/*globals angular $ */

angular.module('angular.prime').directive('puiInput', function () {
    return {
        restrict: 'A',
        require: '?ngModel', // get a hold of NgModelController
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) {
                return;
            } // do nothing if no ng-model

            var htmlElementName = element[0].nodeName;
            $(function () {
                var checkbox = false;
                var radiobutton = false;
                var password = false;
                var options = scope.$eval(attrs.puiInput) || {};
                var helper = {};

                if ('INPUT' === htmlElementName) {
                    if (attrs.type === 'password') {
                        options.inline = (options.inline !== undefined) ? options.inline : false;
                        element.puipassword({
                            inline: options.inline
                            , promptLabel: options.promptLabel || 'Please enter a password'
                            , weakLabel: options.weakLabel || 'Weak'
                            , goodLabel: options.goodLabel || 'Medium'
                            , strongLabel: options.strongLabel || 'Strong'
                        });
                        password = true;
                    }
                    if (attrs.type === 'checkbox') {
                        element.puicheckbox();
                        if (attrs.checked) {
                            scope.safeApply(function () {
                                ngModel.$setViewValue(true);
                            });
                        }
                        checkbox = true;
                    }
                    if (attrs.type === 'radio') {
                        element.puiradiobutton();

                        radiobutton = true;
                    }
                    if (!checkbox && !radiobutton && !password) {
                        element.puiinputtext();
                    }

                }
                if ('TEXTAREA' === htmlElementName) {
                    var autoComplete = attrs.puiAutocomplete;
                    var completeSourceMethod = scope.$eval(attrs.puiAutocomplete);

                    options.autoResize = (options.autoResize !== undefined) ? options.autoResize : false;
                    element.puiinputtextarea({
                        autoResize: options.autoResize
                        , autoComplete: autoComplete
                        , scrollHeight: options.scrollHeight || 150
                        , completeSource: completeSourceMethod
                        , minQueryLength: options.minQueryLength || 3
                        , queryDelay: options.queryDelay || 700
                        , counter: $(options.display)
                        , counterTemplate: options.template
                        , maxlength: options.maxLength
                    });

                    if (options.display) {
                        // At this moment, we don't have the scope value yet on the element
                        scope.$watch(ngModel.$viewValue, function (value) {
                            element.puiinputtextarea('updateCounter');
                        });
                    }

                }
                if (checkbox) {
                    // Write data to the model
                    helper = {
                        read: function () {
                            $(function () {
                                var checked = element.puicheckbox('isChecked');
                                var viewValue = element.val();
                                if (!checked) {
                                    viewValue = null;
                                }
                                scope.safeApply(function () {
                                    ngModel.$setViewValue(viewValue);
                                });
                            });

                        }
                    };

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
                        helper.read();
                    });

                }

                if (radiobutton) {
                    // Write data to the model
                    helper = {
                        read: function () {
                            $(function () {
                                var checked = element.puiradiobutton('isChecked');
                                var viewValue = element.val();
                                if (checked) {
                                    scope.safeApply(function () {
                                        ngModel.$setViewValue(viewValue);
                                    });
                                }
                            });

                        }
                    };

                    // Specify how UI should be updated

                    ngModel.$render = function () {
                        $(function () {
                            if (ngModel.$viewValue == element.val() && !element.puiradiobutton('isChecked')) {
                                element.trigger('click');
                            }
                        });
                    };

                    // Listen for change events to enable binding
                    element.bind('puiradiobuttonchange', function () {
                        helper.read();
                    });

                }

                if (attrs.ngDisabled) {
                    scope.$watch(attrs.ngDisabled, function (value) {

                        if (value === false) {
                            $(function () {
                                if (checkbox) {
                                    element.puicheckbox('enable');
                                } else {
                                    if (radiobutton) {
                                        element.puiradiobutton('enable');
                                    } else {
                                        element.puiinputtext('enable');
                                    }
                                }
                            });
                        } else {
                            $(function () {
                                if (checkbox) {
                                    element.puicheckbox('disable');
                                } else {
                                    if (radiobutton) {
                                        element.puiradiobutton('disable');
                                    } else {
                                        element.puiinputtext('disable');
                                    }
                                }

                            });

                        }
                    });
                }
            });
        }
    };
});