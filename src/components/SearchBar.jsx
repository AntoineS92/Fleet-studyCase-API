import React from 'react';

const SearchBar = (props) => {
  return (
    <input
      type="text"
      className="input search-bar"
      name="search"
      placeholder="Search for a movie"
      value={props.value}
      //here we are attributing a new value to the state of the parent Element everytime there is a change in the searchbar
      onChange={(event) => props.handleChange(event.target.value)}
    />
  );
};

export default SearchBar;