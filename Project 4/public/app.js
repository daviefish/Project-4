(function() {
  'use strict';

  angular
    .module('myApp', [
      'myApp.twitter',
      'myApp.user',
      'ui.router'
    ])
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/user");

    $stateProvider
      .state('twitter', {
        url: '/twitter',
        templateUrl: 'twitter/partials/twitter.html',
        controller: 'TwitterController as ctrl'
      });

      $stateProvider
      .state('user', {
        url: '/landing',
        templateUrl: 'user/partials/landing.html',
        controller: 'UserController as ctrl'
      });

  }
})();
