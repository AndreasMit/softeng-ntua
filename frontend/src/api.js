import axios from "axios";
import config from "./config";
// const https = require('https')
import url from "url/";
import http from "stream-http";
import https from "https-browserify";

// resolve.fallback: { "https": require.resolve("https-browserify") }
// resolve.fallback: { "http": require.resolve("stream-http") }
// resolve.fallback: { "url": require.resolve("url/") }
// const httpsAgent = new https.Agent({ rejectUnauthorized: false })

export const AddNewPass = obj => {
	var url = 'https://localhost:9103/interoperability/api/insert/';
	url += obj.passID + '/';
	url += obj.timestamp + '/';
	url += obj.stationRef + '/';
	url += obj.vehicleRef + '/';
	url += obj.charge + '/';
	url += obj.hn +'/';
	url += obj.homeaway;
    console.log(url)
    // return axios.get(url,{ httpsAgent })
};