/* jslint node: true */
'use strict';

var jsend = {};

jsend.success = function(data) {
  return {
    status: 'success',
    data: data
  };
};

jsend.fail = function(err) {
  return {
    status: 'fail',
    data: err
  };
};

jsend.error = function(msg) {
  return {
    status: 'error',
    message: msg
  };
};

module.exports = jsend;
