import React from 'react';
import { GetCostBy, GetChargesBy } from "./api";
import Table from './Table';
import Select from 'react-select'

class ClearDebt extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      opid: "EG",
      datefrom: "2021-11-01",
      dateto: "2021-11-30",
      chargesby: [{}],
      costby: [{}],
      total1: null,
      total2: null,
      total: null,
      error: null
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

    this.HandleUserInput = this.HandleUserInput.bind(this);
    this.HandleClearDebt = this.HandleClearDebt.bind(this);
    this.Charge = this.Charge.bind(this);
    this.Cost = this.Cost.bind(this);
    this.ComputeTotal1 = this.ComputeTotal1.bind(this);
    this.ComputeTotal2 = this.ComputeTotal2.bind(this);
    this.ComputeTotal = this.ComputeTotal.bind(this);
    this.HandleSelectInput = this.HandleSelectInput.bind(this);
  }

  ComputeTotal1(){
    var items = this.state.chargesby;
    var counter = 0;
    items.forEach( item => {
      counter += item.PassesCost 
    });
    this.setState({total1: counter})
  }
  ComputeTotal2(){
    var items = this.state.costby;
    var counter = 0;
    items.forEach( item => {
      counter += item.PassesCost 
    });
    this.setState({total2: counter})
  }
  ComputeTotal(){
    var total1 = this.state.total1;
    var total2 = this.state.total2;
    console.log(total2);
    console.log(total1);
    var sub = total1 - total2
    console.log(sub)
    this.setState({total: sub.toFixed(2)})
  }

  HandleUserInput(e){
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name] : value }); 
    console.log(this.state);
  }

  HandleSelectInput(e){
    const name = e.name;
    const value = e.value;
    this.setState({ [name] : value }); 
    console.log(this.state);
  }

  HandleClearDebt(){
    //request to api to make unpaid to paid for the days specified
    console.log('nothing yet')
  }

  Charge(){
    if(this.state.dateto < this.state.datefrom){
      this.setState({error: 'date_to should be later than date_from'})
    }
    else{
    console.log("chargesby")
    GetChargesBy(this.state)
    .then( res => res.json())
    .then(
        (result) => {
          console.log(result)
          this.setState({
            chargesby: result
          });
          this.ComputeTotal1();
        },
        (error)=> {
          this.setState({
            error: error
          });
        }
      )
    }
  }

  Cost(){
    console.log("cost");
    if(this.state.dateto < this.state.datefrom){
      this.setState({error: 'date to should be later than date from'})
    }
    else{
    GetCostBy(this.state)
    .then( res => res.json() )
    .then(
        (result) => {
          this.setState({
            costby: result
          });
          this.ComputeTotal2();
        },
        (error)=> {
          this.setState({
            error: error
          });
        }
      )
    }
  }



  render(){
    return (
      //choose dates if not show for all 
      //pay or receive 
      //suppose no overllaping periods and then set everything as paid
      //in the database per month
      <div className='clear-debt'>
			 <h1> Information about passes for different stations </h1>
        
        <p> I am operator (instead of login): </p>
        <Select  options={this.operators} type="opid" name="opid"  field='opid' onChange={this.HandleSelectInput} />

        <p> Choose a period of time (months) </p>
        <label htmlFor="datefrom">From: </label>
        <input type="date" name="datefrom" field="datefrom"  value={this.state.datefrom} onChange={this.HandleUserInput} />
        <label htmlFor="dateto">To: </label>
        <input type="date" name="dateto" field="dateto" value={this.state.dateto} onChange={this.HandleUserInput} />
        
        <div className='error'> {this.state.error} </div> 
        <button name="compute" onClick={ ()=> {this.Cost(); this.Charge()}}> Compute debt </button>
        
        <h2> Money other stations owe you </h2>
          <Table data={this.state.chargesby} />
          <p> Total money owed: {this.state.total1} </p>

        
        <h2> Money you owe to other stations </h2>
          <Table data={this.state.costby} />
          <p> Total money you owe: {this.state.total2} </p>
			 
       <button name= 'compute total' onClick={this.ComputeTotal}> Compute Total </button>
       <p> You need to receive or pay :{this.state.total} </p>
       <br />
       <button name="transact" onClick={this.HandleClearDebt}> Pay or Receive money </button>
		  </div>
    );
  }
}

export default ClearDebt;

    