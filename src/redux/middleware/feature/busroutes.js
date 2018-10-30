import { BUS_ROUTES, FETCH_BUS_ROUTES, setBusRoutes } from '../../actions/busRoutes.js'
import { apiRequest, API_SUCCESS, API_ERROR } from '../../actions/api'
import { LIST_OF_MTA_BUS_ROUTES_URL } from '../../../constants'

export const busRoutesMiddleware = () => (next) => (action) => {
  next(action);

  switch(action.type) {

    case FETCH_BUS_ROUTES:
      const method = 'GET'
      const url = LIST_OF_MTA_BUS_ROUTES_URL
      const feature = BUS_ROUTES
      next(apiRequest({method, url, feature}))
      // other actions go here
      break;

    case `${BUS_ROUTES} ${API_SUCCESS}`:
      console.log('API SUCCESS', action.payload)
      next(setBusRoutes({busRoutes: action.payload.data.list}))
      break;
    case `${BUS_ROUTES} ${API_ERROR}`:
      console.log(action.payload.message)
      break;

    default:
      return null;

  }
}
