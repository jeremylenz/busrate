import { RATINGS, FETCH_RATING_FOR_STOP, FETCH_RATING_FOR_ROUTE, setRatingForStop, setRatingForRoute } from '../../actions/ratings.js'
import { apiRequest, API_SUCCESS, API_ERROR } from '../../actions/api'
import { RATING_URL } from '../../../constants'

export const ratingsMiddleware = () => (next) => (action) => {
  next(action);

  switch(action.type) {

    case FETCH_RATING_FOR_STOP:
      { // enclosing in a block so I can have block-scoped const on the next lines
        const {lineRef, stopRef} = action.meta;
        const method = 'GET'
        const url = `${RATING_URL}/${lineRef}?stopRef=${stopRef}`
        const feature = RATINGS
        next(apiRequest({method, url, feature}))
        // other actions go here
      }
      break;
    case FETCH_RATING_FOR_ROUTE:
      {
        const {lineRef, directionRef} = action.meta;
        const method = 'GET'
        const url = `${RATING_URL}/${lineRef}?directionRef=${directionRef}`
        const feature = RATINGS
        next(apiRequest({method, url, feature}))
        // other actions go here
      }
      break;

    case `${RATINGS} ${API_SUCCESS}`:
      let {line_ref, stop_ref, direction_ref, rating} = action.payload;
      // convert from snake case to JS
      let lineRef = line_ref;
      let stopRef = stop_ref;
      let directionRef = direction_ref;
      if (lineRef && stopRef) {
        next(setRatingForStop({ lineRef, stopRef, rating }))
      }
      if (lineRef && directionRef) {
        next(setRatingForRoute({ lineRef, directionRef, rating }))
      }
      break;
    case `${RATINGS} ${API_ERROR}`:
      console.log(action.payload)
      break;

    default:
      return null;

  }
}
