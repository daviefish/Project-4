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
    $urlRouterProvider.otherwise("/twitter");

    $stateProvider
      .state('twitter', {
        url: '/twitter',
        templateUrl: 'twitter/partials/twitter.html',
        controller: 'TwitterController as ctrl'
      });

      $stateProvider
      .state('landing', {
        url: '/landing',
        templateUrl: 'user/partials/landing.html',
        controller: 'UserController as ctrl'
      });

      $stateProvider
      .state('profile', {
        url: '/profile',
        templateUrl: 'user/partials/profile.html',
        controller: 'UserController as ctrl'
      });

  }
})();
