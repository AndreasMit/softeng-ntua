const express = require('express');
const router = express.Router();
var mysql = require('mysql')
const fs = require('fs');

function perStation(req,res){

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
		let station = req.params['stationID'];
		let datefrom = req.params['date_from'];
		let dateto = req.params['date_to'];
		console.log(dateto);
		console.log(datefrom);
		 
		// "set @row_number = 0; \
		let myquery = "select (@row_number:=@row_number + 1) AS PassIndex, \
		P.passID as PassID, \
		STR_TO_DATE(P.timestamp,'%d/%m/%Y %H:%i') as PassTimeStamp, \
		P.vehicleRef as VehicleID, \
		V.tagProvider as TagProvider, \
		case when P.p <> 'home' then 'visitor' else 'home' end as PassType, \
		P.charge as PassCharge \
		from Passes as P inner join Vehicles as V \
		on P.vehicleRef = V.vehicleID \
		where P.stationRef = '"+ station +"' \
		and STR_TO_DATE(P.timestamp,'%d/%m/%Y %H:%i') >= DATE_FORMAT('"+datefrom+"', '%Y-%m-%d %H:%i') \
		and STR_TO_DATE(P.timestamp,'%d/%m/%Y %H:%i') <= DATE_FORMAT('"+dateto+"', '%Y-%m-%d %H:%i') \
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

router.get('/PassesPerStation/:stationID/:date_from/:date_to', perStation);
module.exports = router;