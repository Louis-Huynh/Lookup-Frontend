import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Search from "./components/Search";
import personServ from "./services/personServ";
import "./index.css";
import Notification from "./components/Notification";

import Header from "./components/Header";
import HomeSection from "./components/homeSection";
import ModalContainer from "./components/ModalContainer";

import Results from "./components/Results";

import Button from "@material-ui/core/Button";

import styled from "styled-components";

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

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "5px",
          justifyContent: "space-between",
        }}
        key={entry.id}
      >
        <div style={{ borderBottom: "1px solid black", width: "100%" }}>
          {entry.name} : {entry.number}
        </div>
        <div style={{ borderBottom: "1px solid black" }}>
          <button type="click" onClick={() => handleDelete(entry.id)}>
            remove
          </button>
        </div>
      </div>
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
    <Wrapper>
      <Header title="Louis's phonebook" />
      <ModalContainer
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        handleSubmit={handleSubmit}
        handleInput={handleInput}
        handleNumber={handleNumber}
        newName={newName}
        newNumber={newNumber}
      />

      <ButtonWrapper>
        <Button onClick={openModal}>
          <i class="fas fa-user-plus"></i> &nbsp; Add Contacts
        </Button>
      </ButtonWrapper>
      <Notification message={successMessage} />
      <Notification message={errorMessage} />
      <MainWrapper>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <HomeSection handleSearch={handleSearch} />
          <Results displayFiltered={displayFiltered} />
        </div>
      </MainWrapper>
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  margin: 0;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: -1;
`;

const ButtonWrapper = styled.div`
  text-align: right;
`;
