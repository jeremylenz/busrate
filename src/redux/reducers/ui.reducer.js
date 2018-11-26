import { SET_LOADER, CLEAR_LOADER } from '../actions/ui'

const uiState = {
  loading: false,
  features: new Set(),
}

export const uiReducer = (state = uiState, action) => {
  var newFeatures;
  switch (true) {
    case action.type.includes(SET_LOADER):
      newFeatures = new Set(state.features)
      newFeatures.add(action.meta.feature)
      console.log(newFeatures)
      return Object.assign({}, state, {loading: true, features: newFeatures})
    case action.type.includes(CLEAR_LOADER):
      newFeatures = new Set(state.features)
      if(newFeatures.has(action.meta.feature)) {
        newFeatures.delete(action.meta.feature)
      }
      const newLoading = (newFeatures.size > 0)
      console.log(newFeatures)
      return Object.assign({}, state, {loading: newLoading, features: newFeatures})
    default:
    return state;
  }
}
