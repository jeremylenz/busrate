import React from 'react';
import PropTypes from 'prop-types';

const BusStopList = (props) => {
  const handleClick = (busStop) => {
    console.log(busStop)
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

export default BusStopList;
