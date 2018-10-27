import React from 'react';
import styled from 'styled-components'

const StyledDiv = styled.div`
  text-align: left;
  font-size: 22px;
`

const StyledP = styled.p`
  font-size: 1.6em;
  font-style: italic;
`

const BusRouteInfo = (props) => {
  const { routeDirection, stopNum, stopName, routeDescription } = props

  return (
    <StyledDiv className='bus-route-info'>
      {routeDirection && stopNum &&
        <>
          <p>Toward {routeDirection}</p>
          <p>Stop # {stopNum}</p>
          <p>{stopName}</p>
        </>
      }
      {routeDescription &&
        <StyledP>{routeDescription}</StyledP>
      }
    </StyledDiv>
  )
}

export default BusRouteInfo;
