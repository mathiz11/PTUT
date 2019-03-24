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
			req.session.questionnaires = results[0].id_questionnaire;
			console.log(results);
			res.render('passage', { title: 'AskThem', rubrique: 'Passage', resultats: results });
	});
});

router.get('/resultats/:p1', isAuthenticated, function(req, res, next) {
	var questions, reponses, type_question;
	connection.query("SELECT * FROM questions WHERE id_questionnaire='"+req.param("p1")+"'", function (error, results, fields) {
			questions = results;
	});
	var i,j;
	
	for (i = 0; i < questions.length; i++)
	{
		if (questions[i].type_question == 'QCM')
		{
			connection.query("SELECT * FROM QCM WHERE id_question='"+questions[i].id_question+"'", function (error, results, fields) {
				type_question[i]=results;
			});
		}else if (questions[i].type_question == 'QCU'){
			connection.query("SELECT * FROM QCU WHERE id_question='"+questions[i].id_question+"'", function (error, results, fields) {
				type_question[i]=results;
			});
		}else {
			connection.query("SELECT * FROM QCO WHERE id_question='"+questions[i].id_question+"'", function (error, results, fields) {
				type_question[i]=results;
			});
		}			
	}
	
	res.render('resultat', { title: 'AskThem', rubrique: 'Passage', questions: questions,  });
});

module.exports = router;