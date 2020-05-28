import React from "react";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  } else if (message === "") {
    return <div></div>;
  }

  return <div className="error">{message}</div>;
};

export default Notification;
