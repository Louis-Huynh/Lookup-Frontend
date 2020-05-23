import React, { useState, useEffect } from "react";
import Notes from "./components/Notes";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/notes").then((response) => {
      console.log("promised fulfilled");

      setNotes(response.data);
    });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    const noteObj = {
      content: content,
      date: new Date(),
      important: Math.random() > 0.5,
    };

    axios.post("http://localhost:3001/notes", noteObj).then((response) => {
      console.log(response);

      setNotes(notes.concat(response.data));
      setContent("");
    });
  };

  const inputHandler = (event) => {
    console.log("apple rush", event.target.value);

    setContent(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => {
        return note.important;
      });

  const showAllHandler = () => {
    console.log("showAll", showAll);

    setShowAll(!showAll);
  };

  const toggleImportant = (id) => {
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((element) => element.id === id);
    const changedNote = { ...note, important: !note.important };

    axios.put(url, changedNote).then((response) => {
      console.log("here's the response: ", response);

      setNotes(
        notes.map((aNote) => {
          return aNote.id === id ? response.data : aNote;
        })
      );
    });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input onChange={inputHandler} value={content} />
        <button type="button" onClick={showAllHandler}>
          show {showAll ? "important" : "all"}
        </button>
        <button type="submit">save</button>
      </form>
      <ul>
        {notesToShow.map((note) => {
          return (
            <Notes
              key={note.id}
              note={note}
              toggleImportant={() => toggleImportant(note.id)}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default App;
