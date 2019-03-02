import React from 'react';
import { Route, Switch } from 'react-router-dom'
import BusStopDetailPage from './components/BusStopDetailPage.js'
import BusRouteSearchPage from './components/BusRouteSearchPage.js'
import BusRouteOverviewPage from './components/BusRouteOverviewPage.js'

const Routes = () => (
  <Switch>
    <Route exact path='/' component={BusRouteSearchPage} />
    <Route exact path='/buses/:id' component={BusRouteOverviewPage} />
    <Route exact path='/buses/:id/stops/:stop' component={BusStopDetailPage} />
  </Switch>
);

export default Routes;
