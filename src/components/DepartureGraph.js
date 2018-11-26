import React from 'react';
import styled from 'styled-components';

const StyledDepartureGraph = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  height: 40px;
  width: 90%;
`
const StyledDepartureDot = styled.div`
  position: relative;
  height: 30px;
  width: 30px;
  background-color: #f9e33c;
  border-radius: 50%;
  border-style: solid;
  margin-right: -5px;
  z-index: 2;
  &:hover > span {
    visibility: visible;
    opacity: 1;
  }
`
const StyledDepartureHeadway = styled.div`
  height: 25px;
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
  z-index: 1;
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
  if (!headways) return null;

  console.log (headways, times)

  return (
    <StyledDepartureGraph>
      {headways.map((headway, idx) => {
        let hwWidth = headway * 8
        let crowdDots = false
        if (headway < 2) {
          crowdDots = true
          hwWidth = 5;
        }
        if (headway > 60) {
          hwWidth = 60 * 8;
        }
        return (
          <>
            <StyledDepartureHeadway key={headway} style={{width: hwWidth}}>{headway}</StyledDepartureHeadway>
            <StyledDepartureDot key={Date.now()} style={crowdDots ? {marginLeft: '-20px'} : {} }>
              <StyledTooltip>{times[idx]}</StyledTooltip>
            </StyledDepartureDot>
          </>
        )
      })}
    </StyledDepartureGraph>
  )

}

export default DepartureGraph;
