var express = require('express');
var router = express.Router();

const QuestDao = require('../dao/dao_quest.js');
const questDao = new QuestDao();
const ResDao = require('../dao/dao_res.js');
const resDao = new ResDao();
const QcuDao = require('../dao/dao_qcu.js');
const qcuDao = new QcuDao();
const QcmDao = require('../dao/dao_qcm.js');
const qcmDao = new QcmDao();
const QcoDao = require('../dao/dao_qco.js');
const qcoDao = new QcoDao();
const QuestionDao = require('../dao/dao_question.js');
const questionDao = new QuestionDao();
const RepOuvertesDao = require('../dao/dao_repOuverte.js');
const repOuvertesDao = new RepOuvertesDao();
const ParticipDao = require('../dao/dao_particip.js');
const participDao = new ParticipDao();

var connection = require('../lib/dbconn');

function isAuthenticated(req, res, next) {
  if (req.session.user)
      return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SIGNIN PAGE
  res.redirect('/signin');
}

/* GET home page. */
router.get('/', isAuthenticated, function(req, res, next) {
  const app = async () => {
    let results = await questDao.read_where(req.session.user.id_membre);
    res.render('session', { title: 'AskThem', rubrique: 'Session', questionnaires: results });
  }
  app();
});

router.get('/passage/:p1', isAuthenticated, function(req, res, next) {
  const app = async () => {
    let results = await resDao.read_Byidquest(req.param("p1"));
    res.render('passage', { title: 'AskThem', rubrique: 'Passage', resultats: results });
  }
  app();

/*	connection.query("SELECT * FROM resultats WHERE id_questionnaire='"+req.param("p1")+"'", function (error, results, fields) {
			req.session.questionnaires = results[0].id_questionnaire;
			console.log(results);
			res.render('passage', { title: 'AskThem', rubrique: 'Passage', resultats: results });
	});*/
});

router.get('/passage/question/:p1', isAuthenticated, function(req, res, next) {
  const app = async () => {
    let results = await questionDao.read_Byidquest(req.session.questionnaires);
    res.render('question', { title: 'AskThem', rubrique: 'Questions', questions: results });  }
  app();

/*	connection.query("SELECT * FROM questions WHERE id_questionnaire='"+req.session.questionnaires+"'", function (error, results, fields) {
			req.session.resultats = req.param("p1");
			console.log(results);
			res.render('question', { title: 'AskThem', rubrique: 'Questions', questions: results });
	});*/
});

router.get('/passage/question/resultats/:p1', isAuthenticated, function(req, res, next) {
//	var question = [];
//	var tab_idquestion = [];

	const app = async () => {
			let question = await questDao.read_question(req.param("p1"))
			console.log(results);
			//question = results;

	//QCU
	if (question.type_question=='QCU'){

		const app = async () => {
			let results = await qcuDao.read_where(question[0].id_question)
			//console.log(results);
			//tab_idquestion = results;
		}
		app();
		res.render('resultat', { title: 'AskThem', rubrique: 'Reponse', response});
	}
	//QCM
	else{
		if (question.type_question=='QCM'){

			const app = async () => {
				let results = await qcmDao.read_where(question[0].id_question)
				//console.log(results);
				//tab_idquestion = results;
			}
			app();
			res.render('resultat', { title: 'AskThem', rubrique: 'Reponse', response});
		//QCO
		}else{

			const app = async () => {
				let results = await qcoDao.read_where(question[0].id_question)
				//console.log(results);
				//tab_idquestion = results;
			}
			app();

			//console.log(tab_idquestion);

      const app = async () => {
        let results = await repOuvertesDao.read_where(results[0].id_QCO)
        //console.log(results);
        //tab_idquestion = results;
      }
      app();
	/*		connection.query("SELECT * FROM reponsesOuvertes WHERE id_QCO='"+tab_idquestion.id_QCO+"'", function (error, results, fields) {
				console.log(results);
				response = results;
			});*/

      const app = async () => {
        let results = await participDao.read_where(req.session.resultats)
      }
      app();
	/*		connection.query("SELECT id_participant FROM participer WHERE id_resultat='"+req.session.resultats+"'", function (error, results, fields) {
				console.log(results);
				liste_etu = results;
			});*/

			for(var i=0; i<(liste_etu.length); i++)
			{
				connection.query("SELECT id_reponsesOuvertes FROM choix_reponses WHERE id_participant='"+liste_etu[i].id_participant+"'", function (error, results, fields) {
					console.log(results);
					reponse_inte[i] = results;
				});
			}

			for(var j=0; j<(liste_etu.length); i++)
			{
				connection.query("SELECT intitule_rep FROM choix_reponses WHERE id_participant='"+reponse_inte[j].id_reponsesOuvertes+"'", function (error, results, fields) {
					console.log(results);
					reponse_etu[j] = results;
				});
			}

			res.render('resultat_QCO', { title: 'AskThem', rubrique: 'Reponse', reponses: reponse_etu });
		}
	}
	}
});

module.exports = router;
