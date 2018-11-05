import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const StyledDiv = styled.div`
  & li {
    font-size: 1.5em;
    list-style-type: none;
  }

  & li:hover {
    font-weight: bold;
    cursor: pointer;
  }
`

const BusStopList = (props) => {
  const handleClick = (busStop) => {

    const routeName = props.match.params.id
    props.history.push(`/buses/${routeName}/stops/${busStop}`)
  };

  const { stopDataList, display } = props;
  if (display === false) return null;
  const stops = stopDataList.stops

  return   (
    <StyledDiv className='bus-stop-list'>
      <ul>
        {
          stops.map((busStop, idx) =>
          <li className='bus-stop-list-item' key={idx} onClick={() => handleClick(busStop)}>
            {busStop}
          </li>
        )}

      </ul>
    </StyledDiv>
  );
};

export default withRouter(BusStopList);
