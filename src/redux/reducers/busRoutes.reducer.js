import { SET_BUS_ROUTES } from '../actions/busRoutes'

const busRoutesState = {
  loading: false,
  items: [],
}

export const busRoutesReducer = (state = busRoutesState, action) => {
  switch (action.type) {
    case SET_BUS_ROUTES:
      let newBusRoutes = {
        items: action.payload
      }
      let newState = Object.assign({}, state, newBusRoutes)
      return newState
    default:
    return state
  }
}
