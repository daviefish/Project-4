/* jslint node: true */
'use strict';

var express      = require('express');
var path         = require('path');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var passport     = require('passport');
var TwitterStrategy  = require('passport-twitter').Strategy;

var port = process.env.PORT || 3000;
var mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/db';
var secret = process.env || 'unicorns';

var app = express();

// require('./extras/mongoose')(config.mongodb_uri);
require('./extras/mongoose')(mongoUrl);
require('./config/passport')(passport);
// require('./extras/passport')(passport, TwitterStrategy);

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

app.listen(port, function() {
  console.log('Listening on port:', port);
});
