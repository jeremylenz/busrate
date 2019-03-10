import { ADD_HISTORICAL_DEPARTURE, FETCH_HISTORICAL_DEPARTURE, PURGE_HISTORICAL_DEPARTURES, INSERT_ANTICIPATED_DEPARTURES } from '../actions/historicalDepartures'

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
        return hd.stop_ref !== action.payload.stopRef
      })
      newState = {
        items: filteredItems, // replace current state with filtered state
      }
      return Object.assign({}, state, newState)
    case INSERT_ANTICIPATED_DEPARTURES:
      let stopRef, lineRef, newRecents, hdRef, newHdRef, itemsWithoutHdRef;
      newState = {
        items: [...state.items]
      }
      action.payload.forEach((anticipatedDeparture) => {
        stopRef = anticipatedDeparture.stop_ref
        lineRef = anticipatedDeparture.line_ref
        hdRef = null;
        hdRef = newState.items.find((dep) => dep.line_ref === lineRef && dep.stop_ref === stopRef)
        if (hdRef) {
          // Without mutating state, remove the first element from hdRef.recents and replace it with anticipatedDeparture
          itemsWithoutHdRef = null;
          itemsWithoutHdRef = newState.items.filter((item) => item !== hdRef)
          newRecents = [anticipatedDeparture, ...hdRef.recents.slice()]
          console.log(newRecents[0])
          if (newRecents[0].vehicle_ref === newRecents[1].vehicle_ref) {
            // If the real departure is present, don't add the anticipated departure
            console.log('shifting: ', [newRecents[0].vehicle_ref, newRecents[1].vehicle_ref])
            newRecents.shift()
          }
          newHdRef = Object.assign({}, hdRef, {recents: newRecents})
        }
        if (itemsWithoutHdRef) {
          newState = {
            items: [newHdRef, ...itemsWithoutHdRef]
          }
        }
      })
      return Object.assign({}, state, newState)
    default:
    return state
  }
}
