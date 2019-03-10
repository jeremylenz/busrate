import React from 'react'
import RoundRect from './RoundRect'
import DepartureGraph from './DepartureGraph'

const HistoricalDepartures = (props) => (
  <RoundRect ref={props.scrollRef}>
    <p>Most recent departure: {props.recentDepText}</p>
    <p>All recent departures:</p>
    <DepartureGraph departures={props.recentDepartures} headways={props.recentHeadways} times={props.recents} vehicleRefs={props.recentVehicleRefs}/>
    {props.yesterdayLabel &&
      <p>{props.yesterdayLabel}:</p>
    }
    <DepartureGraph dotsFirst departures={props.previousDepartures} headways={props.previousHeadways} times={props.yesterday} vehicleRefs={props.previousVehicleRefs}/>
  </RoundRect>
  )

export default HistoricalDepartures;
