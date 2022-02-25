const express = require('express');
const router = express.Router();
var mysql = require('mysql')
const fs = require('fs');
const { parse } = require('json2csv')
const config = require('./config')


const checkpassID = (passID) => {
	return (passID.length==10)
}

const checkvehicleID = (vehicleID) => {
	return (vehicleID.length==12)
}

function insert(req,res){

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
		let id = req.params['passID'];
		let time = req.params['date'];
		time = time.substring(6,8)+"/"+time.substring(4,6)+"/"+time.substring(0,4)+" "+time.substring(8,10)+":"+time.substring(10,12);
		let station = req.params['stationID'];
		let vehicle = req.params['vehicleID'];
		let chrge = req.params['charge'];
		let hn = req.params['visitingOperator'];
		let p = req.params['homeaway'];
		let status = 'unpaid';
			
		if (!checkpassID(id)) {
			res.status(400)
			res.send(new Error('Bad request: invalid passID'))
			return;
		}
		if (!checkvehicleID(vehicle)) {
			res.status(400)
			res.send(new Error('Bad request: invalid vehicleID'))
			return;
		}
		let myquery =  "INSERT INTO passes(passID,timestamp,stationRef,vehicleRef,charge,t,v,hn,p,status) VALUES ('"+id+"','"+time+"','"+station+"','"+vehicle+"',"+chrge+",'"+station+"','"+vehicle+"','"+hn+"','"+p+"','"+status+"');";
		console.log(myquery);
		conn.query(myquery, function(err, result, fields){
			conn.end();
			if(err) {
				res.status(500)
				res.send(new Error('Internal server error'))
				// throw err;
				console.log('Duplicate Entry');
				return;
			}
			if (result.length===0) {
				res.status(402)
				res.send(new Error('No data'))
				return;
			}
			if(req.query.format === 'csv'){
				res.send(parse(result))
			}
			else {
				res.send(result)
			}
		});
	});
	
}

router.get('/Insert/:passID/:date/:stationID/:vehicleID/:charge/:visitingOperator/:homeaway', insert);
//testing
//https://localhost:9103/interoperability/api/Insert/TOB7336760/1120190137/OO12/AT19HLV57173/2.8/OO/home/
module.exports = router;