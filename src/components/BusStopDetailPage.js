import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchRealTimeDetail } from './../redux/actions/realTimeDetails'
import { fetchHistoricalDeparture } from './../redux/actions/historicalDepartures'
import { fetchStopList } from './../redux/actions/stopLists'
import { setLoader, clearLoader } from './../redux/actions/ui'
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

  createAnticipatedDeparture = () => {
    console.log('create anticipated departure!')
    // {
    //   id(pin): null
    //   stop_ref(pin): "MTA_401905"
    //   line_ref(pin): "MTA NYCT_M86+"
    //   departure_time(pin): "2019-03-10T14:14:01.000Z"
    //   created_at(pin): null
    //   updated_at(pin): null
    //   vehicle_ref(pin): "MTA NYCT_6097"
    //   bus_stop_id(pin): null
    //   headway(pin): 459
    //   previous_departure_id(pin): null
    //   block_ref(pin): null
    //   dated_vehicle_journey_ref(pin): null
    //   interpolated(pin): false
    //   anticipated: true              <--- !!!
    //   direction_ref(pin): null
    // }

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

    // REAL-TIME DATA
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

      if (expectedDepartureTime === undefined) {
        minutesAwayText = "not provided"
      } else {
        let expectedDepText = moment(expectedDepartureTime).format('LT')
        minutesAwayText = moment(expectedDepartureTime).fromNow();
        minutesAwayText += ` (${expectedDepText})`
      }

    }

    // HISTORICAL DEPARTURE DATA
    var recents = []
    var yesterday = []
    var recentDepartures = []
    var previousDepartures = []
    var recentVehicleRefs = []
    var previousVehicleRefs = []
    var prevText, recentHeadways, previousHeadways, previousTimestamps, recentDepText;
    var recentsRating, prevDeparturesRating, overallRating;

    let hdRef = this.props.historicalDepartures.items.find((dep) => dep.line_ref === routeId && dep.stop_ref === stopId)
    if (hdRef) {
      // Recent departure data
      recentDepartures = hdRef.recents
      let recentTimestamps = hdRef.recent_departure_times.slice(0, 8) // first 8 elements
      recentHeadways = recentDepartures.map((hd) => Math.round(hd.headway / 60))
      let currentHeadway = (new Date() - Date.parse(recentTimestamps[0])) / 1000 / 60
      currentHeadway = Math.round(currentHeadway)
      recentHeadways.unshift(currentHeadway)
      recentHeadways.pop() // don't include the headway between the 8th and 9th departure; we only show 8
      recentVehicleRefs = hdRef.recents.map((hd) => hd.vehicle_ref.split('_')[1])
      recents = recentTimestamps.map((timeStamp) => moment(timeStamp).format('LT')) // '6:26 PM'
      recentDepText = moment(recentTimestamps[0]).fromNow() + ` (${recents[0]})`

      // Ratings data
      recentsRating = hdRef.recents_rating
      prevDeparturesRating = hdRef.prev_departures_rating
      overallRating = hdRef.overall_rating

      // Previous departure data
      previousDepartures = hdRef.prev_departures
      previousTimestamps = hdRef.prev_departure_times.slice(0, 8)
      previousHeadways = previousDepartures.map((hd) => Math.round(hd.headway / 60))
      previousHeadways.pop()
      previousVehicleRefs = hdRef.prev_departures.map((hd) => hd.vehicle_ref.split('_')[1])
      yesterday = previousTimestamps.map((timeStamp) => moment(timeStamp).format('LT'))
      prevText = hdRef.prev_departure_text

    }

    return (
      <div className='bus-stop-detail'>
        <BusRouteHeader
          loadingState={loadingState}
          routeName={routeName}
          routeId={routeId}
          routeDirection={routeDirection}
          stopNum={stopId}
          stopName={stopName}
        />
        <BusDepartureDetails
          recentDepartures={recentDepartures}
          previousDepartures={previousDepartures}
          loadingState={loadingState}
          stopsAway={stopsAwayText}
          minutesAway={minutesAwayText}
          progressStatus={progressStatusText}
          recents={recents}
          recentDepText={recentDepText}
          recentHeadways={recentHeadways}
          recentVehicleRefs={recentVehicleRefs}
          yesterday={yesterday}
          previousHeadways={previousHeadways}
          previousVehicleRefs={previousVehicleRefs}
          yesterdayLabel={prevText}
          recentsRating={recentsRating}
          prevDeparturesRating={prevDeparturesRating}
          overallRating={overallRating}
          allowableHeadwayMin={8}
          createAnticipatedDeparture={this.createAnticipatedDeparture}
        />
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
  setLoader,
  clearLoader,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BusStopDetailPage));
