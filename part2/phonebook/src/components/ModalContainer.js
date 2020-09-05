import React from "react";
import Form from "./Form";
import { Modals } from "./Modals";
import styled from "styled-components";
const ModalContainer = ({
  isOpen,
  onRequestClose,
  contentLabel,
  newName,
  newNumber,
  handleInput,
  handleNumber,
  handleSubmit,
}) => {
  return (
    <Modals
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      ariaHideApp={false}
    >
      <ButtonWrapper>
        <button
          onClick={onRequestClose}
          // style={{
          //   display: "flex",
          //   justifyContent: "right",
          //   alignItems: "right",
          // }}
        >
          X
        </button>
      </ButtonWrapper>

      <h2>New entry</h2>
      <Form
        handleSubmit={handleSubmit}
        newName={newName}
        handleInput={handleInput}
        newNumber={newNumber}
        handleNumber={handleNumber}
      />
    </Modals>
  );
};

export default ModalContainer;

const ButtonWrapper = styled.div`
  width: 100%;
  text-align: right;
`;
