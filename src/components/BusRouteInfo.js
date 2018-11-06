import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledDiv = styled.div`
  text-align: left;
  font-size: 22px;
  padding-left: 15px;
`

const StyledP = styled.p`
  font-size: 1.6em;
  font-style: italic;
`

const BusRouteInfo = (props) => {
  const { routeDirection, stopNum, stopName, routeLongName, routeDescription } = props

  return (
    <StyledDiv className='bus-route-info'>
      {routeDirection && stopNum &&
        <>
          <p>{routeDirection}</p>
          <p>Stop # {stopNum} - {stopName}</p>
          <Link to='/'>{'<< Back'}</Link>
        </>
      }
      {routeLongName &&
        <StyledP>{routeLongName}</StyledP>
      }
      {routeDescription &&
        <StyledP>{routeDescription}</StyledP>
      }

    </StyledDiv>
  )
}

export default BusRouteInfo;
