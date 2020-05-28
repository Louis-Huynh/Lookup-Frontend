import React from "react";

const Notification = ({ message }) => {
  if (message === "") {
    return <button>button</button>;
  } else if (message === null) {
    return null;
  } else {
    return <p className="success">{message}</p>;
  }
};

export default Notification;
