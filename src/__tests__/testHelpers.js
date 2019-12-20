import React from 'react';
import { Provider } from 'react-redux';
import { rootReducer as reducer } from '../redux/store.js';
import { render } from '@testing-library/react';
import { createStore } from 'redux';


export function renderWithRedux(
  ui,
  { initialState, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}
