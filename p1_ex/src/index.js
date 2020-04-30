import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => {
  return <button onClick={props.vote}>{props.text}</button>;
};

const Display = (props) => {
  return (
    <p>
      {props.type}:{props.value}
    </p>
  );
};

const App = () => {
  const [stats, changeStats] = useState({ good: 0, neutral: 0, bad: 0 });

  const voteGood = () => {
    changeStats({
      ...stats,
      good: stats.good + 1,
    });
  };

  const voteNeutral = () => {
    changeStats({
      ...stats,
      neutral: stats.neutral + 1,
    });
  };

  const voteBad = () => {
    changeStats({
      ...stats,
      bad: stats.bad + 1,
    });
  };

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button vote={voteGood} text="Good" />
      <Button vote={voteNeutral} text="Neutral" />
      <Button vote={voteBad} text="Bad" />

      <h2>Statistics</h2>
      <Display type="Good" value={stats.good} />
      <Display type="Neutral" value={stats.neutral} />
      <Display type="Bad" value={stats.bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
