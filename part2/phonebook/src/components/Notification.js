import React from "react";

const Notification = ({ message }) => {
  if (message === "") {
    return <></>;
  } else if (message === null) {
    return null;
  } else if (message.includes("not")) {
    return <p className="fail">{message}</p>;
  } else {
    return <p className="success">{message}</p>;
  }
};

export default Notification;
