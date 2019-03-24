var mysql        = require('mysql');
var connection   = mysql.createConnection({
  host     : "localhost",
  user     : "askthem",
  password : "!askthem",
  database : "askthem"
});

connection.connect(function(err){
	if (err)
	{		
		console.log("Connection failed !")
		throw err;
	}
	console.log("Connecté !");
});

connection.on('error', function(err){
  console.log("[mysql error]", err);
});

module.exports = connection;

