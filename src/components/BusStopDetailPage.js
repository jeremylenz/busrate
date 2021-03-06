import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRealTimeDetail } from './../redux/actions/realTimeDetails';
import { fetchBusRoutes } from './../redux/actions/busRoutes';
import { fetchHistoricalDeparture, insertAnticipatedDepartures } from './../redux/actions/historicalDepartures';
import { addAnticipatedDeparture } from './../redux/actions/anticipatedDepartures';
import { fetchStopList } from './../redux/actions/stopLists';
import { setLoader, clearLoader } from './../redux/actions/ui';
import moment from 'moment';
import BusRouteHeader from './BusRouteHeader.js';
import BusDepartureDetails from './BusDepartureDetails.js';
import Loader from './Loader';

class BusStopDetailPage extends Component {

  componentDidMount() {

    const lineRef = this.props.match.params.id;
    const stopRef = this.props.match.params.stop;

    // If we're just loading the app from this page, get all our data.
    if (!this.props.stopLists.firstRequestSent) {
      this.props.fetchStopList(lineRef);
    }
    if (!this.props.realTimeDetails.firstRequestSent) {
      this.props.fetchRealTimeDetail(stopRef);
    }
    if (!this.props.historicalDepartures.firstRequestSent) {
      this.props.fetchHistoricalDeparture({ stopRef, lineRef });
    }
    if (this.props.busRoutes.items.length < 1) {
      this.props.fetchBusRoutes();
    }

    // Poll the API regularly to update data
    // Realtime data: every 9 seconds
    this.getNextRealtimeData = setInterval(this.props.fetchRealTimeDetail, 9000, stopRef);
    // Historical departures: every minute (matches how often the API creates them)
    this.getNextHistoricalDepartures = setInterval(this.props.fetchHistoricalDeparture, 60000, { stopRef, lineRef });
  }

  componentWillUnmount() {
    clearInterval(this.getNextRealtimeData);
    clearInterval(this.getNextHistoricalDepartures);
  }

  createAnticipatedDeparture = (vehicleRef) => {
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

    const lineRef = this.props.match.params.id;
    const stopRef = this.props.match.params.stop;

    let hdRef = this.props.historicalDepartures.items.find((dep) => dep.line_ref === lineRef && dep.stop_ref === stopRef);
    if (hdRef) {
      let recentTimestamp = hdRef.recents[0].departure_time;
      var currentHeadway = (new Date() - Date.parse(recentTimestamp)) / 1000;
      currentHeadway = Math.round(currentHeadway);
    }

    this.props.addAnticipatedDeparture({
      anticipatedDeparture: {
        id: null,
        stop_ref: stopRef,
        line_ref: lineRef,
        departure_time: new Date(),
        created_at: null,
        updated_at: null,
        vehicle_ref: vehicleRef,
        bus_stop_id: null,
        headway: currentHeadway,
        previous_departure_id: null,
        block_ref: null,
        dated_vehicle_journey_ref: null,
        interpolated: false,
        anticipated: true,
        direction_ref: null,
      }
    });

  }

  getHeaderAndRealTimeData = () => {

    const lineRef = this.props.match.params.id;
    const stopRef = this.props.match.params.stop;

    var routeData, routeName, stopName, routeDirection, routeColor;
    var stopsAwayText, minutesAwayText, expectedDepartureTime, progressStatusText;

    let foundStopList = this.props.stopLists.items.find((stopList) => stopList.data && stopList.data.entry.routeId === lineRef);
    if (!foundStopList) {
      // console.log('!foundStopList')
    } else {
      // get route metadata from stopLists
      routeData = foundStopList.data;
      // get route name
      let id = routeData.entry.routeId;
      let routeRef = routeData.references.routes.find((route) => route.id === id);
      if (routeRef) {
        routeName = routeRef.shortName;
        routeColor = routeRef.color;
      }
      // get stop name
      let stopInfo = routeData.references.stops.find((stopObj) => stopObj.id === stopRef);
      if (stopInfo) {
        stopName = stopInfo.name;
      }
    }

    // REAL-TIME DATA
    var anticipatedDepVehicleRef, rtdResponseTimestamp;
    // realTimeDetails: Filter to just the stopRef we care about
    let rtdRefs = this.props.realTimeDetails.items.filter((rtdRef) => rtdRef.stopRef === stopRef);
    // Now find the first vehicle that matches our lineRef
    let foundRtdRef = rtdRefs.find((rtdRef) => rtdRef.lineRef === lineRef);
    if (!foundRtdRef) {
      // console.log('!foundRtdRef')
      stopsAwayText = 'No vehicles found';
      minutesAwayText = 'Unknown';
    } else {

      routeDirection = foundRtdRef.destinationName;
      stopsAwayText = foundRtdRef.stopsAwayText;
      expectedDepartureTime = foundRtdRef.expectedDepartureTime;
      progressStatusText = foundRtdRef.progressStatus;
      anticipatedDepVehicleRef = foundRtdRef.vehicleRef;
      rtdResponseTimestamp = foundRtdRef.responseTimestamp;

      if (expectedDepartureTime === undefined) {
        minutesAwayText = 'not provided';
      } else {
        var expectedDepText = moment(expectedDepartureTime).format('LT');
        if (Date.parse(expectedDepartureTime) - new Date() < 10000) {
          expectedDepText = moment(expectedDepartureTime).format('LTS');
        }
        // console.log(Date.parse(expectedDepartureTime) - new Date())
        minutesAwayText = moment(expectedDepartureTime).fromNow();
        minutesAwayText += ` (${expectedDepText})`;
      }

    }

    return {
      routeName,
      lineRef,
      routeDirection,
      routeColor,
      stopRef,
      stopName,
      stopsAwayText,
      minutesAwayText,
      progressStatusText,
      anticipatedDepVehicleRef,
      rtdResponseTimestamp
    };
  }

