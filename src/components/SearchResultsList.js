import React from 'react';
import PropTypes from 'prop-types';

const SearchResultsList = (props) => {
  const handleClick = (routeName) => {
    console.log(routeName)
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

export default SearchResultsList;
