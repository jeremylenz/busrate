import React from 'react';
import { shallow } from 'enzyme';
import BusStopList from './BusStopList';

it('renders without crashing', () => {
  shallow(<BusStopList />);
});
