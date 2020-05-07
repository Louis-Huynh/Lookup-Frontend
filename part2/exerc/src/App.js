import React, { useState } from "react";
import Note from "./components/Note";

const App = () => {
  const notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2020-01-10T17:30:31.098Z",
      important: true,
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2020-01-10T18:39:34.091Z",
      important: false,
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2020-01-10T19:20:14.298Z",
      important: true,
    },
  ];

  const [cheeto, setCheeto] = useState([...notes]);
  const [text, setText] = useState("type it up");
  const [showAll, setShowAll] = useState(false);

  const addNote = (event) => {
    event.preventDefault();
    const noteObj = {
      content: text,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: cheeto.length + 1,
    };
    setCheeto(cheeto.concat(noteObj));
    setText("");
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setText(event.target.value);
  };

  const notesToShow = showAll
    ? cheeto
    : cheeto.filter((aCheeto) => {
        return aCheeto.important;
      });

  return (
    <div>
      <form onSubmit={addNote}>
        <input value={text} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>

      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "Important" : "All"}
      </button>
      <ul>
        {notesToShow.map((cheet, i) => {
          return <Note anObj={cheet} key={i} />;
        })}
      </ul>
    </div>
  );
};

export default App;
