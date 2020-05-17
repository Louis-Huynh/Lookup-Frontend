import React, { useState, useEffect } from "react";
// import Notes from "./components/Notes";
import Axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    console.log("Effect");

    Axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promised fulfilled");

      setPersons(response.data);
    });
  }, []);

  const ahoy = persons.map((person) => {
    return (
      <li key={person.name}>
        {person.name} and {person.number}
      </li>
    );
  });

  return (
    <div>
      <ul>{ahoy}</ul>
    </div>
  );
};

export default App;
