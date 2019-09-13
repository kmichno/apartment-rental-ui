var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var passport = require('passport');
var session = require('express-session');

var indexRouter = require('./routes/index');
var apartmentsRouter = require('./routes/apartments');
var bookingsRouter = require('./routes/bookings');
var authorizationRouter = require('./routes/authorization.js');

var app = module.exports = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({ origin: true, credentials: true }));

/// Create session
app.use(session({ secret: 'anything', saveUninitialized: true, resave: false }));
app.use(passport.initialize());
app.use(passport.session({ secret: 'secret', saveUninitialized: false, resave: false, cookie: { maxAge: 1000 } }));


app.use('/', indexRouter);
app.use('/apartments', apartmentsRouter);
app.use('/bookings', bookingsRouter);
app.use('/authorization', authorizationRouter);


module.exports = app;