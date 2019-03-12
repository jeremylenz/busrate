import React from 'react';
import { HISTORICAL_DEPARTURES } from './../redux/actions/historicalDepartures'
import RoundRect from './RoundRect'

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
      return <RoundRect>Score not available yet; check back soon!</RoundRect>
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
        <RoundRect ref={this.scrollRef}>
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
        </RoundRect>
      </>
      )
    }

}

export default RatingDetails;
