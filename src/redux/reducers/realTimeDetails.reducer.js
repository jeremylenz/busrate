import { ADD_REAL_TIME_DETAIL } from '../actions/realTimeDetails'

const realTimeDetailsState = {
  items: [],
}

export const realTimeDetailsReducer = (state = realTimeDetailsState, action) => {
  switch (action.type) {
    case ADD_REAL_TIME_DETAIL:
      let newRealTimeDetail = action.payload
      let newState = {
        items: [...state.items, newRealTimeDetail],
      }
      return newState
    default:
    return state
  }
}
