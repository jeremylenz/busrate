// model name
export const BUS_ROUTES = '[BusRoutes]';

// action types
export const FETCH_BUS_ROUTES = `${BUS_ROUTES} FETCH`
export const SET_BUS_ROUTES = `${BUS_ROUTES} SET`

// action creators

export const fetchBusRoutes = ({query}) => {
  type: FETCH_BUS_ROUTES,
  payload: query
}

export const setBusRoutes = ({busRoutes}) => {
  type: SET_BUS_ROUTES,
  payload: busRoutes
}