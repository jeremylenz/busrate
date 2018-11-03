import { ADD_STOP_LIST } from '../actions/stopLists'

const stopListsState = {
  items: [],
}

export const stopListsReducer = (state = stopListsState, action) => {
  switch (action.type) {
    case ADD_STOP_LIST:
      let newStopList = action.payload
      let newState = {
        items: [...state.items, newStopList]
      }
      return newState
    default:
    return state
  }
}
