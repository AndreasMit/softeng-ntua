import React from 'react';
import { AddNewPass } from './api';

class NewPass extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    	passID: "lol",
    	timestamp: "",
    	stationRef: "",
    	vehicleRef: "",
    	charge: "",
    	hn: "",
    	homeaway: "home",
    	error : null

    }
    this.HandleUserInput = this.HandleUserInput.bind(this);
    this.HandleSubmit = this.HandleSubmit.bind(this);
  }

  HandleSubmit(){
  	this.setState( {error: null});
  	if (this.state.timestamp){
  		AddNewPass(this.state)
  		.then(json=> {
  			setTimeout( () => {
  				this.setState( {error: null});
  			}, 0);
  		})
  		.catch( err => {
  			this.setState({error:err})
  		})
  	}
  	else{
  		this.State( {error: 'not all fields were correctly filled'})
  	} 
  }
  
  HandleUserInput(e){
  	const name = e.target.name;
  	const value = e.target.value;
  	this.setState({ [name] : value }); 
  	console.log(this.state);
  }


  render(){
    return (
    	//generate new pass id on your own
      	// home can be taken from comparing hn with stationRef
      	//maybe calendar for timestamp
      	// radio button for home away
      	//maybe radio for station ref and hn
      <div className='new-form'>
      	<h2> Insert new pass data </h2>
      	<form>
      		<label htmlFor="timestamp">Timestamp:</label><br/>
      		<input name='timestamp' field='timestamp' placeholder='dd/mm/yyy hh:mm' value={this.state.timestamp} onChange={this.HandleUserInput} />
      		<label htmlFor="stationRef">Station Reference:</label><br/>
      		<input name='stationRef' field='stationRef' placeholder='eg. KO01' value={this.state.stationRef} onChange={this.HandleUserInput}/>
      		<label htmlFor="vehicleRef">Vehicle Reference:</label><br/>
      		<input name='vehicleRef' field='vehicleRef' placeholder='eg. ED51EWW52190' value={this.state.vehicleRef} onChange={this.HandleUserInput}/>
      		<label htmlFor="charge">Charge:</label><br/>
      		<input name='charge' field='charge' placeholder='eg 2.5' value={this.state.charge} onChange={this.HandleUserInput}/>
      		<label htmlFor="hn">Home operator of vehicle:</label><br/>
      		<input name='hn' field='hn' placeholder='eg KO' value={this.state.hn} onChange={this.HandleUserInput}/>      		
      	</form>

      	<button name='submit' onClick={this.HandleSubmit}> Submit pass </button>
      </div>
    );
  }
}

export default NewPass;

