import { HISTORICAL_DEPARTURES, FETCH_HISTORICAL_DEPARTURE, addHistoricalDeparture, purgeHistoricalDepartures, insertAnticipatedDepartures } from '../../actions/historicalDepartures.js'
import { apiRequest, API_SUCCESS, API_ERROR } from '../../actions/api'
import { BUS_STOPS_URL } from '../../../constants'

export const historicalDeparturesMiddleware = (store) => (next) => (action) => {
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
      const payload = {
        stopRef: action.payload.stop_ref,
        lineRef: action.payload.line_ref,
      }
      // Purge existing historicalDepartures for that stop/lineRef
      next(purgeHistoricalDepartures(payload));
      // Replace them with the just-retrieved departures
      next(addHistoricalDeparture({historicalDeparture: action.payload}));
      // Reinsert the anticipated departures from the store
      const anticipatedDepartures = store.getState().anticipatedDepartures.items
      console.log('inserting: ', anticipatedDepartures)
      next(insertAnticipatedDepartures({ anticipatedDepartures }))
      break;
    case `${HISTORICAL_DEPARTURES} ${API_ERROR}`:
      console.log('API ERROR', action.payload)
      break;

    default:
      return null;

  }
}
