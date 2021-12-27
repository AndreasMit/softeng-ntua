const express = require('express');
const router = express.Router();
var mysql = require('mysql')
const fs = require('fs');

function perStation(req,res){

	var conn = mysql.createConnection({
		host: "softeng-db.mysql.database.azure.com", 
		user: "softeng@softeng-db",
		password: "i6iNNUiu", 
		database: "tollways", 
		port: 3306 ,
		ssl:{
			ca: fs.readFileSync(__dirname + '/BaltimoreCyberTrustRoot.crt.pem')
		}
	});

	conn.connect(function(err){
		if(err) throw err;
		console.log("connected");
		let myquery = "SELECT * FROM tollways.vehicles";
		conn.query(myquery, function(err, result, fields){
			if(err) throw err;
			res.send(result);
		});
	});
	// conn.end();
}

router.get('/PassesPerStation', perStation);
module.exports = router;