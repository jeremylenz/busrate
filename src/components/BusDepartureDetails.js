import React from 'react';
import styled from 'styled-components'
import Loader from './Loader'
import { REAL_TIME_DETAILS } from './../redux/actions/realTimeDetails'
import { HISTORICAL_DEPARTURES } from './../redux/actions/historicalDepartures'

const StyledDiv = styled.div`
  border: 3px #8994d4;
  border-radius: 8px;
  border-style: solid;
  padding-left: 8px;
  padding-right: 8px;
  margin-bottom: 8px;
  text-align: left;
  font-size: 1.1em;

  &.loading {
    padding-top: 60px;
    padding-bottom: 15px;
  }
`

const BusDepartureDetails = (props) => {
  const { stopsAway, minutesAway, progressStatus, recents, yesterday, yesterdayLabel, loadingState } = props
  var realTimeDetailsLoading, historicalDeparturesLoading;

  if (loadingState.loading) {
    realTimeDetailsLoading = props.loadingState.feature === REAL_TIME_DETAILS
    historicalDeparturesLoading = props.loadingState.feature === HISTORICAL_DEPARTURES
  }

  return (
    <>
    {realTimeDetailsLoading &&
      <StyledDiv className='loading bus-departure-details'>
        <Loader />
      </StyledDiv>
    }
    {!realTimeDetailsLoading &&
      <StyledDiv className='bus-departure-details'>
          <>
          <p>Expected departure: {minutesAway}</p>
          <p>{stopsAway}</p>
          {progressStatus &&
            <p>{progressStatus}</p>
          }
          </>
      </StyledDiv>
    }
    {historicalDeparturesLoading &&
      <StyledDiv className='loading'>
        <Loader />
      </StyledDiv>
    }
    {recents.length > 0 && !historicalDeparturesLoading &&
      <StyledDiv>
          <p>Recent departures (actual): </p>
        <p>{recents.join(', ')}</p>
        {yesterdayLabel &&
          <p>{yesterdayLabel}:</p>
        }
        <p>{yesterday.join(', ')}</p>
      </StyledDiv>
    }
    </>
 )};

export default BusDepartureDetails;
