import { ADD_HISTORICAL_DEPARTURE } from '../actions/historicalDepartures'

const historicalDeparturesState = {
  items: [],
}

export const historicalDeparturesReducer = (state = historicalDeparturesState, action) => {
  switch (action.type) {
    case ADD_HISTORICAL_DEPARTURE:
      let newHistoricalDeparture = action.payload
      let newState = {
        items: [...state.items, newHistoricalDeparture],
      }
      return newState
    default:
    return state
  }
}
