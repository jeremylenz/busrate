import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'

const SearchResultsList = (props) => {
  const handleClick = (routeName) => {
    console.log(routeName)
    props.history.push(`/buses/${routeName}`)
  };
  const { results, display } = props;
  if (display === false) return null;
  return (
    <div className='search-results'>
      {display &&
        results.map((result, index) =>
        (
          <div className='search-result' key={result.routeName} onClick={() => handleClick(result.routeName)}>
            <br></br>
            <p>{result.routeName}
              <span> - {result.routeDescription}</span>
            </p>
            <br></br>
            {index < results.length - 1 &&
              <hr></hr>
            }
          </div>
        )
      )}
    </div>
  );
}

export default withRouter(SearchResultsList);
