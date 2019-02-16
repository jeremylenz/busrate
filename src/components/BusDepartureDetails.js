import React from 'react';
import styled from 'styled-components'
import Loader from './Loader'
import { HISTORICAL_DEPARTURES } from './../redux/actions/historicalDepartures'
import DepartureGraph from './DepartureGraph'
import RatingDetails from './RatingDetails'

const StyledDiv = styled.div`
  position: relative;
  z-index: 1;
  border: 3px #8994d4;
  border-radius: 8px;
  border-style: solid;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 6px;
  margin-bottom: 8px;
  text-align: left;
  font-size: 1.1em;
  overflow-x: scroll;
  overflow-y: visible;


  &.loading {
    padding-top: 60px;
    padding-bottom: 15px;
  }
`

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
    const { stopsAway, minutesAway, progressStatus, recents, recentDepText, recentHeadways, recentVehicleRefs, yesterday, previousHeadways, previousVehicleRefs, yesterdayLabel, recentsRating, prevDeparturesRating, overallRating, allowableHeadwayMin, loadingState } = this.props
    var historicalDeparturesLoading;

    const RealTimeDetails = () => (
      <StyledDiv className='bus-departure-details'>
        <>
        <p>Expected departure: {minutesAway}</p>
        <p>{stopsAway}</p>
        {progressStatus &&
          <p>{progressStatus}</p>
        }
        </>
      </StyledDiv>
    )

    const HistoricalDepartures = () => (
      <StyledDiv ref={this.scrollRef}>
        <p>Most recent departure: {recentDepText}</p>
        <p>All recent departures:</p>
        <DepartureGraph headways={recentHeadways} times={recents} vehicleRefs={recentVehicleRefs}/>
        {yesterdayLabel &&
          <p>{yesterdayLabel}:</p>
        }
        <DepartureGraph dotsFirst headways={previousHeadways} times={yesterday} vehicleRefs={previousVehicleRefs}/>
      </StyledDiv>
      )

    historicalDeparturesLoading = (loadingState.loading && loadingState.features.has(HISTORICAL_DEPARTURES))

    return (
      <>
        <RealTimeDetails />
        {historicalDeparturesLoading &&
          <StyledDiv className='loading'>
            <Loader />
          </StyledDiv>
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
