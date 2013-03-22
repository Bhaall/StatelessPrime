"use strict";

/*globals angular */

angular.module('angular.prime', []).run(function ($rootScope) {

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
                if ($rootScope.growl.length === 1 ) {
                    $rootScope.growl.puigrowl();
                } else {
                    throw "Growl needs a exactly 1 div with id 'growl'";
                }
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
