var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const UserDao = require('../dao/dao_user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('connexion', { title: 'AskThem' });
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
})

.use(function(req, res, next){
	res.setHeader('Content-Type', 'text/plain');
	res.status(404).send('Page introuvable !');
})

module.exports = router;
