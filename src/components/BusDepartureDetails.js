import React from 'react';

const BusDepartureDetails = (props) => {
  const { stopsAway, minutesAway, recents, yesterday } = props
  return (
    <div>
      <p>Next departure (realtime): {minutesAway} minutes; {stopsAway} stops away</p>
      <p>Recent departures (actual): </p>
      <p>{recents.join(', ')}</p>
      <p>Yesterday:</p>
      <p>{yesterday.join(', ')}</p>
    </div>
 )};

export default BusDepartureDetails;
