import React from 'react'
import RoundRect from './RoundRect'

const RealTimeDetails = (props) => (
  <RoundRect className='bus-departure-details'>
    <>
    <p>Expected departure: {props.minutesAway}</p>
    <p>{props.stopsAway}</p>
    {props.progressStatus &&
      <p>{props.progressStatus}</p>
    }
    </>
  </RoundRect>
)

export default RealTimeDetails;
