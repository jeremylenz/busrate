import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import { renderWithRedux, setWindowWidth } from './testHelpers';
// import { MemoryRouter } from 'react-router-dom';

const initialState = {
  busRoutes: { items: [] },
  ui: { loading: false },
};

test('displays search page', async () => {
  const { findByPlaceholderText } = renderWithRedux(<App />, { initialState });
  setWindowWidth(1024);
  const inputElement = await findByPlaceholderText('Enter bus route...');
  expect(inputElement).toBeInTheDocument();
});

test('displays shorter placeholder text when viewport is smaller', async () => {
  const { findByPlaceholderText } = renderWithRedux(<App />, { initialState });
  setWindowWidth(375);
  expect(window.innerWidth).toEqual(375);
  const inputElement = await findByPlaceholderText('Enter bus route...');
  expect(inputElement).not.toBeInTheDocument();
});
