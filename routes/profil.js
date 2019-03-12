var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('profil', { title: 'AskThem', rubrique: 'Profil' });
});

module.exports = router;
