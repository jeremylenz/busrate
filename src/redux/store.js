// adapted from Nir Kaufman's "Thinking in Redux"

import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {busRoutesReducer} from "./reducers/busRoutes.reducer";
import {stopListsReducer} from './reducers/stopLists.reducer';
import {realTimeDetailsReducer} from './reducers/realTimeDetails.reducer';

import {uiReducer} from './reducers/ui.reducer'

import {busRoutesMiddleware} from './middleware/feature/busRoutes';
import {stopListsMiddleware} from './middleware/feature/stopLists';
import {realTimeDetailsMiddleware} from './middleware/feature/realTimeDetails'

import {apiMiddleware} from './middleware/core/api';

// shape the state structure

const rootReducer = combineReducers({
  busRoutes: busRoutesReducer,
  stopLists: stopListsReducer,
  ui: uiReducer,
  realTimeDetails: realTimeDetailsReducer,
})

// create the feature middleware array

const featureMiddleware = [
  busRoutesMiddleware,
  stopListsMiddleware,
  realTimeDetailsMiddleware,
];

const coreMiddleware = [
  apiMiddleware,
]

// compose the middleware with additional (optional) enhancers
// also add Redux Devtools Extension hookup

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(...featureMiddleware, ...coreMiddleware),
);

export const store = createStore(rootReducer, {}, enhancer);
