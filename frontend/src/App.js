// import logo from './logo.svg';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useHistory,  Link , NavLink} from "react-router-dom";
import './App.css';


class App extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <div className="debt-clearing">
            <Link to="/cleardebt">Clear your Debt</Link>     
          </div>
          <br/>
          <div className="new-pass">
            <Link to="/newpass">Insert new pass information</Link>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
