/* jslint node: true */
'use strict';

module.exports = function(app, passport) {

  app.get('/subsection2', function(req, res) {
    res.render('subsection2');
  });

  app.post('/subsection2',
    passport.authenticate('local', { failureRedirect: '/subsection2' }),
    function(req, res) {
      res.redirect('/');
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

};


