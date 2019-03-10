// model name
export const ANTICIPATED_DEPARTURES = '[AnticipatedDepartures]';

// action types
export const ADD_ANTICIPATED_DEPARTURE = `${ANTICIPATED_DEPARTURES} ADD`;
// export const PURGE_ANTICIPATED_DEPARTURES = `${ANTICIPATED_DEPARTURES} PURGE`;

// action creators

export const addAnticipatedDeparture = ({historicalDeparture}) => {
  return {
    type: ADD_ANTICIPATED_DEPARTURE,
    payload: historicalDeparture,
    meta: {stopRef, lineRef},
  }
}

// export const purgeAnticipatedDepartures = ({stopRef, lineRef}) => {
//   return {
//     type: PURGE_ANTICIPATED_DEPARTURES,
//     payload: {stopRef, lineRef},
//   }
// }
