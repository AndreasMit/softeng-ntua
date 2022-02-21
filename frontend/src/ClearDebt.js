import React from 'react';
import { GetCostBy, GetChargesBy } from "./api";
import Table from './Table';

class ClearDebt extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      opid: "OK",
      datefrom: "",
      dateto: "",
      chargesby: [{'h1': 5 , 'h2': 13, 'h3':45}],
      costby: [{'h1': 6 , 'h2': 12, 'h3':35}],
      error: null
    }
    this.HandleUserInput = this.HandleUserInput.bind(this);
    this.HandleClearDebt = this.HandleClearDebt.bind(this);
    this.Charge = this.Charge.bind(this);
    this.Cost = this.Cost.bind(this);
  }

  HandleUserInput(e){
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name] : value }); 
    console.log(this.state);
  }
  HandleClearDebt(){
    //request to api to make unpaid to paid for the days specified
    console.log('nothing yet')
  }

  Charge(){
    console.log("chargesby")
    var k = GetChargesBy(this.state);
    console.log(k)
    console.log(this.state)
    this.setState({chargesby: k})
  }

  Cost(){
    console.log("cost");
    var k = GetCostBy(this.state);
    console.log(k)
    // this.state.costby = k;
    this.setState({costby: k})
    console.log(this.state)
    // this.setState( {
    //       costby: k,
    //       error: null
    //        });
    
    // .then(json=> {
    //     setTimeout( () => {
    //       this.setState( {
    //         costby: json,
    //         error: null
    //       });
    //       }, 0);
    // })
    // .catch( err => {
    //   this.setState({error:err})
    // })
  }



  render(){
    return (
      //choose dates if not show for all
      //show statistics or just the data 
      //show result of owed and being owed money
      //pay or receive 
      //suppose no overllaping periods and then set everything as paid
      //in the database per month
      <div className='clear-debt'>
			 <h1> Information about passes for different stations </h1>
        <p> I am operator (instead of login): </p>
        <input type="opid" field='opid' placeholder="eg KO" value={this.state.opid} onChange={this.HandleUserInput} />

        <p> Choose a period of time (months) </p><br/>
        <label htmlFor="datefrom">From: </label>
        <input type="datefrom" field="datefrom" placeholder="dd/mm/yy" value={this.state.datefrom} onChange={this.HandleUserInput} />
        <label htmlFor="dateto">To: </label>
        <input type="dateto" field="dateto" placeholder="dd/mm/yy" value={this.state.dateto} onChange={this.HandleUserInput} />

        <button name="compute" onClick={ ()=> {this.Cost(); this.Charge()}}> Compute debt </button>
        
        <h2> Money you owe to other stations </h2>
          <Table data={this.state.chargesby} />
        
        <h2> Money other stations owe you </h2>
          <Table data={this.state.costby} />
			 
       <button name="transact" onClick={this.HandleClearDebt}> Pay or Receive money </button>
		  </div>
    );
  }
}

export default ClearDebt;
