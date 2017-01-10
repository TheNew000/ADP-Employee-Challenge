// import angular from 'angular';

(function () {
    angular
        .module('employeeApp')
        .controller('gcCtrl', ['$scope', '$http', 'empService', function($scope, $http, empService) {
            $scope.ifLoggedIn = false;
            $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
                'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
                'WY').split(' ').map(function (state) {
                    return {abbrev: state};
                });

            $scope.logIn = function() {
                empService.login({
                    userName: $scope.userName,
                    password: $scope.password
                }, function(manager){
                    if(manager.status === 200) {
                        $scope.ifLoggedIn = true;
                        empService.getAllEmps({}, function(employees){
                            $scope.results = employees;
                            console.log(employees);
                        });
                    }
                    $scope.salutation = manager.data.message + manager.fullName;
                });
            }

            $scope.newEmp = function(){
                console.log($scope.emp);
                empService.newEmp($scope.emp, function(employee){
                    console.log(employee);
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

