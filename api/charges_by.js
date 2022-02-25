const express = require('express');
const router = express.Router();
var mysql = require('mysql')
const fs = require('fs');
const { parse } = require('json2csv')
const config = require('./config')

const checkstation = (station) => {
	const s = new Set(['AO', 'GF', 'EG', 'KO', 'MR', 'NE', 'OO']);
	return (s.has(station.substring(0,2)))
}

const checkdate = (date) => {
	return (date.length===8 && !isNaN(date))
}

function charges(req,res){

	var conn = mysql.createConnection({
		host: config.host, 
		user: config.user,
		password: config.password, 
		database: config.database, 
		port: config.port,
		ssl:{
			ca: fs.readFileSync(__dirname + config.ssl)
		}
	});

	conn.connect(function(err){
		// if(err) throw err;
		let op_ID = req.params['op_ID'];
		let date_from = req.params['date_from'];
		let date_to = req.params['date_to'];
		
		if (!checkstation(op_ID)) {
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
		
		
		let myquery = "select P.hn as VisitingOperator,\
		count(*) as NumberOfPasses,\
		sum(P.charge) as PassesCost\
		from Passes as P inner join Stations as S\
		on P.stationRef = S.stationID\
		where substring(S.stationID,1,2) = '"+op_ID+"' and P.hn <> '"+op_ID+"'\
		and STR_TO_DATE(P.timestamp,'%d/%m/%Y %H:%i') >= DATE_FORMAT('"+date_from+"', '%Y-%m-%d %H:%i') \
		and STR_TO_DATE(P.timestamp,'%d/%m/%Y %H:%i') <= DATE_FORMAT('"+date_to+"', '%Y-%m-%d %H:%i')\
		group by P.hn\
		order by VisitingOperator;";

	
// 		console.log(myquery);
		conn.query(myquery, function(err, result, fields){
			conn.end();
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

router.get('/ChargesBy/:op_ID/:date_from/:date_to', charges);
module.exports = router;