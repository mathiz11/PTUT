var express = require('express');
var bodyParser = require("body-parser");
var router = express.Router(); 
var session = require('express-session');
var app = express();
// serveur html

//Moteur de template
app.set('view engine', 'ejs');

//Middleware
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'okpourquoi',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use( require('../middlewares/flash'))

// Routes 

app.get('/', (request, response) => {
  console.log(request.session)
  response.render('pages/index')
})

 
app.post('/', function(request, response) {
  if (request.body.reponse_1 === undefined || request.body.reponse_1 === ' ') {
    request.flash('error', "Il y a une erreur")
  }
  else {
    let Message = require('../models/message')
    Message.create(request.body.message,function() {
      request.flash('success', "Merci !")
    })
  }

  response.redirect('/')
});


app.listen(2000);

router.get('/', function(req, res, next) {
    res.render('session_uti', { title: 'AskThem'});

    
  });
  
  
  module.exports = router;