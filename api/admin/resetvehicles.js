const express = require('express');
const router = express.Router();
var mysql = require('mysql')
const fs = require('fs');
const axios = require('axios')
const config = require('../config')

const app = express();

function resetv(req,res){

	var conn = mysql.createConnection({
		host: config.host, 
		user: config.user,
		password: config.password, 
		database: config.database, 
		port: config.port,
		ssl:{
			ca: fs.readFileSync(__dirname + '/..' +config.ssl)
		}
	})

	console.log("entered func");
	// let op_ID = req.params['op_ID'];
	// let date_from = req.params['date_from'];
	// let date_to = req.params['date_to'];
	 
	conn.connect(function(err){
		if(err) throw err;
		let myquery1 = "delete from Vehicles;";
		let myquery2 = fs.readfile('/../../database/ddl/vehicles.sql') 
		console.log("queries setted")

	// let limit = req.query.limit; //this is implemented in express module
	// // console.log(limit);
	// if(limit==undefined || Number.isInteger(Number(limit))==false){}
	// else{ myquery = myquery + " LIMIT " + Number(limit); }

	// console.log(myquery1);
		conn.query(myquery1, function(err, result, fields){
			if(err) throw err;
			if(result.fieldCount == 0){
				res.send({"status":"OK"})
			}
			else{
				res.send({"status":"failed"})
			}
		});
		conn.query(myquery2, function(err, result, fields){
			conn.end();
			if(err) throw err;
			if(result.fieldCount == 0){
				res.send({"status":"OK"})
			}
			else{
				res.send({"status":"failed"})
			}
		});	
	});
};

// console.log("test");
router.post('/admin/resetvehicles', resetv)
module.exports = router;