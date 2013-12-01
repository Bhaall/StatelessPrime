'use strict';

angular.module('registration').controller('RegistrationController', ['$scope', 'RegistrationService', 'puiClientValidation', function ($scope, registrationService, puiClientValidation) {

    $scope.firstName = '';

    $scope.lastName = '';

    $scope.addPanelVisible = false;

    $scope.showAddPanel = function () {
        $scope.firstName = '';
        $scope.lastName = '';
        $scope.addPanelVisible = true;
    };

    $scope.attendees = {
        tableData: function (callback) {
            var $this = this;
            registrationService.loadAllAttendees(function (data) {
                callback.call($this, data);
            });
        }
    };

    $scope.savePerson = function () {
        if (puiClientValidation.validateForm($scope.frm)) {

            registrationService.savePerson({firstName: $scope.firstName, lastName: $scope.lastName}).then(function (data) {
                $scope.addPanelVisible = false;
                if (data.data) {
                    $scope.attendees.refreshData();
                }
            });
        }
    }
}]);

