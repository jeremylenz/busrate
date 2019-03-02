import React from 'react';
import { shallow } from 'enzyme';
import BusStopDetailPage from './BusStopDetailPage';
import { store } from '../redux/store.js'

it('renders without crashing', () => {
  shallow(<BusStopDetailPage store={store} />);
});
