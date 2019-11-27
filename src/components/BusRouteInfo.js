import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// const textSize = window.screen.width > 600 ? "1.5em" : "1.2em"

const StyledDiv = styled.div`
  text-align: left;
  padding-left: 15px;
  padding-bottom: 15px;
  margin-right: 10px;
  @media only screen and (min-width: 600px) {
    font-size: 1.5em;
  }
  @media only screen and (max-width: 600px) {
    font-size: 1.2em;
  }
`;

const StyledBigBlurb = styled.p`
  margin-top: 10px;
  margin-bottom: 10px;
  @media only screen and (min-width: 600px) {
    font-size: 1.5em;
  }
  @media only screen and (max-width: 600px) {
    font-size: 1.2em;
  }
    font-style: italic;
`;

const StyledBlurb = styled.p`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const StyledSpan = styled.span`
  font-weight: 200;
  font-family: 'Source Sans Pro';
`;

const BusRouteInfo = (props) => {
  const { routeDirection, stopNum, stopName, routeLongName, routeDescription } = props;
  return (
    <StyledDiv className='bus-route-info'>
      {stopNum &&
        <>
          {routeDirection &&
          <StyledBlurb>{routeDirection}</StyledBlurb>
          }
          <StyledBlurb>{stopName}</StyledBlurb>
        </>
      }
      {routeLongName &&
        <StyledBigBlurb>{routeLongName}</StyledBigBlurb>
      }
      {routeDescription &&
        <StyledBigBlurb>{routeDescription}</StyledBigBlurb>
      }
      {props.children}
      <Link to='/'><StyledSpan>{'<< New Search'}</StyledSpan></Link>

    </StyledDiv>
  );
};

export default BusRouteInfo;
