/* jslint node: true */
'use strict';
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: 'bAvKpQx9fnlSBHVQ5QJGzO2AB',
  consumer_secret: 'AVmG9sQoGuiW3pdTJZAct42F13o2rMQp59dUcjDbjdwClwwIXW',
  access_token_key: '411910167-wL1tE36jrN6CwWHOgZAtIMTfGuH7a3tUOdI61Ino',
  access_token_secret: 'vLhH06kPs7m5LN0djtrvOy16NEbdqAVPafvuyZ2MbCtEY'
});

var controller = {};

controller.twitter = function(req, res, next) {
  var username = req.query.user;
  client.get('statuses/user_timeline.json?screen_name='+ username + '&count=10  ', function(error, tweets, response) {
    if(error) throw error;
    console.log(tweets);  // The favorites.
    console.log(response);  // Raw response object.
    // console.log(username);
    // res.json(tweets);  // The favorites.
    res.json({tweets: tweets, response: response});  // Raw response object.
  });
};

module.exports = controller;
