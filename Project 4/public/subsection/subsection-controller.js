(function() {
  'use strict';

  angular
    .module('myApp.subsection', [])
    .controller('SubsectionController', SubsectionController);

  SubsectionController.$inject = [];

  function SubsectionController() {
    var self = this;
    self.hello = 'Hello World';
  }
})();
