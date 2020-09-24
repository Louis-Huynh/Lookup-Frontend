import React from "react";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

const Search = ({ handleSearch }) => {
  return (
    <Wrapper>
      <TextField
        id="outlined-basic"
        label="Who?"
        variant="outlined"
        onChange={handleSearch}
      />
    </Wrapper>
  );
};

export default Search;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: right;
  justify-content: right;
  margin: 5% 8%;
`;
