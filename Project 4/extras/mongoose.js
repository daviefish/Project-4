/* jslint node: true */
'use strict';

var mongoose = require('mongoose');

module.exports = function(uri) {

  mongoose.connect(uri, function (err) {
    if (err) {
      return console.log('Cannot connect to database', err);
    }
    return console.log('Database connected.');
  });

};
