import React from 'react';
import { mount } from 'enzyme';
import Search from 'react-search-input'
import ReactDOM from 'react-dom';
import App from './App';
import Routes from './Routes'
import { MemoryRouter, StaticRouter } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import BusRouteSearchPage from './components/BusRouteSearchPage'

it('renders without crashing', () => {
  mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <App />
      </MemoryRouter>
    </Provider>
  );
});

it('shows the search screen', () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <App />
      </MemoryRouter>
    </Provider>
  );

  expect(wrapper.find(BusRouteSearchPage)).toHaveLength(1)

});
