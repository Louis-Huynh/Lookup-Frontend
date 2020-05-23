import React, { useState, useEffect } from "react";
import Display from "./components/Display";
import Form from "./components/Form";
import Search from "./components/Search";
import axios from "axios";

const App = () => {
  const [gronker, setGronker] = useState([]);

  const hook = () => {
    console.log("doing something");
    axios.get("http://localhost:3001/notes").then((response) => {
      console.log("promise fulfilled");
      setGronker(response.data);
    });
  };

  useEffect(hook, []);

  console.log("render", gronker.length, "notes");
  const promise = axios.get("http://localhost:3001/notes");
  console.log("chikey breeky", promise);

  axios.get("http://localhost:3001/persons").then((response) => {
    let data = response.data;
    console.log("hello from the other side:", data);
  });
  useEffect(() => {
    console.log("effect");

    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promised fulfilled");
      setPersons(response.data);
    });
  }, []);

  const [persons, setPersons] = useState([]);
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

  const cheeto = () => {
    persons;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <button onClick={() => setGronker(gronker + 1)}>clicker</button>
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
