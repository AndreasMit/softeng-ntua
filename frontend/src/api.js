import config from "./config";

// for NewPass

export const AddNewPass = obj => {
	var url = 'https://localhost:9103/interoperability/api/Insert/';
	url += obj.passID + '/';
	url += obj.timestamp.replace("-","").replace("-","")+ obj.time.replace(":","") + '/';
	url += obj.stationRef + '/';
	url += obj.vehicleRef + '/';
	url += obj.charge + '/';
	url += obj.hn +'/';
	url += obj.homeaway;
    // console.log(url)
    return fetch(url);
};
export const UpdateBalance = obj =>{
	var url = 'https://localhost:9103/interoperability/api/UpdateBalance/';
	url += obj.vehicleRef + '/';
	url += obj.charge;
	// console.log(url);
	return fetch(url);
};

// for Clear Debt

export const GetCostBy = obj =>{
	var url = 'https://localhost:9103/interoperability/api/CostBy/';
	url += obj.opid;
	if (obj.datefrom !=="" && obj.dateto!==""){
		url += '/' + obj.datefrom.replace("-","").replace("-","");
		url += '/' + obj.dateto.replace("-","").replace("-","");
	};
	// console.log(url);
	return fetch(url);
}

export const GetChargesBy = obj =>{
	var url = 'https://localhost:9103/interoperability/api/ChargesBy/';
	url += obj.opid;
	if (obj.datefrom !=="" && obj.dateto!==""){
		url += '/' + obj.datefrom.replace("-","").replace("-","");
		url += '/' + obj.dateto.replace("-","").replace("-","");
	};
	// console.log(url);
	return fetch(url);
}


