import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchRealTimeDetail } from './../redux/actions/realTimeDetails'
import { fetchHistoricalDeparture } from './../redux/actions/historicalDepartures'
import { fetchStopList } from './../redux/actions/stopLists'
import moment from 'moment'
import BusRouteHeader from './BusRouteHeader.js'
import BusDepartureDetails from './BusDepartureDetails.js'

class BusStopDetailPage extends Component {

  constructor() {
    super()
  }

  componentDidMount() {

    // const recents = [
    //   moment().subtract(43, 'minutes').format('LT'),
    //   moment().subtract(34, 'minutes').format('LT'),
    //   moment().subtract(10, 'minutes').format('LT'),
    //   moment().subtract(2, 'minutes').format('LT'),
    // ]
    //
    // const yesterday = [
    //   moment().subtract(1497, 'minutes').format('LT'),
    //   moment().subtract(1469, 'minutes').format('LT'),
    //   moment().subtract(1448, 'minutes').format('LT'),
    //   moment().subtract(1444, 'minutes').format('LT'),
    // ]
  }

  render() {
    const routeId = this.props.match.params.id
    const stopId = this.props.match.params.stop

    var routeData, routeName, routeDescription, routeLongName, stopName, routeDirection;
    var stopsAway, minutesAway, progressStatus, progressStatusStr;

    let foundStopList = this.props.stopLists.items.find((stopList) => stopList.data && stopList.data.entry.routeId === routeId)
    if (!foundStopList && this.props.stopLists.items.length === 0) {
      this.props.fetchStopList(routeId)
      return null;
    } else if (foundStopList) {
      // get route metadata from stopLists
      routeData = foundStopList.data
      // get route name
      let id = routeData.entry.routeId
      let routeRef = routeData.references.routes.find((route) => route.id === id)
      if (routeRef) {
        routeName = routeRef.shortName
        // get desc / long name
        routeDescription = routeRef.description
        routeLongName = routeRef.longName
      }
      // get stop name
      let stopRef = routeData.references.stops.find((stopRef) => stopRef.id === stopId)
      if (stopRef) {
        stopName = stopRef.name
      }
    }

    let foundRtdRef = this.props.realTimeDetails.items.find((rtdRef) => {
      // First find the stop
      if (rtdRef.Siri.ServiceDelivery.StopMonitoringDelivery[0] === undefined) return false;
      if (rtdRef.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit[0] === undefined) return false;
      return (rtdRef.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit[0].MonitoredVehicleJourney.MonitoredCall.StopPointRef === stopId)
    });
    if (!foundRtdRef && this.props.realTimeDetails.items.length === 0) {
      this.props.fetchStopList(routeId)
      this.props.fetchRealTimeDetail(stopId)
      return null;
    } else if (foundRtdRef) {
      // Now find the route
      let rtdPrefix = foundRtdRef.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit.find((stopVisit) => stopVisit.MonitoredVehicleJourney.LineRef === routeId)
      if (rtdPrefix) {
        rtdPrefix = rtdPrefix.MonitoredVehicleJourney
        routeDirection = rtdPrefix.DestinationName[0]
        stopsAway = rtdPrefix.MonitoredCall.ArrivalProximityText
        minutesAway = rtdPrefix.MonitoredCall.ExpectedDepartureTime
        if(rtdPrefix.ProgressStatus) {
          progressStatus = rtdPrefix.ProgressStatus[0].split(",")
        } else {
          progressStatus = [];
        }
        // console.log(progressStatus)
        if (minutesAway === undefined) {
          minutesAway = "not provided"
        } else {
          minutesAway = moment(minutesAway).fromNow();
        }

        progressStatus.forEach((status, idx) => {
          if (status === "prevTrip") {
            progressStatus[idx] = "On previous trip"
          }
          if (status === "layover") {
            progressStatus[idx] = "On layover at terminal"
          }
        })
        progressStatusStr = progressStatus.join("; ")

      } else {
        minutesAway = "Unknown; no MTA real-time data"
      }

    }

    var recents = []
    var yesterday = []

    let hdRef = this.props.historicalDepartures.items.find((dep) => dep.line_ref === routeId && dep.stop_ref === stopId)
    if (!hdRef && this.props.historicalDepartures.items.length === 0) {
      this.props.fetchHistoricalDeparture({
      stopRef: stopId,
      lineRef: routeId,
    })
  } else if (hdRef) {
      let recentTimestamps = hdRef.historical_departures.slice(0, 6) // first 6 elements
      recents = recentTimestamps.map((timeStamp) => moment(timeStamp).format('LT')) // '6:26 PM'
    }


    return (
      <div className='bus-stop-detail'>
        <BusRouteHeader routeName={routeName} routeDirection={routeDirection} stopNum={stopId} stopName={stopName} />
        <BusDepartureDetails stopsAway={stopsAway} minutesAway={minutesAway} progressStatus={progressStatusStr} recents={recents} yesterday={yesterday} />
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  realTimeDetails: state.realTimeDetails,
  stopLists: state.stopLists,
  historicalDepartures: state.historicalDepartures,
})

const mapDispatchToProps = {
  fetchRealTimeDetail,
  fetchHistoricalDeparture,
  fetchStopList,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BusStopDetailPage));
