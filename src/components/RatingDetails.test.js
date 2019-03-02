import React from 'react';
import { shallow } from 'enzyme';
import RatingDetails from './RatingDetails';

it('renders without crashing', () => {
  shallow(<RatingDetails loadingState={{loading: false}} />);
});
