const express = require('express');
const router = express.Router();
var mysql = require('mysql')
const fs = require('fs');
const axios = require('axios')
const config = require('../config')

const app = express();

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

function resets(req,res){

	console.log("entered func");
	// let op_ID = req.params['op_ID'];
	// let date_from = req.params['date_from'];
	// let date_to = req.params['date_to'];
	 
	let myquery1 = "delete from Stations;";
	let myquery2 = fs.readFileSync('../database/ddl/station.sql').toString();
	console.log("queries setted")

	// let limit = req.query.limit; //this is implemented in express module
	// console.log(limit);
	// if(limit==undefined || Number.isInteger(Number(limit))==false){}
	// else{ myquery = myquery + " LIMIT " + Number(limit); }

	console.log(myquery1);
	conn.query(myquery1, function(err, result, fields){
		if(err) throw err;
		if(result.fieldCount == 0){
			res.send({"status":"OK"})
		}
		else{
			res.send({"status":"failed"})
		}
	});	
	console.log(myquery2)
	conn.query(myquery2, function(err, result, fields){
	if(err) throw err;
	if(result.fieldCount == 0){
		res.send({"status":"OK"})
	}
	else{
		res.send({"status":"failed"})
	}
});	
	conn.end();
}
conn.connect(function(err){
	if(err) throw err;
// 	console.log("connected");
});
// console.log("test");
router.post('/admin/resetstations', resets)
module.exports = router;