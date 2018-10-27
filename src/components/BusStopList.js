import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'

const BusStopList = (props) => {
  const handleClick = (busStop) => {
    console.log(busStop)
    console.log(props)

    const routeName = props.match.params.id
    props.history.push(`/buses/${routeName}/stops/${busStop}`)
  };

  const { stopList, display } = props;
  if (display === false) return null;
  const stops = stopList.stops

  console.log(stopList)
  return (
    <div className='bus-stop-list'>
      <ul>
        {
          stops.map((busStop) =>
          <li className='bus-stop-list-item' key={busStop} onClick={() => handleClick(busStop)}>
            {busStop}
          </li>
        )}

      </ul>
    </div>
  );
};

export default withRouter(BusStopList);
