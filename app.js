var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var hbs = require('hbs');
var { v4: genuuid} = require('uuid');
require('dotenv').config();

// Public routes
const indexRouter = require('./routes/index');
const contactRouter = require('./routes/contact');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const novedadRouter = require('./routes/novedad');
const servicioRouter = require('./routes/servicio');
const staffRouter = require('./routes/staff');
const userRouter = require('./routes/user');

var app = express();
const uuidGenerated = genuuid();

app.use(session({
  secret: uuidGenerated,
  resave: false,
  saveUninitialized: true,
}));

// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(uuidGenerated));
app.use(express.static(path.join(__dirname, 'public')));

// Public
app.use('/', indexRouter);
app.use('/contact', contactRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/novedad', novedadRouter);
app.use('/servicio', servicioRouter);
app.use('/staff', staffRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send({message: err.message || err || 'Error'});
});

module.exports = app;