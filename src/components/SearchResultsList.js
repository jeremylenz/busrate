import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const StyledDiv = styled.div`
  border: 3px solid;
  border-radius: 16px;
  border-color: #ffee43;
  text-align: left;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
`

const SearchResult = styled.div`
  font-size: 2em;
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

`


const SearchResultsList = (props) => {
  const handleClick = (routeName) => {
    console.log(routeName)
    props.history.push(`/buses/${routeName}`)
  };
  const { results, display } = props;
  if (display === false) return null;
  return (
    <StyledDiv className='search-results'>
      {display &&
        results.map((result, index) =>
        (
          <SearchResult className='search-result' key={result.id} onClick={() => handleClick(result.shortName)}>
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

export default withRouter(SearchResultsList);
