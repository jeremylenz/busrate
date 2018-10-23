import React, { Component } from 'react';
import { Search } from 'semantic-ui-react'

class BusRouteSearchPage extends Component {

  constructor () {
    super()
    this.state = {
      isLoading: false,
      value: '',
      results: [],
      selectedBusRoute: null,
    }
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true})


  }

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  render() {
    const { isLoading, value, results, selectedBusRoute } = this.state

    return (
      <>
        <Search
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={this.handleSearchChange}
          results={results}
          value={value}
        />
        <BusRouteOverview route={selectedBusRoute}/>
      </>
    );
  }

}

export default BusRouteSearchPage;
