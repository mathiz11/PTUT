var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//require pour middleware
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var connection = require('./lib/dbconn');

//liste des routes
var connexionRouter = require('./routes/connexion');
var mdpRouter = require('./routes/mdp_oublie');
var questionnaireRouter = require('./routes/questionnaire');
var sessionRouter = require('./routes/session');
var profilRouter = require('./routes/profil');
var session_uti = require('./routes/session_uti'); // Pour la session coté utilisateur

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	cookieName: 'session',
	secret: 'askthem secret',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new LocalStrategy({
	usernameField: 'courriel',
	passwordField: 'mdp',
	passReqToCallback: true
},function (req, courriel, mdp, done){
      console.log(courriel+' = '+ mdp);
      connection.query("select * from membres where mail = ?", [courriel], function(err, rows){
          console.log(err);
        if (err) return done(null, err);

        if(!rows.length){
			console.log("Longueur différente");
			return done(null, false); 
		}
		
		var dbMail = rows[0].mail;
		var dbPassword  = rows[0].mdp;
		if (!(dbMail == courriel) | !(dbPassword == mdp)){
			console.log("Identifiants incorrects");
			return done(null, false);
		}
        req.session.user = rows[0];
        return done(null, rows[0]);
    }
)}));

passport.serializeUser(function(user, done){
    done(null, user.id_membre);
});

passport.deserializeUser(function(id, done){
	connection.query("select * from membres where id_membre = "+ id, function (err, rows){
        done(err, rows[0]);
    });
});

app.get('/signin', function(req, res){
  res.render('connexion', { title: 'AskThem'});
});

app.post('/signin', passport.authenticate('local', {
	successRedirect: '/questionnaire',
	failureRedirect: '/'
}), function(req, res, info){
	res.render('connexion', { title: 'AskThem', error: 'Identifiants erronés'});
});

function isAuthenticated(req, res, next){
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

app.get('/logout', function(req, res){
    req.session.destroy();
    req.logout();
    res.redirect('/');
});

app.use('/', connexionRouter);
app.use('/mdp', mdpRouter);
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
