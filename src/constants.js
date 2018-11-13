const REACT_APP_MTA_BUS_API_KEY = process.env.REACT_APP_MTA_BUS_API_KEY
const OUR_API_URL = `http://localhost:5000/api/v1`

// MTA API URL's, won't work because of CORS

export const LIST_OF_NYCT_BUS_ROUTES_URL = `http://bustime.mta.info/api/where/routes-for-agency/MTA%20NYCT.json?key=${REACT_APP_MTA_BUS_API_KEY}`
// export const LIST_OF_MTA_BUS_ROUTES_URL = `http://bustime.mta.info/api/where/routes-for-agency/MTABC.json?key=${REACT_APP_MTA_BUS_API_KEY}`
export const MTALINES_URL = `http://bustime.mta.info/api/where/routes-for-agency/MTA.json?key=${REACT_APP_MTA_BUS_API_KEY}`
export const LIST_OF_VEHICLES_URL = `http://bustime.mta.info/api/siri/vehicle-monitoring.json?key=${REACT_APP_MTA_BUS_API_KEY}&version=2&OperatorRef=MTA`
export const LIST_OF_AGENCIES_URL = `http://bustime.mta.info/api/where/agencies-with-coverage.json?key=${REACT_APP_MTA_BUS_API_KEY}`
// export const VEHICLES_FOR_STOP_URL = `http://bustime.mta.info/api/siri/stop-monitoring.json?key=${REACT_APP_MTA_BUS_API_KEY}&version=2&OperatorRef=MTA`

// My own API URL's which pass through to MTA API

export const LIST_OF_MTA_BUS_ROUTES_URL = `${OUR_API_URL}/mta/routes`
export const LIST_OF_STOPS_FOR_ROUTE_URL = `${OUR_API_URL}/mta/stoplists/`
export const VEHICLES_FOR_STOP_URL = `${OUR_API_URL}/mta/vehicles_for_stop/`
export const BUS_STOPS_URL = `${OUR_API_URL}/bus_stops`
