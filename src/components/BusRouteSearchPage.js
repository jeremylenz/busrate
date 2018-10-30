import React, { Component } from 'react';
import Search, { createFilter } from 'react-search-input'
import SearchResultsList from './SearchResultsList'
import styled from 'styled-components'

const StyledSearch = styled(Search)`
  padding: 10px 10px;
  height: 50px;
  border: 3px solid;
  border-radius: 16px;
  border-color: #d46060;
  padding-right: 30px;
  text-align: left;

  & > input {
    box-sizing: content-box;
    width: 95%;
    font-size: 3em;
    /* line-height: 1; */
    padding: 5px 10px 5px 25px;
    height: 40px;
    position: relative;
    border-style: none;
    -webkit-appearance: none;
    /* https://stackoverflow.com/questions/7134202/input-type-search-dont-accept-height */
  }

  & > input:focus {
    outline: none;
  }
`

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
    console.log(process.env.REACT_APP_MTA_BUS_API_KEY)

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
    const results = routeList.filter(createFilter(searchTerm, ['routeName', 'routeDescription']))
    const display = (results.length > 0 && !!searchTerm)

    return (
      <>
        <StyledSearch
          className='search-input'
          onChange={this.handleChange}
          value={searchTerm}
          throttle={10}
          placeholder='enter bus route...'
        />
        <SearchResultsList results={results} display={display}/>
      </>
    );
  }

}

export default BusRouteSearchPage;
