import {dataNormalized} from '../../actions/data'
// import {addRealTimeDetail} from '../../actions/realTimeDetails'

function normalizeData(action) {
  // {
  //   Siri: {xxx},
  //   stopsAwayText: '2 stops away',
  //   ExpectedDepartureTime: 'xxx',
  //   stopRef: 'xxx',
  //   lineRef: 'xxx',
  //   ResponseTimestamp: 'xxx',
  // }

  var rtdItems = []
  let vehicleJourneys;

  if(action.payload.Siri.ServiceDelivery.StopMonitoringDelivery[0] && action.payload.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit) {
    vehicleJourneys = action.payload.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit.map((MonitoredStopVisit) => {
      return MonitoredStopVisit.MonitoredVehicleJourney;
    })
    rtdItems = vehicleJourneys.map((mvj) => {

      let progressStatus;
      if(mvj.ProgressStatus) {
        progressStatus = mvj.ProgressStatus[0].split(",")
      } else {
        progressStatus = [];
      }
      progressStatus.forEach((status, idx) => {
        if (status === "prevTrip") {
          progressStatus[idx] = "On previous trip"
        }
        if (status === "layover") {
          progressStatus[idx] = "On layover at terminal"
        }
      })
      let progressStatusText = progressStatus.join("; ")

      return {
        stopsAwayText: mvj.MonitoredCall.ArrivalProximityText,
        expectedDepartureTime: mvj.MonitoredCall.ExpectedDepartureTime,
        progressStatus: progressStatusText,
        destinationName: mvj.DestinationName[0],
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
