/**
 */

'use strict';

namesmvc.controller('NamesCtrl', function NamesCtrl($scope) {

    $scope.names = [];
    $scope.newName = '';


    $scope.addName = function () {
        if (!$scope.newName.length) {
            return;
        }

        $scope.names.push({
              value: $scope.newName
            });

        $scope.newName = '';

    };

    $scope.removeName = function(name) {

        $scope.showMessage('Removed', name.value);

        $scope.names.splice($scope.names.indexOf(name), 1);
    }

});

