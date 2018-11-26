import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// const textSize = window.screen.width > 600 ? "1.5em" : "1.2em"

const StyledDiv = styled.div`
  text-align: left;
  padding-left: 15px;
  padding-bottom: 15px;
  @media only screen and (min-width: 600px) {
    font-size: 1.5em;
  }
  @media only screen and (max-width: 600px) {
    font-size: 1.2em;
  }
`

const StyledP = styled.p`
@media only screen and (min-width: 600px) {
  font-size: 1.5em;
}
@media only screen and (max-width: 600px) {
  font-size: 1.2em;
}
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
        </>
      }
      {routeLongName &&
        <StyledP>{routeLongName}</StyledP>
      }
      {routeDescription &&
        <StyledP>{routeDescription}</StyledP>
      }
      <Link to='/'>{'<< New Search'}</Link>

    </StyledDiv>
  )
}

export default BusRouteInfo;
