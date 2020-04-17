import React from "react";
import ReactDOM from "react-dom";

const Hello = (pingu) => {
  return (
    <div>
      <span>My boy with the cheezuts, ya yeet my yop</span>
      <br />
      <p>Hello {pingu.name}</p>
      <p>
        Ruler of:
        {pingu.heir === "Englund" ? "Englund deez nuts" : "sha sha sha swoosh"}
      </p>
    </div>
  );
};

const Footer = (power) => {
  return (
    <>
      <p>suck on this</p>
      <a href={power.url}>Hello I'm a link</a>
      <p>Is this thing on {power.url}</p>
    </>
  );
};

const Array = () => {
  return [<li>cheezuts</li>, <li>buttfudge</li>, <li>creamcorn</li>];
};

const App = () => {
  console.log("Hello from the console");
  const time = new Date();
  const a = 10;
  const b = 20;
  const name = "PETA SEVENTY DOLLARS";
  const heir = "Hair to NIVEA SPORTS EMPIRE";
  const cheeseBoard = ["sipping", "on", "apple", "juice"];
  return (
    <div>
      <Hello name="Adam" heir="Throne of the GREAT NORD" />
      <Hello name="Michael" heir="Englund" />
      <Hello name="Samuel" />
      <Hello name="Key" />
      <Hello name={name} heir={heir} />
      <h1>Hello it is {time.toString()}</h1>

      <p>
        Another one: {a} + {b} = {a + b}
      </p>
      <ul>
        <Array />
      </ul>
      <p>{cheeseBoard.forEach((element) => console.log(element))}</p>
      <Footer url="https://reddit.com/r/meirl" />
    </div>
  );
};

// ReactDOM.render(<App />, document.getElementById("root"));
export default App;
