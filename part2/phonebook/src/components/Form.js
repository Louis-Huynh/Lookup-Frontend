import React from "react";
import Input from "./Input";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const Form = ({
  handleSubmit,
  newName,
  handleInput,
  newNumber,
  handleNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Wrapper>
        <Input value={newName} handler={handleInput} label={"Name"} />
        <Input value={newNumber} handler={handleNumber} label={"Number"} />

        <Button type="submit" style={{ margin: "0 20%" }}>
          add
        </Button>
      </Wrapper>
    </form>
  );
};

export default Form;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
`;
