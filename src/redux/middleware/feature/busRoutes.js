import { BUS_ROUTES, FETCH_BUS_ROUTES, setBusRoutes } from '../../actions/busRoutes.js';
import { apiRequest, API_SUCCESS, API_ERROR } from '../../actions/api';
import { LIST_OF_MTA_BUS_ROUTES_URL } from '../../../constants';

export const busRoutesMiddleware = () => (next) => (action) => {
  next(action);

  switch(action.type) {

  case FETCH_BUS_ROUTES: {
    const method = 'GET';
    const url = LIST_OF_MTA_BUS_ROUTES_URL;
    const feature = BUS_ROUTES;
    next(apiRequest({method, url, feature}));
    // other actions go here
    break;
  }
  case `${BUS_ROUTES} ${API_SUCCESS}`:
    next(setBusRoutes({busRoutes: action.payload}));
    break;
  case `${BUS_ROUTES} ${API_ERROR}`: {
    // console.log(action.payload);
    break;
  }

  default:
    return null;

  }
};
