// model name
export const HISTORICAL_DEPARTURES = '[HistoricalDepartures]';

// action types
export const FETCH_HISTORICAL_DEPARTURE = `${HISTORICAL_DEPARTURES} FETCH`;
export const ADD_HISTORICAL_DEPARTURE = `${HISTORICAL_DEPARTURES} ADD`; // this actually adds a set of departures, not a single departure
export const PURGE_HISTORICAL_DEPARTURES = `${HISTORICAL_DEPARTURES} PURGE`;
export const SKIP_DEPARTURE_FETCH = `${HISTORICAL_DEPARTURES} SKIP FETCH`;
export const INSERT_ANTICIPATED_DEPARTURES = `${HISTORICAL_DEPARTURES} INSERT ANTICIPATED DEPARTURES`

// action creators

export const fetchHistoricalDeparture = ({stopRef, lineRef}) => {
  return {
    type: FETCH_HISTORICAL_DEPARTURE,
    payload: {stopRef, lineRef},
  }
}

export const skipDepartureFetch = () => {
  return {
    type: SKIP_DEPARTURE_FETCH,
  }
}

export const addHistoricalDeparture = ({historicalDeparture}) => {
  return {
    type: ADD_HISTORICAL_DEPARTURE,
    payload: historicalDeparture
  }
}

export const purgeHistoricalDepartures = ({stopRef, lineRef}) => {
  return {
    type: PURGE_HISTORICAL_DEPARTURES,
    payload: {stopRef, lineRef},
  }
}

export const insertAnticipatedDepartures = ({anticipatedDepartures}) => {
  return {
    type: INSERT_ANTICIPATED_DEPARTURES,
    payload: anticipatedDepartures,
  }
}
