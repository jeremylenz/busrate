import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRealTimeDetail } from './../redux/actions/realTimeDetails'
import { fetchHistoricalDeparture } from './../redux/actions/historicalDepartures'
import { fetchStopList } from './../redux/actions/stopLists'
import { withRouter } from 'react-router-dom'
import BusRouteHeader from './BusRouteHeader'
import BusStopList from './BusStopList'
import TerminalChooser from './TerminalChooser'
import styled from 'styled-components'

const StyledDiv = styled.div`
  border: 3px solid;
  border-radius: 16px;
  border-color: #ffee43;
  text-align: left;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
`

class BusRouteOverviewPage extends Component {

  constructor() {
    super()
    this.state = {
      selectedDestination: 0
    }
  }

  componentDidMount() {
    // get route from match
    const routeId = this.props.match.params.id

    // find route in state
    const stopLists = this.props.stopLists.items || [];
    var selectedStopList = stopLists.find((stopList) => stopList.data.entry.routeId === routeId)
    if (!selectedStopList) {
      this.props.fetchStopList(routeId)
    }
  }

  handleTerminalSelection = (terminalName) => {
    this.setState((prevState) => {
      var newTerminal;
      if (prevState.selectedDestination === 0) {
        newTerminal = 1;
      } else {
        newTerminal = 0;
      }
      return {
        selectedDestination: newTerminal
      };
    });
  }

  render() {
    // get route from match
    const routeId = this.props.match.params.id

    // find route in state
    const stopLists = this.props.stopLists.items || [];
    var selectedStopList = stopLists.find((stopList) => stopList.data.entry.routeId === routeId)
    if (!selectedStopList) {
      return null;
    }
    selectedStopList = selectedStopList.data;

    // normalize data
    const stopGroups = selectedStopList.entry.stopGroupings[0].stopGroups;
    const destinations = stopGroups.map((stopGroup) => ({destinationName: stopGroup.name.name, stopIds: stopGroup.stopIds}))
    const stopData = selectedStopList.references.stops;
    const stopNames = {};
    stopData.forEach((stop) => stopNames[stop.id] = stop.name)
    const normalizedList = destinations.map((dest) => ({
      destination: dest.destinationName,
      stops: dest.stopIds.map((stopId) => ({stopId: stopId, stopName: stopNames[stopId]}))
    }))

    const routeData = selectedStopList.references.routes.find((route) => route.id === routeId)
    var routeName, routeDescription, routeLongName;
    if (routeData !== undefined) {
      routeName = routeData.shortName;
      routeDescription = routeData.description;
      routeLongName = routeData.longName;
    }

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

    const terminals = normalizedList.map((stopList) => stopList.destination)
    const stopDataList = normalizedList[this.state.selectedDestination]
    const selectedDestinationName = stopDataList.destination

    return (
      <div className='bus-route-overview'>
        <BusRouteHeader routeName={routeName} routeDescription={routeDescription} routeLongName={routeLongName} />
        <StyledDiv className='bus-stop-list-container'>
          <TerminalChooser terminals={terminals} selected={selectedDestinationName} handleTerminalSelection={this.handleTerminalSelection} />
          <BusStopList
            stopDataList={stopDataList}
            fetchRealTimeDetail={this.props.fetchRealTimeDetail}
            fetchHistoricalDeparture={this.props.fetchHistoricalDeparture}
          />
        </StyledDiv>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    stopLists: state.stopLists,
  }
};

const mapDispatchToProps = {
  fetchRealTimeDetail,
  fetchHistoricalDeparture,
  fetchStopList,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BusRouteOverviewPage));
