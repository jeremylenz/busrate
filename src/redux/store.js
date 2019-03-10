// adapted from Nir Kaufman's "Thinking in Redux"

import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {busRoutesReducer} from "./reducers/busRoutes.reducer";
import {stopListsReducer} from './reducers/stopLists.reducer';
import {realTimeDetailsReducer} from './reducers/realTimeDetails.reducer';
import {historicalDeparturesReducer} from './reducers/historicalDepartures.reducer'
import {anticipatedDeparturesReducer} from './reducers/anticipatedDepartures.reducer'

import {uiReducer} from './reducers/ui.reducer'

import {busRoutesMiddleware} from './middleware/feature/busRoutes.js';
import {stopListsMiddleware} from './middleware/feature/stopLists';
import {realTimeDetailsMiddleware} from './middleware/feature/realTimeDetails'
import {historicalDeparturesMiddleware} from './middleware/feature/historicalDepartures'

import {apiMiddleware} from './middleware/core/api';
import {normalizeMiddleware} from './middleware/core/normalize'

// shape the state structure

const rootReducer = combineReducers({
  busRoutes: busRoutesReducer,
  stopLists: stopListsReducer,
  ui: uiReducer,
  realTimeDetails: realTimeDetailsReducer,
  historicalDepartures: historicalDeparturesReducer,
  anticipatedDepartures: anticipatedDeparturesReducer,
})

// create the feature middleware array

const featureMiddleware = [
  busRoutesMiddleware,
  stopListsMiddleware,
  realTimeDetailsMiddleware,
  historicalDeparturesMiddleware,
];

const coreMiddleware = [
  apiMiddleware,
  normalizeMiddleware,
]

// compose the middleware with additional (optional) enhancers
// also add Redux Devtools Extension hookup

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(...featureMiddleware, ...coreMiddleware),
);

export const store = createStore(rootReducer, {}, enhancer);
