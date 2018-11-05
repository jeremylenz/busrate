import React from 'react';
import styled from 'styled-components'
import BusRouteName from './BusRouteName.js'
import BusRouteInfo from './BusRouteInfo.js'

const BusRouteHeader = (props) => {
  const { routeName, routeDirection, stopNum, stopName, routeLongName, routeDescription } = props
  return (
    <div className='bus-route-header'>
      <BusRouteName routeName={routeName} />
      <BusRouteInfo routeDirection={routeDirection} stopNum={stopNum} stopName={stopName} routeDescription={routeDescription} routeLongName={routeLongName} />
    </div>
  )
};

export default BusRouteHeader;
