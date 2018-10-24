import React from 'react';
import styled from 'styled-components'

const StyledDiv = styled.div`
  text-align: left;
  text-size: 4em;
  font-family: sans-serif;
`

const BusRouteInfo = (props) => {
  const { routeDirection, stopNum, stopName } = props

  return (
    <div className='bus-route-info'>
      <p>Toward {routeDirection}</p>
      <p>Stop # {stopNum}</p>
      <p>{stopName}</p>
    </div>
  )
}

export default BusRouteInfo;
