/* jslint node: true */
'use strict';

var ctrl = require('../entities/users/users_controller');

module.exports = function(router) {

  router.route('/')
    .get(ctrl.index)
    .post(ctrl.create);

  router.route('/:id')
    .get(ctrl.show)
    .put(ctrl.update)
    .delete(ctrl.destroy);

  return router;
};
