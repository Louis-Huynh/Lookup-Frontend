import React from "react";

import styled from "styled-components";

const Footer = (props) => {
  return (
    <Wrapper>
      <FooterText>{props.text}</FooterText>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  color: white;
  text-align: center;
  background: black;
  border: 1px solid black;
  bottom: 0;
  position: absolute;
  width: 99%;
`;

const FooterText = styled.p``;
