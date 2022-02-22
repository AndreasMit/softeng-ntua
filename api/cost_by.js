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

function cost(req,res){

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
		if(err) throw err;
		let op_ID = req.params['op_ID'];
		let date_from = req.params['date_from'];
		let date_to = req.params['date_to'];
		
		if (!checkstation(op_ID)) {
			res.status(400)
			res.send(new Error('Bad request: invalid op_ID'))
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

		
		let myquery = "select substring(P.stationRef,1,2) as VisitedOperator,\
		count(*) as NumberOfPasses,\
		sum(P.charge) as PassesCost\
		from Passes as P\
		where P.hn = '"+op_ID+"' and P.p = 'away'\
		and STR_TO_DATE(P.timestamp,'%d/%m/%Y %H:%i') >= DATE_FORMAT('"+date_from+"', '%Y-%m-%d %H:%i') \
		and STR_TO_DATE(P.timestamp,'%d/%m/%Y %H:%i') <= DATE_FORMAT('"+date_to+"', '%Y-%m-%d %H:%i')\
		group by substring(P.stationRef,1,2)\
		order by VisitedOperator;";
	
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
			if(req.query.format === 'csv'){
				res.send(parse(result))
			}else{res.send(result)}
		});
	});
	// conn.end();
}

router.get('/CostBy/:op_ID/:date_from/:date_to', cost);
module.exports = router;