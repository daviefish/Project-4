/* jslint node: true */
'use strict';
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

var controller = {};

controller.twitter = function(req, res, next) {
  var username = req.query.user;
  client.get('statuses/user_timeline.json?screen_name='+ username + '&count=3', function(error, tweets, response) {
    if(error) throw error;
    console.log(tweets);  // The favorites.
    console.log(response);  // Raw response object.
    // console.log(username);
    // res.json(tweets);  // The favorites.
    res.json({tweets: tweets, response: response});  // Raw response object.
  });
};

module.exports = controller;
