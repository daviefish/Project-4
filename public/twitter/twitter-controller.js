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

      var twitterProfiles = ['realDonaldTrump', 'kanyewest', 'justinbieber', 'fisherdavie', 'khamenei_ir', 'fatjew', 'jk_rowling', 'BarackObama', 'GA', 'maryjblige', 'ianspringer', 'toxicityy', 'enavy04', 'SeanPypers' , 'frazood', 'FatChickenGame'];

      var pick = twitterProfiles[getRandomInt(0,16)];
      self.pick = pick;

      // access the backend api for the specific pick

      $http({
        method: 'GET',
        url: '/api/twitter/twitter?user=' + pick
      }).then(function successCallback(response) {

        self.result = response.data;
        console.log(self.result);

        // pick a random tweet from a selection of 160 tweets from that random user

        var pickTweet = self.result.tweets[getRandomInt(0,3)];

        self.tweet = pickTweet.text;

        self.tweeter = pickTweet.user.screen_name;
        // console.log(self.tweet);
        console.log(self.tweeter);

      });

       // establish 3 false choices

      // establish twitter handle of first false choice

      var notPick1 = function()  {
        var twitterUser1 = twitterProfiles[getRandomInt(0,16)];
        while (twitterUser1 === pick) {
          twitterUser1 = twitterProfiles[getRandomInt(0,16)];
        } return twitterUser1;
      };

      self.notPick1 = notPick1();

      // establish twitter handle of second false choice

      var notPick2 = function()  {
        var twitterUser2 = twitterProfiles[getRandomInt(0,16)];
        while (twitterUser2 === pick || twitterUser2 === self.notPick1) {
          twitterUser2 = twitterProfiles[getRandomInt(0,16)];
        } return twitterUser2;

      };

      self.notPick2 = notPick2();

      // establish twitter handle of third false choice

      var notPick3 = function()  {
        var twitterUser3 = twitterProfiles[getRandomInt(0,16)];
        while (twitterUser3 === pick || twitterUser3 === self.notPick1 || twitterUser3 === self.notPick2) {
          twitterUser3 = twitterProfiles[getRandomInt(0,16)];
        } return twitterUser3;

      };
      self.notPick3 = notPick3();


    }

    // win logic function
    function checkTweeter(choice) {
      if (choice===self.tweeter) {
        window.alert("There's a match!");
        return randomTweet();
      } else {
        window.alert('Wrong! The tweet came from ' + self.tweeter);
        return randomTweet();
      }
    }

  }

})();


