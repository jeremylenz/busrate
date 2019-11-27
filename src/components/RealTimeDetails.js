import React from 'react';
import RoundRect from './RoundRect';
import RedDot from './RedDot';

const RealTimeDetails = (props) => (
  <RoundRect className='bus-departure-details'>
    <>
      <p>Expected departure: {props.minutesAway}</p>
      <p>{props.vehicleNum ? `Vehicle # ${props.vehicleNum.split('_')[1]} is ` : null}{props.stopsAway}</p>
      {props.progressStatus &&
      <p>{props.progressStatus}</p>
      }
      {props.showRedDot &&
      <RedDot />
      }
    </>
  </RoundRect>
);

export default RealTimeDetails;
