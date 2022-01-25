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
      command: 'passesperstation',
      describe: 'Passes per Station',
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
      describe: 'Passes Analysis',
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
      describe: 'Passes Cost',
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
      describe: 'Charges By',
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

yargs.parse() // To set above changes
