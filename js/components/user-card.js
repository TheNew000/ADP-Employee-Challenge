(function () {
  'use strict';

  angular
    .module("employeeApp")
    .component("userCard", {
      bindings: {
        user: '<',
        index: '@'
      },
      templateUrl: "templates/card-directive.html",
      controller: EmpCardCtrl
    });

  function EmpCardCtrl(){};
})();

