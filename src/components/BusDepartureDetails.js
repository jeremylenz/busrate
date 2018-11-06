import React from 'react';
import styled from 'styled-components'

const StyledDiv = styled.div`
  border: 3px #8994d4;
  border-radius: 8px;
  border-style: solid;
  padding-left: 8px;
  text-align: left;
`

const BusDepartureDetails = (props) => {
  const { stopsAway, minutesAway, recents, yesterday } = props
  return (
    <StyledDiv className='bus-departure-details'>
      <p>Next departure (realtime): {minutesAway}</p>
      <p>{stopsAway}</p>
      <p>Recent departures (actual): </p>
      <p>{recents.join(', ')}</p>
      <p>Yesterday:</p>
      <p>{yesterday.join(', ')}</p>
    </StyledDiv>
 )};

export default BusDepartureDetails;
