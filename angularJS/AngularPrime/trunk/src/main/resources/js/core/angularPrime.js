"use strict";

/*globals angular */

angular.module('angular.prime', []).run(['$rootScope', 'puiGrowl', function ($rootScope, puiGrowl) {

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

    $rootScope.showInfoMessage = function (title, msg) {
        puiGrowl.showInfoMessage(title, msg);
    };

    $rootScope.showWarnMessage = function (title, msg) {
        puiGrowl.showWarnMessage(title, msg);
    };

    $rootScope.showErrorMessage = function (title, msg) {
        puiGrowl.showErrorMessage(title, msg);
    };

}]);
