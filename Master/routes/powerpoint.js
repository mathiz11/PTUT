var express = require('express');
var router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.session.user)
      return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM POWERPOINT PAGE
  res.redirect('/powerpoint');
}

function LienAuHasard(){
	var Url = new Array;
	var base = new Array;
	var Random = new Array;
	base = "http://AskThem.com/";
	Random = Math.floor(Math.random() * 100000);
	document.write("Le lien du questionnaire est " + base + Random);
	Url = base + Random;
	console.log(Url);
}

router.get('/', isAuthenticated, function(req, res, next) {
res.render('powerpoint', { title: 'AskThem', rubrique: 'powerpoint' });
});

module.exports = router;