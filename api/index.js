const express = require('express');
const app = express();
const port = 9103;
var path = require('path');
const fs = require('fs')
// const bodyparser = require('body-parser') //middleware for using json format

//support Secure connection with self signed certificate
const https = require('https');
var options = {
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/server.cert'),
};
var server = https.createServer(options, app).listen(port,() => { console.log('app listening on port', port);} );

baseurl = '/interoperability/api';

// app.use(bodyparser.json())
// app.get(baseurl, (req,res) => { res.send("hello world")} );

//send html file
app.get(baseurl, (req,res) => {
	res.sendFile(path.join(__dirname + '/../frontend/index.html'));
});

// different file for different endpoints-services
const passes_per_st = require('./passes_per_station.js');
const passes_anal = require('./passes_analysis.js');
const passes_cost = require('./passes_cost.js');
const charges_by = require('./charges_by.js');

///// added for admin /////////////////////
const healthcheck = require('./admin/healthcheck.js');
const resetpasses = require('./admin/resetpasses.js');
const resetstations = require('./admin/resetstations.js');
const resetvehicles = require('./admin/resetvehicles.js');

app.use(baseurl, healthcheck);
app.use(baseurl, resetpasses);
app.use(baseurl, resetstations);
app.use(baseurl, resetvehicles);
//////////////////////////////////////////

//bind all endpoints to app router
app.use(baseurl, passes_per_st);
app.use(baseurl, passes_anal);
app.use(baseurl, passes_cost);
app.use(baseurl, charges_by);


// app.post('/checkParser', (req,res) => {
// 	console.log("using body-parser:",  req.bodyparser.value)
// 	req.send({"body": req.body})
// })

