// adapted from Nir Kaufman's "Thinking in Redux"

import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
// import {booksReducer} from './reducers/books.reducer';
import {busRoutesReducer} from "./reducers/busRoutes.reducer";

// import {booksMiddleware} from './middleware/feature/books';

import {apiMiddleware} from './middleware/core/api';

// shape the state structure

const rootReducer = combineReducers({
  // books: booksReducer,
  busRoutes: busRoutesReducer,
})

// create the feature middleware array

const featureMiddleware = [
  // booksMiddleware
];

const coreMiddleware = [
  apiMiddleware,
]

// compose the middleware with additional (optional) enhancers

const enhancer = compose(
  applyMiddleware(...featureMiddleware, ...coreMiddleware),
  // devtools goes here
);

export const store = createStore(rootReducer, {}, enhancer);
