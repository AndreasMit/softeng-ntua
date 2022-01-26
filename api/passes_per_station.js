const express = require('express');
const router = express.Router();
var mysql = require('mysql')
const fs = require('fs');

const checkstation = (station) => {
	const s = new Set(['AO', 'GF', 'EG', 'KO', 'MR', 'NE', 'OO']);
	const a = station.substring(0,2);
	const b = parseInt(station.substring(2,4));
	if (!s.has(station.substring(0,2))) return (false)
	if (a === 'AO') return (b<=19)
	if (a === 'GF') return (b==0)
	if (a === 'EG') return (b<=12)
	if (a === 'KO') return (b<=9)
	if (a === 'MR') return (b<=8)
	if (a === 'NE') return (b<=16)
	if (a === 'OO') return (b<=13)
}

const checkdate = (date) => {
	return (date.length===8 && !isNaN(date))
}

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
		let station = req.params['stationID'];
		let date_from = req.params['date_from'];
		let date_to = req.params['date_to'];
		
		if (!checkstation(station)) {
			res.status(400)
			res.send(new Error('Bad request: date_from not in parameters'))
			return;
		}
		
		if (!checkdate(date_from)) {
			res.status(400)
			res.send(new Error('Bad request: date_from not in parameters'))
			return;
		}
		if (!checkdate(date_to)) {
			res.status(400)
			res.send(new Error('Bad request: date_to not in parameters'))
			return;
		}
		
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
		and STR_TO_DATE(P.timestamp,'%d/%m/%Y %H:%i') >= DATE_FORMAT('"+date_from+"', '%Y-%m-%d %H:%i') \
		and STR_TO_DATE(P.timestamp,'%d/%m/%Y %H:%i') <= DATE_FORMAT('"+date_to+"', '%Y-%m-%d %H:%i') \
		order by P.timestamp;";

		// let limit = req.query.limit; //this is implemented in express module
		// // console.log(limit);
		// if(limit==undefined || Number.isInteger(Number(limit))==false){}
		// else{ myquery = myquery + " LIMIT " + Number(limit); }
	
// 		console.log(myquery);
		conn.query(myquery, function(err, result, fields){
			if(err) {
				res.status(500)
				res.send(new Error('Internal server error'))
				throw err;
			}
			if (result.length===0) {
				res.status(402)
				res.send(new Error('No data'))
				return;
			}
			console.log(result);
		});
	});
	// conn.end();
}

router.get('/PassesPerStation/:stationID/:date_from/:date_to', perStation);
module.exports = router;