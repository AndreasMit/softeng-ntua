import React from 'react';
import { AddNewPass } from './api';
import Select from 'react-select'


class NewPass extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    	passID: "TOB7336760",
    	timestamp: "2022-02-24",
      time: "12:12",
    	stationRef: "OO12",
    	vehicleRef: "AT19HLV57173",
    	charge: "2.8",
    	hn: "OO",
    	homeaway: "home",
    	error : null,
      success: null

    }
    this.operators = 
    [
      { value: "AO", label:"AO", name:"opid"},
      { value: "GF", label:"GF", name:"opid"},
      { value: "EG", label:"EG", name:"opid"},
      { value: "KO", label:"KO", name:"opid"},
      { value: "MR", label:"MR", name:"opid"},
      { value: "NE", label:"NE", name:"opid"},
      { value: "OO", label:"OO", name:"opid"}
    ]
    this.ha = [
    {value: "home", label:"home"},
    {value: "away", label:"away"}
    ]
    this.HandleSelectInput = this.HandleSelectInput.bind(this);
    this.HandleUserInput = this.HandleUserInput.bind(this);
    this.HandleSubmit = this.HandleSubmit.bind(this);
  }

  HandleSubmit(){
    //check balance if not enought -> error:"pay with cash"

  	if (this.state.timestamp==="" || this.state.passID===""|| this.state.time===""||this.state.stationRef===""||this.state.vehicleRef===""||this.state.charge===""||this.state.hn===""||this.state.homeaway===""){
      this.setState( {error: 'not all fields were correctly filled'})
      return;
    }
    if (this.state.passID.length!==10){
      this.setState( {error: 'Pass ID has to be 10 digits'})
      return
    }
    if (this.state.vehicleRef.length!==12){
      this.setState( {error: 'vehicleRef has to be 12 digits'})
    }
    else{
  		AddNewPass(this.state)
      .then(
        (result) => {
          if (result.status ===  500){
            // console.log(result);
            this.setState({
              error: "dublicate entry"
            });
            return
          }
          if (result.status ===  400){
            this.setState({
              error: "Bad request: invalid fields"
            });
            return
          }
          if (result.status ===  402){
            this.setState({
              error: "No data"
            });
            return
          }
          //reset state for next submit
          this.setState({
            passID: "",
            timestamp: "",
            time: "",
            stationRef: "",
            vehicleRef: "",
            charge: "",
            hn: "",
            homeaway: "",
            success: "New Pass added successfully!",
            error: null
          } )
        },
        (error)=> {
          this.setState({
            error: error
          });
        }
      ) 
    }
  }
  
  HandleUserInput(e){
  	const name = e.target.name;
  	const value = e.target.value;
  	this.setState({ [name] : value }); 
  	// console.log(this.state);
  }
  HandleSelectInput(e){
    const name = e.name;
    const value = e.value;
    this.setState({ [name] : value }); 
    // console.log(this.state);
  }


  render(){
    return (
        //eleghos ypoloipoy
        //cash if not enought money -> alert and not proceed
        // else update balance for the vehicle!!
      <div className='new-form'>
      	<h2> Insert new pass data </h2>
      	<form>
          <label htmlFor="passID">PassID:</label><br/>
          <input name="passID" field='passID' placeholder='10 digit id' value={this.state.passID} onChange={this.HandleUserInput} />

      		<label htmlFor="timestamp">Date:</label><br/>
      		<input name='timestamp' type='date' field='timestamp' value={this.state.timestamp} onChange={this.HandleUserInput} />
          <label htmlFor="time">Time:</label><br/>
          <input name='time' type='time' field='time' placeholder='hh:mm' value={this.state.time} onChange={this.HandleUserInput} />

      		<label htmlFor="stationRef">Station that the vehicle passed from:</label><br/>
      		<input name='stationRef' field='stationRef' placeholder='eg. KO01' value={this.state.stationRef} onChange={this.HandleUserInput}/>

      		<label htmlFor="vehicleRef">Vehicle ID:</label><br/>
      		<input name='vehicleRef' field='vehicleRef' placeholder='eg. ED51EWW52190' value={this.state.vehicleRef} onChange={this.HandleUserInput}/>

      		<label htmlFor="charge">Charge:</label><br/>
      		<input name='charge' field='charge' placeholder='eg 2.5' value={this.state.charge} onChange={this.HandleUserInput}/>

      		<label htmlFor="hn">Operator that vehicleID belongs to:</label><br/>
          <Select  options={this.operators} type="hn" name="hn"  field='hn' onChange={this.HandleSelectInput} />

          <label htmlFor="homeaway">Does the vehicleID belong to this Or other operator:</label><br/>
          <Select  options={this.ha} type="homeaway" name="homeaway"  field='homeaway' onChange={this.HandleSelectInput} />

          <div className='error'> {this.state.error} </div>    		
      	</form>

      	<button name='submit' onClick={this.HandleSubmit}> Submit pass </button>
        <div id="success"> {this.state.success} </div>
      </div>
    );
  }
}

export default NewPass;
  