import React from 'react';
import { shallow } from 'enzyme';
import DepartureGraph from './DepartureGraph';

it('renders without crashing', () => {
  shallow(<DepartureGraph />);
});
