import React from "react";
import Search from "./Search";
import styled from "styled-components";

const HomeSection = (props) => {
  return (
    <Wrapper>
      <Search handleSearch={props.handleSearch} />
    </Wrapper>
  );
};

export default HomeSection;

const Wrapper = styled.div`
  text-align: center;
`;
