import React, { Component } from 'react';
import Search, { createFilter } from 'react-search-input'
import SearchResultsList from './SearchResultsList'

class BusRouteSearchPage extends Component {

  constructor () {
    super()
    this.state = {
      searchTerm: '',
      selectedBusRoute: null,
      routeList: [],
    }
  }

  componentDidMount() {
    // mock API call
    this.setState({
      routeList: [
        {
          routeName: 'Q39',
          routeDescription: 'Long Island City to Ridgewood',
        },
        {
          routeName: 'M15-SBS',
          routeDescription: 'Second Avenue Select Bus Service',
        },
      ]
    })
  }

  handleChange = (searchTerm) => {
    this.setState({
      searchTerm
    })
  }


  render() {
    const { isLoading, searchTerm, selectedBusRoute, routeList } = this.state
    const results = routeList.filter(createFilter(searchTerm, ['routeName']))

    return (
      <>
        <Search
          className='search-input'
          onChange={this.handleChange}
          value={searchTerm}
          throttle={10}
          placeholder='enter bus route...'
        />
        <SearchResultsList results={results} />
        {/* <BusRouteOverview route={selectedBusRoute}/> */}
      </>
    );
  }

}

export default BusRouteSearchPage;
