import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("what is this", event.target);
    const temp = { name: newName };
    setPersons(persons.concat(temp));
  };
  const handleInput = (event) => {
    setNewName(event.target.value);
  };
  console.log("person", persons);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => {
          return <li key={person.name}>{person.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default App;
