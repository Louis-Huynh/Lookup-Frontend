import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

const Modals = (props) => {
  return (
    <ModalWrapper>
      <ModalItem
        isOpen={props.isOpen}
        onRequestClose={props.onRequestClose}
        contentLabel={props.contentLabel}
        ariaHideApp={false}
      >
        {props.children}
      </ModalItem>
    </ModalWrapper>
  );
};

export { Modals };

const ModalWrapper = styled.div`
  height: 75%;
`;

const ModalItem = styled(Modal)`
  text-align: center;
  border: 1px solid black;
  // margin: 10% 15%;
  margin-left: 35%;
  margin-top: 10%;
  height: 45vh;
  width: 30vw;
  background-color: white;
`;
