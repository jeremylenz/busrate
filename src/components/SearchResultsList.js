import React from 'react';
import PropTypes from 'prop-types';

const SearchResultsList = (props) => {
  const handleClick = (routeName) => {
    console.log(routeName)
  };
  const { results } = props;
  return (
    <div className='search-results'>
      {results.length > 0 &&
        results.map((result, index) =>
        (
          <div className='search-result' onClick={() => handleClick(result.routeName)}>
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

export default SearchResultsList;
