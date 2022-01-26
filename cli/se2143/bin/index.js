#! /usr/bin/env node

const chalk = require('chalk');  
const axios = require("axios");
const yargs = require('yargs')

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
            const url = 'http://localhost:9103/interoperability/api/PassesPerStation/'+argv.station+'/'+argv.datefrom+'/'+argv.to
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
            const url = 'http://localhost:9103/interoperability/api/passesanalysis/'+argv.op1+'/'+argv.op2+'/'+argv.from+'/'+argv.to
            console.log(url)
            axios.get(url)
            .then(res => {
                        console.log(res.data)
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
                  type:'string'
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
            
            console.log('make create sql querie with the file Or add this functionality to API and then call it as above')
            // axios.post(url)
            // .then(res => {
            //             console.log(res.data)
            //       })
      }
})



yargs.parse() // To set above changes
