import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRealTimeDetail } from './../redux/actions/realTimeDetails';
import { STOP_LISTS } from './../redux/actions/stopLists';
import { fetchHistoricalDeparture } from './../redux/actions/historicalDepartures';
import { fetchStopList } from './../redux/actions/stopLists';
import { fetchRatingForRoute } from './../redux/actions/ratings';
import { withRouter } from 'react-router-dom';
import { MiniRatingDetails } from './RatingDetails';
import BusRouteHeader from './BusRouteHeader';
import BusStopList from './BusStopList';
import TerminalChooser from './TerminalChooser';
import styled from 'styled-components';
import Loader from './Loader';

const StyledDiv = styled.div`
  overflow-y: scroll;
  max-height: calc(100vh - 125px);
  border: 3px solid;
  border-radius: 16px;
  border-color: #ffee43;
  text-align: left;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  padding-bottom: 15px;

  &.loading {
    padding-top: 0px;
    margin-top: -40px;
    position: relative;
    top: 75px;
  }
`;

class BusRouteOverviewPage extends Component {

  constructor(props) {
    super(props);
    // Get the selected destination from the current url
    let search = new URLSearchParams(props.location.search);
    let selectedDestination = parseInt(search.get('selectedDestination')) || 0;
    this.state = {
      selectedDestination
    };
  }

  componentDidMount() {
    // get route from match
    const routeId = this.props.match.params.id;

    // find route in Redux store
    const stopLists = this.props.stopLists.items || [];
    var selectedStopList = stopLists.find((stopList) => stopList.data.entry.routeId === routeId);
    if (!selectedStopList) {
      this.props.fetchStopList(routeId);
    }

    this.props.fetchRatingForRoute({
      lineRef: routeId,
      directionRef: this.state.selectedDestination,
    });
  }

  handleTerminalSelection = () => {
    // Depends on previous state, so we use the function form of setState instead of the object form
    this.setState((prevState) => {
      var newTerminal;
      if (prevState.selectedDestination === 0) {
        newTerminal = 1;
      } else {
        newTerminal = 0;
      }
      // Make the current url reflect the selected destination
      let newSearch = `?selectedDestination=${newTerminal}`;
      this.props.history.replace({
        pathname: this.props.location.pathname,
        search: newSearch
      });
      this.checkRating(newTerminal);
      return {
        selectedDestination: newTerminal
      };
    });
  }

  checkRating = (directionRef) => {
    // See if we have a rating for this line and direction.  If not, fetch it.
    let lineRef = this.props.match.params.id;
    let trackingKey = `${lineRef} - ${directionRef}`;
    if (!this.props.ratings[trackingKey]) {
      this.props.fetchRatingForRoute({lineRef, directionRef});
    }
  }

  render() {
    // handle loader
    var loading = this.props.ui.loading && this.props.ui.features.has(STOP_LISTS);
    // get route from match
    const routeId = this.props.match.params.id;

    // find route in state
    const stopLists = this.props.stopLists.items || [];
    var selectedStopList = stopLists.find((stopList) => stopList.data.entry.routeId === routeId);
    if (!selectedStopList) {
      return (
        <StyledDiv className='bus-stop-list-container loading'>
          <Loader />
        </StyledDiv>
      );
    }
    selectedStopList = selectedStopList.data;

    // normalize data
    const stopGroups = selectedStopList.entry.stopGroupings[0].stopGroups;
    const destinations = stopGroups.map((stopGroup) => ({destinationName: stopGroup.name.name, stopIds: stopGroup.stopIds}));
    const stopData = selectedStopList.references.stops;
    const stopNames = {};
    stopData.forEach((stop) => stopNames[stop.id] = stop.name);
    const normalizedList = destinations.map((dest) => ({
      destination: dest.destinationName,
      stops: dest.stopIds.map((stopId) => ({stopId: stopId, stopName: stopNames[stopId]}))
    }));
      // normalizedList == [
      //   {
      //     destination: 'Cooper Av / Ridgewood',
      //     stops: ['Stop 1', 'Stop 2', 'Stop 3', 'Stop 4']
      //   },
      //   {
      //     destination: 'Long Island City / Queens Plz S',
      //     stops: ['Stop 4', 'Stop 3', 'Stop 2', 'Stop 1']
      //   }
      // ]

    const routeData = selectedStopList.references.routes.find((route) => route.id === routeId);
    var routeName, routeDescription, routeColor, routeLongName;
    if (routeData !== undefined) {
      routeName = routeData.shortName;
      routeDescription = routeData.description;
      routeLongName = routeData.longName;
      routeColor = routeData.color;
    }


    const terminals = normalizedList.map((stopList) => stopList.destination);
    let stopDataList, selectedDestinationName;

    // handle lines like Q70 with only one terminal
    if (normalizedList.length < 2) {
      stopDataList = normalizedList[0];
      selectedDestinationName = stopDataList.destination;
    } else {
      stopDataList = normalizedList[this.state.selectedDestination];
      selectedDestinationName = stopDataList.destination;
    }

    // Rating data
    const rating = this.props.ratings[`${routeId} - ${this.state.selectedDestination}`];

    return (
      <div className='bus-route-overview'>
        <BusRouteHeader routeName={routeName} routeId={routeId} routeColor={routeColor} routeDescription={routeDescription} routeLongName={routeLongName}>
          <MiniRatingDetails rating={rating} allowableHeadwayMin={8}/>
        </BusRouteHeader>
        {loading &&
          <StyledDiv className='bus-stop-list-container loading'>
            <Loader />
          </StyledDiv>
        }
        {!loading &&
          <StyledDiv className='bus-stop-list-container'>
            <TerminalChooser terminals={terminals} selected={selectedDestinationName} handleTerminalSelection={this.handleTerminalSelection} />
            <BusStopList
              stopDataList={stopDataList}
              fetchRealTimeDetail={this.props.fetchRealTimeDetail}
              fetchHistoricalDeparture={this.props.fetchHistoricalDeparture}
            />
          </StyledDiv>
        }
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    stopLists: state.stopLists,
    ui: state.ui,
    ratings: state.ratings,
  };
};

const mapDispatchToProps = {
  fetchRealTimeDetail,
  fetchHistoricalDeparture,
  fetchStopList,
  fetchRatingForRoute,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BusRouteOverviewPage));
