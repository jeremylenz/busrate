import { ANTICIPATED_DEPARTURES, ADD_ANTICIPATED_DEPARTURE, addAnticipatedDeparture } from '../../actions/anticipatedDepartures.js'
import { INSERT_ANTICIPATED_DEPARTURES, insertAnticipatedDepartures } from '../../actions/historicalDepartures.js'

export const anticipatedDeparturesMiddleware = () => (next) => (action) => {
  next(action);

  switch(action.type) {

    case ADD_ANTICIPATED_DEPARTURE:
      next(insertAnticipatedDepartures({
        anticipatedDepartures: [action.payload],
      }));
      break;

    default:
      return null;

  }
}
