/**
 */

'use strict';

namesmvc.controller('NamesCtrl', function NamesCtrl($scope, Person, PersonList) {

    $scope.firstName = "";
    $scope.lastName = "";
    $scope.data = PersonList.query();

    $scope.addPerson = function () {
        var person = {
            id : 0,
            firstName : $scope.firstName,
            lastName : $scope.lastName
        };

        $scope.data.push(Person.save(person));

        $scope.firstName = "";
        $scope.lastName = "";
    };

    $scope.removeName = function (person) {

        $scope.showMessage('Removed', person.firstName + '  ' + person.lastName);
        Person.delete({id:person.id});


        $scope.data.splice($scope.data.indexOf(person), 1);
    }


});

