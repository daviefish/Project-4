(function() {
  'use strict';

  angular
    .module('myApp', [
      'myApp.subsection',
      'ui.router'
    ])
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('subsection', {
        url: '/subsection',
        templateUrl: 'subsection/subsection.html',
        controller: 'SubsectionController as ctrl'
      });
  }
})();
