import React from "react";
import Notes from "./components/Notes";

const App = () => {
  const notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true,
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false,
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true,
    },
  ];

  const quickSlow = notes.filter((chinga) => {
    return chinga.important;
  });
  /*
  const chicken = [
    { name: "James", money: 2000 },
    { name: "Ohio", money: 3020 },
    { name: "edoocation", money: 4002 },
    { name: "oodss", money: 4300 },
  ];
  */

  // const reducer = chicken.reduce((accumulator, iterator) => {});

  // console.log("reducer:", reducer);

  console.log("op: ", quickSlow);

  return (
    <div>
      <Notes notes={notes} />
    </div>
  );
};

export default App;
