const express = require('express');
const router = express.Router();
var mysql = require('mysql')
const fs = require('fs');
const axios = require('axios')
const config = require('../config')
const app = express();



function resets(req,res){

	 var conn = mysql.createConnection({
		host: config.host, 
		user: config.user,
		password: config.password, 
		database: config.database, 
		port: config.port,
		ssl:{
			ca: fs.readFileSync(__dirname + '/..' +config.ssl)
		}
	});

	conn.connect(function(err){
		// if(err) throw err;

		let myquery1 = "delete from Stations;";
		let myquery2 = fs.readFileSync('../database/dml/station.sql').toString();

<<<<<<< Updated upstream
// 		console.log(myquery1);
=======
		//console.log(myquery1);
>>>>>>> Stashed changes
		conn.query(myquery1, function(err, result, fields){
			if(err) {
				res.status(500)
				res.send(new Error('Internal server error: aux q failed'))
				return;
			}
			

		});
		conn.query(myquery2, function(err, result, fields){
			conn.end();
			if(err) {
				res.status(500)
				res.send(new Error('Internal server error'))
				return;
			}
			// console.log(result);
			if (result.fieldCount===0) {
				res.send({"status":"OK"})
				return;
			}
			else{
				res.send({"status":"failed"})
			}
		});	
	});
	
}
router.post('/admin/resetstations', resets)
module.exports = router;