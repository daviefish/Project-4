(function() {
  'use strict';

  angular
    .module('myApp.user', [])
    .controller('UserController', UserController);

  UserController.$inject = ['$scope', '$http'];

  function UserController($scope, $http) {
    var self = this;

  }


})();



