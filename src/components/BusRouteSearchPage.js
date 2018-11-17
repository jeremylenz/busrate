import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchBusRoutes } from '../redux/actions/busRoutes'
import { fetchStopList } from '../redux/actions/stopLists'
import Search, { createFilter } from 'react-search-input'
import SearchResultsList from './SearchResultsList'
import styled from 'styled-components'
import { LIST_OF_NYCT_BUS_ROUTES_URL, LIST_OF_MTA_BUS_ROUTES_URL } from '../constants'

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
    }
  }

  componentDidMount() {
    if (this.props.busRoutes.items.length < 1) {
      this.props.fetchBusRoutes()
    }

  }

  handleChange = (searchTerm) => {
    this.setState({
      searchTerm
    })
  }

  fetchStopList = (routeId) => {
    console.log('BusRouteSearchPage fetchStopList')
    let foundStopList = this.props.stopLists.items.find((stopList) => stopList.data && stopList.data.entry.routeId === routeId)
    if (!foundStopList) {
      this.props.fetchStopList(routeId)
    }
  }


  render() {
    const { isLoading, searchTerm, selectedBusRoute } = this.state
    const routeList = this.props.busRoutes.items || []
    const results = routeList.filter(createFilter(searchTerm, ['shortName', 'longName']))
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
        <SearchResultsList results={results} display={display} fetchStopList={this.fetchStopList}/>
      </>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    busRoutes: state.busRoutes,
    stopLists: state.stopLists,
  }
};

const mapDispatchToProps = { fetchBusRoutes, fetchStopList }

export default connect(mapStateToProps, mapDispatchToProps)(BusRouteSearchPage);
