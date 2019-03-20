var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const UserDao = require('../dao/dao_user.js');


const QuestDao = require('../dao/dao_quest.js');
const questDao = new QuestDao();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('connexion', { title: 'AskThem' });

  const tmp = async () => {
      //let ent = {id_questionnaire:3, id_membre:1, intitule_quest:"Testupdate", date_crea:"2019-03-20", date_modif:"2019-03-20", tps_attente:0};
  		let results = await questDao.deleteEntity(3);
  	}
  	tmp();

});

const userDao = new UserDao();

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.post('/connecter/', urlencodedParser, function(req, res) {
	const app = async () => {
		let results = await userDao.read_where(req.body.courriel, req.body.mdp);
		if (results != '') {
				res.send("<p> Connexion établie </p>");
			}
			else{
				res.send("<p> Identifiant erronée </p>");
		};
	}
	app();

/*  const tmp = async () => {
		let results = await userDao.read_user_pwd(req.body.courriel);
		console.log(results);
	}
	tmp();
*/
})

.use(function(req, res, next){
	res.setHeader('Content-Type', 'text/plain');
	res.status(404).send('Page introuvable !');
})

module.exports = router;
