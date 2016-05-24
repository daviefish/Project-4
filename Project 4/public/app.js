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
    $urlRouterProvider.otherwise("/subsection2");

    $stateProvider
      .state('subsection2', {
        url: '/subsection2',
        templateUrl: 'subsection2/subsection2.html',
        controller: 'Subsection2Controller as ctrl'
      });

    $stateProvider
      .state('subsection', {
        url: '/subsection',
        templateUrl: 'subsection/subsection.html',
        controller: 'SubsectionController as ctrl'
      });
  }
})();
