## Intro

Welcome to BusRate NYC!  This is an app designed to help provide insights about __bus performance__ in the New York City MTA bus system.

<img width="816" alt="BusRate screen shot" src="https://user-images.githubusercontent.com/22042343/54717612-eab7be80-4b2e-11e9-9073-9589b7d590bb.png">

## Basic idea

* Being a frequent bus commuter, the importance of _consistent_ and _reliable_ bus service became really apparent to me
* To reduce reliance on cars and increase transit ridership, transit systems must be improved.
* To increase bus ridership, the _reliability_ of the bus system must get better.
* Reliable bus service means having _headways_ (wait times between buses) that are both __short__ and __consistent.__
* Before something can get better, it has to be measured.
* The MTA is great about providing _real time_ bus data for all of its vehicles.  ("How far away is the bus now?")  It offers a free API that conforms to the GTFS specification.
* However, as far as I could tell, the MTA doesn't offer any _historical_ departure data.  So you can't answer questions like "How long ago did the bus depart?" "How well does this bus adhere to its schedule?" "How decent are the actual wait times?"
* BusRate NYC provides __historical departure data__ so that all of those questions can be answered.

## How it works

_(For more technical details, see the README for BusRate API)_

1. Every 30 seconds, BusRate calls the [MTA BusTime API](http://bustime.mta.info/wiki/Developers/SIRIVehicleMonitoring) and gets the locations of every vehicle in the system.  For each vehicle, this data includes a stop reference (which bus stop) and an arrival text ("approaching", "at stop", "< 1 stop away", etc.)
2. The vehicle locations are persisted to a database using the [BusRate API](https://github.com/jeremylenz/busrate-api), which runs on Rails and Postgres.
3. Every minute, the BusRate API compares all of the _vehicle locations_ less than 4 minutes old.
4. If two vehicle locations look like a departure (e.g. the bus goes from "at stop" to "approaching" the next stop), a historical departure is recorded in the BusRate API database.
5. Approximately 800 historical departures are created every minute.

## Live demo

If you don't want to run the app locally, there is a live demo available at http://busrate.herokuapp.com.  _*(Please see the note below about HTTPS)_

## Getting started

1. Clone the repo locally
2. At a Terminal, run `yarn install`
3. `yarn start` should start the app at http://localhost:3000

_Please note:_ Because this is a demo, the back end API currently doesn't support HTTPS.  If no search results show when you start typing, make sure you run the app with `http://` at the beginning of the URL and not `https://`.  I don't consider this a major issue because this app deals only with publicly available information, and does not collect any data from users.

_Constants:_ Since the BusRate API handles communication with MTA BusTime, you don't need an API key to run this front-end React app.  The BusRate API address is hard-coded in `constants.js`.  If you're running the API locally, you'll need to change that reference to `localhost:5000` (or whatever port you run Rails server on).

## Using the app

1. Start typing the name of your favorite NYC bus route.  For example, `M60` for the M60 Select Bus Service to LaGuardia Airport.
2. Click or tap the bus route you want.  You'll see the two terminals (directions the bus can go in) along with a list of stops.  Click the direction and stop you're interested in.
3. You'll see a page with three sections:

-----

* __Expected departure__ - real time data for the _next_ vehicle departure from that stop.
* __Historical departures__ - The last 8 departures _for that bus line_ are listed on a graph, along with previous departures.  For weekdays, the previous departures will be for the same time the previous business day.  For weekends, previous departures will be listed for the same time period a week ago.
* If other bus lines also depart from the same bus stop, they will be filtered out and not shown.  The departures you see will be _only_ for the selected bus line.
* Realtime data will automatically update from the BusTime API every 9 seconds.
* Historical data will automatically update every 60 seconds.
* If you lose your connection and BusRate isn't able to update data, you'll see a small red dot in the upper right corner of the section with stale data.  This dot will disappear once updated data is received.
* Once a bus departs, BusRate will immediately show the departure as a white dot.  Once the API actually creates the departure in the database, it will turn from white to yellow -- this should happen within the next 2 minutes or so.
* If a driver skips over a stop, or the back end has momentary problems, the departure may not be recorded properly.  Every so often, the system checks for missing departures.  If a vehicle has recorded departures at both a previous and subsequent stop on the route, the system will insert "interpolated" departure.  (These dots will be grey.)
* If you hover your mouse over a departure dot, you can see useful data about that particular departure: time, vehicle number, headway (wait time since the last departure), and whether the departure is interpolated, etc.
* __BusRate Score__ - A score on a 0-100 scale, where 0 is Abysmal and 100 is Excellent.  Also shows several other stats that make up the score, including average wait time, consistency, and bus bunching info.  By default, the score is for the 8 recent departures displayed on screen.  Click on the score itself to cycle through scores for previous departures, weekdays, weekends, rush hours, and all-time score for this particular stop.

## Future

Now that we have historical departure data, there's a ton of interesting stuff that can be done with it.  I may work on one or more of these in the future:

- [x] * Bus bunching data (both real-time and historical)
- [ ] Historical trip duration from stop to stop
- [x] Average headways for this bus line - overall; for certain time periods; per hour; etc.
- [ ] Schedule adherence / comparison
- [x] Generate a "score" for each bus based on consistency and low headways
- [ ] Machine learning predictions of future headways
- [ ] Rate the accuracy of realtime data by comparing it to when the bus actually arrived
- [x] If you have more ideas, please feel free to share!  (@jeremy646 on Twitter)

## Technical details about the React app

### Layout

* Custom CSS; no frameworks used
* `styled-components` library is used to style each React component
* CSS Grid is used in `index.css` to describe the basic layout of the app
* CSS Flexbox is used in `DepartureGraph.js` to make the visual departure graphs; also in Ratings details
* Keyframes are used in `Loader.js` which is a basic CSS loader/spinner
* Media queries are used to provide a fully responsive design

### Redux

* Redux is used to keep track of most app state, using the principles outlined in Nir Kaufman's [_Thinking In Redux_](https://leanpub.com/thinking-in-Redux).
* Instead of using Thunk or redux-sagas, I wrote custom middleware (`middleware/core/api.js`) to make API calls.  I found this to be much simpler and cleaner than you may think!
* Continuing the ideas of _Thinking In Redux_, I also wrote custom middleware (`middleware/core/normalize.js`) to transform the deeply nested GTFS data from the MTA BusTime API into a much more manageable data shape.
* Feature middleware takes care of more side effects, including purging unneeded data and hiding the loading spinner.
* The state of API requests is kept in the Redux store as a Set; see [this blog post](https://medium.com/@jeremylenz/using-javascript-sets-in-a-redux-store-5ea10e882719) for more info

### Other libraries used

* create-react-app
* Moment.js
* React Router
* react-search-input
