import React from "react";

const Note = ({ anObj }) => {
  return (
    <li>
      {anObj.content} and their id: {anObj.id}
    </li>
  );
};

export default Note;
