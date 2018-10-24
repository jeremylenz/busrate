import React from 'react';
import styled from 'styled-components'

const StyledSpan = styled.span`
  height: 150px;
  width: 150px;
  background-color: #b159aa;
  border-radius: 50%;
  border: 3px black;
  border-style: solid;
  display: inline-block;
  text-align: center;
  font-size: 4em;
`

const StyledDiv = styled.div`
  padding-top: 32px;
`

const BusRouteName = (props) => (
  <StyledSpan className='bus-route-name'>
    <StyledDiv classname='bus-route-name-text'>
      {props.routeName}
    </StyledDiv>
  </StyledSpan>
);

export default BusRouteName;
