import React from 'react';
import BusRouteName from './BusRouteName.js';
import BusRouteInfo from './BusRouteInfo.js';

const BusRouteHeader = (props) => {
  const { routeName, routeId, routeColor, routeDirection, stopNum, stopName, routeLongName, routeDescription, loadingState } = props;
  return (
    <div className='bus-route-header'>
      <BusRouteName routeName={routeName} routeId={routeId} loadingState={loadingState} routeColor={routeColor} />
      <BusRouteInfo routeDirection={routeDirection} stopNum={stopNum} stopName={stopName} routeDescription={routeDescription} routeLongName={routeLongName}>
        {props.children}
      </BusRouteInfo>
    </div>
  );
};

export default BusRouteHeader;
