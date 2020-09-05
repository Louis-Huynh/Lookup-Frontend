import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const Results = ({ displayFiltered }) => {
  return (
    <Wrapper>
      <ResultsInfo>{displayFiltered}</ResultsInfo>
    </Wrapper>
  );
};

export default Results;

const Wrapper = styled.div`
  width: 60vw;
`;

const ResultsInfo = styled.div`
  border: 1px solid black;
  border-radius: 3px;
  padding: 2%;
  margin: 4%;
`;
