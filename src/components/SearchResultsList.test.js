import React from 'react';
import { shallow } from 'enzyme';
import SearchResultsList from './SearchResultsList';

it('renders without crashing', () => {
  shallow(<SearchResultsList />);
});
