/* jslint node: true */
'use strict';

var User = require('../entities/users/users_model');

module.exports = function(passport, Strategy) {

  passport.use(new Strategy(function(username, password, cb) {
    User.findOne({username: username}, function(err, user) {
      if (err) return cb(err);
      if (!user) return cb(null, false);
      if (user.validPassword(password)) return cb(null, false);
      return cb(null, user);
    });
  }));

  passport.serializeUser(function(user, cb) {
    cb(null, user._id);
  });

  passport.deserializeUser(function(id, cb) {
    User.findById(id, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });

};
