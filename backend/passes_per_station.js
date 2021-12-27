const express = require('express');
const router = express.Router();
var mysql = require('mysql')


function perStation(req,res){
	var conn = mysql.createConnection({
		host: "softeng-db.mysql.database.azure.com", 
		user: "softeng@softeng-db",
		password: i6iNNUiu, 
		database: tollways, 
		port: 3306, 
		// ssl:{ca:fs.readFileSync({ca-cert filename})}
	});

	conn.connect(function(err){
		if(err) throw err;
		console.log("connected");
		let myquery = "SELECT * FROM stations";
		conn.query(myquery, function(err, result, fields){
			if(err) throw err;
			res.send(result);
		});
	});
}

router.get('/PassesPerStation', perStation);
module.exports = router;