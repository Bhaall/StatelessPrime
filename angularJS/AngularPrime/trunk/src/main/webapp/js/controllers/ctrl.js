/**
 */

'use strict';

function Ctrl($scope) {

    $scope.value1 = '';
    $scope.value2 = '';
    $scope.value3 = '';
    $scope.value4 = '';
    $scope.value5 = '';
    $scope.value6 = '';
    $scope.value7 = '';
    $scope.value8 = '';

    $scope.disabled1 = true;
    $scope.disabled2 = true;

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

    $scope.panelOptions = {collapsed: false};

    $scope.enableWidget1 = function() {
        $scope.disabled1 = false;
    };

    $scope.disableWidget1 = function() {
        $scope.disabled1 =  true;
    };

    $scope.enableWidget2 = function() {
        $scope.disabled2 = false;
    };

    $scope.disableWidget2 = function() {
        $scope.disabled2 =  true;
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
    };

    $scope.closeDlg = function() {
        $scope.dlgVisible = false;
    };

    $scope.autoCompleteMethod = function (request, response) {
        var data = [];
        var query = request.query;
        for (var i = 0; i < 5; i++) {
            data.push({"label": query + i, "value": query + i});
        }
        response.call(this, data);
    };

    $scope.expandPanel = function () {
        $scope.panelOptions.collapsed = false;
    };

    $scope.collapsePanel = function () {
        $scope.panelOptions.collapsed = true;
    };

    $scope.ratingCallback = function (value) {
        alert(value);
    };

}

