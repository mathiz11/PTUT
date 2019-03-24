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
  let listQ = [];
  connection.query("select * from questionnaires where id_membre = " + req.session.user.id_membre, 
  function(err, results, fields) {
    if (err) throw err;
    res.render('questionnaire', { title: 'AskThem', questionnaires: results});
  });
  console.log(listQ);
});

module.exports = router;
