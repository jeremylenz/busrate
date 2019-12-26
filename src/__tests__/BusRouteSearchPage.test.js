import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitForDomChange } from '@testing-library/react';
import BusRouteSearchPage from '../components/BusRouteSearchPage';
import { renderWithReduxAndRouter, setWindowWidth } from './testHelpers';
import { busRoutes } from '../fixtures/busRoutes.fixtures';
// import { MemoryRouter } from 'react-router-dom';

const initialState = {
  busRoutes: { items: [] },
  ui: { loading: false },
};

// jest.mock('../redux/middleware/core/api.js');

beforeAll(fetch.enableMocks);
beforeEach(() => {
  setWindowWidth(1024);
  fetch.resetMocks();
});

test('displays search page', async () => {
  const { findByPlaceholderText } = renderWithReduxAndRouter(<BusRouteSearchPage />, { initialState });
  setWindowWidth(1024);
  const inputElement = await findByPlaceholderText('Enter bus route...');
  // console.log(prettyDOM(document.querySelector('body')))
  expect(inputElement).toBeInTheDocument();
});

test('displays shorter placeholder text when viewport is smaller', async () => {
  setWindowWidth(375);
  const { queryByPlaceholderText } = renderWithReduxAndRouter(<BusRouteSearchPage />, { initialState });
  const inputElement = queryByPlaceholderText('Enter bus route...');
  expect(inputElement).not.toBeInTheDocument();
});

test('displays search results as you type', async () => {
  fetch.mockResponseOnce(JSON.stringify(busRoutes));
  const { findByPlaceholderText, queryByText } = renderWithReduxAndRouter(<BusRouteSearchPage />, { initialState });
  const inputElement = await findByPlaceholderText('Enter bus route...');

  fireEvent.click(inputElement);
  fireEvent.change(inputElement, { target: { value: 'm60' } });
  await waitForDomChange();
  const searchResult = queryByText(content => content.startsWith('M60'));
  expect(searchResult).toBeInTheDocument();
});
