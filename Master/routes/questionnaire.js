var express = require('express');
var router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.session.user)
      return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SIGNIN PAGE
  res.redirect('/signin');
}

/* GET home page. */
router.get('/', isAuthenticated, function(req, res, next) {
  res.render('questionnaire', { title: 'AskThem', rubrique: 'Questionnaire' });
});

module.exports = router;
