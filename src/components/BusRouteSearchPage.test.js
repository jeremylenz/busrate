import React from 'react';
import { mount, shallow } from 'enzyme';
import BusRouteSearchPage from './BusRouteSearchPage';
import { store } from '../redux/store.js'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import App from '../App.js'

import fetchMock from 'fetch-mock';
import { LIST_OF_MTA_BUS_ROUTES_URL } from '../constants'

const mockedBusRoutes =  [
  {
    "agencyId": "MTABC",
    "color": "00933C",
    "description": "Via 188Th St / Union Turnpike",
    "id": "MTABC_QM31",
    "longName": "Fresh Meadows - Midtown Via 3 Av",
    "shortName": "QM31",
    "textColor": "FFFFFF",
    "type": 3,
    "url": "http://web.mta.info/busco/schedules/qm001cur.pdf"
  },
  {
    "agencyId": "MTABC",
    "color": "00933C",
    "description": "Via Cross Island Pkwy / Whitestone Expwy",
    "id": "MTABC_QM32",
    "longName": "Bay Terrace - Midtown Via 3 Av",
    "shortName": "QM32",
    "textColor": "FFFFFF",
    "type": 3,
    "url": "http://web.mta.info/busco/schedules/qm002cur.pdf"
  },
]


it('renders without crashing', () => {
  shallow(<BusRouteSearchPage store={store} />);
});

it('calls an API', () => {

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
