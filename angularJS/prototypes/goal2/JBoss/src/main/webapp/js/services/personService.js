/**
 */


angular.module('personServices', ['ngResource'])
    .factory('PersonList', function ($resource) {
        return $resource('rest/person/list', {}, {
            query: {method: 'GET', isArray: true}
        });
    }).factory('Person', function ($resource) {
            return $resource('rest/person/item/:id', {}, {
            })
    });

