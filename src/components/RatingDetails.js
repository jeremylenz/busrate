import React from 'react';
import RoundRect from './RoundRect';
import styled from 'styled-components';
import moment from 'moment';

const StyledCircle = styled.div`
  height: 75px;
  width: 75px;
  background-color: white;
  border-radius: 50%;
  border: 8px ${props => props.color};
  border-style: solid;
  flex-shrink: 0;
  display: flex;
  text-align: center;
  font-size: ${props => props.mini ? '1.3em' : '1.8em'};
  font-weight: bold;
  color: black;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 10px;

  @media only screen and (min-width: 600px) {
    font-size: 2.4em;
    height: 100px;
    width: 100px;
  }
`;

const ServiceQuality = styled.div`
  font-size: ${props => props.smaller ? '1.5em' : '2em'};
  color: ${props => props.color};
  font-weight: bold;
  text-align: center;
`;

const ContentBox = styled.div`
  max-width: 280px;
`;

const Blurb = styled.span`
  color: ${props => props.grey ? '#bbb' : 'black'};
  font-size: ${props => props.smaller ? '0.8em' : 'initial'};
  margin-top: 5px;
  margin-bottom: 2px;
  flex-basis: 40%;
`;

const Metric = styled.span`
  flex-basis: 60%;
`;

const MetricBox = styled.div`
  display: flex;
  justify-content: baseline;
  flex-wrap: nowrap;
`;

const ScoreBox = styled.div`
  font-size: ${props => props.mini ? '1em' : '1.4em'};
  margin-right: 15px;
  padding-left: 15px;
  padding-top: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Number = styled.span`
  font-size: ${props => props.smaller ? '1.4em' : '2em'};
  font-weight: bold;
  color: ${props => props.color || 'black'}
`;

const ContentRoundRect = styled(ContentBox)`
  border: 2px ${props => props.color};
  color: black;
  border-radius: 8px;
  border-style: solid;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 8px;
  margin-left: 7px;
  margin-right: 7px;
  margin-top: 8px;
`;

const RatingBanner = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-right: 1em;
  margin-bottom: 10px;

`;

const Bullet = styled.span`
  margin-left: 10px;
  margin-right: 10px;
  font-size: 1.4em;
  &::before {
    content: "•"
  }
  &.extra {
    display: none;
  }
  @media only screen and (min-width: 600px) {
    &.extra{
      display: initial;
    }
  }
`;

const BannerBlurb = styled.span`
  color: ${props => props.grey ? '#bbb' : props.color || 'black'};
  font-size: ${props => props.smaller ? '0.7em' : '0.9em'};
  margin-top: 5px;
  margin-bottom: 2px;
  &.extra {
    display: none;
  }
  @media only screen and (min-width: 600px) {
    &.extra{
      display: initial;
    }
  }
`;

const metricsColors = {
  bestGreen: '#3de90b',
  paleGreen: '#c6f007',
  yellow: '#f79303', // old: e3e31a
  red: '#f00',
};

function getServiceQualityDescription(score) {
  // Abysmal, Poor, Mediocre, Decent, Good, Very Good, Excellent
  if (score < 15) return 'Abysmal';
  if (score < 30) return 'Poor';
  if (score < 45) return 'Mediocre';
  if (score < 60) return 'Decent';
  if (score < 75) return 'Good';
  if (score < 95) return 'Very Good';
  return 'Excellent';
}

function getColorForScore(score) {
  const { bestGreen, paleGreen, yellow, red } = metricsColors;
  if (score < 30) return red;
  if (score < 60) return yellow;
  if (score < 75) return paleGreen;
  return bestGreen;
}

function getColorForBunchingPercent(score) {
  const { bestGreen, paleGreen, yellow, red } = metricsColors;
  if (score < 2.0) return bestGreen;
  if (score < 5.0) return paleGreen;
  if (score < 15.0) return yellow;
  return red;
}

function getColorForWaitTime(headwayMin, allowableHeadwayMin) {
  const waitTimeScore = headwayMin / allowableHeadwayMin;
  const { bestGreen, paleGreen, yellow, red } = metricsColors;
  if (waitTimeScore < 1) return bestGreen;
  if (waitTimeScore < 2) return paleGreen;
  if (waitTimeScore < 3) return yellow;
  return red;
}

function getConsistencyDescription(standardDevSecs, avgHeadwaySecs) {
  const consistencyScore = standardDevSecs / avgHeadwaySecs;
  if (consistencyScore < 0.3) return 'Very Consistent';
  if (consistencyScore < 0.4) return 'Fairly Consistent';
  if (consistencyScore < 0.6) return 'Not Very Consistent';
  if (consistencyScore < 1) return 'Inconsistent';
  return 'Extremely Inconsistent';
}

function getColorForConsistencyScore(standardDevSecs, avgHeadwaySecs) {
  const { bestGreen, paleGreen, yellow, red } = metricsColors;
  const consistencyScore = standardDevSecs / avgHeadwaySecs;
  if (consistencyScore < 0.3) return bestGreen;
  if (consistencyScore < 0.4) return paleGreen;
  if (consistencyScore < 1) return yellow;
  return red;
}

