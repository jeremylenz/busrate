import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BusStopDetail from './components/BusStopDetail.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className='container'>
          <BusStopDetail
            routeName='M101-SBS'
            routeDirection='Cooper Av / Ridgewood'
            stopNum='19126'
            stopName='27th St & Queens Plz S'
          />
        </div>
      </div>
    );
  }
}

export default App;
