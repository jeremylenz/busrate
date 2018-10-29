import { FETCH_BUS_ROUTES } from '../../actions/busRoutes.js'

const TEST_URL = 'https://www.googleapis.com/books/v1/volumes?q=redux';

export const busRoutesMiddleware = () => (next) => (action) => {
  next(action);

  switch(action.type) {

    case FETCH_BUS_ROUTES:
      next(apiRequest({body: null, method: 'GET', url: TEST_URL, feature: 'Test'}))
      // other actions go here
      break;

    case `${BUS_ROUTES} ${API_SUCCESS}`:
    case `${BUS_ROUTES} ${API_ERROR}`:

    default:
      return null;

  }
}
