// import angular from 'angular';

(function () {
    angular
        .module('employeeApp')
        .controller('gcCtrl', ['$scope', '$http', 'empService', function($scope, $http, empService) {
            $scope.ifLoggedIn = false;
            $scope.logIn = function() {
                empService.login({
                    userName: $scope.userName,
                    password: $scope.password
                }, function(employees){
                    if(employees.data.status === 200) $scope.ifLoggedIn = true;
                    $scope.salutation = employees.data.message;
                    console.log(employees.data.user);
                });
            }

            // $scope.getUsers = () => {
            //    userService.getUsers({userInput: $scope.userInput}, (data) => {
            //      $scope.results = data;
            //    }, () => {
            //      // This is the error callback and it would be best if you wrote something for this.
            //    });
            //  }
            // $scope.getUsers = () => {
            //     // Here we make the first call which passes the input from the user to the service
            //     userService.findUsers($scope.userInput);
            //     // With this function we retrieve the array which was populated by the previous call and give it to scope for use in populating the DOM
            //     $scope.results = userService.getUsers();
            // };
        }]);
})();

