// model name
export const HISTORICAL_DEPARTURES = '[HistoricalDepartures]';

// action types
export const FETCH_HISTORICAL_DEPARTURE = `${HISTORICAL_DEPARTURES} FETCH`;
export const ADD_HISTORICAL_DEPARTURE = `${HISTORICAL_DEPARTURES} ADD`;

// action creators

export const fetchHistoricalDeparture = ({stopRef, lineRef}) => {
  console.log('fetchHistoricalDeparture action')
  return {
    type: FETCH_HISTORICAL_DEPARTURE,
    payload: {stopRef, lineRef},
  }
}

export const addHistoricalDeparture = ({realTimeDetail}) => {
  return {
    type: ADD_HISTORICAL_DEPARTURE,
    payload: realTimeDetail
  }
}
