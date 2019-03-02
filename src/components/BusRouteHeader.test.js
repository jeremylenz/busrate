import React from 'react';
import { shallow } from 'enzyme';
import BusRouteHeader from './BusRouteHeader';

it('renders without crashing', () => {
  shallow(<BusRouteHeader />);
});
