import React from 'react';
import { shallow } from 'enzyme';
import BusRouteInfo from './BusRouteInfo';

it('renders without crashing', () => {
  shallow(<BusRouteInfo />);
});
