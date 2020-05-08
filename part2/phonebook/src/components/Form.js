import React from "react";
import Input from "./Input";

const Form = ({
  handleSubmit,
  newName,
  handleInput,
  newNumber,
  handleNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Input value={newName} handler={handleInput} label={"name"} />
        <Input value={newNumber} handler={handleNumber} label={"number"} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
