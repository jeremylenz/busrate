import React from 'react';
import RoundRect from './RoundRect'
import styled from 'styled-components'
import moment from 'moment'

const StyledCircle = styled.div`
  height: 75px;
  width: 75px;
  background-color: white;
  border-radius: 50%;
  border: 8px ${props => props.color};
  border-style: solid;
  display: flex;
  text-align: center;
  font-size: 2em;
  font-weight: bold;
  color: black;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-right: 15px;

  @media only screen and (min-width: 600px) {
    font-size: 2.5em;
    height: 100px;
    width: 100px;
  }
`

const ServiceQuality = styled.div`
  font-size: 2em;
  color: ${props => props.color};
  font-weight: bold;
`

const StyledDiv = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 10px;
`

const ScoreBox = styled.div`
  font-size: 1.4em;
  width: 100px;
  text-align: center;
  margin-right: 15px;
  padding-left: 10px;
  padding-top: 5px;
`

const Number = styled.span`
  font-size: 2em;
  font-weight: bold;
  color: ${props => props.color || 'black'}
`

function getServiceQualityDescription(score) {
  // Abysmal, Poor, Mediocre, Decent, Good, Very Good, Excellent
  if (score < 15) return "Abysmal";
  if (score < 30) return "Poor";
  if (score < 45) return "Mediocre";
  if (score < 60) return "Decent";
  if (score < 75) return "Good";
  if (score < 95) return "Very Good";
  return "Excellent";
}

function getColorForScore(score) {
  if (score < 30) return "red";
  if (score < 60) return "#e3e31a"; // yellow
  if (score < 75) return "blue";
  return "#3ee90b"; //green
}

function getColorForBunchingPercent(score) {
  if (score < 1.0) return "#3ee90b"; // green
  if (score < 5.0) return "blue"; // blue
  if (score < 15.0) return "#e3e31a"; // yellow
  return "red"; // red
}

function getConsistencyDescription(standardDevSecs, avgHeadwaySecs) {
  let consistencyScore = standardDevSecs / avgHeadwaySecs
  if (consistencyScore < 0.4) return "Very Consistent";
  if (consistencyScore < 0.6) return "Somewhat Consistent";
  if (consistencyScore < 1) return "Relatively consistent";
  if (consistencyScore < 1.5) return "Inconsistent";
  return "Extremely Inconsistent";
}

function getColorForConsistencyScore(standardDevSecs, avgHeadwaySecs) {
  let consistencyScore = standardDevSecs / avgHeadwaySecs
  if (consistencyScore < 1) return "#3ee90b"; // green
  if (consistencyScore < 1.5) return "blue"; // blue
  if (consistencyScore < 2) return "#e3e31a"; // yellow
  return "red";
}

const BusRateScore = (props) => {
  return (
    <>
      <ScoreBox>
        BusRate Score
        <StyledCircle color={getColorForScore(props.score)}>
        {props.score}
        </StyledCircle>
      </ScoreBox>
    </>
  )
}

const ScoreDescription = (props) => {
  const { rating, allowableHeadwayMin } = props
  const busRateScore = rating.busrate_score
  const avgHeadwaySecs = rating.average_headway
  const standardDevSecs = rating.standard_deviation
  const bunchingPercent = rating.percent_of_deps_bunched

  return (
    <>
    <StyledDiv>
      <ServiceQuality color={getColorForScore(busRateScore)}>
        {getServiceQualityDescription(busRateScore)}
      </ServiceQuality>
      <p>Average wait time: <Number>{Math.round(moment.duration(avgHeadwaySecs, 'seconds').as('minutes'))}</Number> minutes</p>
      <p>Allowable wait time: <Number>{allowableHeadwayMin}</Number> minutes</p>
    </StyledDiv>
    <StyledDiv>
      Consistency:
        <ServiceQuality color={getColorForConsistencyScore(standardDevSecs, avgHeadwaySecs)}>
        {getConsistencyDescription(standardDevSecs, avgHeadwaySecs)}
        </ServiceQuality>
      <p>Bus Bunching: <Number color={getColorForBunchingPercent(bunchingPercent)}>{bunchingPercent}%</Number></p>
    </StyledDiv>
    </>
  )
}

class RatingDetails extends React.Component {

  render () {
    const { recentsRating, prevDeparturesRating, overallRating, allowableHeadwayMin } = this.props

    if (!recentsRating) {
      return <RoundRect>Score not available yet; check back soon!</RoundRect>
    }

    return (
      <>
        <RoundRect ref={this.scrollRef} className="rating-details">
          <BusRateScore score={recentsRating.busrate_score} />
          <ScoreDescription rating={recentsRating} allowableHeadwayMin={allowableHeadwayMin}/>
        </RoundRect>
      </>
      )
    }

}

export default RatingDetails;
