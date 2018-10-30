const busRoutesState = {
  loading: false,
  items: [],
}

const busRoutesReducer = (state = busRoutesState, action) => {
  switch (action.type) {
    case SET_BUS_ROUTES:
      let newBusRoutes = {
        items: action.payload
      }
      let newState = Object.assign({}, state, newBusRoutes)
      return newState
      break;
    default:
    return state
  }
}
