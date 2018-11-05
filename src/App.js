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

    return (
      <div className="App">
        <div className='container'>
          <Provider store={store}>
            <Router>
              <Switch>
                <Route exact path='/' component={BusRouteSearchPage} />
                <Route exact path='/buses/:id' component={BusRouteOverviewPage} />
                <Route exact path='/buses/:id/stops/:stop' component={BusStopDetailPage} />
              </Switch>
            </Router>
          </Provider>
        </div>
      </div>
    );
  }
}

export default App;
