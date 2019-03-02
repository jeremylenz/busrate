import React from 'react';
import { shallow } from 'enzyme';
import BusRouteSearchPage from './BusRouteSearchPage';
import { store } from '../redux/store.js'

it('renders without crashing', () => {
  shallow(<BusRouteSearchPage store={store} />);
});
