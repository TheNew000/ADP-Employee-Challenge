(function () {
    empService.$inject = ['$http', '$route'];
    function empService($http, $route){

        this.login = function (user, callback) {
            return $http.post('/api/login', user).then(function success(response) {
                $route.reload();
                callback(response);
            }, function error(response) {
                callback(response);
            });
        };

        // return {login: this.login};
    }

    angular
        .module('employeeApp')
        .service('empService', empService);
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
