var express = require('express');
var bodyParser = require("body-parser");
var router = express.Router(); 

// serveur html
var server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.listen(8080);
 
server.get('/test/page.html', function(request, response) {
  response.sendFile( __dirname  + '/page.html');
});
 
server.post('/post.html', function(request, response) {
  var p1 = request.body.p1; 
  console.log("p1=" + p1);
});

router.get('/', function(req, res, next) {
    res.render('session_uti', { title: 'AskThem'});

    
  });
  
  
  module.exports = router;