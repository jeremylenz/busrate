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
`
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
`
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
`

const StyledDiv = styled.div`
  margin-top: 2px;
`

const StyledTooltip = styled.span`
  font-family: 'Asap';
  position: absolute;
  visibility: hidden;
  width: 150px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  z-index: 99;
  bottom: 125%;
  left: -30%;
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

function doNothing() {
  // When using the -webkit-overflow-scrolling: touch CSS property to provide momentum scrolling on iOS Safari,
  // hover events do not happen when the user taps the departure dot.  For some reason
  // adding an onClick property to the element returns the behavior to near-normal
  // (though it does momentarily select the entire element.)
  return null;
}

const DepartureGraph = (props) => {
  // headways = [5, 6, 15, 22, 8] - minutes of wait time in between each departure
  // times = ['6:56pm', '6:33pm', ...]

  const { headways, times, vehicleRefs, grayscale } = props
  const gsClassName = grayscale ? "grayscale" : ""
  var { dotsFirst } = props
  if (!headways) return null;
  if (!dotsFirst && headways[0] < 3) {
    dotsFirst = true;
    headways.shift()
  }

  return (
    <StyledDepartureGraph className={gsClassName}>
      {headways.map((headway, idx) => {
        let hwWidth = headway * 8
        let crowdDots = false
        if (headway < 3 && idx > 0) {
          crowdDots = true
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
            <StyledDepartureDot onClick={doNothing} key={Date.now()}>
              <StyledTooltip><div>{times[idx]}<br />Vehicle # {vehicleRefs[idx]}</div></StyledTooltip>
            </StyledDepartureDot>
            {dotsFirst &&
              <StyledDepartureHeadway onClick={doNothing} key={headway} className={crowdDots ? 'crowd-dots' : ''} style={{width: hwWidth}}>
                <StyledDiv>
                  {headway}
                </StyledDiv>
              </StyledDepartureHeadway>
            }
          </React.Fragment>
        )
      })}
      {dotsFirst &&
        <StyledDepartureDot onClick={doNothing} style={headways[headways.length - 1] < 2 ? {marginLeft: '-20px'} : {} }>
          <StyledTooltip><div>{times[times.length - 1]}<br />Vehicle # {vehicleRefs[vehicleRefs.length - 1]}</div></StyledTooltip>
        </StyledDepartureDot>
      }
    </StyledDepartureGraph>
  )

}

export default DepartureGraph;
