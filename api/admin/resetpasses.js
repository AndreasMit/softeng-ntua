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

function resetp(req,res){

	let myquery = "delete from Passes;"; 

	conn.connect(function(err){
		// if(err) throw err;

		conn.query(myquery, function(err, result, fields){
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

router.post('/admin/resetpasses', resetp)
module.exports = router;