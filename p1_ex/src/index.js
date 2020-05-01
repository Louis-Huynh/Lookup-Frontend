import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => {
  return <button onClick={props.vote}>{props.text}</button>;
};

const Statistics = (props) => {
  if (props.total === 0) {
    if (props.text === "Good")
      return (
        <tr>
          <td>Vote Now</td>
        </tr>
      );
    else
      return (
        <tr>
          <td>&nbsp;</td>
        </tr>
      );
  }
  return (
    <tr>
      <td>{props.text}</td>
      <td> {props.value}</td>
    </tr>
  );
};

const App = () => {
  const [stats, changeStats] = useState({ good: 0, neutral: 0, bad: 0 });
  const [total, changeTotal] = useState(0);

  const voteGood = () => {
    changeStats({
      ...stats,
      good: stats.good + 1,
    });
    calcTotal();
  };

  const voteNeutral = () => {
    changeStats({
      ...stats,
      neutral: stats.neutral + 1,
    });
    calcTotal();
  };

  const voteBad = () => {
    changeStats({
      ...stats,
      bad: stats.bad + 1,
    });
    calcTotal();
  };

  const calcTotal = () => changeTotal(total + 1);
  console.log("total", total);

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button vote={voteGood} text="Good" />
      <Button vote={voteNeutral} text="Neutral" />
      <Button vote={voteBad} text="Bad" />

      <table>
        <tbody>
          <tr>
            <th colSpan={3}>
              <h2>Statistics</h2>
            </th>
          </tr>

          <Statistics total={total} text="Good" value={stats.good} />
          <Statistics total={total} text="Netural" value={stats.neutral} />
          <Statistics total={total} text="Bad" value={stats.bad} />
          <Statistics total={total} text="Total" value={total} />
          <Statistics
            total={total}
            text="Average "
            value={(stats.good - stats.bad) / 100}
          />
          <Statistics
            total={total}
            text="Positive "
            value={(stats.good / total) * 100}
          />
        </tbody>
      </table>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
