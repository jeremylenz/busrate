import React, { Component } from 'react';
import moment from 'moment'

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
      moment().subtract(43, 'minutes').fromNow(),
      moment().subtract(34, 'minutes').fromNow(),
      moment().subtract(10, 'minutes').fromNow(),
      moment().subtract(2, 'minutes').fromNow(),
    ]

    const yesterday = [
      moment().subtract(57, 'minutes').fromNow(),
      moment().subtract(29, 'minutes').fromNow(),
      moment().subtract(8, 'minutes').fromNow(),
      moment().subtract(4, 'minutes').fromNow(),
    ]
    
    this.setState({
      stopsAway,
      minutesAway,
      recents,
      yesterday
    })
  }

  render() {
    const { routeName } = this.props
    const { stopsAway, minutesAway, recents, yesterday } = this.state

    return (
      <div className='bus-stop-detail'>
        <BusRouteHeader routeName={routeName} />
        <BusDepartureDetails stopsAway={stopsAway} minutesAway={minutesAway} recents={recents} yesterday={yesterday} />
      </div>
    );
  }

}

export default BusStopDetail;
