import { ADD_STOP_LIST, FETCH_STOP_LIST } from '../actions/stopLists';

const stopListsState = {
  items: [],
  firstRequestSent: false,
};

export const stopListsReducer = (state = stopListsState, action) => {
  switch (action.type) {
  case ADD_STOP_LIST: {
    let newStopList = action.payload;
    let newState = {
      items: [...state.items, newStopList]
    };
    return Object.assign({}, state, newState);

  }
  case FETCH_STOP_LIST:
    return Object.assign({}, state, {
      firstRequestSent: true,
    });
  default:
    return state;
  }
};
