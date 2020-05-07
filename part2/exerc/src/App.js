import React, { useState } from "react";
import Course from "./components/Course";

const App = () => {
  const course = [
    {
      id: 1,
      name: "Half Stack application development",
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "The art of war",
          exercises: 87,
          id: 4,
        },
      ],
    },
    {
      id: 2,
      name: "Node.js",
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  const [cheeto, setCheeto] = useState([...course]);
  const [text, setText] = useState("type it up");
  const [title, setTitle] = useState("title");

  const addNote = (event) => {
    event.preventDefault();
    // console.log("button clicked", event.target);

    const noteObj = {
      id: course.length + 1,
      content: text,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };
    setCheeto(cheeto.concat(noteObj));
    setText("");
  };

  const handleNoteChange = (event) => {
    setText(event.target.value);
  };
  console.log("the mailman", cheeto);

  return (
    <div>
      {/* {cheeto.map((courses, i) => {
        return <Course course={courses} key={courses.id} />;
      })} */}
      <form onSubmit={addNote}>
        <input value={text} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
