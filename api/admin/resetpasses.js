const express = require('express');
const router = express.Router();
var mysql = require('mysql')
const fs = require('fs');
const axios = require('axios')
const config = require('../config')

const app = express();



function resetp(req,res){

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

	let myquery = "delete from Passes;"; 

	conn.connect(function(err){

		conn.query(myquery, function(err, result, fields){
			conn.end();
			if(err) {
				res.status(500)
				res.send(new Error('Internal server error'))
				return;
			}
			//  console.log(result);
			if (result.fieldCount===0) {
				res.send({"status":"OK"})
				return;
			}
			else{
				res.send({"status":"failed"})
			}
		});	
	})
}

router.post('/admin/resetpasses', resetp)
module.exports = router;