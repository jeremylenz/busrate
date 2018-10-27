import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BusStopDetail from './components/BusStopDetail.js'
import BusRouteSearchPage from './components/BusRouteSearchPage.js'
import BusRouteOverview from './components/BusRouteOverview.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className='container'>
          <BusRouteSearchPage />
          {/* <BusStopDetail
            routeName='M101-SBS'
            routeDirection='Cooper Av / Ridgewood'
            stopNum='19126'
            stopName='27th St & Queens Plz S'
          /> */}
          {/* <BusRouteOverview
            routeName='Q39'
            routeDescription='Long Island City to Ridgewood'
            stopLists={[
              {
                direction: 'Cooper Av / Ridgewood',
                stops: ['Stop 1', 'Stop 2', 'Stop 3', 'Stop 4']
              },
              {
                direction: 'Long Island City / Queens Plz S',
                stops: ['Stop 4', 'Stop 3', 'Stop 2', 'Stop 1']
              }
            ]
            }
          /> */}
        </div>
      </div>
    );
  }
}

export default App;
