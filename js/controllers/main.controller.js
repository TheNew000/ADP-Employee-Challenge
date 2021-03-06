// import angular from 'angular';

(function () {
    angular
        .module('employeeApp')
        .controller('gcCtrl', ['$scope', '$http', 'empService', function($scope, $http, empService) {
            $scope.ifLoggedIn = false;
            $scope.editEmployee = false;
            $scope.emp = {};
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
                    console.log(manager);
                    if(manager.status === 200) {
                        $scope.ifLoggedIn = true;
                        empService.getAllEmps({}, function(emps){
                            $scope.results = emps.data[0].employees;
                            console.log(emps.data[0].employees);
                        });
                    }
                    $scope.emp.companyID = manager.data.user.comp_ID;
                    console.log($scope.emp.companyID);
                    $scope.salutation = manager.data.message + ', ' + manager.data.user.userName + '!!!';
                });
            }

            $scope.newEmp = function(){
                empService.newEmp($scope.emp, function(newEmp){
                    $scope.emp = {};
                    $scope.results.push(newEmp.data.new_emp);
                    $scope.salutation = newEmp.data.message;
                });
            }

            $scope.findEmp = function(){
                empService.findEmp({userInput: $scope.userInput}, function(emps){
                    $scope.userInput = '';
                    $scope.results = emps.data;
                    console.log(emps);
                    $scope.salutation = "Successfully located " + emps.data.length + " employees which match: '" + emps.config.data.userInput + "'";
                });
            }

            $scope.showEditForm = function(index){
                $scope.editEmployeeForm = this.user;
                $scope.empIndex = index;
                $scope.editEmployee = true;
                console.log($scope.empIndex);
                var userState = this.user.state;
                function findState(state){
                    return state.abbrev === userState;
                }
                $scope.selectedOption = $scope.states.find(findState);
            }

            $scope.deleteContact = function (index){
                var destroyContact = this.user;
                empService.deleteEmp(destroyContact, function(deadEmp){
                    $scope.results.splice(index, 1);
                    $scope.salutation = deadEmp.data.message;
                })
            }

        }]);
})();

