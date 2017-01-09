// import angular from 'angular';

(function () {
    angular
        .module('employeeApp')
        .controller('gcCtrl', ['$scope', '$http', 'userService', function($scope, $http, userService) {
            $scope.getUsers = () => {
               userService.getUsers({userInput: $scope.userInput}, (data) => {
                 $scope.results = data;
               }, () => {
                 // This is the error callback and it would be best if you wrote something for this.
               });
             }
            $scope.getUsers = () => {
                // Here we make the first call which passes the input from the user to the service
                userService.findUsers($scope.userInput);
                // With this function we retrieve the array which was populated by the previous call and give it to scope for use in populating the DOM
                $scope.results = userService.getUsers();
            };
        }]);
})();
