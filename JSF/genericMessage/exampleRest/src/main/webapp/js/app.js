/**
 */
'use strict';

/**
 * The main angularPrime demo app module.
 *
 * @type {angular.Module}
 */

var registrationApp = angular.module('registration', ['angular.prime', 'angular.prime.prototype', 'angular.prime.enterprise' ]);

registrationApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.responseInterceptors.push(function ($q, puiMessages, puiGrowl) {
        return function (promise) {
            // convert the returned data using values passed to $http.get()'s config param
            var resolve = function (value) {

                if (('boolean' === typeof value.data.data )) {
                    puiMessages.clear();
                }

                if (value.data.messages && value.data.messages.length > 0) {
                    puiMessages.show(value.data.messages.filter(function (msg) {
                        return 'INFO' !== msg.severity;
                    }));


                    angular.forEach(value.data.messages.filter(function (msg) {
                        return 'INFO' === msg.severity;
                    }), function (msg) {
                        puiGrowl.showInfoMessage(undefined, msg.text)
                    });
                }

                // Interceptor is also called for loading partials.  Then value.data is a String.  When loading from backed, it is always an object
                if (angular.isObject(value.data)) {
                    value.data = value.data.data;

                }

            };

            var reject = function (reason) {
                console.log("rejected because: ", reason);
            };

            // attach our actions
            promise.then(resolve, reject);

            // return the original promise
            return promise;
        }
    });

}]);

registrationApp.config(function ($provide) {
    $provide.decorator('$httpBackend', ['$delegate', 'puiBlockui', function ($delegate, puiBlockui) {
        var endsWith = function (str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        };

        // do not blast mock $httpBackend if it exists
        if (angular.isDefined(angular.mock)) {
            return $delegate;
        }
        return function (method, url, reqData, done, reqHeaders, timeout, withCredentials) {
            if (!endsWith(url, '.html')) {
                puiBlockui.showSpinner();
            }

            $delegate(method, url, reqData, function () {
                done.apply(this, arguments);
                if (!endsWith(url, '.html')) {
                    puiBlockui.hideSpinner();
                }
            }, reqHeaders, timeout, withCredentials);
        };

    }])
});

if (!Array.prototype.filter) {
    Array.prototype.filter = function (fn, context) {
        var i, value, result = [], length;

        if (!this || typeof fn !== 'function' || (fn instanceof RegExp)) {
            throw new TypeError();
        }

        length = this.length;

        for (i = 0; i < length; i++) {
            if (this.hasOwnProperty(i)) {
                value = this[i];
                if (fn.call(context, value, i, this)) {
                    result.push(value);
                }
            }
        }
        return result;
    };
}