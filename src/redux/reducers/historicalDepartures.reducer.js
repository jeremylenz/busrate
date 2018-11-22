import { ADD_HISTORICAL_DEPARTURE, FETCH_HISTORICAL_DEPARTURE, PURGE_HISTORICAL_DEPARTURES } from '../actions/historicalDepartures'

const historicalDeparturesState = {
  items: [],
  firstRequestSent: false,
}

export const historicalDeparturesReducer = (state = historicalDeparturesState, action) => {
  let newState;
  switch (action.type) {
    case ADD_HISTORICAL_DEPARTURE:
      let newHistoricalDeparture = action.payload
      newState = {
        items: [...state.items, newHistoricalDeparture],
      }
      return Object.assign({}, state, newState)
    case FETCH_HISTORICAL_DEPARTURE:
      return Object.assign({}, state, {
        firstRequestSent: true,
      })
    case PURGE_HISTORICAL_DEPARTURES:
      let existingItems = state.items
      // Filter to just items NOT for that route/stop combination.
      let filteredItems = existingItems.filter((hd) => {
        return hd.line_ref !== action.payload.lineRef && hd.stop_ref !== action.payload.stopRef
      })
      newState = {
        items: filteredItems, // replace current state with filtered state
      }
      return Object.assign({}, state, newState)
    default:
    return state
  }
}
