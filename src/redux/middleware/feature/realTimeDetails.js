import { REAL_TIME_DETAILS, FETCH_REAL_TIME_DETAIL, addRealTimeDetail } from '../../actions/realTimeDetails.js'
import { apiRequest, API_SUCCESS, API_ERROR } from '../../actions/api'
import { VEHICLES_FOR_STOP_URL } from '../../../constants'

export const realTimeDetailsMiddleware = () => (next) => (action) => {
  next(action);

  switch(action.type) {

    case FETCH_REAL_TIME_DETAIL:
      const stopId = action.payload
      const method = 'GET'
      const url = VEHICLES_FOR_STOP_URL + stopId;
      const feature = REAL_TIME_DETAILS
      next(apiRequest({method, url, feature}))
      // other actions go here
      break;

    case `${REAL_TIME_DETAILS} ${API_SUCCESS}`:
      console.log('API SUCCESS', action.payload)
      next(addRealTimeDetail({realTimeDetail: action.payload}))
      break;
    case `${REAL_TIME_DETAILS} ${API_ERROR}`:
      console.log(action.payload)
      break;

    default:
      return null;

  }
}
