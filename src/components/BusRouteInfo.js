import React from 'react';
import styled from 'styled-components'

const StyledDiv = styled.div`
  text-align: left;
  font-size: 22px;
`

const BusRouteInfo = (props) => {
  const { routeDirection, stopNum, stopName } = props

  return (
    <StyledDiv className='bus-route-info'>
        <p>Toward {routeDirection}</p>
        <p>Stop # {stopNum}</p>
        <p>{stopName}</p>
    </StyledDiv>
  )
}

export default BusRouteInfo;
