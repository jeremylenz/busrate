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
  height: 30px;
  width: 30px;
  background-color: #f9e33c;
  border-radius: 50%;
  border-style: solid;
  margin-right: -5px;
  z-index: 2;
`
const StyledDepartureHeadway = styled.div`
  height: 25px;
  background-color: #2634a7;
  color: white;
  margin-right: -5px;
  text-align: center;
  z-index: 1;
`

const DepartureGraph = (props) => {
  // headways = [5, 6, 15, 22, 8] - minutes of wait time in between each departure
  // times = ['6:56pm', '6:33pm', ...]

  const { headways, times } = props

  return (
    <StyledDepartureGraph>
    {headways.map((headway, idx) => {
      let hwWidth = headway * 8
      let crowdDots = false
      if (headway < 2) {
        crowdDots = true
        hwWidth = 5;
      }
      return (
        <>
          <StyledDepartureHeadway key={headway} style={{width: hwWidth}}>{headway}</StyledDepartureHeadway>
          <StyledDepartureDot key={Date.now()} style={crowdDots ? {marginLeft: '-20px'} : {} } />
        </>
      )
    })}
  </StyledDepartureGraph>
  )

}

export default DepartureGraph;
