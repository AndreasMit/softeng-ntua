#! /usr/bin/env node

const chalk = require('chalk');  
const axios = require("axios");
const yargs = require('yargs')
const https = require('https')
const fs = require('fs')
const csv = require('csv-parser');
var mysql = require('mysql')

axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })

const hello = chalk.hex('#83aaff')("This is the CLI for softeng team 43!")
console.log(hello);

const usage = chalk.hex('#83aaff')("\nUsage: se2143 scope --param1 value1 [--param2 value2 ...] --format fff");

yargs.usage(usage);
// yargs.help(true) ;

yargs.command({
      command: '*',
      handler() {
            yargs.showHelp()
    }
})
yargs.showHelpOnFail(true)


// functionalities
yargs.command({
      command: 'passesperstation',
      describe: ' --station <eg.AO01> --from <eg.20211101> --to <eg. 20211130>',
      builder: {
            station: {
                  describe: 'station',
                  demandOption: true, // Required
                  type: 'string'    
            },
            datefrom: {
                  alias: 'from',
                  describe: 'Date from',
                  demandOption: true,
                  type: 'string'
            },
            dateto: {
                  alias: 'to',
                  describe: 'Date to',
                  demandOption: true,
                  type: 'string'
            },
            format:{
                  describe: 'format',
                  demandOption: true,
                  type:'string'
            }
      },

      // Function for your command
      handler(argv) {
            // const url1 = 'http://localhost:9103/interoperability/api/PassesPerStation/AO01/20211101/20211130'
            const url = 'http://localhost:9103/interoperability/api/PassesPerStation/'+argv.station+'/'+argv.datefrom+'/'+argv.to+'&format='+argv.format
            console.log(url)
            axios.get(url)
            .then(res => {
                        console.log(res.data)
                  })
      }
})

yargs.command({
      command: 'passesanalysis',
      describe: ' --op1 <eg.AO> --op2 <eg.EG> --from  --to ',
      builder: {
            op1: {
                  describe: 'operator 1',
                  demandOption: true, // Required
                  type: 'string'    
            },
            op2: {
                  describe: 'operator 2',
                  demandOption: true, // Required
                  type: 'string'    
            },
            datefrom: {
                  alias: 'from',
                  describe: 'Date from',
                  demandOption: true,
                  type: 'string'
            },
            dateto: {
                  alias: 'to',
                  describe: 'Date to',
                  demandOption: true,
                  type: 'string'
            },
            format:{
                  describe: 'format',
                  demandOption: true,
                  type:'string'
            }
      },

      // Function for your command
      handler(argv) {
            const url = 'https://localhost:9103/interoperability/api/passesanalysis/'+argv.op1+'/'+argv.op2+'/'+argv.from+'/'+argv.to
            console.log(url)
            axios.get(url)
            .then(res => {
                        console.log(res)
                  })
      }
})
yargs.command({
      command: 'passescost',
      describe: ' --op1 --op2 --from --to ',
      builder: {
            op1: {
                  describe: 'operator 1',
                  demandOption: true, // Required
                  type: 'string'    
            },
            op2: {
                  describe: 'operator 2',
                  demandOption: true, // Required
                  type: 'string'    
            },
            datefrom: {
                  alias: 'from',
                  describe: 'Date from',
                  demandOption: true,
                  type: 'string'
            },
            dateto: {
                  alias: 'to',
                  describe: 'Date to',
                  demandOption: true,
                  type: 'string'
            },
            format:{
                  describe: 'format',
                  demandOption: true,
                  type:'string'
            }
      },

      // Function for your command
      handler(argv) {
            const url = 'http://localhost:9103/interoperability/api/PassesCost/'+argv.op1+'/'+argv.op2+'/'+argv.from+'/'+argv.to
            console.log(url)
            axios.get(url)
            .then(res => {
                        console.log(res.data)
                  })
      }
})
yargs.command({
      command: 'chargesby',
      describe: ' --op1 --from --to ',
      builder: {
            op1: {
                  describe: 'operator 1',
                  demandOption: true, // Required
                  type: 'string'    
            },
            datefrom: {
                  alias: 'from',
                  describe: 'Date from',
                  demandOption: true,
                  type: 'string'
            },
            dateto: {
                  alias: 'to',
                  describe: 'Date to',
                  demandOption: true,
                  type: 'string'
            },
            format:{
                  describe: 'format',
                  demandOption: true,
                  type:'string'
            }
      },

      // Function for your command
      handler(argv) {
            const url = 'http://localhost:9103/interoperability/api/ChargesBy/'+argv.op1+'/'+argv.from+'/'+argv.to
            console.log(url)
            axios.get(url)
            .then(res => {
                        console.log(res.data)
                  })
      }
})


