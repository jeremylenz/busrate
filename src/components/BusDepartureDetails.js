import React from 'react';
import Loader from './Loader'
import { HISTORICAL_DEPARTURES } from './../redux/actions/historicalDepartures'
import RatingDetails from './RatingDetails'
import RoundRect from './RoundRect'
import RealTimeDetails from './RealTimeDetails'
import HistoricalDepartures from './HistoricalDepartures'

class BusDepartureDetails extends React.Component {

  constructor(props) {
    super(props);
    this.scrollRef = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const scrollRef = this.scrollRef.current;
    if (scrollRef && scrollRef.scrollLeft) {
      return scrollRef.scrollLeft
    }
    return null
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const scrollRef = this.scrollRef.current;
    if (scrollRef) {
      scrollRef.scrollLeft = snapshot;
      // console.log(snapshot)
    }
  }

  render () {
    const { recentDepartures, previousDepartures, stopsAway, minutesAway, progressStatus, recents, recentDepText, recentHeadways, recentVehicleRefs, yesterday, previousHeadways, previousVehicleRefs, yesterdayLabel, recentsRating, prevDeparturesRating, overallRating, allowableHeadwayMin, loadingState } = this.props
    var historicalDeparturesLoading;

    historicalDeparturesLoading = (loadingState.loading && loadingState.features.has(HISTORICAL_DEPARTURES))

    return (
      <>
        <RealTimeDetails
          stopsAway={stopsAway}
          minutesAway={minutesAway}
          progressStatus={progressStatus}
        />
        {historicalDeparturesLoading &&
          <RoundRect className='loading'>
            <Loader />
          </RoundRect>
        }
        {!historicalDeparturesLoading &&
          <>
          <HistoricalDepartures
            scrollRef={this.scrollRef}
            recentDepText={recentDepText}
            recentDepartures={recentDepartures}
            recentHeadways={recentHeadways}
            recents={recents}
            recentVehicleRefs={recentVehicleRefs}
            yesterdayLabel={yesterdayLabel}
            previousDepartures={previousDepartures}
            previousHeadways={previousHeadways}
            yesterday={yesterday}
            previousVehicleRefs={previousVehicleRefs}
          />
          </>
        }
        <RatingDetails
          loadingState={loadingState}
          recentsRating={recentsRating}
          prevDeparturesRating={prevDeparturesRating}
          overallRating={overallRating}
          allowableHeadwayMin={allowableHeadwayMin}
        />

      </>
      )
    }

}

export default BusDepartureDetails;
