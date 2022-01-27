const express = require('express');
const router = express.Router();
var mysql = require('mysql')
const fs = require('fs');
const { parse } = require('json2csv')


const checkpassID = (passID) => {
	return (passID.length==10)
}

const checkvehicleID = (vehicleID) => {
	return (vehicleID.length==12)
}

function insert(req,res){

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
		let id = req.params['passID'];
		let time = req.params['date'];
		time = time.substring(0,1)+"/"+time.substring(1,2)+"/"+time.substring(2,6)+" "+time.substring(6,8)+":"+time.substring(8,10);
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
			}
			else {
				res.send(result)
			}
		});
	});
	// conn.end();
}

router.get('/Insert/:passID/:date/:stationID/:vehicleID/:charge/:visitingOperator/:homeaway', insert);
module.exports = router;