import React from 'react';
import styled from 'styled-components'
import Loader from './Loader'
import { HISTORICAL_DEPARTURES } from './../redux/actions/historicalDepartures'
import DepartureGraph from './DepartureGraph'

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

const StyledP = styled.p`
  margin-bottom: 0;
  padding-bottom: 1em;
`



class BusDepartureDetails extends React.Component {

  render () {
    const { stopsAway, minutesAway, progressStatus, recents, recentDepText, recentHeadways, yesterday, previousHeadways, yesterdayLabel, loadingState } = this.props
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
    <StyledDiv>
      <p>Most recent departure: {recentDepText}</p>
      <p>All recent departures:</p>
      <DepartureGraph headways={recentHeadways} times={recents}/>
      {yesterdayLabel &&
        <p>{yesterdayLabel}:</p>
      }
        <DepartureGraph dotsFirst headways={previousHeadways} times={yesterday}/>
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
    </>
    )
  }

}

export default BusDepartureDetails;
