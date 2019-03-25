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
      }
      app();

    res.render('profil', { title: 'AskThem', rubrique: 'Profil', infomail:"", infomdp:"" });
});

router.post('/infochange', isAuthenticated, function(req, res, next){
  var mail_f = req.body.mail;
  var amdp = req.body.amdp;
  var nmdp = req.body.nmdp;
  var cmdp = req.body.cmdp;

  let varinfomail = "";
  let varinfomdp = "";

  if(mail_f != "") {
    if(mail_f == req.session.user.mail)
    {
      varinfomail = "Les adresses mails sont identiques.";
    } else {
      varinfomail = "L'adresse mail a bien été changée.";
        const app = async () => {
          let results = await userDao.update_mail(mail_f, req.session.user.id_membre);
          console.log(results);
        }
        app();
    }
  }

/*  if(amdp != "") {
    if(amdp == req.session.user.mdp) {
      varinfomdp = "Le mot de passe est identique.";
    } else {
      if(nmdp != cmdp) {
        varinfomdp = "Veuillez saisir les mêmes mots de passe."
      } else {
        varinfomdp = "Le mot de passe a bien été changé.";
      }
    }
  }*/

  res.render('profil', { title: 'AskThem', rubrique: 'Profil', infomail: varinfomail, infomdp: varinfomdp});
});

module.exports = router;
