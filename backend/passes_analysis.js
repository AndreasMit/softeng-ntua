const express = require('express');
const router = express.Router();
var mysql = require('mysql')
const fs = require('fs');

function analysis(req,res){

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
		let station = req.params.stationID;
		let limit = req.query.limit; //this is implemented in express module
		// console.log(limit);
		let myquery = "SELECT charge FROM passes WHERE stationRef='"+station+"'";

		if(limit==undefined || Number.isInteger(Number(limit))==false){}
		else{ myquery = myquery + " LIMIT " + Number(limit); }
	
		console.log(myquery);
		conn.query(myquery, function(err, result, fields){
			if(err) throw err;
			res.send(result);
		});
	});
	// conn.end();
}

router.get('/PassesAnalysis/:stationID', analysis);
module.exports = router;