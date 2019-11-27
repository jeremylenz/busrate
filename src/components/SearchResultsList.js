import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const StyledDiv = styled.div`
  border: 3px solid;
  border-radius: 16px;
  border-color: #ffee43;
  text-align: left;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
`;

const SearchResult = styled.div`
  padding-left: 10px;
  border-radius: 8px;
  &:hover {
    background-color: #f0f8ff;
    cursor: pointer;
  }

  & > p, & > hr {
    margin-top: 0;
    margin-bottom: 0;
  }

  @media only screen and (min-width: 600px) {
    font-size: 2em;
  }
  @media only screen and (max-width: 600px) {
    font-size: 1.5em;
  }

`;


class SearchResultsList extends React.Component {

  handleClick = (routeId) => {
    this.props.fetchStopList(routeId);
    this.props.history.push(`/buses/${routeId}`);
  }

  render() {
    const { results, display } = this.props;
    if (display === false) return null;
    return (
      <StyledDiv className='search-results'>
        {display &&
          results.map((result, index) =>
            (
              <SearchResult className='search-result' key={result.id} onClick={() => this.handleClick(result.id)}>
                <br></br>
                <p tabIndex={0} title={result.id}>{result.shortName}
                  <span> - {result.longName}</span>
                </p>
                <br></br>
                {index < results.length - 1 &&
                <hr></hr>
                }
              </SearchResult>
            )
          )}
      </StyledDiv>
    );
  }

}

export default withRouter(SearchResultsList);
