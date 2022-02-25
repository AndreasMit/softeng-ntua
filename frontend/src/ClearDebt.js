import React from 'react';
import { GetCostBy, GetChargesBy } from "./api";
import Table from './Table';
import Select from 'react-select'
import './ClearDebt.css'

class ClearDebt extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      opid: "EG",
      datefrom: "2021-11-01",
      dateto: "2021-11-30",
      chargesby: [{VisitingOperator: '', NumberOfPasses:'', PassesCost:'' }],
      costby: [{VisitingOperator: '', NumberOfPasses:'', PassesCost:'' }],
      total1: null,
      total2: null,
      total: null,
      error: null,
      success: null,
      pay: null
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
    if(isNaN(counter)) { this.setState({total1: null })}
    else{ 
      this.setState({total1: counter.toFixed(2)})
    }
    
  }
  ComputeTotal2(){
    var items = this.state.costby;
    var counter = 0;
    items.forEach( item => {
      counter += item.PassesCost 
    });
    if(isNaN(counter)) { this.setState({total1: null })}
    else{
      this.setState({total2: counter.toFixed(2)})
    }
  }
  ComputeTotal(){
    var total1 = this.state.total1;
    var total2 = this.state.total2;
    // console.log(total2);
    // console.log(total1);
    var sub = total1 - total2
    // console.log(sub)
    if (sub>0){
      this.setState({ pay: "Receive money others owe you:"})
    }
    else( this.setState({ pay: "Pay the money you owe:"}))
    this.setState({total: sub.toFixed(2)})
  }

  HandleUserInput(e){
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name] : value }); 
    // console.log(this.state);
    this.setState({success: null })
  }

  HandleSelectInput(e){
    const name = e.name;
    const value = e.value;
    this.setState({ [name] : value }); 
    // console.log(this.state);
    this.setState({success: null })
  }

  HandleClearDebt(){
    if(this.state.total!==null){ 
    this.setState({
      opid: "",
      datefrom: "",
      dateto: "",
      chargesby: [{VisitingOperator: '', NumberOfPasses:'', PassesCost:'' }],
      costby: [{VisitingOperator: '', NumberOfPasses:'', PassesCost:'' }],
      total1: null,
      total2: null,
      total: null,
      error: null,
      success: "transaction successful!"
    })
  }
  }

  Charge(){
    this.setState({error: null })
    if(this.state.dateto ==="" || this.state.datefrom === ""){
      this.setState({error: 'date_to and date_from should be filled'})
    }
    else if(this.state.dateto < this.state.datefrom){
      this.setState({error: 'date_to should be later than date_from'})
    }
    else{
    // console.log("chargesby")
    GetChargesBy(this.state)
    .then( res => res.json())
    .then(
        (result) => {
            this.setState({
              chargesby: result
            });
            if(result[0]!== {}){ 
              this.ComputeTotal1();
            }
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
    this.setState({error: null })
    if(this.state.dateto ==="" || this.state.datefrom === ""){
      this.setState({error: 'date_to and date_from should be filled'})
    }
    else if(this.state.dateto < this.state.datefrom){
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
            if(result[0]!== {}){ 
             this.ComputeTotal2();
           }
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
      <div className='clear-debt'>
			 <h1> Information about passes </h1>
        <form>
        <p> I am operator (instead of login): </p>
        <Select  options={this.operators} type="opid" name="opid"  field='opid' onChange={this.HandleSelectInput} />

        <p> Choose a period of time (months) </p>
        <label htmlFor="datefrom">From: </label>
        <input type="date" name="datefrom" field="datefrom"  value={this.state.datefrom} onChange={this.HandleUserInput} />
        <label htmlFor="dateto">To: </label>
        <input type="date" name="dateto" field="dateto" value={this.state.dateto} onChange={this.HandleUserInput} />
        </form>

        <div className='error'> {this.state.error} </div> 
        <button name="compute" onClick={ ()=> {this.Cost(); this.Charge()}}> Compute debt </button>
        <div className= 'data'>
        <h2> Money other stations owe you </h2>
          <Table data={this.state.chargesby} />
          <p> Total money owed: {this.state.total1} </p>

        
        <h2> Money you owe to other stations </h2>
          <Table data={this.state.costby} />
          <p> Total money you owe: {this.state.total2} </p>
			 
       <button name= 'compute total' onClick={this.ComputeTotal}> Compute Total </button>
       <p> Overall :{this.state.total} </p>
       <br />
       {this.state.pay} {Math.abs(this.state.total)}
       <br />
       </div>
       <button name="transact" onClick={this.HandleClearDebt}> Transact </button>
       <div className="success"> {this.state.success} </div>
		  </div>
    );
  }
}

export default ClearDebt;

     