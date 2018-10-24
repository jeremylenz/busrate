import React, { Component } from 'react';
import moment from 'moment'
import BusRouteHeader from './BusRouteHeader.js'
import BusDepartureDetails from './BusDepartureDetails.js'

class BusStopDetail extends Component {

  constructor() {
    super()
    this.state = {
      stopsAway: null,
      minutesAway: null,
      recents: [],
      yesterday: [],
    }
  }

  componentDidMount() {
    // mock API call
    const stopsAway = 2
    const minutesAway = 4

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
      stopsAway,
      minutesAway,
      recents,
      yesterday
    })
  }

  render() {
    const { routeName, routeDirection, stopNum, stopName } = this.props
    const { stopsAway, minutesAway, recents, yesterday } = this.state

    return (
      <div className='bus-stop-detail'>
        <BusRouteHeader routeName={routeName} routeDirection={routeDirection} stopNum={stopNum} stopName={stopName} />
        <BusDepartureDetails stopsAway={stopsAway} minutesAway={minutesAway} recents={recents} yesterday={yesterday} />
      </div>
    );
  }

}

export default BusStopDetail;
