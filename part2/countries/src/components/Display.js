import React from "react";
import Weather from "./Weather";

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map((language) => {
          return <li key={language.name}>{language.name}</li>;
        })}
      </ul>
      <h3>Skrilla(currencies)</h3>
      <ul>
        {country.currencies.map((dolla) => {
          return <li key={dolla.name}>{dolla.name}</li>;
        })}
      </ul>
      <img
        src={country.flag}
        alt="country's flag"
        width="150px"
        height="100px"
      />
      <Weather country={country} />
    </div>
  );
};

const Display = ({ anArray, selectSearch }) => {
  //   const doSomething = (value) => {
  //     console.log("hello");

  //     return <Country country={value} />;
  //   };
  const printArray = anArray.map((entry, i) => {
    return (
      <li key={i}>
        {entry.name}
        <button
          onClick={() => {
            selectSearch(entry.name);
            // doSomething(entry.name);
          }}
        >
          Click
        </button>
      </li>
    );
  });

  if (anArray.length === 0) {
    console.log("kyros the toy soldier");
    return <p>nothing to return right now</p>;
  } else if (anArray.length > 10) {
    return <p>More details are necessary! More more.</p>;
  } else if (anArray.length <= 10 && anArray.length > 1) {
    return (
      <div>
        <p>List of Countries</p>
        <ul>{printArray}</ul>
      </div>
    );
  } else {
    return (
      <div>
        <Country country={anArray[0]} />
      </div>
    );
  }
};

export default Display;
