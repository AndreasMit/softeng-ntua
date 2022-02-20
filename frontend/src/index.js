import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, useHistory } from "react-router-dom";
import './index.css';
import App from './App';
import NewPass from './NewPass'
import ClearDebt from './ClearDebt'


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/newpass" element={<NewPass />} />
        <Route exact path="/cleardebt" element={<ClearDebt />} />
      </Routes>
    </Router>
  </React.StrictMode> ,
  document.getElementById('root')
);