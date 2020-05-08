import React, { useState } from "react";
import Display from "./components/Display";
import Form from "./components/Form";
import Search from "./components/Search";

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
  const [valueSearch, setValueSearch] = useState("");

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
      setNewNumber("");
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
    setValueSearch(event.target.value);
    const donCheet = persons.filter((person) => {
      return person.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    setFilterSearch(donCheet);
  };

  const entriesShow = valueSearch === "" ? persons : filterSearch;

  const displayFiltered = entriesShow.map((entry) => {
    return (
      <li key={entry.name}>
        {entry.name} {entry.number}
      </li>
    );
  });

  console.log("filter search", filterSearch);

  return (
    <div>
      <h2>Phonebook</h2>
      <Search handleSearch={handleSearch} />

      <h2>New entry</h2>
      <Form
        handleSubmit={handleSubmit}
        newName={newName}
        handleInput={handleInput}
        newNumber={newNumber}
        handleNumber={handleNumber}
      />

      <h2>Numbers</h2>
      <Display displayFiltered={displayFiltered} />
    </div>
  );
};

export default App;
