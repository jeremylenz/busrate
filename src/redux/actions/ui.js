// action types

export const SET_LOADER = 'SET_LOADER';
export const CLEAR_LOADER = 'CLEAR_LOADER';

// action creators

export const setLoader = ({feature}) => {
  return {
    type: `${feature} ${SET_LOADER}`,
    payload: true,
    meta: {feature},
  }
}

export const clearLoader = ({feature}) => {
  return {
    type: `${feature} ${CLEAR_LOADER}`,
    payload: false,
    meta: {feature},
  }
}
