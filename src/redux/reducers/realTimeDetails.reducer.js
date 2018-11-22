import { ADD_REAL_TIME_DETAIL, FETCH_REAL_TIME_DETAIL, PURGE_REAL_TIME_DETAILS } from '../actions/realTimeDetails'

const realTimeDetailsState = {
  items: [],
  firstRequestSent: false,
}

export const realTimeDetailsReducer = (state = realTimeDetailsState, action) => {
  switch (action.type) {
    case ADD_REAL_TIME_DETAIL:
      let newRealTimeDetail = action.payload
      let newState = {
        items: [...state.items, newRealTimeDetail],
      }
      return Object.assign({}, state, newState)
    case FETCH_REAL_TIME_DETAIL:
      return Object.assign({}, state, {
        firstRequestSent: true,
      })
    case PURGE_REAL_TIME_DETAILS:
      // Not in use yet; need to normalize data first
      let existingItems = state.items
      // Filter to just items NOT for that route/stop combination.
      let filteredItems = existingItems.filter((hd) => {
        return hd.stop_ref !== action.payload.stopRef
      })
      newState = {
        items: filteredItems, // replace current state with filtered state
      }
      return Object.assign({}, state, newState)
    default:
    return state
  }
}
