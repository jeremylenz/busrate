// model name
export const REAL_TIME_DETAILS = '[RealTimeDetails]';

// action types
export const FETCH_REAL_TIME_DETAIL = `${REAL_TIME_DETAILS} FETCH`;
export const ADD_REAL_TIME_DETAIL = `${REAL_TIME_DETAILS} ADD`;

// action creators

export const fetchRealTimeDetail = (stopId) => {
  console.log('fetchRealTimeDetail action')
  return {
    type: FETCH_REAL_TIME_DETAIL,
    payload: stopId,
  }
}

export const addRealTimeDetail = ({realTimeDetail}) => {
  return {
    type: ADD_REAL_TIME_DETAIL,
    payload: realTimeDetail
  }
}
