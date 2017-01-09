var employeeApp = angular.module('employeeApp', ['ngRoute']);
employeeApp.controller('employeeController', function($scope, $http, $location){
	$scope.employeeInfo = "test"
	var url = 'http://localhost:3000/getEmployeeData';
	$http.get(url)
		.then(function successCallback(response){
		//response.data.xxxxx = whatever res.json was in express. 
		// console.log(response.data)
		if(response.data.response == 'noEmployees'){
			$scope.employeeInfo = "No employees" //No employees.
		}else{
			//response is good. Response.data will have their stuff in it.
			$scope.employeeInfo = response.data //No employees.
		}
	}, function errorCallback(response){

	});
});