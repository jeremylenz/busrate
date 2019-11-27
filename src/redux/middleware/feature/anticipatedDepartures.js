import { ADD_ANTICIPATED_DEPARTURE } from '../../actions/anticipatedDepartures.js';
import { insertAnticipatedDepartures } from '../../actions/historicalDepartures.js';

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
};
