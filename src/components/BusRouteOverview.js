import React, { Component } from 'react';
import BusRouteHeader from './BusRouteHeader'
import BusStopList from './BusStopList'

class BusRouteOverview extends Component {

  constructor() {
    super()
    this.state = {
      selectedDirection: 0
    }
  }

  render() {
    const { routeName, routeDescription, stopLists } = this.props
    if (stopLists.length < 1) return null;
    // stopLists == [
    //   {
    //     direction: 'Cooper Av / Ridgewood',
    //     stops: ['Stop 1', 'Stop 2', 'Stop 3', 'Stop 4']
    //   },
    //   {
    //     direction: 'Long Island City / Queens Plz S',
    //     stops: ['Stop 4', 'Stop 3', 'Stop 2', 'Stop 1']
    //   }
    // ]
    const terminals = stopLists.map((stopList) => stopList.direction)
    const stopList = stopLists[this.state.selectedDirection]
    const selectedDirectionName = stopList.direction

    return (
      <div className='bus-route-overview'>
        <BusRouteHeader routeName={routeName} routeDescription={routeDescription} />
        <div className='bus-stop-list-container'>
          {/* <TerminalChooser terminals={terminals} /> */}
          <BusStopList stopList={stopList} />
        </div>
      </div>
    );
  }

}

export default BusRouteOverview;
