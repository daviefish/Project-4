/* jslint node: true */
'use strict';

var User = require('./users_model');
var jsend = require('../../extras/jsend');
var controller = {};

controller.index = function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) throw err;
    res.json(jsend.success(users));
  });
};

controller.create = function(req, res, next) {
  var body = req.body;

  var user = new User();

  user.username = body.username;
  user.password = user.encrypt(body.password);

  user.save(function(err) {
    if (err) throw err;
    res.json(jsend.success(user));
  });
};

controller.show = function(req, res, next) {
  var id = req.params.id;

  User.findById(id, function(err, user) {
    if (err) throw err;
    res.json(jsend.success(user));
  });
};

controller.update = function(req, res, next) {
  var id = req.params.id;
  var body = req.body;

  User.findById(id, function(err, user) {
    if (err) throw err;

    // update user fields here
    // i.e.
    // user.usernname = body.username;

    user.save(function(err) {
      if (err) throw err;
      res.json(jsend.success(user));
    });
  });
};

controller.destroy = function(req, res, next) {
  var id = req.params.id;

  User.findByIdAndRemove(id, function(err) {
    if (err) throw err;
    res.json(jsend.success(null));
  });
};

module.exports = controller;