const BusRateScore = (props) => {
  return (
    <>
      <ScoreBox>
        <div style={{width: '100px'}} onClick={props.rotateSelectedRating}>
          BusRate Score
          <div style={{width: '100px', fontStyle: 'italic', fontSize: '0.6em', color: 'grey'}}>
            {props.ratingDescription}
          </div>
        </div>
        <StyledCircle onClick={props.rotateSelectedRating} color={getColorForScore(props.score)}>
          {props.score}
        </StyledCircle>
      </ScoreBox>
    </>
  );
};

export class MiniRatingDetails extends React.Component {

  render () {
    const { rating, allowableHeadwayMin } = this.props;
    // const rating = {
    //   average_headway: 453.55,
    //   standard_deviation: 332.58,
    //   bunched_headways_count: 2,
    //   percent_of_deps_bunched: 22.2,
    //   anti_bonus: 960,
    //   allowable_total: 3360,
    //   actual_total: 3715.363766721,
    //   raw_score: 90,
    //   busrate_score: 90,
    //   current_headway: 251.363766721,
    //   score_incorporates_current_headway: true,
    // }
    // const allowableHeadwayMin = 8
    if (!rating) {
      return <RatingBanner><BannerBlurb>Loading BusRate Score...</BannerBlurb></RatingBanner>;
    }

    const busRateScore = rating.busrate_score;
    const avgHeadwaySecs = rating.average_headway;
    const standardDevSecs = rating.standard_deviation;
    const bunchingPercent = rating.percent_of_deps_bunched;
    const actualHeadwayMin = Math.round(moment.duration(avgHeadwaySecs, 'seconds').as('minutes'));
    const waitTimeColor = getColorForWaitTime(actualHeadwayMin, allowableHeadwayMin);
    const consistencyScoreColor = getColorForConsistencyScore(standardDevSecs, avgHeadwaySecs);

    return (
      <>
        <RatingBanner>
          <Number smaller color={getColorForScore(busRateScore)}>{busRateScore}</Number>
          <Bullet />
          <BannerBlurb color={consistencyScoreColor}>
            {getConsistencyDescription(standardDevSecs, avgHeadwaySecs)}
          </BannerBlurb>
          <Bullet />
          <BannerBlurb smaller>
            <Number smaller color={waitTimeColor}>{actualHeadwayMin}</Number>
            <span> min</span>
          </BannerBlurb>
          <Bullet className='extra'/>
          <BannerBlurb smaller className='extra'>
            <Number smaller color={getColorForBunchingPercent(bunchingPercent)}>{bunchingPercent}%</Number>
          </BannerBlurb>
        </RatingBanner>
      </>
    );
  }
}

class RatingDetails extends React.Component {

  render () {
    const { rating, ratingDescription, rotateSelectedRating, allowableHeadwayMin } = this.props;
    if (!rating) {
      return <RoundRect>Loading BusRate Score...</RoundRect>;
    }

    const busRateScore = rating.busrate_score;
    const avgHeadwaySecs = rating.average_headway;
    const standardDevSecs = rating.standard_deviation;
    const bunchingPercent = rating.percent_of_deps_bunched;
    const actualHeadwayMin = Math.round(moment.duration(avgHeadwaySecs, 'seconds').as('minutes'));
    const waitTimeColor = getColorForWaitTime(actualHeadwayMin, allowableHeadwayMin);
    const consistencyScoreColor = getColorForConsistencyScore(standardDevSecs, avgHeadwaySecs);
    const bunchingPercentColor = getColorForBunchingPercent(bunchingPercent);


    return (
      <>
        <RoundRect ref={this.scrollRef} className="rating-details">
          <BusRateScore score={rating.busrate_score} ratingDescription={ratingDescription} rotateSelectedRating={rotateSelectedRating}/>
          <ContentBox>
            <ServiceQuality color={getColorForScore(busRateScore)}>
              {getServiceQualityDescription(busRateScore)}
            </ServiceQuality>
            <ContentRoundRect color={waitTimeColor}>
              <MetricBox>
                <Blurb>Average wait: </Blurb>
                <Metric>
                  <Number color={waitTimeColor}>{actualHeadwayMin}</Number> minutes
                </Metric>
              </MetricBox>
              <MetricBox>
                <Blurb grey smaller>Allowable wait: </Blurb>
                <Metric>
                  <Number smaller color={'#bbb'}>{allowableHeadwayMin}</Number> minutes
                </Metric>
              </MetricBox>
            </ContentRoundRect>
          </ContentBox>
          <ContentBox>
            <ContentRoundRect color={consistencyScoreColor}>
              <Blurb grey smaller>Consistency:</Blurb>
              <ServiceQuality smaller color={consistencyScoreColor}>
                {getConsistencyDescription(standardDevSecs, avgHeadwaySecs)}
              </ServiceQuality>
            </ContentRoundRect>
            <ContentRoundRect color={bunchingPercentColor}>
              <Blurb>
                Bus Bunching: <span style={{marginRight: '10px'}}></span><Number color={bunchingPercentColor}>{bunchingPercent}%</Number>
              </Blurb>
            </ContentRoundRect>
          </ContentBox>
        </RoundRect>
      </>
    );
  }

}

export default RatingDetails;
