const express = require('express');
const router = express.Router();
var mysql = require('mysql')
const fs = require('fs');
const { parse } = require('json2csv')


const checkstation = (station) => {
	const s = new Set(['AO', 'GF', 'EG', 'KO', 'MR', 'NE', 'OO']);
	return (s.has(station.substring(0,2)))
}

const checkdate = (date) => {
	return (date.length===8 && !isNaN(date))
}

function analysis(req,res){

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
		let op1_ID = req.params['op1_ID'];
		let op2_ID = req.params['op2_ID'];
		let date_from = req.params['date_from'];
		let date_to = req.params['date_to'];
		if (!checkstation(op1_ID)) {
			res.status(400)
			res.send(new Error('Bad request: invalid op1_ID'))
			return;
		}
		if (!checkstation(op2_ID)) {
			res.status(400)
			res.send(new Error('Bad request: invalid op2_ID'))
			return;
		}
		if (!checkdate(date_from)) {
			res.status(400)
			res.send(new Error('Bad request: invalid date_from'))
			return;
		}
		if (!checkdate(date_to)) {
			res.status(400)
			res.send(new Error('Bad request: invalid date_to'))
			return;
		}
		
		let aux_query = 'set @row_number = 0;'
		let myquery = "select (@row_number:=@row_number + 1) AS PassIndex,\
		P.passID as PassID, \
		P.stationRef as StationID,\
		P.timestamp as PassTimeStamp,\
		P.vehicleRef as VehicleID,\
		P.charge as PassCharge\
		from Passes as P inner join Stations as S\
		on P.stationRef = S.stationID\
		where substring(S.stationID,1,2) = '"+op1_ID+"' and P.hn = '"+op2_ID+"'\
		and STR_TO_DATE(P.timestamp,'%d/%m/%Y %H:%i') >= DATE_FORMAT('"+date_from+"', '%Y-%m-%d %H:%i') \
		and STR_TO_DATE(P.timestamp,'%d/%m/%Y %H:%i') <= DATE_FORMAT('"+date_to+"', '%Y-%m-%d %H:%i')\
		order by P.timestamp;";

		// let limit = req.query.limit; //this is implemented in express module
		// // console.log(limit);
		// if(limit==undefined || Number.isInteger(Number(limit))==false){}
		// else{ myquery = myquery + " LIMIT " + Number(limit); }
	
// 		console.log(myquery);
		conn.query(aux_query, function(err, result, fields){
			if(err) {
				res.status(500)
				res.send(new Error('Internal server error: aux q failed'))
				throw err;
			}
			if (result.length===0) {
				res.status(402)
				res.send(new Error('No data'))
				return;
			}
		});
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
			if(req.query.format === 'csv'){
				res.send(parse(result))
			}else{res.send(result)}
		});
	});
	// conn.end();
}

router.get('/PassesAnalysis/:op1_ID/:op2_ID/:date_from/:date_to', analysis);
module.exports = router;