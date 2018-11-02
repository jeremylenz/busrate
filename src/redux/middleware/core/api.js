import { API_REQUEST, API_SUCCESS, API_ERROR, apiSuccess, apiError } from "../../actions/api";
import { setLoader, clearLoader } from '../../actions/ui'

const checkResponse = (response) => {
  if(response.status !== 200) {
    response.json()
    .then((response) => {
      console.error(response.body)
    })
    throw new Error(response)
  }
  return response
}

export const apiMiddleware = ({dispatch}) => (next) => (action) => {
  next(action);

  if(action.type.includes(API_REQUEST)) {
    const { url, method, feature } = action.meta
    next(setLoader({feature}));

    fetch(url, { method })
      .then((response) => checkResponse(response))
      .then((response) => response.json())
      .then((response) => dispatch(apiSuccess({response, feature})))
      .catch((error) => dispatch(apiError({error, feature})))

    console.log(`${action.type} action!!`)
  }

  if(action.type.includes(API_SUCCESS) || action.type.includes(API_ERROR)) {
    const { feature } = action.meta
    next(clearLoader({feature}));
  }
}
