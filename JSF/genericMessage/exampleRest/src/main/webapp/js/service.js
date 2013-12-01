
angular.module('registration').factory('RegistrationService', ['$http', function($http) {
   return {
       savePerson: function(person) {

           return $http({
               url: 'data/registration/add',
               method: "POST",
               data: person,
               headers: {'Content-Type': 'application/json; charset=utf-8'}
           });

       },
       loadAllAttendees: function(callback) {

           $http({
               url: 'data/registration/all',
               method: "GET",
               headers: {'Content-Type': 'application/json; charset=utf-8'}
           }).success(function (data, status, headers, config) {
                   callback(data);
               }).error(function (data, status, headers, config) {
                   console.log('load in Error');
               });

       }
   }
}]);