  getDepartureData = () => {

    const lineRef = this.props.match.params.id;
    const stopRef = this.props.match.params.stop;

    // HISTORICAL DEPARTURE DATA
    var recents = [];
    var yesterday = [];
    var recentDepartures = [];
    var previousDepartures = [];
    var recentVehicleRefs = [];
    var previousVehicleRefs = [];
    var yesterdayLabel, recentHeadways, previousHeadways, previousTimestamps, recentDepText;
    var recentsRating, prevDeparturesRating, overallRating, weekdayRating, weekendRating, morningRushHourRating, eveningRushHourRating;
    var hdResponseTimestamp;

    let hdRef = this.props.historicalDepartures.items.find((dep) => dep.line_ref === lineRef && dep.stop_ref === stopRef);
    if (hdRef) {
      // Recent departure data
      recentDepartures = hdRef.recents;
      let recentTimestamps = hdRef.recents.slice(0, 8).map((d) => d.departure_time); // first 8 elements
      recentHeadways = recentDepartures.map((hd) => Math.round(hd.headway / 60));
      let currentHeadway = (new Date() - Date.parse(recentTimestamps[0])) / 1000 / 60;
      currentHeadway = Math.round(currentHeadway);
      recentHeadways.unshift(currentHeadway);
      recentHeadways.pop(); // don't include the headway between the 8th and 9th departure; we only show 8
      recentVehicleRefs = hdRef.recents.map((hd) => hd.vehicle_ref.split('_')[1]);
      recents = recentTimestamps.map((timeStamp) => moment(timeStamp).format('LT')); // '6:26 PM'
      recentDepText = moment(recentTimestamps[0]).fromNow() + ` (${recents[0]})`;

      // Ratings & misc data
      recentsRating = hdRef.recents_rating;
      prevDeparturesRating = hdRef.prev_departures_rating;
      overallRating = hdRef.overall_rating;
      weekdayRating = hdRef.weekday_rating;
      weekendRating = hdRef.weekend_rating;
      morningRushHourRating = hdRef.morning_rush_hour_rating;
      eveningRushHourRating = hdRef.evening_rush_hour_rating;
      hdResponseTimestamp = hdRef.response_timestamp;

      // Previous departure data
      previousDepartures = hdRef.prev_departures;
      previousTimestamps = hdRef.prev_departure_times.slice(0, 8);
      previousHeadways = previousDepartures.map((hd) => Math.round(hd.headway / 60));
      previousHeadways.pop();
      previousVehicleRefs = hdRef.prev_departures.map((hd) => hd.vehicle_ref.split('_')[1]);
      yesterday = previousTimestamps.map((timeStamp) => moment(timeStamp).format('LT'));
      yesterdayLabel = hdRef.prev_departure_text;

    }

    return {
      recents,
      recentDepText,
      recentHeadways,
      recentVehicleRefs,
      recentDepartures,
      previousDepartures,
      yesterday,
      previousHeadways,
      previousVehicleRefs,
      yesterdayLabel,
      recentsRating,
      prevDeparturesRating,
      overallRating,
      weekdayRating,
      weekendRating,
      morningRushHourRating,
      eveningRushHourRating,
      hdResponseTimestamp
    };
  }

  render() {
    if (this.props.ui.loading && this.props.realTimeDetails.items.length === 0) {
      return <Loader absolute />;
    }

    const loadingState = this.props.ui;
    const {
      routeName,
      routeColor,
      lineRef,
      routeDirection,
      stopRef,
      stopName,
      stopsAwayText,
      minutesAwayText,
      progressStatusText,
      anticipatedDepVehicleRef,
      rtdResponseTimestamp,
    } = this.getHeaderAndRealTimeData();

    const {
      recents,
      recentDepText,
      recentHeadways,
      recentVehicleRefs,
      recentDepartures,
      previousDepartures,
      yesterday,
      previousHeadways,
      previousVehicleRefs,
      yesterdayLabel,
      recentsRating,
      prevDeparturesRating,
      overallRating,
      weekdayRating,
      weekendRating,
      morningRushHourRating,
      eveningRushHourRating,
      hdResponseTimestamp,
    } = this.getDepartureData();

    // "MTA_" + Math.round(Math.random() * 10000)
    // onClick={() => this.createAnticipatedDeparture("MTA_" + Math.round(Math.random() * 10000))}
    return (
      <div className='bus-stop-detail'>
        <BusRouteHeader
          loadingState={loadingState}
          routeName={routeName}
          routeId={lineRef}
          routeColor={routeColor}
          routeDirection={routeDirection}
          stopNum={stopRef}
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
          yesterdayLabel={yesterdayLabel}
          recentsRating={recentsRating}
          prevDeparturesRating={prevDeparturesRating}
          overallRating={overallRating}
          weekdayRating={weekdayRating}
          weekendRating={weekendRating}
          morningRushHourRating={morningRushHourRating}
          eveningRushHourRating={eveningRushHourRating}
          rtdResponseTimestamp={rtdResponseTimestamp}
          hdResponseTimestamp={hdResponseTimestamp}
          allowableHeadwayMin={8}
          createAnticipatedDeparture={this.createAnticipatedDeparture}
          anticipatedDepVehicleRef={anticipatedDepVehicleRef}
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
  anticipatedDepartures: state.anticipatedDepartures,
  busRoutes: state.busRoutes,
});

const mapDispatchToProps = {
  fetchRealTimeDetail,
  fetchHistoricalDeparture,
  fetchStopList,
  setLoader,
  clearLoader,
  addAnticipatedDeparture,
  insertAnticipatedDepartures,
  fetchBusRoutes,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BusStopDetailPage));
