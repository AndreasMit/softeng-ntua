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
	 
	conn.connect(function(err){
		if(err) throw err;

	let myquery1 = "delete from Stations;";
	let myquery2 = fs.readFileSync('../database/ddl/station.sql').toString();
	console.log("queries setted")


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
		conn.end();
	if(err) throw err;
	if(result.fieldCount == 0){
		res.send({"status":"OK"})
	}
	else{
		res.send({"status":"failed"})
	}
});	
})
	
}
router.post('/admin/resetstations', resets)
module.exports = router;