import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BusStopDetail from './components/BusStopDetail.js'
import BusRouteSearchPage from './components/BusRouteSearchPage.js'
import BusRouteOverview from './components/BusRouteOverview.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {

    const StopDetail = () => (<BusStopDetail
      routeName='Q39'
      routeDirection='Cooper Av / Ridgewood'
      stopNum='19126'
      stopName='27th St & Queens Plz S'
    />)

    const RouteOverview = () => (<BusRouteOverview
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
    />)

    return (
      <div className="App">
        <div className='container'>
          <Router>
            <Switch>
              <Route exact path='/' component={BusRouteSearchPage} />
              <Route exact path='/buses/:id' render={RouteOverview} />
              <Route exact path='/buses/:id/stops/:stop' render={StopDetail} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
