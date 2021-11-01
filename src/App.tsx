import React from 'react';
import Routes from './layout/Routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { API } from './Api'
import *  as config from './config'

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

API.setBaseUrl(config.conf.baseUrl)


export default App;
