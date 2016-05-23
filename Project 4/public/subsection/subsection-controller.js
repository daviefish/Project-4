(function() {
  'use strict';

  angular
    .module('myApp.subsection', [])
    .controller('SubsectionController', SubsectionController);

  SubsectionController.$inject = ['$scope', '$http'];

  function SubsectionController($scope, $http) {
    var self = this;
    self.hello = 'Hello World';

    self.tweet = '';

    self.randomTweet = randomTweet;

    self.checkTweeter = checkTweeter;

    // function that cycles through 4 seperate twitter feeds to pull a tweet
    function randomTweet() {
      var twitterProfiles = ['realDonaldTrump', 'kanyewest', 'justinbieber'];
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      var pick = twitterProfiles[getRandomInt(0,3)];


      $http({
        method: 'GET',
        url: 'http://localhost:3000/api/index/twitter?user=' + pick
      }).then(function successCallback(response) {

        self.result = response.data;
        console.log(self.result);

        function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min)) + min;
        }

        var pickTweet = self.result.tweets[getRandomInt(0,99)];

        self.tweet = pickTweet.text;

        self.tweeter = pickTweet.user.screen_name;
        console.log(self.tweet);
      });
    }

    function checkTweeter(choice) {
      if (choice===self.tweeter) {
        console.log("There's a match!");
      } else {
        console.log("Wrong!");
      }
    }



  }

})();


