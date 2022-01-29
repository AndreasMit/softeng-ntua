
var assert = require('assert');
const https = require('https');
let chai = require('chai');
let should = chai.should();
chai.use(require('chai-things'));



describe('/GET PassesCost', function () {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    it('GET total number of passes at stations with op1_ID for vehicles with tags of op2_ID and total cost between 1/11/2020 and 30/11/2021', function(done) {
      
        https.get('https://localhost:9103/interoperability/api/PassesCost/AO/EG/20201101/20211130',function(res){
            assert.equal(200, res.statusCode);
            res.on('data', (d) => {
               // process.stdout.write(d);
               
               var datastring = d.toString('utf8');
               var myObj = JSON.parse(datastring);
                myObj.should.contain.a.thing.with.property('NumberOfPasses');
                myObj.should.contain.a.thing.with.property('PassesCost');
              });
            done();
        });
});

});







