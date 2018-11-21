import { STOP_LISTS, FETCH_STOP_LIST, addStopList } from '../../actions/stopLists.js'
import { apiRequest, API_SUCCESS, API_ERROR } from '../../actions/api'
import { LIST_OF_STOPS_FOR_ROUTE_URL } from '../../../constants'

export const stopListsMiddleware = () => (next) => (action) => {
  next(action);

  switch(action.type) {

    case FETCH_STOP_LIST:
      const routeId = action.payload
      const method = 'GET'
      const url = LIST_OF_STOPS_FOR_ROUTE_URL + routeId;
      const feature = STOP_LISTS
      next(apiRequest({method, url, feature}))
      // other actions go here
      break;

    case `${STOP_LISTS} ${API_SUCCESS}`:
      next(addStopList({stopList: action.payload}))
      break;
    case `${STOP_LISTS} ${API_ERROR}`:
      console.log(action.payload)
      break;

    default:
      return null;

  }
}
