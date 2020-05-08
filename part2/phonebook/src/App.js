import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterSearch, setFilterSearch] = useState([...persons]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let foundIt = false;

    for (const person of persons) {
      if (newName === person.name) {
        foundIt = true;
        alert(`${newName} has already been added`);
      }
    }

    if (foundIt) {
      setNewName("");
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
    }
  };
  const handleInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    const donCheet = persons.filter((person) => {
      return person.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    setFilterSearch(donCheet);
  };

  const displayFiltered = filterSearch.map((person) => {
    return (
      <li key={person.name}>
        {person.name} {person.number}
      </li>
    );
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <span>
        Find
        <input onChange={handleSearch} />
      </span>
      <h2>New entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <p>
            name: <input value={newName} onChange={handleInput} />
          </p>
          <p>
            number: <input value={newNumber} onChange={handleNumber} />
          </p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>{displayFiltered}</ul>
    </div>
  );
};

export default App;
