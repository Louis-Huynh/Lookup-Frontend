import React, { useState, useEffect } from "react";
import Display from "./components/Display";
import Form from "./components/Form";
import Search from "./components/Search";
import personServ from "./services/personServ";
import "./index.css";
import Notification from "./components/Notification";

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
  //notif
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let phoneUpdate = false;
    let isDuplicate = false;
    let confirmPhone = false;

    for (const person of persons) {
      if (newName === person.name && person.number !== newNumber) {
        phoneUpdate = true;
        confirmPhone = window.confirm(
          `${person.name} already exist in the phonebook. Change its phone number?`
        );
      } else if (newName === person.name) {
        isDuplicate = true;
      }
    }

    if (phoneUpdate) {
      if (confirmPhone) {
        const anObj = persons.find((person) => person.name === newName);
        const updatedObj = {
          ...anObj,
          number: newNumber,
        };
        personServ
          .update(anObj.id, updatedObj)
          .then((data) => {
            setPersons(
              persons.map((aPerson) => {
                return aPerson.name === anObj.name ? updatedObj : aPerson;
              })
            );
          })
          .catch((error) => {
            setErrorMessage(`${anObj.name} is not part of the server!`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
          });
      } else {
        console.log("No changes will be made to the phone number");
      }
    } else if (isDuplicate) {
      alert(`${newName} has already been added`);
      console.log("Duplicate entry");
    } else {
      const newEntry = { name: newName, number: newNumber };

      personServ
        .add(newEntry)
        .then((responseData) => {
          setPersons(persons.concat(responseData));
          setSuccessMessage(`${responseData.name} added`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 3000);
        })
        .catch((error) => {
          const errMsg = error.response.data.error;
          console.log("error: ", errMsg);
          setErrorMessage(errMsg);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        });

      setNewName("");
      setNewNumber("");
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
      <li className="pudding" key={entry.id}>
        {entry.name} {entry.number}
        <button type="click" onClick={() => handleDelete(entry.id)}>
          remove
        </button>
      </li>
    );
  });

  const handleDelete = (id) => {
    const result = window.confirm(
      "Are you sure you wish to delete your work of art?"
    );

    const entry_soon_deleted = persons.find((aPerson) => aPerson.id === id);

    if (result) {
      personServ
        .deleteEntry(id)
        .then((response) => {
          console.log("success: ", response);
          setSuccessMessage(`${entry_soon_deleted.name} deleted`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 3000);
          setPersons(
            persons.filter((aPerson) => {
              return aPerson.id !== id;
            })
          );
        })
        .catch((err) => console.log(`Failed to delete ${entry_soon_deleted}`));
    } else {
      console.log("no changes made");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={successMessage} />
      <Notification message={errorMessage} />

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
