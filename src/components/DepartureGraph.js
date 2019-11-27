import React from 'react';
import styled from 'styled-components';

const StyledDepartureGraph = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  height: 40px;
  width: 95%;
  z-index: -1;
  &.grayscale>div {
    background-color: #d8d8d8;
    color: #797878;
  }
`;
const StyledDepartureDot = styled.div`
  font-family: 'Asap';
  position: relative;
  height: 30px;
  width: 30px;
  min-width: 30px;
  flex-shrink: 0;
  flex-basis: auto;
  background-color: #f9e33c;
  border-radius: 50%;
  border-style: solid;
  margin-right: -5px;
  z-index: 99;
  &:hover > span {
    visibility: visible;
    opacity: 1;
  }
  & + .crowd-dots {
    margin-left: -20px;
  }
  &.grayscale {
    background-color: #d8d8d8;
    color: #797878;
  }
  &.white {
    background-color: #fdfdfd;
    color: #797878;
  }
`;
const StyledDepartureHeadway = styled.div`
  font-family: 'Asap';
  height: 25px;
  min-width: 8px;
  max-width: 480px;
  flex-shrink: 0;
  flex-basis: auto;
  background-color: #2634a7;
  color: white;
  margin-right: -5px;
  text-align: center;
  z-index: 1;
`;

const StyledDiv = styled.div`
  margin-top: 2px;
`;

const StyledTooltip = styled.span`
  font-family: 'Asap';
  position: absolute;
  visibility: hidden;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  width: 185px;
  background-color: white;
  color: black;
  border-radius: 6px;
  border-style: solid;
  border-color: #2634a7;
  padding: 5px;
  z-index: 99;
  bottom: 125%;
  left: ${props => props.nudgedLeft ? '45px' : '-30%'};
  margin-left: -50px;
  opacity: 0;
  transition: opacity 0.3s;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: ${props => props.nudgedLeft ? '9%' : '36%'};
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #2634a7 transparent transparent transparent;
  }

`;

const StyledTooltipLeft = styled.span`
  flex-basis: 55%;
  font-size: 0.7em;
  color: '#eee';
`;

const StyledTooltipRight = styled.span`
  flex-basis: 45%;
  font-size: 0.8em;
  color: black;
`;

function doNothing() {
  // When using the -webkit-overflow-scrolling: touch CSS property to provide momentum scrolling on iOS Safari,
  // hover events do not happen when the user taps the departure dot.  For some reason
  // adding an onClick property to the element returns the behavior to near-normal
  // (though it does momentarily select the entire element.)
  return null;
}

function getDotClassName(departure) {
  if (departure.interpolated) {
    return 'grayscale';
  }
  if (departure.anticipated) {
    return 'white';
  }
  return '';
}

const DepartureGraph = (props) => {
  // headways = [5, 6, 15, 22, 8] - minutes of wait time in between each departure
  // times = ['6:56pm', '6:33pm', ...]

  const { departures, headways, times, vehicleRefs, grayscale } = props;
  const gsClassName = grayscale ? 'grayscale' : '';
  var { dotsFirst } = props;
  if (!headways) return null;
  if (!dotsFirst && headways[0] < 3) {
    dotsFirst = true;
    headways.shift();
  }

  return (
    <StyledDepartureGraph className={gsClassName}>
      {departures.map((departure, idx) => {
        let departureType = 'actual';
        if (departure.interpolated) departureType = 'interpolated';
        if (departure.anticipated) departureType = 'anticipated';
        let headway = headways[idx];
        let hwWidth = headway * 8;
        if (!headway) hwWidth = 8;
        let crowdDots = false;
        let lastHeadway = (idx === departures.length - 1);
        let firstHeadway = (idx === 0);
        if (headway < 3 && idx > 0) {
          crowdDots = true;
          hwWidth = 8;
        }
        return (
          <React.Fragment key={`${times[idx] + vehicleRefs[idx]}`}>
            {!dotsFirst &&
              <StyledDepartureHeadway onClick={doNothing} key={headway} className={crowdDots ? 'crowd-dots' : ''} style={{width: hwWidth}}>
                <StyledDiv>
                  {headway}
                </StyledDiv>
              </StyledDepartureHeadway>
            }
            <StyledDepartureDot onClick={doNothing} key={Date.now()} className={getDotClassName(departure)}>
              <StyledTooltip nudgedLeft={firstHeadway}>
                <StyledTooltipLeft>departed</StyledTooltipLeft>
                <StyledTooltipRight>{times[idx]}</StyledTooltipRight>
                <StyledTooltipLeft>vehicle #</StyledTooltipLeft>
                <StyledTooltipRight>{vehicleRefs[idx]}</StyledTooltipRight>
                <StyledTooltipLeft>headway</StyledTooltipLeft>
                <StyledTooltipRight>{dotsFirst ? `${headway || '~'} min` : `${headways[idx + 1] || '~'} min`}</StyledTooltipRight>
                <StyledTooltipLeft>type</StyledTooltipLeft>
                <StyledTooltipRight>{departureType}</StyledTooltipRight>

              </StyledTooltip>
            </StyledDepartureDot>
            {dotsFirst && !lastHeadway &&
              <StyledDepartureHeadway onClick={doNothing} key={headway} className={crowdDots ? 'crowd-dots' : ''} style={{width: hwWidth}}>
                <StyledDiv>
                  {headway}
                </StyledDiv>
              </StyledDepartureHeadway>
            }
          </React.Fragment>
        );
      })}
    </StyledDepartureGraph>
  );

};

export default DepartureGraph;
