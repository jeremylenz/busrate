import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledCircle = styled.div`
  height: 150px;
  width: 150px;
  background-color: ${props => props.routeColor ? `#${props.routeColor}` : '#b159aa'};
  border-radius: 50%;
  border: 3px black;
  border-style: solid;
  display: flex;
  text-align: center;
  font-size: 2.5em;
  color: white;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;

  @media only screen and (min-width: 600px) {
    font-size: 2.5em;
    height: 150px;
    width: 150px;
  }
  @media only screen and (max-width: 600px) {
    font-size: 2em;
    height: 100px;
    width: 100px;
  }
`;

const StyledDiv = styled.div`
  text-shadow: 1px 1px 1px #000000;
`;

const BusRouteName = (props) => (
  <StyledCircle className='bus-route-name' routeColor={props.routeColor}>
    <StyledDiv classname='bus-route-name-text'>
      <Link to={`/buses/${props.routeId}`}>{props.routeName}</Link>
    </StyledDiv>
  </StyledCircle>
);

export default BusRouteName;
