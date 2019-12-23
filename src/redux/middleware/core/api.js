import { API_REQUEST, API_SUCCESS, API_ERROR, apiSuccess, apiError } from '../../actions/api';
import { setLoader, clearLoader } from '../../actions/ui';

const checkResponse = (response) => {
  // We need access to both response.status and the result of the promise returned by response.json().
  // But we only have access to response.status BEFORE calling response.json().  So we check here...
  if(response.status === 200) {
    return response.json();
  } else {
    // and if status is not 200, we throw an error so it's caught in the Catch below.
    // The value of the error is the result of response.json().  This way we can access the actual error message.
    return response.json()
      .then((response) => Promise.reject(new Error(response.error)));
  }
};

export const apiMiddleware = ({dispatch}) => (next) => (action) => {
  next(action);

  if(action.type.includes(API_REQUEST)) {
    const { url, method, feature } = action.meta;
    var uri = encodeURI(url);
    console.log('Real API Middleware');
    // console.log(uri)
    next(setLoader({feature}));

    fetch(uri, { method })
      .then((response) => checkResponse(response))
    // .then((response) => response.json())
      .then((response) => dispatch(apiSuccess({response, feature})))
      .catch((error) => dispatch(apiError({error, feature})));

    // console.log(`${action.type} action`)
  }

  if(action.type.includes(API_SUCCESS) || action.type.includes(API_ERROR)) {
    const { feature } = action.meta;
    next(clearLoader({feature}));
  }
};
