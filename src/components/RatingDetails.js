import React from 'react';
import styled from 'styled-components'
import { HISTORICAL_DEPARTURES } from './../redux/actions/historicalDepartures'

const StyledDiv = styled.div`
  position: relative;
  z-index: 1;
  border: 3px #8994d4;
  border-radius: 8px;
  border-style: solid;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 6px;
  margin-bottom: 8px;
  text-align: left;
  font-size: 1.1em;
  overflow-x: scroll;
  overflow-y: visible;


  &.loading {
    padding-top: 60px;
    padding-bottom: 15px;
  }
`

class RatingDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch (error, info) {
    console.error(error)
    console.log(info)
  }

  render () {
    if (this.state.hasError) {
      return <StyledDiv>Score not available yet; check back soon!</StyledDiv>
    }
    const { loadingState, recentsRating, prevDeparturesRating, overallRating, allowableHeadwayMin } = this.props
    var historicalDeparturesLoading;

    var recentBunches = 0, prevBunches = 0;

    historicalDeparturesLoading = (loadingState.loading && loadingState.features.has(HISTORICAL_DEPARTURES))
    if (recentsRating) {
      recentBunches = recentsRating.bunched_headways_count
    }
    if (prevDeparturesRating) {
      prevBunches = prevDeparturesRating.bunched_headways_count
    }

    return (
      <>
        {!historicalDeparturesLoading &&
          <>
          <StyledDiv ref={this.scrollRef}>
            {recentsRating &&
              <p>Score right now: {recentsRating.busrate_score} / 100
                {recentBunches > 0 &&
                  <span> (Bus bunching count: {recentBunches})</span>
                }
              </p>
            }
            {prevDeparturesRating &&
              <p>Previous: {prevDeparturesRating.busrate_score} / 100
                {prevBunches > 0 &&
                  <span> (Bus bunching count: {prevBunches})</span>
                }
              </p>
            }
            {overallRating &&
              <>
              <p>Overall rating: {overallRating.busrate_score} / 100</p>
              <p>Based on {allowableHeadwayMin}-minute allowable wait time</p>
              </>
            }
          </StyledDiv>
          </>
        }
      </>
      )
    }

}

export default RatingDetails;
