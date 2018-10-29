// adapted from Nir Kaufman's "Thinking in Redux"

import {DevTools} from '../ui/DevTool'
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
// import {booksReducer} from './reducers/books.reducer';
import {uiReducer} from "./reducers/ui.reducer";
import {notificationsReducer} from "./reducers/notification.reducer";

// import {booksMiddleware} from './middleware/feature/books';

import {apiMiddleware} from './middleware/core/api';
import {notificationMiddleware} from "./middleware/core/notification";

// shape the state structure

const rootReducer = combineReducers({
  // books: booksReducer,
  ui: uiReducer,
  notification: notificationsReducer,
})

// create the feature middleware array

const featureMiddleware = [
  // booksMiddleware
];

const coreMiddleware = [
  apiMiddleware,
  notificationMiddleware,
]

// compose the middleware with additional (optional) enhancers

const enhancer = compose(
  applyMiddleware(...featureMiddleware, ...coreMiddleware),
  // devtools goes here
);

export const store = createStore(rootReducer, {}, enhancer);
