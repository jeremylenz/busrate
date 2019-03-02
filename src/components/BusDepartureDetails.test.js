import React from 'react';
import { shallow } from 'enzyme';
import BusDepartureDetails from './BusDepartureDetails';

it('renders without crashing', () => {
  shallow(<BusDepartureDetails loadingState={{loading: false}}/>);
});
