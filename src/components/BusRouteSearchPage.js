import React, { Component } from 'react';
import Search from 'react-search-input'

class BusRouteSearchPage extends Component {

  constructor () {
    super()
    this.state = {
      value: '',
      results: [],
      selectedBusRoute: null,
    }
  }

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  render() {
    const { isLoading, value, results, selectedBusRoute } = this.state

    return (
      <>
        <Search
          className='search-input'
          onChange={this.handleChange}
          value={value}
        />
        <BusRouteOverview route={selectedBusRoute}/>
      </>
    );
  }

}

export default BusRouteSearchPage;
