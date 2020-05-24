import React from "react";

const Notes = ({ note, toggleImportant, removeSomething }) => {
  const label = note.important ? "mark as unimportant" : "mark as important";
  return (
    <li>
      {note.content}
      <button type="button" onClick={toggleImportant}>
        {label}
      </button>
      <button type="button" onClick={removeSomething}>
        remove
      </button>
    </li>
  );
};

export default Notes;
