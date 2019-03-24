var express = require('express');
var router = express.Router();
var connection = require('../lib/dbconn');

function isAuthenticated(req, res, next) {
  if (req.session.user)
      return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SIGNIN PAGE
  res.redirect('/signin');
}

/* GET home page. */
router.get('/', isAuthenticated, function(req, res, next) {
	connection.query("SELECT * FROM questionnaires WHERE id_membre='"+req.session.user.id_membre+"'", function (error, results, fields) {
			console.log(results);
			res.render('session', { title: 'AskThem', rubrique: 'Session', questionnaires: results });
	});
});

router.get('/passage/:p1', isAuthenticated, function(req, res, next) {
	connection.query("SELECT * FROM resultats WHERE id_questionnaire='"+req.param("p1")+"'", function (error, results, fields) {
			console.log(results);
			res.render('passage', { title: 'AskThem', rubrique: 'Passage', resultats: results });
	});
});

router.get('/resultats/:p1', isAuthenticated, function(req, res, next) {
	connection.query("SELECT * FROM resultats WHERE id_questionnaire='"+req.param("p1")+"'", function (error, results, fields) {
			console.log(results);
			res.render('resultat', { title: 'AskThem', rubrique: 'Résultats', resultats: results });
	});
});

module.exports = router;