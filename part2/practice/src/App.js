import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
// import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      console.log("promised fulfilled");

      setNotes(initialNotes);
    });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    const noteObj = {
      content: content,
      date: new Date(),
      important: Math.random() > 0.5,
    };

    noteService.create(noteObj).then((initialNotes) => {
      console.log(initialNotes);

      setNotes(notes.concat(initialNotes));
      setContent("");
    });
  };

  const inputHandler = (event) => {
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
    // const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((element) => element.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(changedNote, id)
      .then((initialNotes) => {
        console.log("here's the response: ", initialNotes);

        setNotes(
          notes.map((aNote) => {
            return aNote.id === id ? initialNotes : aNote;
          })
        );
      })
      .catch((response) => {
        alert(`'${note.content}' is currently unavailable on the db`);
        setNotes(notes.filter((note) => note.id !== id));
      });
  };

  const removeSomething = (id) => {
    const note = notes.find((element) => element.id === id);

    noteService
      .deleteIt(id)
      .then((response) => {
        console.log("success", response);
        setNotes(notes.filter((aNote) => aNote.id !== id));
      })
      .catch((response) => {
        console.log("failed", response);
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
            <Note
              key={note.id}
              note={note}
              toggleImportant={() => toggleImportant(note.id)}
              removeSomething={() => removeSomething(note.id)}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default App;
