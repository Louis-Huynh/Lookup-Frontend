import React from "react";

const Notes = ({ note, toggleImportant }) => {
  const label = note.important ? "mark as unimportant" : "mark as important";
  return (
    <li>
      {note.content}
      <button type="button" onClick={toggleImportant}>
        {label}
      </button>
    </li>
  );
};

export default Notes;
