var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mail = require('../lib/mailconn');
const userDao = require('../dao/dao_user.js');
const UserDao = new userDao();

var urlencodedParser = bodyParser.urlencoded({extended: false});
router.use(bodyParser());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mdp_oublie', { title: 'AskThem', error:''});
});

router.post('/', urlencodedParser, function(req, res) {
	const app = async () => {
			let results = await UserDao.read_user_pwd(req.body.courriel);
			if (results != '')
			{
				mail.message({
					from: 'purple.laidies@gmail.com',
					to: 'estelle.angosto@gmail.com',
					subject: 'Mot de passe oublié'
				})
				.body('Votre mot de passe est '+results.mdp+' .')
				.send(function(err){
					if (err) throw err;
					console.log('Sent');
				});
			}else res.render('mdp_oublie', { title: 'AskThem', error:'Mail introuvable'});
	}
	app();
});

module.exports = router;
