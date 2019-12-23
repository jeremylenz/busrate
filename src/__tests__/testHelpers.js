/* eslint-env commonjs, jest */
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, createMemoryHistory } from 'react-router-dom';
import { rootReducer as reducer, allMiddleware } from '../redux/store.js';
import { render } from '@testing-library/react';
import { createStore, compose, applyMiddleware } from 'redux';

// console.log(allMiddleware)
const enhancer = compose(
  applyMiddleware(...allMiddleware),
);

export function renderWithRedux(
  ui,
  { initialState, store = createStore(reducer, initialState, enhancer) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

export function renderWithRouter(
  ui,
  {
    route = '/',
  } = {}
) {
  const Wrapper = ({ children }) => (
    <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
  );
  return {
    ...render(ui, { wrapper: Wrapper }),
  };
}

export function renderWithReduxAndRouter(
  ui,
  { initialState, route = '/', store = createStore(reducer, initialState, enhancer) } = {}
) {
  const Wrapper = ({ children }) => (
    <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
  );
  return {
    ...render(<Provider store={store}>{ui}</Provider>, { wrapper: Wrapper }),
    store,
  };
}

export function setWindowWidth(widthInPx) {
  global.innerWidth = widthInPx || 1024;
  global.dispatchEvent(new Event('resize'));
}
