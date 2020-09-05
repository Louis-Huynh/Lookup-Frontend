import React from "react";

import styled from "styled-components";

const Header = (props) => {
  return (
    <Wrapper>
      <HeaderText>{props.title}</HeaderText>
      {props.children}
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  text-align: center;
  // background: gray;
  border-bottom: 1px solid black;
  margin: 0 33%;
`;

const HeaderText = styled.p`
  font-size: 25px;
`;
