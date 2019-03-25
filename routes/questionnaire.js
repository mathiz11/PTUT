var express = require('express');
var router = express.Router();
const Quest_Dao = require('../dao/dao_quest.js');
const questDao = new Quest_Dao();

function isAuthenticated(req, res, next) {
  if (req.session.user)
      return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SIGNIN PAGE
  res.redirect('/signin');
}

/* GET home page. */
router.get('/', isAuthenticated, function(req, res, next) {
  const request = async () => {
    const results = await questDao.read_where(req.session.user.id_membre);
    res.render('questionnaire', { title: 'AskThem', questionnaires: results, error: null});
  }
  request();
});

router.get('/delete/:id', isAuthenticated, function(req, res, next) {
  const request = async () => {
    let results = await questDao.deleteEntity(req.param("id"));
    if(!results) {
      const error = "<div id=\"error\">Erreur lors de la suppression de questionnaire</div>";
      res.render('questionnaire', { title: 'AskThem', questionnaires: results, error: error});
    }
  }
  request();
  res.redirect('/questionnaire')
});

router.get('/insert', isAuthenticated, function(req, res, next) {
  const request = async () => {
    let results = await questDao.saveEntity(req.session.user.id_membre,'undef',new Date(), new Date(), 0);
    if(!results) {
      const error = "<div id=\"error\">Erreur lors de l'ajout de questionnaire</div>";
      res.render('questionnaire', { title: 'AskThem', questionnaires: results, error: error});
    }
  }
  request();
  res.redirect('/questionnaire');
});

router.get('/:idQnair', isAuthenticated, function(req, res, next) {
  const request = async () => {
    let results = await questDao.read_quest_where(req.param("idQnair"));
    res.render('monQuestionnaire', { title: 'AskThem', element: results, error: null});
  }
  request();
});

router.get('/:idQnair/question', isAuthenticated, function(req, res, next) {
  const request = async () => {
    let results = await questDao.select_questions(req.param("idQnair"));
    res.render('mesQuestions', { title: 'AskThem', id_questionnaire: req.param.idQnair ,questions: results, error: null});
  }
  request();
});


module.exports = router;
