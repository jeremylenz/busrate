// model name
export const STOP_LISTS = '[StopLists]';

// action types
export const FETCH_STOP_LIST = `${STOP_LISTS} FETCH`;
export const ADD_STOP_LIST = `${STOP_LISTS} ADD`;

// action creators

export const fetchStopList = (routeId) => {
  console.log('fetchStopList action')
  return {
    type: FETCH_STOP_LIST,
    payload: routeId,
  }
}

export const addStopList = ({stopList}) => {
  return {
    type: ADD_STOP_LIST,
    payload: stopList
  }
}
