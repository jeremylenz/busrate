import React from 'react';
import styled from 'styled-components'

const StyledSpan = styled.span`
  height: 150px;
  width: 150px;
  background-color: #bbb;
  border-radius: 50%;
  border: 3px;
  display: inline-block;
  text-align: center;
  text-size: 12em;
`

const BusRouteName = (props) => (
  <StyledSpan className='bus-route-name'>
    {props.routeName}
  </StyledSpan>
);

export default BusRouteName;
