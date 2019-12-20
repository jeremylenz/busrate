import React from 'react';
import '@testing-library/jest-dom/extend-expect'
// import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import { renderWithRedux } from './testHelpers';
// import { MemoryRouter } from 'react-router-dom';

const initialState = {
  busRoutes: { items: [] },
  ui: { loading: false },
};

test('displays search page', async () => {
  const { findByText } = renderWithRedux(<App />, { initialState });
  expect(findByText('Enter bus route')).toBeInTheDocument();
});
