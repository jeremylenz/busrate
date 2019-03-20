import React from 'react';
import { HISTORICAL_DEPARTURES } from './../redux/actions/historicalDepartures'
import RatingDetails from './RatingDetails'
import RealTimeDetails from './RealTimeDetails'
import HistoricalDepartures from './HistoricalDepartures'

class BusDepartureDetails extends React.Component {

  constructor(props) {
    super(props);
    this.scrollRef = React.createRef();  // Create a reference so that later, we can read & write scrollLeft

    this.state = {
      lastKnownStopsAway: 'Unknown',
      prevAnticipatedVehicleRef: null,
      selectedRatingIdx: 0,
      selectedRating: null,
      ratingDescription: 'Recent departures',
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const scrollRef = this.scrollRef.current;
    if (scrollRef && scrollRef.scrollLeft) { // 0 is a falsey value in JS!
      // Before the component updates, capture the current scrollLeft value.
      return scrollRef.scrollLeft;
    }
    if (this.minScrollLeft) {
      let result = this.minScrollLeft
      this.minScrollLeft = null
      return result
    }
    return 0
  }

  componentDidMount() {
    this.updateSelectedRating(0)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const scrollRef = this.scrollRef.current;
    if (scrollRef) {
      // Write the retrieved scrollLeft value to the DOM element.
      // If scrollLeft was anything but 0, this will preserve the current horizonal scroll position
      // and avoid auto-scrolling all the way to the left on every render!
      scrollRef.scrollLeft = snapshot;
      // If we try to set scrollLeft to a value outside of range, it is set to the maximum value which is probably 0.
      if (scrollRef.scrollLeft !== snapshot && snapshot > 0) {
        this.minScrollLeft = snapshot;
        // console.log('setting minScrollLeft', snapshot)
      }
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
      // console.log([prevState.lastKnownStopsAway, this.state.lastKnownStopsAway])
      // console.log(this.props.anticipatedDepVehicleRef)
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
        }
      }
    }

    if (!prevProps.recentsRating && !!this.props.recentsRating) {
      this.updateSelectedRating(this.state.selectedRatingIdx)
    }
  }

  getRatingsFromProps = () => {
    const { recentsRating, prevDeparturesRating, overallRating, weekdayRating, weekendRating, morningRushHourRating, eveningRushHourRating } = this.props
    const descriptions = [
      'Recent departures',
      'Previous Departures',
      'All time',
      'Weekdays',
      'Weekends',
      'Morning Rush Hours',
      'Evening Rush Hours',
    ]
    return [
      recentsRating,
      prevDeparturesRating,
      overallRating,
      weekdayRating,
      weekendRating,
      morningRushHourRating,
      eveningRushHourRating].map((rating, idx) => ({
        rating: rating,
        description: descriptions[idx],
      })).filter((obj) => !!obj.rating)
  }

  updateSelectedRating = (idx) => {
    const ratings = this.getRatingsFromProps()

    if (!ratings[idx]) {
      return;
    }

    this.setState({
      selectedRating: ratings[idx].rating,
      ratingDescription: ratings[idx].description,
    })
  }

  rotateSelectedRating = () => {
    const { selectedRatingIdx } = this.state
    const ratingsLength = this.getRatingsFromProps().length
    const newSelectedRatingIdx = (selectedRatingIdx + 1) % ratingsLength
    this.setState({
      selectedRatingIdx: newSelectedRatingIdx,
    }, () => this.updateSelectedRating(newSelectedRatingIdx));
  }

  render () {
    const { recentDepartures, previousDepartures, stopsAway, minutesAway, progressStatus, recents, recentDepText, recentHeadways, recentVehicleRefs, yesterday, previousHeadways, previousVehicleRefs, yesterdayLabel, hdResponseTimestamp, rtdResponseTimestamp, allowableHeadwayMin, loadingState } = this.props
    var { selectedRating, ratingDescription } = this.state
    const vehicleNum = this.state.prevAnticipatedVehicleRef
    var historicalDeparturesLoading;
    var staleRealTimeDetails, staleHistoricalDepartures;

    // if (!selectedRating) selectedRating = this.props.recentsRating;

    // Show a red dot in the upper right corner if data is more than ~3 seconds late.
    // console.log(Date.now() - Date.parse(hdResponseTimestamp))
    staleHistoricalDepartures = (Date.now() - Date.parse(hdResponseTimestamp)) > 64000

    // console.log(Date.now() - Date.parse(rtdResponseTimestamp))
    staleRealTimeDetails = (Date.now() - Date.parse(rtdResponseTimestamp)) > 12000

    historicalDeparturesLoading = (recents && recents.length === 0 && loadingState.loading && loadingState.features.has(HISTORICAL_DEPARTURES))

    return (
      <>
        <RealTimeDetails
          stopsAway={stopsAway}
          minutesAway={minutesAway}
          progressStatus={progressStatus}
          vehicleNum={vehicleNum}
          showRedDot={staleRealTimeDetails}
        />
        <HistoricalDepartures
          scrollRef={this.scrollRef}
          historicalDeparturesLoading={historicalDeparturesLoading}
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
          showRedDot={staleHistoricalDepartures}
        />
        <RatingDetails
          loadingState={loadingState}
          rating={selectedRating}
          ratingDescription={ratingDescription}
          rotateSelectedRating={this.rotateSelectedRating}
          allowableHeadwayMin={allowableHeadwayMin}
        />

      </>
      )
    }

}

export default BusDepartureDetails;
