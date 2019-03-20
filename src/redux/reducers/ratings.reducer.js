import { SET_RATING_FOR_ROUTE, SET_RATING_FOR_STOP } from '../actions/ratings'

const ratingsState = {
  // 'NYCT M86_SBS': {},
}

export const ratingsReducer = (state = ratingsState, action) => {
  let trackingKey;
  let newState;

  switch (action.type) {
    case SET_RATING_FOR_ROUTE:
      {
        const { lineRef, directionRef } = action.meta;
        if (!lineRef && !directionRef) {
          console.error('Missing lineRef or directionRef')
          return state
        }
        trackingKey = `${lineRef} - ${directionRef}`
        let newRouteRating = {}
        newRouteRating[trackingKey] = action.payload;
        newState = Object.assign({}, state, newRouteRating)
        return newState
      }
    case SET_RATING_FOR_STOP:
      {
        const { lineRef, stopRef } = action.meta;
        if (!lineRef && !stopRef) {
          console.error('Missing lineRef or stopRef')
          return state
        }
        trackingKey = `${lineRef} : ${stopRef}`
        let newStopRating = {}
        newStopRating[trackingKey] = action.payload;
        newState = Object.assign({}, state, newStopRating)
        return newState
      }
    default:
    return state
  }
}
