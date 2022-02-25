const express = require('express');
const router = express.Router();
var mysql = require('mysql')
const fs = require('fs');
const config = require('../config')

var conn = mysql.createConnection({
		host: config.host, 
		user: config.user,
		password: config.password, 
		database: config.database, 
		port: config.port,
		ssl:{
			ca: fs.readFileSync(__dirname +'/..' +config.ssl)
		}
	});
function health_check(req,res){
	conn.connect(function(err){
		if(conn.state === 'disconnected') {
			res.send({ "status": 'failed',"state": conn.state,"host":conn.host, "user": conn.user, "port":conn.port, "database":conn.database})
		}
		else {
			var check = {"status": 'OK',"state": conn.state, "host":conn.host, "user": conn.user, "port":conn.port, "database":conn.database }
			res.send(check)
		}
		conn.end()
	})	
}

router.get('/admin/healthcheck', health_check);
module.exports = router;