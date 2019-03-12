import React from 'react'
import RoundRect from './RoundRect'
import DepartureGraph from './DepartureGraph'
import Loader from './Loader'

const HistoricalDepartures = (props) => {
  const { historicalDeparturesLoading } = props
  return (
    <RoundRect ref={props.scrollRef} className={props.historicalDeparturesLoading ? "loading" : ""}>
      {!historicalDeparturesLoading &&
        <>
          <p>Most recent departure: {props.recentDepText}</p>
          <p>All recent departures:</p>
          <DepartureGraph departures={props.recentDepartures} headways={props.recentHeadways} times={props.recents} vehicleRefs={props.recentVehicleRefs}/>
          {props.yesterdayLabel &&
            <p>{props.yesterdayLabel}:</p>
          }
          <DepartureGraph dotsFirst departures={props.previousDepartures} headways={props.previousHeadways} times={props.yesterday} vehicleRefs={props.previousVehicleRefs}/>
        </>
      }
      {historicalDeparturesLoading &&
        <Loader />
      }
    </RoundRect>
    )
}

export default HistoricalDepartures;
