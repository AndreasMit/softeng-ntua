var mysql = require('mysql');
const fs = require('fs');
var path = require("path");


describe('Database Connectivity Test', function () {
    it('check status 200', function (done) {

        var conn = mysql.createConnection({
        host: "softeng-db.mysql.database.azure.com", 
        user: "softeng@softeng-db",
        password: "i6iNNUiu", 
        database: "tollways", 
        port: 3306 ,
        ssl:{
            ca: fs.readFileSync(path.join(__dirname, '../api/BaltimoreCyberTrustRoot.crt.pem'))
        }

        });

        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
        conn.connect(done);
    });
});


