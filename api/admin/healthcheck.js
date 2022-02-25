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
		if(err) throw err;
		if(conn.state === 'disconnected') {
			res.send({ "status": 'failed',"dbconnection":{"host":"softeng.mysql.database.azure.com","user":"softeng@softeng",
			"password":"i6iNNUiu","database":"tollways","port":"3306","ssl":"{ca: fs.readFileSync(__dirname + '/../BaltimoreCyberTrustRoot.crt.pem')}"
			} })
		//router.get('/admin/healthcheck', {status: 'failed', dbconnection: 'connection_string'},health_check);
		}
		else {
			var check = {"status": 'OK',"state": conn.state, "host":conn._host, "user": conn.user, "port":conn.port, "database":conn.database }
			res.send(check)
		}
		conn.end()
	})	
}

router.get('/admin/healthcheck', health_check);
module.exports = router;