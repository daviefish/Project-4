/* jslint node: true */
'use strict';

// module.exports = function(app, passport) {

//   app.get('/subsection', function(req, res) {
//     res.render('subsection');
//   });

//   app.post('/subsection',
//     passport.authenticate('local', { failureRedirect: '/subsection' }),
//     function(req, res) {
//       res.redirect('/');
//   });

//   app.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/');
//   });

// };

// app/routes.js

module.exports = function(app, passport) {

    // route for home page
    app.get('/', function(req, res) {
        res.render('landing.html'); // load the index.ejs file
    });

    // route for login form
    // route for processing the login form
    // route for signup form
    // route for processing the signup form

    // route for showing the profile page
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.html', {
            user : req.user // get the user out of session and pass to template
        });
    });

        // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // facebook routes

    // =====================================
    // TWITTER ROUTES ======================
    // =====================================
    // route for twitter authentication and login
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/login/twitter/return',
        passport.authenticate('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


