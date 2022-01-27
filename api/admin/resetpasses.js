const express = require('express');
const router = express.Router();
var mysql = require('mysql')
const fs = require('fs');
const axios = require('axios')

const app = express();

var conn = mysql.createConnection({
	host: "softeng-db.mysql.database.azure.com", 
	user: "softeng@softeng-db",
	password: "i6iNNUiu", 
	database: "tollways", 
	port: 3306 ,
	ssl:{
		ca: fs.readFileSync(__dirname + '/../BaltimoreCyberTrustRoot.crt.pem')
	}
});

function resetp(req,res){

	console.log("entered func");
	// let op_ID = req.params['op_ID'];
	// let date_from = req.params['date_from'];
	// let date_to = req.params['date_to'];
	 

	let myquery = "delete from Passes;"; 


	// let limit = req.query.limit; //this is implemented in express module
	// // console.log(limit);
	// if(limit==undefined || Number.isInteger(Number(limit))==false){}
	// else{ myquery = myquery + " LIMIT " + Number(limit); }

	console.log(myquery);
	conn.query(myquery, function(err, result, fields){
		if(err) throw err;
		if(result.fieldCount == 0){
			res.send({"status":"OK"})
		}
		else{
			res.send({"status":"failed"})
		}
	});	
	// conn.end();
}
conn.connect(function(err){
	if(err) throw err;
// 	console.log("connected");
});
// console.log("test");
router.post('/admin/resetpasses', resetp)
module.exports = router;