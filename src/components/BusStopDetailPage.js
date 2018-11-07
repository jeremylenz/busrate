import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import BusRouteHeader from './BusRouteHeader.js'
import BusDepartureDetails from './BusDepartureDetails.js'

class BusStopDetailPage extends Component {

  constructor() {
    super()
    this.state = {
      recents: [],
      yesterday: [],
    }
  }

  componentDidMount() {
    // mock API call

    const recents = [
      moment().subtract(43, 'minutes').format('LT'),
      moment().subtract(34, 'minutes').format('LT'),
      moment().subtract(10, 'minutes').format('LT'),
      moment().subtract(2, 'minutes').format('LT'),
    ]

    const yesterday = [
      moment().subtract(1497, 'minutes').format('LT'),
      moment().subtract(1469, 'minutes').format('LT'),
      moment().subtract(1448, 'minutes').format('LT'),
      moment().subtract(1444, 'minutes').format('LT'),
    ]

    this.setState({
      recents,
      yesterday
    })
  }

  render() {
    if (this.props.stopLists === undefined || this.props.realTimeDetails === undefined) return null;
    const routeId = this.props.match.params.id
    const stopId = this.props.match.params.stop

    var routeData, routeName, routeDescription, routeLongName, stopName, routeDirection;
    var stopsAway, minutesAway, progressStatus;

    let stopListsQty = this.props.stopLists.items.length
    if (stopListsQty > 0) {
      // get route metadata from stopLists
      routeData = this.props.stopLists.items[stopListsQty - 1].data
      // get route name
      let id = routeData.entry.routeId
      let routeRef = routeData.references.routes.find((route) => route.id === id)
      if (routeRef !== undefined) {
        routeName = routeRef.shortName
        // get desc / long name
        routeDescription = routeRef.description
        routeLongName = routeRef.longName
      }
      // get stop name
      let stopRef = routeData.references.stops.find((stopRef) => stopRef.id === stopId)
      if (stopRef !== undefined) {
        stopName = stopRef.name
      }
    }

    let realTimeDetailsQty = this.props.realTimeDetails.items.length
    if (realTimeDetailsQty > 0) {
      let rtdRef = this.props.realTimeDetails.items[realTimeDetailsQty - 1]
      if (rtdRef !== undefined
      && rtdRef.Siri.ServiceDelivery.StopMonitoringDelivery[0] !== undefined
      && rtdRef.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit[0] !== undefined) {
        let rtdPrefix = rtdRef.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit[0].MonitoredVehicleJourney
        routeDirection = rtdPrefix.DestinationName[0]
        stopsAway = rtdPrefix.MonitoredCall.ArrivalProximityText
        minutesAway = rtdPrefix.MonitoredCall.ExpectedDepartureTime
        if(rtdPrefix.ProgressStatus !== undefined) {
          progressStatus = rtdPrefix.ProgressStatus[0]
        }
        console.log(progressStatus)
        if (minutesAway === undefined) {
          minutesAway = "unknown"
        } else {
          minutesAway = moment(minutesAway).fromNow();
        }
        if (progressStatus === "prevTrip") {
          progressStatus = "On previous trip"
        }
        if (progressStatus === "layover") {
          progressStatus = "On layover at terminal"
        }

      }
    }


    const { recents, yesterday } = this.state

    return (
      <div className='bus-stop-detail'>
        <BusRouteHeader routeName={routeName} routeDirection={routeDirection} stopNum={stopId} stopName={stopName} />
        <BusDepartureDetails stopsAway={stopsAway} minutesAway={minutesAway} progressStatus={progressStatus} recents={recents} yesterday={yesterday} />
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  realTimeDetails: state.realTimeDetails,
  stopLists: state.stopLists,
})

export default withRouter(connect(mapStateToProps)(BusStopDetailPage));
