import React from "react";

// const Notes = ({ notes }) => {
//   const cheeto = notes.map((x) => {
//     return <li key={x.id}>{x.content}</li>;
//   });

//   return (
//     <div>
//       <ul> {cheeto}</ul>
//     </div>
//   );
// };

const Notes = ({ note }) => {
  return <li>{note.content}</li>;
};

export default Notes;
