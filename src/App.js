import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BusStopDetailPage from './components/BusStopDetailPage.js'
import BusRouteSearchPage from './components/BusRouteSearchPage.js'
import BusRouteOverviewPage from './components/BusRouteOverviewPage.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

class App extends Component {

  componentDidMount() {
  }

  render() {

    const StopDetail = () => (<BusStopDetailPage
      routeName='Q39'
      routeDirection='Cooper Av / Ridgewood'
      stopNum='19126'
      stopName='27th St & Queens Plz S'
    />)

    // const RouteOverview = () => (<BusRouteOverview
    //   routeName='Q39'
    //   routeDescription='Long Island City to Ridgewood'
    //   stopLists={[
    //     {
    //       direction: 'Cooper Av / Ridgewood',
    //       stops: ['Stop 1', 'Stop 2', 'Stop 3', 'Stop 4']
    //     },
    //     {
    //       direction: 'Long Island City / Queens Plz S',
    //       stops: ['Stop 4', 'Stop 3', 'Stop 2', 'Stop 1']
    //     }
    //   ]
    //   }
    // />)

    return (
      <div className="App">
        <div className='container'>
          <Provider store={store}>
            <Router>
              <Switch>
                <Route exact path='/' component={BusRouteSearchPage} />
                <Route exact path='/buses/:id' component={BusRouteOverviewPage} />
                <Route exact path='/buses/:id/stops/:stop' render={BusStopDetailPage} />
              </Switch>
            </Router>
          </Provider>
        </div>
      </div>
    );
  }
}

export default App;
