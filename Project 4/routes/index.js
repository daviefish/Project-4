/* jslint node: true */
'use strict';

module.exports = function(app, passport) {

  app.get('/subsection', function(req, res) {
    res.render('subsection');
  });

  app.post('/subsection',
    passport.authenticate('local', { failureRedirect: '/subsection' }),
    function(req, res) {
      res.redirect('/');
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

};


