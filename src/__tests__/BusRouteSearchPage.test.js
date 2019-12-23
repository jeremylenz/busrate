import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import { render } from '@testing-library/react';
import App from '../App';
import { renderWithRedux, setWindowWidth } from './testHelpers';
// import { MemoryRouter } from 'react-router-dom';

const initialState = {
  busRoutes: { items: [] },
  ui: { loading: false },
};

// jest.mock('../redux/middleware/core/api.js');

test('displays search page', async () => {
  const { findByPlaceholderText } = renderWithRedux(<App />, { initialState });
  setWindowWidth(1024);
  const inputElement = await findByPlaceholderText('Enter bus route...');
  expect(inputElement).toBeInTheDocument();
});

test('displays shorter placeholder text when viewport is smaller', async () => {
  setWindowWidth(375);
  const { queryByPlaceholderText } = renderWithRedux(<App />, { initialState });
  const inputElement = queryByPlaceholderText('Enter bus route...');
  expect(inputElement).not.toBeInTheDocument();
});
