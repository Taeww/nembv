var createError = require('http-errors');
var express = require('express');
var path = require('path');
const favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname,'public','favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'fe', 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', require('./routes/api'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render({ success: false, msg: err.message });
});

const cfg = require('./cfg/cfg');

if(!cfg){
  console.log('./cfg/cfg.js is not exist!');
  process.exit(1);
}

mongoose.connect(cfg.db.url, (err) => {
  if(err) return console.log(err);
  console.log('monggodb connection');
});

module.exports = app;
