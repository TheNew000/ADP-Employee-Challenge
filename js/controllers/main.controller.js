// import angular from 'angular';

(function () {
    angular
        .module('employeeApp')
        .controller('gcCtrl', ['$scope', '$http', 'empService', function($scope, $http, empService) {
            $scope.ifLoggedIn = false;
            $scope.editEmployee = false;
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
                        empService.getAllEmps({}, function(emps){
                            $scope.results = emps.data[0].employees;
                            console.log(emps.data[0].employees);
                        });
                    }
                    $scope.salutation = manager.data.message + ', ' + manager.data.user[0].userName + '!!!';
                });
            }

            $scope.newEmp = function(){
                empService.newEmp($scope.emp, function(newEmp){
                    $scope.emp = {};
                    $scope.results.push(newEmp);
                });
            }

            $scope.findEmp = function(){
                empService.findEmp({userInput: $scope.userInput}, function(emps){
                    $scope.userInput = '';
                    $scope.results = emps.data;
                });
            }

            $scope.showEditForm = function(index){
                this.editEmployee = true;
                var userState = this.user.state;
                function findState(state){
                    return state.abbrev === userState;
                }

                $scope.selectedOption = $scope.states.find(findState);
            }

            $scope.editEmp = function(index){
                this.editEmployee = false;
                var editedEmp = this.user;
                $scope.results[index] = editedEmp;

                empService.editEmp(editedEmp, function(emp){
                    console.log(emp);
                });
            }
            
            // $scope.saveField = function(index) {
            //     if ($scope.editing !== false) {
            //         $scope.appkeys[$scope.editing] = $scope.newField;
            //         $scope.editing = false;
            //     }       
            // };
            
            // $scope.cancel = function(index) {
            //     if ($scope.editing !== false) {
            //         $scope.appkeys[$scope.editing] = $scope.newField;
            //         $scope.editing = false;
            //     }       
            // };

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

