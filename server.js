/* jslint node: true */
'use strict';

var express      = require('express');
var path         = require('path');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var passport     = require('passport');
var Strategy     = require('passport-local').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;

var port = process.env.PORT || 3000;
var mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/db';
var secret = process.env || 'unicorns';

var app = express();

// require('./extras/mongoose')(config.mongodb_uri);
require('./extras/mongoose')(mongoUrl);

require('./extras/passport')(passport, Strategy);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(session({secret: config.sessions_secret, resave: false, saveUninitialized: false}));
app.use(session({secret: secret, resave: false, saveUninitialized: false}));

app.use(express.static(path.join(__dirname, 'dist')));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/index')(app, passport);

var apiRoutes = ['users', 'twitter'];

apiRoutes.forEach(function(route) {
  app.use( '/api/' + route, require('./routes/' + route)( express.Router() ) );
});




app.get('/', function(req, res) {
  res.render('home', { user: req.user });
});

app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile.ejs', {
      user : req.user // get the user out of session and pass to template

        });
  });


app.get('/login/twitter/return',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile');
  });

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

// Below is where I am not sure what I am doing

app.get('/login',
  function(req, res){
    res.render('login');
  });



passport.use(new Strategy({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: 'http://127.0.0.1:3000/login/twitter/return'
  },
  function(token, tokenSecret, profile, cb) {
    // In this example, the user's Twitter profile is supplied as the user
    // record.  In a production-quality application, the Twitter profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));

  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });



app.listen(port, function() {
  console.log('Listening on port:', port);
});
