import { ADD_ANTICIPATED_DEPARTURE } from '../actions/anticipatedDepartures'

const anticipatedDeparturesState = {
  items: [],
}

export const anticipatedDeparturesReducer = (state = anticipatedDeparturesState, action) => {
  let newState;
  switch (action.type) {
    case ADD_ANTICIPATED_DEPARTURE:
      let newAnticipatedDeparture = action.payload
      newState = {
        items: [...state.items, newAnticipatedDeparture],
      }
      return Object.assign({}, state, newState)
    default:
    return state
  }
}
