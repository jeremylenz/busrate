import React, { Component } from 'react';
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
      selectedDirection: 0
    }
  }

  handleTerminalSelection = (terminalName) => {
    const terminals = this.props.stopLists.map((stopList) => stopList.direction)
    let newTerminal = terminals.indexOf(terminalName)
    this.setState({
      selectedDirection: newTerminal,
    })
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
        <StyledDiv className='bus-stop-list-container'>
          <TerminalChooser terminals={terminals} selected={selectedDirectionName} handleTerminalSelection={this.handleTerminalSelection} />
          <BusStopList stopList={stopList} />
        </StyledDiv>
      </div>
    );
  }

}

export default BusRouteOverviewPage;
