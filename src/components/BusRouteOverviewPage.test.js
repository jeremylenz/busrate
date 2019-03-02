import React from 'react';
import { shallow } from 'enzyme';
import BusRouteOverviewPage from './BusRouteOverviewPage';
import { store } from '../redux/store.js'

it('renders without crashing', () => {
  shallow(<BusRouteOverviewPage store={store} />);
});
