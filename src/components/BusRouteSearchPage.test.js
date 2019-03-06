import React from 'react';
import { mount, shallow } from 'enzyme';
import BusRouteSearchPage from './BusRouteSearchPage';
import { store } from '../redux/store.js'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import App from '../App.js'
import { mockedBusRoutes } from '../setupTests.js'

import fetchMock from 'fetch-mock';
import { LIST_OF_MTA_BUS_ROUTES_URL } from '../constants'


it('renders without crashing', () => {
  shallow(<BusRouteSearchPage store={store} />);
});

it('calls the API to retrieve busRoutes', () => {

  // Have fetch return the mocked list of bus routes
  fetchMock.get(LIST_OF_MTA_BUS_ROUTES_URL, mockedBusRoutes);

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <App />
      </MemoryRouter>
    </Provider>
  );

  // The component should have called the API in componentDidMount
  expect(fetchMock.calls(LIST_OF_MTA_BUS_ROUTES_URL)).toHaveLength(1)
  fetchMock.reset();

});
