import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const textSize = window.screen.width > 600 ? "1.5em" : "1em"

const StyledDiv = styled.div`
  & li {
    font-size: ${textSize};
    list-style-type: none;
  }

  & li:hover {
    font-weight: bold;
    cursor: pointer;
  }
`

const BusStopList = (props) => {
  const handleClick = (stopId) => {
    const routeName = props.match.params.id
    props.fetchRealTimeDetail(stopId)
    props.fetchHistoricalDeparture({
      stopRef: stopId,
      lineRef: routeName,
    })
    props.history.push(`/buses/${routeName}/stops/${stopId}`)
  };

  const { stopDataList, display } = props;
  if (display === false) return null;
  const stops = stopDataList.stops

  return   (
    <StyledDiv className='bus-stop-list'>
      <ul>
        {
          stops.map((busStop, idx) =>
          <li className='bus-stop-list-item' key={idx} onClick={() => handleClick(busStop.stopId)}>
            {busStop.stopName}
          </li>
        )}

      </ul>
    </StyledDiv>
  );
};

export default withRouter(BusStopList);
