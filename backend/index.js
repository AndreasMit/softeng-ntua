const express = require('express')
const app = express()
const port = 9103
// const bodyparser = require('body-parser') //middleware for using json format

baseurl = '/interoperability/api';

// app.use(bodyparser.json())

app.listen(port,() => { console.log('app listening on port', port);} );

// app.get('/', (req,res) => { res.send("hello world")} );

//send html file
app.get(baseurl, (req,res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
})

// different file for different endpoints-services
const passes_per_st = require("./passes_per_station.js");
const passes_anal = require("./passes_analysis.js");
const passes_cost = require("./passes_cost.js");
const charges_by = require("./charges_by.js");

//bind all endpoints to app router
app.use(baseurl, passes_per_st);
app.use(baseurl, passes_anal);
app.use(baseurl, passes_cost);
app.use(baseurl, charges_by);

// app.post('/checkParser', (req,res) => {
// 	console.log("using body-parser:",  req.bodyparser.value)
// 	req.send({"body": req.body})
// })

