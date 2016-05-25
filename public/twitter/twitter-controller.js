(function() {
  'use strict';

  angular
    .module('myApp.twitter', [])
    .controller('TwitterController', TwitterController);

  TwitterController.$inject = ['$scope', '$http'];

  function TwitterController($scope, $http) {
    var self = this;

    self.pick = '';
    self.notPick1 = '';
    self.notPick2 = '';
    self.notPick3 = '';

    self.tweet = '';

    self.counter = 0;

    self.randomTweet = randomTweet;

    self.checkTweeter = checkTweeter;

    // function that cycles through 4 seperate twitter feeds to pull a tweet

    function randomTweet() {

      // unhide buttons

      $('.button_array').removeClass('hidden');

      // shuffle buttons

      $(function () {
          var parent = $("#shuffle");
          var divs = parent.children();
          while (divs.length) {
              parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
          }
      });

      // pick random user

      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }

      var twitterProfiles = ['realDonaldTrump', 'kanyewest', 'justinbieber', 'fisherdavie', 'khamenei_ir', 'fatjew', 'jk_rowling', 'BarackObama', 'GA', 'maryjblige'];

      var pick = twitterProfiles[getRandomInt(0,10)];
      self.pick = pick;

      // access the backend api for the specific pick

      $http({
        method: 'GET',
        url: '/api/twitter/twitter?user=' + pick
      }).then(function successCallback(response) {

        self.result = response.data;
        console.log(self.result);

        // pick a random tweet from a selection of 100 tweets from that random user

        var pickTweet = self.result.tweets[getRandomInt(0,2)];

        self.tweet = pickTweet.text;

        self.tweeter = pickTweet.user.screen_name;
        // console.log(self.tweet);
        console.log(self.tweeter);

      });

       // establish 3 wrong random users

      // establish twitter handle of NotPick1

      var notPick1 = function()  {
        var twitterUser1 = twitterProfiles[getRandomInt(0,2)];
        while (twitterUser1 === pick) {
          twitterUser1 = twitterProfiles[getRandomInt(0,2)];
        } return twitterUser1;
      };

      self.notPick1 = notPick1();

      // establish name using the twitter handle of NotPick1

      // $http({
      //   method: 'GET',
      //   url: 'http://localhost:3000/api/index/twitter?user=' + self.notPick1
      // }).then(function successCallback(response) {

      //   self.result = response.data;
      //   console.log(self.result);

      //   // pick a random tweet from a selection of 10 tweets from that random user

      //   var pickTweetNotPick1 = self.result.tweets[0];

      //   self.tweeterNotPick1 = pickTweetNotPick1.user.name;

      //   console.log(self.tweeterNotPick1);
      // });

      // establish twitter handle of NotPick1

      var notPick2 = function()  {
        var twitterUser2 = twitterProfiles[getRandomInt(0,2)];
        while (twitterUser2 === pick || twitterUser2 === self.notPick1) {
          twitterUser2 = twitterProfiles[getRandomInt(0,2)];
        } return twitterUser2;

      };

      self.notPick2 = notPick2();

      // establish  name using the twitter handle of NotPick2

      // $http({
      //   method: 'GET',
      //   url: 'http://localhost:3000/api/index/twitter?user=' + self.notPick2
      // }).then(function successCallback(response) {

      //   self.result = response.data;
      //   console.log(self.result);

      //   // pick a random tweet from a selection of 10 tweets from that random user

      //   var pickTweetNotPick2 = self.result.tweets[0];

      //   self.tweeterNotPick2 = pickTweetNotPick2.user.name;

      //   console.log(self.tweeterNotPick2);
      // });

      // establish twitter handle of NotPick3

      var notPick3 = function()  {
        var twitterUser3 = twitterProfiles[getRandomInt(0,2)];
        while (twitterUser3 === pick || twitterUser3 === self.notPick1 || twitterUser3 === self.notPick2) {
          twitterUser3 = twitterProfiles[getRandomInt(0,2)];
        } return twitterUser3;

      };

      self.notPick3 = notPick3();

      // establish name using the twitter handle of NotPick3

      //   $http({
      //     method: 'GET',
      //     url: 'http://localhost:3000/api/index/twitter?user=' + self.notPick3
      //   }).then(function successCallback(response) {

      //   self.result = response.data;
      //   console.log(self.result);

      //   // pick a random tweet from a selection of 10 tweets from that random user

      //   var pickTweetNotPick3 = self.result.tweets[0];

      //   self.tweeterNotPick3 = pickTweetNotPick3.user.name;

      //   console.log(self.tweeterNotPick3);
      // });

    }

    function checkTweeter(choice) {
      if (choice===self.tweeter) {
        window.alert("There's a match!");
        randomTweet();
        self.counter = self.counter + 1;
      } else {
        window.alert('Wrong! The tweet came from ' + self.tweeter);
        randomTweet();
      }
    }

  }

})();



