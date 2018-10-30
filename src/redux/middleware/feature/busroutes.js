import { BUS_ROUTES, FETCH_BUS_ROUTES } from '../../actions/busRoutes.js'
import { API_SUCCESS, API_ERROR } from '../core/api'


const TEST_URL = 'https://www.googleapis.com/books/v1/volumes?q=redux';

export const busRoutesMiddleware = () => (next) => (action) => {
  next(action);

  switch(action.type) {

    case FETCH_BUS_ROUTES:
      next(apiRequest({body: null, method: 'GET', url: TEST_URL, feature: 'Test'}))
      // other actions go here
      break;

    case `${BUS_ROUTES} ${API_SUCCESS}`:
      next(setBusRoutes({items: action.payload.items}))
      break;
    case `${BUS_ROUTES} ${API_ERROR}`:
      next(setNotification({message: action.payload.message, feature: BUS_ROUTES}))
      break;

    default:
      return null;

  }
}
