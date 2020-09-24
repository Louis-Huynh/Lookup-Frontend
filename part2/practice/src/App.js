import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
// import axios from "axios";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [showAll, setShowAll] = useState(false);
  //notification messages
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
      setSuccessMessage(
        `${initialNotes.content} has been added to the server!`
      );

      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);

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
        setErrorMessage(`${note.content} is not part of the server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);

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
      <Notification message={successMessage} />
      <button type="button" onClick={showAllHandler}>
        show {showAll ? "important" : "all"}
      </button>

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
      <form onSubmit={submitHandler}>
        <input onChange={inputHandler} value={content} />

        <button type="submit">save</button>
      </form>
      <Notification message={errorMessage} />

      <Footer />
    </div>
  );
};

export default App;
