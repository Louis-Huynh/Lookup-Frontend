import React, { useState, useEffect } from "react";
import Display from "./components/Display";
import Form from "./components/Form";
import Search from "./components/Search";
import personServ from "./services/personServ";

const App = () => {
  useEffect(() => {
    console.log("effect");
    personServ.getAll().then((responseData) => {
      console.log("promised fulfilled");
      setPersons(responseData);
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
      const newEntry = { name: newName, number: newNumber };

      personServ
        .add(newEntry)
        .then((responseData) => {
          setPersons(persons.concat(responseData));
        })
        .catch((error) => console.log("error: ", error));
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
      <li key={entry.id}>
        {entry.name} {entry.number}
      </li>
    );
  });

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
      {}
      <Display displayFiltered={displayFiltered} />
    </div>
  );
};

export default App;
