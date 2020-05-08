import React from "react";

const Search = ({ handleSearch }) => {
  return (
    <span>
      Find
      <input onChange={handleSearch} />
    </span>
  );
};

export default Search;
