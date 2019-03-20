// model name
export const RATINGS = '[Ratings]';

// action types
export const FETCH_RATING_FOR_ROUTE = `${RATINGS} FETCH FOR ROUTE`;
export const FETCH_RATING_FOR_STOP = `${RATINGS} FETCH FOR STOP`;
export const SET_RATING_FOR_ROUTE = `${RATINGS} SET FOR ROUTE`;
export const SET_RATING_FOR_STOP = `${RATINGS} SET FOR STOP`;

// action creators

export const fetchRatingForRoute = ({lineRef, directionRef}) => {
  return {
    type: FETCH_RATING_FOR_ROUTE,
    meta: {lineRef, directionRef},
  }
}

export const fetchRatingForStop = ({lineRef, stopRef}) => {
  return {
    type: FETCH_RATING_FOR_STOP,
    meta: {lineRef, stopRef},
  }
}

export const setRatingForRoute = ({lineRef, directionRef, rating}) => {
  return {
    type: SET_RATING_FOR_ROUTE,
    meta: {lineRef, directionRef},
    payload: rating,
  }
}

export const setRatingForStop = ({lineRef, stopRef, rating}) => {
  return {
    type: SET_RATING_FOR_STOP,
    meta: {lineRef, stopRef},
    payload: rating,
  }
}
