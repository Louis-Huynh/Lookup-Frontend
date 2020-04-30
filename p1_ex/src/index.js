import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => {
  return <button onClick={props.vote}>{props.text}</button>;
};

const Statistics = ({
  theGood,
  theNeutral,
  theBad,
  theTotal,
  theAverage,
  theGoodPercent,
}) => {
  if (theTotal === 0) return <p>Let's start clicking!</p>;
  return (
    <div>
      <p>Good {theGood}</p>
      <p>Neutral {theNeutral}</p>
      <p>Bad {theBad}</p>
      <p>Total {theTotal}</p>
      <p>Average {theAverage}</p>
      <p>positive {theGoodPercent}</p>
    </div>
  );
};

const App = () => {
  const [stats, changeStats] = useState({ good: 0, neutral: 0, bad: 0 });
  const [avg, changeAvg] = useState(0);
  const [total, changeTotal] = useState(0);
  const [goodPecent, changeGoodPercent] = useState(0);

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

  // const calcAverage = () => {
  //   let temp = 0.0;
  //   for (let i in stats) {
  //     if (i === "good") temp += stats[i];
  //     else if (i === "bad") temp -= stats[i];
  //   }
  //   changeAvg(temp / total);
  // };

  // const calcGoodPercent = () => {
  //   changeGoodPercent(stats.good / total);
  // };

  const calcTotal = () => changeTotal(total + 1);

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button vote={voteGood} text="Good" />
      <Button vote={voteNeutral} text="Neutral" />
      <Button vote={voteBad} text="Bad" />

      <h2>Statistics</h2>
      <Statistics
        theGood={stats.good}
        theBad={stats.bad}
        theNeutral={stats.neutral}
        theTotal={total}
        theAverage={(stats.good - stats.bad) / total}
        theGoodPercent={(stats.good / total) * 100}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
