import { HISTORICAL_DEPARTURES, FETCH_HISTORICAL_DEPARTURE, ADD_HISTORICAL_DEPARTURE, PURGE_HISTORICAL_DEPARTURES, addHistoricalDeparture, purgeHistoricalDepartures } from '../../actions/historicalDepartures.js'
import { apiRequest, API_SUCCESS, API_ERROR } from '../../actions/api'
import { BUS_STOPS_URL } from '../../../constants'

export const historicalDeparturesMiddleware = () => (next) => (action) => {
  next(action);
  console.log(action.type)

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
      const payload = {
        stopRef: action.payload.stop_ref,
        lineRef: action.payload.line_ref,
      }
      console.log('dispatching purgeHistoricalDepartures', payload)
      next(purgeHistoricalDepartures(payload))
      next(addHistoricalDeparture({historicalDeparture: action.payload}))
      break;
    case `${HISTORICAL_DEPARTURES} ${API_ERROR}`:
      console.log('API ERROR', action.payload)
      break;

    default:
      return null;

  }
}