// admin checks and resets
yargs.command({
      command: 'healthcheck',
      describe: 'confirm connection to database',
      builder: {
            format:{
                  describe: 'format',
                  demandOption: true,
                  type:'string'
            }
      },
      // Function for your command
      handler(argv) {
            const url = 'http://localhost:9103/interoperability/api/admin/healthcheck';
            console.log(url)
            axios.get(url)
            .then(res => {
                        console.log(res.data)
                  })
      }
})
yargs.command({
      command: 'resetpasses',
      describe: 'reset all passes from database',
      builder: {
            format:{
                  describe: 'format',
                  demandOption: true,
                  type:'string'
            }
      },
      // Function for your command
      handler(argv) {
            const url = 'http://localhost:9103/interoperability/api/admin/resetpasses';
            console.log(url)
            axios.post(url)
            .then(res => {
                        console.log(res.data)
                  })
      }
})
yargs.command({
      command: 'resetstations',
      describe: 'reset all stations from database',
      builder: {
            format:{
                  describe: 'format',
                  demandOption: true,
                  type:'string'
            }
      },
      // Function for your command
      handler(argv) {
            const url = 'http://localhost:9103/interoperability/api/admin/resetstations';
            console.log(url)
            axios.post(url)
            .then(res => {
                        console.log(res.data)
                  })
      }
})
yargs.command({
      command: 'resetvehicles',
      describe: 'reset all vehicles from database',
      builder: {
            format:{
                  describe: 'format',
                  demandOption: true,
                  type:'string'
            }
      },
      // Function for your command
      handler(argv) {
            const url = 'http://localhost:9103/interoperability/api/admin/resetvehicles';
            console.log(url)
            axios.post(url)
            .then(res => {
                        console.log(res.data)
                  })
      }
})

//administration control

yargs.command({
      command: 'admin',
      describe: 'reset all vehicles from database',
      builder: {
            passesupd:{
                  describe: 'passes update',
                  demandOption: true,
                  type:'boolean'
            },
            source:{
                  describe: 'source csv file',
                  demandOption: true,
                  type:'string'
            },
            format:{
                  describe: 'format',
                  demandOption: true,
                  type:'string'
            }
      },
      // Function for your command
      handler(argv) {
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

            var myquery =  "INSERT INTO passes(passID,timestamp,stationRef,vehicleRef,charge,t,v,hn,p,status) VALUES "
            fs.createReadStream(argv.source)
            .pipe(csv())
            .on('data', function (row) {
                  const id = row.passID;
                  const time = row.timestamp;
                  const station = row.stationRef;
                  const vehicle = row.vehicleRef;
                  const chrge = row.charge;
                  const hn = station.substring(0,2);
                  const p = row.p;
                  const status = row.status;
                  const query = "('"+id+"','"+time+"','"+station+"','"+vehicle+"',"+chrge+",'"+station+"','"+vehicle+"','"+hn+"','"+p+"','"+status+"'),"
                  myquery += query
            })
            .on('end', function () {
                  myquery = myquery.substring(0, myquery.length - 1);
                  myquery+=';';
                  console.log(myquery);
                  conn.query(myquery, function(err, result, fields){
                  if(err) {
                        console.log('Internal server error')
                        throw err;
                  }
                  if (result.length===0) {
                        console.log('No data')
                        return;
                  }
                  console.log(result);
            });
            })
           
      }
})



yargs.parse() // To set above changes
