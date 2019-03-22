var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var connexionRouter = require('./routes/connexion');
var questionnaireRouter = require('./routes/questionnaire');
var sessionRouter = require('./routes/session');
var profilRouter = require('./routes/profil');

// Pour la session coté utilisateur
var session_uti = require('./routes/session_uti');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', connexionRouter);
app.use('/questionnaire', questionnaireRouter);
app.use('/session', sessionRouter);
app.use('/profil', profilRouter);
app.use('/session_uti', session_uti); // Pour la session coté utilisateur

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
  res.render('error');
});

module.exports = app;
