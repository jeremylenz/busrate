import { ADD_HISTORICAL_DEPARTURE, FETCH_HISTORICAL_DEPARTURE, PURGE_HISTORICAL_DEPARTURES, INSERT_ANTICIPATED_DEPARTURES } from '../actions/historicalDepartures';

const historicalDeparturesState = {
  items: [],
  firstRequestSent: false,
};

export const historicalDeparturesReducer = (state = historicalDeparturesState, action) => {
  let newState;
  switch (action.type) {
  case ADD_HISTORICAL_DEPARTURE: {
    let newHistoricalDeparture = action.payload;
    newState = {
      items: [...state.items, newHistoricalDeparture],
    };
    return Object.assign({}, state, newState);

  }
  case FETCH_HISTORICAL_DEPARTURE:
    return Object.assign({}, state, {
      firstRequestSent: true,
    });
  case PURGE_HISTORICAL_DEPARTURES: {
    let existingItems = state.items;
    // Filter to just items NOT for that route/stop combination.
    let filteredItems = existingItems.filter((hd) => {
      return hd.stop_ref !== action.payload.stopRef;
    });
    newState = {
      items: filteredItems, // replace current state with filtered state
    };
    return Object.assign({}, state, newState);

  }
  case INSERT_ANTICIPATED_DEPARTURES: {
    let stopRef, lineRef, newRecents, hdRef, newHdRef, itemsWithoutHdRef;
    newState = {
      items: [...state.items]
    };
    action.payload.forEach((anticipatedDeparture) => {
      stopRef = anticipatedDeparture.stop_ref;
      lineRef = anticipatedDeparture.line_ref;
      hdRef = null;
      hdRef = newState.items.find((dep) => dep.line_ref === lineRef && dep.stop_ref === stopRef);
      if (hdRef) {
        // Without mutating state, remove the first element from hdRef.recents and replace it with a new copy which includes the new anticipatedDeparture
        itemsWithoutHdRef = null;
        itemsWithoutHdRef = newState.items.filter((item) => item !== hdRef);
        // Make an array of anticipated departures followed by real ones; no mixing
        // Find the position of the first real departure
        let firstRealDepartureIdx = hdRef.recents.findIndex((hd) => !('anticipated' in hd));
        if (firstRealDepartureIdx === -1) firstRealDepartureIdx = hdRef.recents.length - 1;
        // Filter the real departures so there aren't any anticipated departures mixed in
        let realDepartures = hdRef.recents.slice(firstRealDepartureIdx).filter((hd) => !('anticipated' in hd));
        // Gather the anticipated departures at the front
        let anticipatedDepartures = [anticipatedDeparture, ...hdRef.recents.slice(0, firstRealDepartureIdx)];
        // Filter anticipated departures to not duplicate real ones, by comparing vehicle_refs.
        // Allow vehicle numbers to repeat after 20 minutes (1200000 milliseconds)
        anticipatedDepartures = anticipatedDepartures.filter((hd) => !realDepartures.some((rd) => rd.vehicle_ref === hd.vehicle_ref && (Date.parse(hd.departure_time) - Date.parse(rd.departure_time) < 1200000)));
        // Assemble new list of recent departures
        newRecents = [...anticipatedDepartures, ...realDepartures].slice(0, 8); // don't display more than 8
        // Inject newRecents into newHdRef
        newHdRef = Object.assign({}, hdRef, {recents: newRecents});
      }
      if (hdRef && itemsWithoutHdRef) {
        // If we did something, set and return the newState
        newState = {
          items: [newHdRef, ...itemsWithoutHdRef]
        };
      }
    });
    return Object.assign({}, state, newState);
    
  }
  default:
    return state;
  }
};
