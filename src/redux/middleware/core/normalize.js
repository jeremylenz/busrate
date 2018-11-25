import {dataNormalized} from '../../actions/data'
// import {addRealTimeDetail} from '../../actions/realTimeDetails'

function normalizeData(action) {
  // {
  //   stopsAwayText: '2 stops away',
  //   ExpectedDepartureTime: 'xxx',
  //   stopRef: 'xxx',
  //   lineRef: 'xxx',
  //   ResponseTimestamp: 'xxx',
  // }

  var rtdItems = []

  if(action.payload.Siri.ServiceDelivery.StopMonitoringDelivery[0] && action.payload.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit) {
    let vehicleJourneys = action.payload.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit.map((MonitoredStopVisit) => {
      return MonitoredStopVisit.MonitoredVehicleJourney;
    })
    rtdItems = vehicleJourneys.map((mvj) => {
      return {
        stopsAwayText: mvj.MonitoredCall.ArrivalProximityText,
        expectedDepartureTime: mvj.MonitoredCall.ExpectedDepartureTime,
        stopRef: mvj.MonitoredCall.StopPointRef,
        lineRef: mvj.LineRef,
        responseTimestamp: action.payload.Siri.ServiceDelivery.ResponseTimestamp,
        distanceFromStop: mvj.MonitoredCall.DistanceFromStop,
      }
    })
  }

  return rtdItems;
}

export const normalizeMiddleware = ({dispatch}) => (next) => (action) => {
  if (action.type.includes('ADD') && action.meta && action.meta.normalizeKey) {
    // tell 'em we're normalizing
    console.log('normalizing')
    dispatch(dataNormalized({feature: action.meta.feature}))
    // normalize!!
    let rtdItems = normalizeData(action)

    // Now we have an array of one or more normalized realTimeDetails
    rtdItems.forEach((rtdItem) => {
      // Add each to redux store along with the entire API response (action.payload)
      const normalizedRtd = Object.assign({}, action.payload, rtdItem)

      const normalizedAction = {
        type: action.type,
        payload: normalizedRtd,
        meta: {normalizeKey: null},
      }
      next(normalizedAction);
    })


  } else {
    // if normalizeKey is null, just add without normalizing.  Prevent infinite loops.
    next(action);
  }

 }
