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
  z-index: 3;
`
const StyledDepartureDot = styled.div`
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
  z-index: 2;
  &:hover > span {
    visibility: visible;
    opacity: 1;
  }
  & + .crowd-dots {
    margin-left: -20px;
  }
`
const StyledDepartureHeadway = styled.div`
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
`

const StyledTooltip = styled.span`
  position: absolute;
  visibility: hidden;
  width: 100px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  z-index: 99;
  bottom: 125%;
  left: 50%;
  margin-left: -50px;
  opacity: 0;
  transition: opacity 0.3s;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }


`

const DepartureGraph = (props) => {
  // headways = [5, 6, 15, 22, 8] - minutes of wait time in between each departure
  // times = ['6:56pm', '6:33pm', ...]

  const { headways, times } = props
  var { dotsFirst } = props
  if (!headways) return null;
  if (!dotsFirst && headways[0] < 5) {
    dotsFirst = true;
    headways.shift()
  }

  return (
    <StyledDepartureGraph>
      {headways.map((headway, idx) => {
        let hwWidth = headway * 8
        let crowdDots = false
        if (headway < 3 && idx > 0) {
          crowdDots = true
          hwWidth = 8;
        }
        return (
          <>
            {!dotsFirst &&
              <StyledDepartureHeadway key={headway} className={crowdDots ? 'crowd-dots' : ''} style={{width: hwWidth}}>{headway}</StyledDepartureHeadway>
            }
            <StyledDepartureDot key={Date.now()}>
              <StyledTooltip>{times[idx]}</StyledTooltip>
            </StyledDepartureDot>
            {dotsFirst &&
              <StyledDepartureHeadway key={headway} className={crowdDots ? 'crowd-dots' : ''} style={{width: hwWidth}}>{headway}</StyledDepartureHeadway>
            }
          </>
        )
      })}
      {dotsFirst &&
        <StyledDepartureDot key={Date.now()} style={headways[headways.length - 1] < 2 ? {marginLeft: '-20px'} : {} }>
          <StyledTooltip>{times[times.length - 1]}</StyledTooltip>
        </StyledDepartureDot>
      }
    </StyledDepartureGraph>
  )

}

export default DepartureGraph;
