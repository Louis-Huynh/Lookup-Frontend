import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => {
  return <button onClick={props.vote}>{props.text}</button>;
};

const Display = (props) => {
  if (props.total === 0) return <p>Let's start clicking!</p>;
  return (
    <p>
      {props.type}:{props.value}
    </p>
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
    // calcAverage();
    // calcGoodPercent();
  };

  const voteNeutral = () => {
    changeStats({
      ...stats,
      neutral: stats.neutral + 1,
    });
    calcTotal();
    // calcAverage();
    // calcGoodPercent();
  };

  const voteBad = () => {
    changeStats({
      ...stats,
      bad: stats.bad + 1,
    });
    calcTotal();
    // calcAverage();
    // calcGoodPercent();
  };

  const calcAverage = () => {
    let temp = 0.0;
    for (let i in stats) {
      if (i === "good") temp += stats[i];
      else if (i === "bad") temp -= stats[i];
    }
    changeAvg(temp / total);
  };

  const calcGoodPercent = () => {
    changeGoodPercent(stats.good / total);
  };

  const calcTotal = () => changeTotal(total + 1);

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button vote={voteGood} text="Good" />
      <Button vote={voteNeutral} text="Neutral" />
      <Button vote={voteBad} text="Bad" />

      <h2>Statistics</h2>
      <Display total={total} type="Good" value={stats.good} />
      <Display total={total} type="Neutral" value={stats.neutral} />
      <Display total={total} type="Bad" value={stats.bad} />
      <Display total={total} type="Total" value={total} />
      {/* <Display total={total} type="Average" value={avg} />
      <Display total={total} type="Good Percent" value={goodPecent} /> */}
      <Display
        total={total}
        type="Average"
        value={(stats.good - stats.bad) / total}
      />
      <Display total={total} type="Good Percent" value={stats.good / total} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
