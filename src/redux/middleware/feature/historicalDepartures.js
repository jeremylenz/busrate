import { HISTORICAL_DEPARTURES, FETCH_HISTORICAL_DEPARTURE, addHistoricalDeparture } from '../../actions/historicalDepartures.js'
import { apiRequest, API_SUCCESS, API_ERROR } from '../../actions/api'
import { BUS_STOPS_URL } from '../../../constants'

export const historicalDeparturesMiddleware = () => (next) => (action) => {
  next(action);

  switch(action.type) {

    case FETCH_HISTORICAL_DEPARTURE:
      const stopRef = action.payload.stopRef
      const lineRef = action.payload.lineRef
      const method = 'GET'
      const url = `${BUS_STOPS_URL}/${stopRef}/historical_departures?lineRef=${lineRef}`
      const feature = HISTORICAL_DEPARTURES
      next(apiRequest({method, url, feature}))
      // other actions go here
      break;

    case `${HISTORICAL_DEPARTURES} ${API_SUCCESS}`:
      console.log('API SUCCESS', action.payload)
      next(addHistoricalDeparture({realTimeDetail: action.payload}))
      break;
    case `${HISTORICAL_DEPARTURES} ${API_ERROR}`:
      console.log('API ERROR', action.payload)
      break;

    default:
      return null;

  }
}
