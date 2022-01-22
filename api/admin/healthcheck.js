const express = require('express');
const router = express.Router();
var mysql = require('mysql')
const fs = require('fs');

function health_check(req,res){

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
	
	if(conn.state === 'disconnected') {
		res.send({ status: 'OK' })
		//router.get('/admin/healthcheck', {status: 'failed', dbconnection: 'connection_string'},health_check);
	}
	else {
		//router.get('/admin/healthcheck', {status: 'OK', dbconnection: 'connection_string'});
		res.send({ status: 'failed' })
	}
}

router.get('/admin/healthcheck', health_check);
module.exports = router;