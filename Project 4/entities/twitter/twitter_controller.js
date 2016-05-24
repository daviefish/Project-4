/* jslint node: true */
'use strict';
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: 'OySB3A14WLCw2r90QoYxmClSu',
  consumer_secret: 'gRIFGfaGmOyfqufQPBoNy8VXubN8QTnQaerk27BYpRwnXz2c4S',
  access_token_key: '735163960551313409-wEjOwP1n7VZaNalLB6uvRSb8aozdVt8',
  access_token_secret: 'MfeVTWWt7FMi6YLVeA1E8mV68dKpB5F7cBNymrC9UqKUb'
});

var controller = {};

controller.twitter = function(req, res, next) {
  var username = req.query.user;
  client.get('statuses/user_timeline.json?screen_name='+ username + '&count=100  ', function(error, tweets, response) {
    if(error) throw error;
    console.log(tweets);  // The favorites.
    console.log(response);  // Raw response object.
    // console.log(username);
    // res.json(tweets);  // The favorites.
    res.json({tweets: tweets, response: response});  // Raw response object.
  });
};

module.exports = controller;
