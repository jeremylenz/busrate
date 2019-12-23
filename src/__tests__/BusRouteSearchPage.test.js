import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import { prettyDOM } from '@testing-library/react';
import BusRouteSearchPage from '../components/BusRouteSearchPage';
import { renderWithReduxAndRouter, setWindowWidth } from './testHelpers';
import { MemoryRouter } from 'react-router-dom';

const initialState = {
  busRoutes: { items: [] },
  ui: { loading: false },
};

// jest.mock('../redux/middleware/core/api.js');

test('displays search page', async () => {
  const { findByPlaceholderText } = renderWithReduxAndRouter(<BusRouteSearchPage />, { initialState, wrapper: MemoryRouter });
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
