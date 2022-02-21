// import axios from "axios";
import config from "./config";

export const AddNewPass = obj => {
	var url = 'https://localhost:9103/interoperability/api/Insert/';
	url += obj.passID + '/';
	url += obj.timestamp + '/';
	url += obj.stationRef + '/';
	url += obj.vehicleRef + '/';
	url += obj.charge + '/';
	url += obj.hn +'/';
	url += obj.homeaway;
    console.log(url)
    // return axios.get(url) //https Agent
    return fetch(url);
};

export const GetCostBy = obj =>{
	var url = 'https://localhost:9103/interoperability/api/CostBy/';
	url += obj.opid;
	if (obj.datefrom !=="" && obj.dateto!==""){
		url += '/' + obj.datefrom;
		url += '/' + obj.dateto;
	};
	console.log(url);
	const oj = [{'h1': 3,'h2': 5, 'h3':70}]
	return oj;
}

export const GetChargesBy = obj =>{
	var url = 'https://localhost:9103/interoperability/api/ChargesBy/';
	url += obj.opid;
	if (obj.datefrom !=="" && obj.dateto!==""){
		url += '/' + obj.datefrom;
		url += '/' + obj.dateto;
	};
	console.log(url);
	const oj = [{'h1': 4,'h2': 6, 'h3':71}]
	return oj;
}

export const UpdateCleared = obj =>{
	var url = 'https://localhost:9103/interoperability/api/UpdateCleared/';
	url += obj.opid + '/';
	url += obj.datefrom + '/';
	url += obj.dateto;
	console.log(url)
}

export const UpdateBalance = obj =>{
	var url = 'https://localhost:9103/interoperability/api/UpdateBalance/';
	url += obj.vehicleRef + '/';
	url += obj.charge;
	console.log(url)
}