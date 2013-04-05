/**
 */

'use strict';

demo.controller('Ctrl', function Ctrl($scope) {
    $scope.panelTitle = 'Change me';
    $scope.contentField = "Very nice";

    $scope.panelOptions = {
        collapsed : false
    };

    $scope.collapsePanel = function() {
        $scope.panelOptions.collapsed = true;
    };

    $scope.expandPanel = function() {
        $scope.panelOptions.collapsed = false;
    };
});

