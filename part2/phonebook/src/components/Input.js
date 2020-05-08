import React from "react";

const Input = ({ value, handler, label }) => {
  return (
    <p>
      {label}: <input value={value} onChange={handler} />
    </p>
  );
};

export default Input;
