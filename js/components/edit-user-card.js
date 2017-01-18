(function () {
  'use strict';

  angular
    .module("employeeApp")
    .component("editUserCard", {
      bindings: {
        empEdit: '<',
        empIndex: '<'
      },
      templateUrl: "templates/edit-card-directive.html",
      controller: EditEmpCtrl
    });

  function EditEmpCtrl($scope, empService){
    $scope.editEmp = function(index){
      $scope.$parent.editEmployee = false;
      empService.editEmp($scope.$ctrl.empEdit, function(emp){
          console.log($scope);
          $scope.$parent.results[index] = $scope.$ctrl.empEdit;
          $scope.$parent.salutation = emp.data.message;
      });
  }
  };
})();
