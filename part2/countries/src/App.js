import React, { useState, useEffect } from "react";
import axios from "axios";
import Display from "./components/Display";

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("promise fulfilled", response.data);
      setData(response.data);
    });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const selectSearch = (aCountry) => {
    console.log("more information on", aCountry);

    setSearch(aCountry);
  };

  const entriesShow = data.filter((entry) => {
    let lowerEntry = entry.name.toLowerCase();
    let compare = search.toLowerCase();

    return lowerEntry.includes(compare);
  });
  console.log("number of results", entriesShow.length);

  return (
    <div>
      Find countries <input onChange={handleSearch}></input>
      <Display anArray={entriesShow} selectSearch={selectSearch} />
    </div>
  );
}

export default App;
