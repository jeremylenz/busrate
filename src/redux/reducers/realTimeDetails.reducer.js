import { ADD_REAL_TIME_DETAIL, FETCH_REAL_TIME_DETAIL, PURGE_REAL_TIME_DETAILS } from '../actions/realTimeDetails';

const realTimeDetailsState = {
  items: [],
  firstRequestSent: false,
};

export const realTimeDetailsReducer = (state = realTimeDetailsState, action) => {
  switch (action.type) {
  case ADD_REAL_TIME_DETAIL: {
    let newRealTimeDetail = action.payload;
    let newState = {
      items: [...state.items, newRealTimeDetail],
    };
    return Object.assign({}, state, newState);

  }
  case FETCH_REAL_TIME_DETAIL:
    return Object.assign({}, state, {
      firstRequestSent: true,
    });
  case PURGE_REAL_TIME_DETAILS: {

    let existingItems = state.items;
    // Filter to just items NOT for that route/stop combination.
    let filteredItems = existingItems.filter((rtd) => {
      return rtd.stopRef !== action.payload.stopRef;
    });
    let newState = {
      items: filteredItems, // replace current items with filtered items
    };
    return Object.assign({}, state, newState);
  }
  default:
    return state;
  }
};
