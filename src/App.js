import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BusStopDetail from './components/BusStopDetail.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BusStopDetail
          routeName='Q39'
          routeDirection='Cooper Av / Ridgewood'
          stopNum='19126'
          stopName='27th St & Queens Plz S'
        />
      </div>
    );
  }
}

export default App;
