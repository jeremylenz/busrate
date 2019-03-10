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
    this.scrollRef = React.createRef();  // Create a reference so that later, we can read & write scrollLeft

    this.state = {
      lastKnownStopsAway: 'Unknown',
      prevAnticipatedVehicleRef: null,
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const scrollRef = this.scrollRef.current;
    if (scrollRef && scrollRef.scrollLeft) {
      // Before the component updates, capture the current scrollLeft value.
      return scrollRef.scrollLeft
    }
    return null
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const scrollRef = this.scrollRef.current;
    if (scrollRef) {
      // Write the retrieved scrollLeft value to the DOM element.
      // If scrollLeft was anything but 0, this will preserve the current horizonal scroll position
      // and avoid auto-scrolling all the way to the left on every render!
      scrollRef.scrollLeft = snapshot;
      // console.log(snapshot)
    }

    // See if we should make an anticipated departure
    // If it looks like a bus departed but the departure hasn't yet been created and returned from the API,
    // we can create an 'anticipated' departure which will live in our Redux store but nowhere else.
    // This way we can display departures immediately, instead of after 2+ minutes.

    if (this.props.stopsAway !== "Unknown" && this.props.stopsAway !== "No vehicles found" && prevProps.stopsAway !== this.props.stopsAway) {
      this.setState({
        lastKnownStopsAway: this.props.stopsAway,
      });
      if (!this.state.prevAnticipatedVehicleRef) {
        this.setState({
          prevAnticipatedVehicleRef: this.props.anticipatedDepVehicleRef,
        })
      }
    }
    if (prevState.lastKnownStopsAway !== this.state.lastKnownStopsAway) {
      // ["1 stop away", "< 1 stop away"]
      console.log([prevState.lastKnownStopsAway, this.state.lastKnownStopsAway])
      console.log(this.props.anticipatedDepVehicleRef)
      let prevStopsAway = prevState.lastKnownStopsAway
      let currentStopsAway = this.state.lastKnownStopsAway
      let orderedSequence = ["< 1 stop away", "approaching", "at stop"]
      if (orderedSequence.includes(prevStopsAway)) {
        let prevIndex = orderedSequence.indexOf(prevStopsAway) // 0, 1, or 2
        let currIndex = orderedSequence.indexOf(currentStopsAway) // 0, 1, 2, or -1 if not found
        if (currIndex < prevIndex) {
          // then we can assume currentStopsAway and prevStopsAway refer to different vehicles; therefore, create the anticipated departure.
          this.props.createAnticipatedDeparture(this.state.prevAnticipatedVehicleRef)
          this.setState({
            prevAnticipatedVehicleRef: this.props.anticipatedDepVehicleRef,
          })
          console.log('setting state', {prevAnticipatedVehicleRef: this.state.prevAnticipatedVehicleRef})
        }
      }
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
