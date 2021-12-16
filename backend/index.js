const express = require('express')
const app = express()
const port = 9103

app.listen(port,() => { console.log('app listening on port', port);} );

app.get('/', (req,res) => { res.send("hello world")} );