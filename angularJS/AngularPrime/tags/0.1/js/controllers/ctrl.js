/**
 */

'use strict';

demomvc.controller('Ctrl', function Ctrl($scope) {
    $scope.value1 = '';
    $scope.value2 = '';
    $scope.value3 = '';
    $scope.value4 = '';
    $scope.value5 = '';

    $scope.disabled = true;
    $scope.rating1 = 3;
    $scope.rating2 = 2;
    $scope.rating3 = 4;
    $scope.rating4 = 5;

    $scope.checkboxSelectedValue1 = null;
    $scope.checkboxSelectedValue2 = null;
    $scope.checkboxSelectedValue3 = null;
    $scope.checkboxSelectedValue4 = true;

    $scope.spinner1 = null;
    $scope.spinner2 = null;
    $scope.spinner3 = 100;
    $scope.spinner4 = null;

    $scope.dlgVisible = false;


    $scope.enableButton = function() {

        $scope.disabled = false;
    };

    $scope.disableButton = function() {
        $scope.disabled =  true;
    };

    $scope.showMessage = function(msg) {
        alert(msg);
    };

    $scope.showInfoGrowl = function() {
        $scope.showInfoMessage('Title', 'Message');
    };

    $scope.showWarnGrowl = function() {
        $scope.showWarnMessage('Title', 'Message');
    };

    $scope.showErrorGrowl = function() {
        $scope.showErrorMessage('Title', 'Message');
    };

    $scope.rateUp = function () {
        $scope.rating1 = Number($scope.rating1) + 1;
    };

    $scope.rateDown = function () {
        $scope.rating1 = Number($scope.rating1) - 1;
    };

    $scope.showDlg = function() {
        $scope.dlgVisible = true;
    }

    $scope.closeDlg = function() {
        $scope.dlgVisible = false;
    }
});

