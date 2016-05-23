/* jslint node: true */
'use strict';

var ctrl = require('../entities/index/index_controller');

module.exports = function(router) {


  router.route('/twitter')
    .get(ctrl.twitter);

  return router;
};

