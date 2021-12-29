const express = require('express');
const router = express.Router();
var mysql = require('mysql')
const fs = require('fs');

function cost(req,res){

	var conn = mysql.createConnection({
		host: "softeng-db.mysql.database.azure.com", 
		user: "softeng@softeng-db",
		password: "i6iNNUiu", 
		database: "tollways", 
		port: 3306 ,
		ssl:{
			ca: fs.readFileSync(__dirname + '/BaltimoreCyberTrustRoot.crt.pem')
		}
	});

	conn.connect(function(err){
		if(err) throw err;
		console.log("connected");
		let op1_ID = req.params['op1_ID'];
		let op2_ID = req.params['op2_ID'];
		let date_from = req.params['date_from'];
		let date_to = req.params['date_to'];
		 
		// "set @row_number = 0; \
		let myquery = "select count(*) as NumberOfPasses,\
		sum(P.charge) as PassesCost\
		from Passes as P inner join Stations as S\
		on P.stationRef = S.stationID\
		where S.stationProvider = '"+op1_ID+"' and P.hn = '"+op2_ID+"'\
		and STR_TO_DATE(P.timestamp,'%d/%m/%Y %H:%i') >= DATE_FORMAT('"+date_from+"', '%Y-%m-%d %H:%i')\
		and STR_TO_DATE(P.timestamp,'%d/%m/%Y %H:%i') <= DATE_FORMAT('"+date_to+"', '%Y-%m-%d %H:%i')\
		order by P.timestamp;";

		// let limit = req.query.limit; //this is implemented in express module
		// // console.log(limit);
		// if(limit==undefined || Number.isInteger(Number(limit))==false){}
		// else{ myquery = myquery + " LIMIT " + Number(limit); }
	
		console.log(myquery);
		conn.query(myquery, function(err, result, fields){
			if(err) throw err;
			res.send(result);
		});
	});
	// conn.end();
}

router.get('/PassesCost/:op1_ID/:op2_ID/:date_from/:date_to', cost);
module.exports = router;