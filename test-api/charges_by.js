var assert = require('assert');
const https = require('https');
let chai = require('chai');
let should = chai.should();
chai.use(require('chai-things'));



describe('/GET ChargesBy', function () {
    it('GET all the charges between 1/1/2020 and 21/12/2020', function(done) {
        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

        https.get('https://localhost:9103/interoperability/api/ChargesBy/AO/20200101/20201221',function(res){
            assert.equal(200, res.statusCode);
            res.on('data', (d) => {
               // process.stdout.write(d);
               
               var datastring = d.toString('utf8');
               var myObj = JSON.parse(datastring);
                myObj.should.contain.a.thing.with.property('VisitingOperator');
                myObj.should.contain.a.thing.with.property('NumberOfPasses');
                myObj.should.contain.a.thing.with.property('PassesCost');
              });
            done();
        });
});

});







