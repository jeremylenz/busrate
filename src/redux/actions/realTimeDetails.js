// model name
export const REAL_TIME_DETAILS = '[RealTimeDetails]';

// action types
export const FETCH_REAL_TIME_DETAIL = `${REAL_TIME_DETAILS} FETCH`;
export const ADD_REAL_TIME_DETAIL = `${REAL_TIME_DETAILS} ADD`;
export const PURGE_REAL_TIME_DETAILS = `${REAL_TIME_DETAILS} PURGE`;

// action creators

export const fetchRealTimeDetail = (stopId) => {
  return {
    type: FETCH_REAL_TIME_DETAIL,
    payload: stopId,
  };
};

export const addRealTimeDetail = ({realTimeDetail, normalizeKey}) => {
  return {
    type: ADD_REAL_TIME_DETAIL,
    payload: realTimeDetail,
    meta: {normalizeKey, feature: REAL_TIME_DETAILS}
  };
};

export const purgeRealTimeDetails = ({stopRef}) => {
  return {
    type: PURGE_REAL_TIME_DETAILS,
    payload: {stopRef},
  };
};
