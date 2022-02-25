import React from 'react';
import { Link } from "react-router-dom";
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
            <Link to="/newpass">Insert new pass</Link>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
