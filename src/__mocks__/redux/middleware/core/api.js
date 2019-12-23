/* eslint-disable no-unused-vars */
import { API_REQUEST, API_SUCCESS, API_ERROR, apiSuccess, apiError } from '../../actions/api';
import { setLoader, clearLoader } from '../../actions/ui';

const mockResponse = [];
console.log('mockResponse');

export const apiMiddleware = ({dispatch}) => (next) => (action) => {
  next(action);

  if(action.type.includes(API_REQUEST)) {
    const { url, method, feature } = action.meta;
    var uri = encodeURI(url);
    console.log('Mock API Middleware');
    // console.log(uri)
    next(setLoader({feature}));
    dispatch(apiSuccess({mockResponse, feature}));

  }

  if(action.type.includes(API_SUCCESS) || action.type.includes(API_ERROR)) {
    const { feature } = action.meta;
    next(clearLoader({feature}));
  }
};
