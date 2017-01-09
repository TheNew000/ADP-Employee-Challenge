// import angular from 'angular';

// This service makes the $http.get() requests to the github API and returns an array filled with the first 10 users to appear based on the user input.
(function () {
    angular
        .module('employeeApp')
        .service('userService', function($http, $q) {
            return
        });
})();

// app.factory('SonService', function ($http, $q) {
//     return {
//         getWeather: function() {
//             // the $http API is based on the deferred/promise APIs exposed by the $q service
//             // so it returns a promise for us by default
//             return $http.get('http://fishing-weather-api.com/sunday/afternoon')
//                 .then(function(response) {
//                     if (typeof response.data === 'object') {
//                         return response.data;
//                     } else {
//                         // invalid response
//                         return $q.reject(response.data);
//                     }

//                 }, function(response) {
//                     // something went wrong
//                     return $q.reject(response.data);
//                 });
//         }
//     };
// });
