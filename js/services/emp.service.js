(function () {
    empService.$inject = ['$http', '$route'];
    function empService($http, $route){
        //Login Authentication Route
        this.login = function (user, callback) {
            return $http.post('http://localhost:3000/api/login', user).then(function success(response) {
                $route.reload();
                callback(response);
                console.log(response);
            }, function error(response) {
                callback(response);
            });
        };
        //RESTFUL Employee Index Route
        this.getAllEmps = function (emps, callback){
            return $http.get('http://localhost:3000/api/employees', emps).then(function success(response) {
                $route.reload();
                callback(response);
                console.log(response);
            }, function error(response) {
                callback(response);
            });
        }

        //RESTFUL New Employee Route
        this.newEmp = function (emp, callback){
            return $http.post('http://localhost:3000/api/employees/new', emp).then(function success(response) {
                $route.reload();
                callback(response);
                console.log(response);
            }, function error(response) {
                callback(response);
            });
        }
        
        //RESTFUL New Employee Route
        this.newEmp = function (emp, callback){
            return $http.post('http://localhost:3000/api/employees/new', emp).then(function success(response) {
                $route.reload();
                callback(response);
                console.log(response);
            }, function error(response) {
                callback(response);
            });
        }
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
