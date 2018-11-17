import { ADD_REAL_TIME_DETAIL } from '../actions/realTimeDetails'

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
    default:
    return state
  }
}
