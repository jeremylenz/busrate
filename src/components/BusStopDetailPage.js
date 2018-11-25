import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchRealTimeDetail } from './../redux/actions/realTimeDetails'
import { fetchHistoricalDeparture } from './../redux/actions/historicalDepartures'
import { fetchStopList } from './../redux/actions/stopLists'
import moment from 'moment'
import BusRouteHeader from './BusRouteHeader.js'
import BusDepartureDetails from './BusDepartureDetails.js'
import Loader from './Loader'

class BusStopDetailPage extends Component {

  componentDidMount() {

    const routeId = this.props.match.params.id
    const stopId = this.props.match.params.stop

    // If we're just loading the app from this page, get all our data.
    if (!this.props.stopLists.firstRequestSent) {
      this.props.fetchStopList(routeId)
    }
    if (!this.props.realTimeDetails.firstRequestSent) {
      this.props.fetchRealTimeDetail(stopId)
    }
    if (!this.props.historicalDepartures.firstRequestSent) {
      this.props.fetchHistoricalDeparture({
      stopRef: stopId,
      lineRef: routeId,
      })
    }

    // Poll the API regularly to update data
    // Realtime data: every 9 seconds
    this.getNextRealtimeData = setInterval(this.props.fetchRealTimeDetail, 9000, stopId)
    // Historical departures: every minute (matches how often the API creates them)
    this.getNextHistoricalDepartures = setInterval(this.props.fetchHistoricalDeparture, 60000, {
      stopRef: stopId,
      lineRef: routeId,
    })
  }

  componentWillUnmount() {
    clearInterval(this.getNextRealtimeData)
    clearInterval(this.getNextHistoricalDepartures)
  }

  render() {
    if (this.props.ui.loading && this.props.realTimeDetails.items.length === 0) {
      return <Loader absolute />
    }

    const routeId = this.props.match.params.id
    const stopId = this.props.match.params.stop
    const loadingState = this.props.ui

    var routeData, routeName, stopName, routeDirection;
    var stopsAwayText, minutesAwayText, expectedDepartureTime, progressStatusText;

    let foundStopList = this.props.stopLists.items.find((stopList) => stopList.data && stopList.data.entry.routeId === routeId)
    if (!foundStopList) {
      // console.log('!foundStopList')
    } else {
      // get route metadata from stopLists
      routeData = foundStopList.data
      // get route name
      let id = routeData.entry.routeId
      let routeRef = routeData.references.routes.find((route) => route.id === id)
      if (routeRef) {
        routeName = routeRef.shortName
      }
      // get stop name
      let stopRef = routeData.references.stops.find((stopRef) => stopRef.id === stopId)
      if (stopRef) {
        stopName = stopRef.name
      }
    }

    // realTimeDetails: Filter to just the stopRef we care about
    let rtdRefs = this.props.realTimeDetails.items.filter((rtdRef) => rtdRef.stopRef === stopId);
    // Now find the first vehicle that matches our routeId
    let foundRtdRef = rtdRefs.find((rtdRef) => rtdRef.lineRef === routeId);
    if (!foundRtdRef) {
      // console.log('!foundRtdRef')
      stopsAwayText = "No vehicles found"
      minutesAwayText = "Unknown"
    } else {

      routeDirection = foundRtdRef.destinationName
      stopsAwayText = foundRtdRef.stopsAwayText
      expectedDepartureTime = foundRtdRef.expectedDepartureTime
      progressStatusText = foundRtdRef.progressStatus

      // old code below

      if (expectedDepartureTime === undefined) {
        minutesAwayText = "not provided"
      } else {
        let expectedDepText = moment(expectedDepartureTime).format('LT')
        minutesAwayText = moment(expectedDepartureTime).fromNow();
        minutesAwayText += ` (${expectedDepText})`
      }

    }

    var recents = []
    var yesterday = []
    var prevText;

    let hdRef = this.props.historicalDepartures.items.find((dep) => dep.line_ref === routeId && dep.stop_ref === stopId)
    if (hdRef) {
      let recentTimestamps = hdRef.historical_departures.slice(0, 8) // first 8 elements
      recents = recentTimestamps.map((timeStamp) => moment(timeStamp).format('LT')) // '6:26 PM'
      let previousTimestamps = hdRef.prev_departures.slice(0, 8)
      yesterday = previousTimestamps.map((timeStamp) => moment(timeStamp).format('LT'))
      prevText = hdRef.prev_departure_text
    }


    return (
      <div className='bus-stop-detail'>
        <BusRouteHeader routeName={routeName} routeId={routeId} routeDirection={routeDirection} stopNum={stopId} stopName={stopName} />
      <BusDepartureDetails loadingState={loadingState} stopsAway={stopsAwayText} minutesAway={minutesAwayText} progressStatus={progressStatusText} recents={recents} yesterday={yesterday} yesterdayLabel={prevText} />
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  realTimeDetails: state.realTimeDetails,
  stopLists: state.stopLists,
  historicalDepartures: state.historicalDepartures,
  ui: state.ui,
})

const mapDispatchToProps = {
  fetchRealTimeDetail,
  fetchHistoricalDeparture,
  fetchStopList,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BusStopDetailPage));
