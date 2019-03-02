import React from 'react';
import { mount } from 'enzyme';
import Search from 'react-search-input'
import ReactDOM from 'react-dom';
import App from './App';
import { MemoryRouter } from 'react-router'

it('renders without crashing', () => {
  mount(<App />);
});

it('shows the search screen', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
      <App />
    </MemoryRouter>
  );

  expect(wrapper.find('input')).toHaveLength(1)

});
