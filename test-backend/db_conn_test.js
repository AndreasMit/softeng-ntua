var mysql = require('mysql');
const fs = require('fs');
var path = require("path");
const config = require('../api/config');


describe('Database Connectivity Test', function () {
    it('check status 200', function (done) {


        var conn = mysql.createConnection({
            host: config.host, 
            user: config.user,
            password: config.password, 
            database: config.database, 
            port: config.port,
            ssl:{
                ca: fs.readFileSync(__dirname + '/../api'+config.ssl)
            }
    
    });

        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
        conn.connect(done);
    });
});


