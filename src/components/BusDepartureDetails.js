import React from 'react';
import styled from 'styled-components'
import Loader from './Loader'
import { HISTORICAL_DEPARTURES } from './../redux/actions/historicalDepartures'
import DepartureGraph from './DepartureGraph'
import RatingDetails from './RatingDetails'
import RoundRect from './RoundRect'

class BusDepartureDetails extends React.Component {

  constructor(props) {
    super(props);
    this.scrollRef = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const scrollRef = this.scrollRef.current;
    if (scrollRef && scrollRef.scrollLeft) {
      return scrollRef.scrollLeft
    }
    return null
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const scrollRef = this.scrollRef.current;
    if (scrollRef) {
      scrollRef.scrollLeft = snapshot;
      // console.log(snapshot)
    }
  }

  render () {
    const { recentDepartures, previousDepartures, stopsAway, minutesAway, progressStatus, recents, recentDepText, recentHeadways, recentVehicleRefs, yesterday, previousHeadways, previousVehicleRefs, yesterdayLabel, recentsRating, prevDeparturesRating, overallRating, allowableHeadwayMin, loadingState } = this.props
    var historicalDeparturesLoading;

    const RealTimeDetails = () => (
      <RoundRect className='bus-departure-details'>
        <>
        <p>Expected departure: {minutesAway}</p>
        <p>{stopsAway}</p>
        {progressStatus &&
          <p>{progressStatus}</p>
        }
        </>
      </RoundRect>
    )

    const HistoricalDepartures = () => (
      <RoundRect ref={this.scrollRef}>
        <p>Most recent departure: {recentDepText}</p>
        <p>All recent departures:</p>
        <DepartureGraph departures={recentDepartures} headways={recentHeadways} times={recents} vehicleRefs={recentVehicleRefs}/>
        {yesterdayLabel &&
          <p>{yesterdayLabel}:</p>
        }
        <DepartureGraph dotsFirst departures={previousDepartures} headways={previousHeadways} times={yesterday} vehicleRefs={previousVehicleRefs}/>
      </RoundRect>
      )

    historicalDeparturesLoading = (loadingState.loading && loadingState.features.has(HISTORICAL_DEPARTURES))

    return (
      <>
        <RealTimeDetails />
        {historicalDeparturesLoading &&
          <RoundRect className='loading'>
            <Loader />
          </RoundRect>
        }
        {!historicalDeparturesLoading &&
          <>
          <HistoricalDepartures />
          </>
        }
        <RatingDetails
          loadingState={loadingState}
          recentsRating={recentsRating}
          prevDeparturesRating={prevDeparturesRating}
          overallRating={overallRating}
          allowableHeadwayMin={allowableHeadwayMin}
        />

      </>
      )
    }

}

export default BusDepartureDetails;
