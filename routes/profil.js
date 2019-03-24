var express = require('express');
var router = express.Router();
const UserDao = require('../dao/dao_user.js');
const userDao = new UserDao();

function isAuthenticated(req, res, next) {
  if (req.session.user)
      return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SIGNIN PAGE
  res.redirect('/signin');
}

/* GET home page. */
router.get('/', isAuthenticated, function(req, res, next) {
//  console.log(req.session.user.id_membre);
  	const app = async () => {
          let results = await userDao.read_mail(req.session.user.id_membre);
          console.log(results);
      }
      app();

  res.render('profil', { title: 'AskThem', rubrique: 'Profil', info:"" });
});

router.post('/infochange', isAuthenticated, function(req, res, next){
  var mail_f = req.body.mail;//.document.getElementById("email").value;
  console.log("Route effective ! Vraiment ?", mail_f);
  let varinfo = "Ce que tu veux";
  res.render('profil', { title: 'AskThem', rubrique: 'Profil', info:varinfo });
});

module.exports = router;
