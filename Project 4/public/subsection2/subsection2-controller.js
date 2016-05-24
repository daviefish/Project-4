(function() {
  'use strict';

  angular
    .module('myApp.subsection', [])
    .controller('SubsectionController2', SubsectionController2);

  SubsectionController2.$inject = ['$scope', '$http'];

  function SubsectionController2($scope, $http) {
    var self = this;

  }

})();



