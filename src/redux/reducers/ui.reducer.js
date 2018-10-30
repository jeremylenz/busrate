import { SET_LOADER, CLEAR_LOADER } from '../actions/ui'

const uiState = {
  loading: false,
  feature: null,
}

export const uiReducer = (state = uiState, action) => {
  switch (true) {
    case action.type.includes(SET_LOADER):
      return Object.assign({}, state, {loading: true, feature: action.meta.feature})
    case action.type.includes(CLEAR_LOADER):
      return Object.assign({}, state, {loading: false, feature: action.meta.feature})
    default:
    return state;
  }
}
