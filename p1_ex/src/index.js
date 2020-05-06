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

const Anecdote = ({ selected, quote }) => {
  return selected < 0 ? <p>Quote me</p> : <p>{quote}</p>;
};

const Vote = ({ noVotes }) => {
  return noVotes === undefined ? (
    <p>Start browsing quotes</p>
  ) : (
    <p>has {noVotes} </p>
  );
};

const Favorite = ({ favorite, maxVoted }) => {
  return maxVoted < 1 ? <p>No favorites, vote now!</p> : <p>{favorite}</p>;
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

  //------------Anecdote--------------
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(-1);
  const [vote, addVote] = useState(
    Array.apply(null, Array(anecdotes.length)).map(Number.prototype.valueOf, 0)
  );
  console.log("vote distribution", vote);

  const rando = () => {
    const min = Math.ceil(0);
    const max = Math.floor(anecdotes.length);
    let cheeto = Math.floor(Math.random() * (max - min) + min);

    while (cheeto === selected) {
      cheeto = Math.floor(Math.random() * (max - min) + min);
      console.log("retrying");
    }
    setSelected(cheeto);
  };

  const voteNow = () => {
    if (selected >= 0) {
      const temp = [...vote];
      temp[selected]++;
      addVote(temp);
    }
  };

  const maxVoted = Math.max(...vote);
  console.log("max voted", maxVoted);
  const popQuote = anecdotes[vote.indexOf(maxVoted)];

  const animals = [
    { name: "cheeto", type: "cheeta" },
    { name: "crimson", type: "iguana" },
    { name: "pond", type: "koi" },
    { name: "mister", type: "iguana" },
  ];

  let yup = [];
  // const typeo = animals.map((animals) => {
  //   yup = yup.concat(animals.name);
  // });

  // for (const animal of yup) {
  //   console.log("hanimal", animal);
  // }

  const amount = [
    { amount: 300 },
    { amount: 230 },
    { amount: 3232 },
    { amount: 32143 },
  ];

  const mankey = amount.reduce(
    (sum, iterable) => sum + iterable.amount,
    -30000
  );
  console.log("total", mankey);

  const typeo = animals.map((animals) => {
    return animals.name + " is a " + animals.type;
  });
  console.log("hy", typeo);

  const iguanas = animals.filter((animals) => {
    return animals.type === "iguana";
  });

  // const printEm = iguanas.map((iguanas) => {
  //   console.log("their names: ", iguanas.name);
  // });
  return (
    <div>
      <Anecdote quote={anecdotes[selected]} selected={selected} />
      <Vote noVotes={vote[selected]} />
      <Favorite favorite={popQuote} maxVoted={maxVoted} />
      <Button vote={voteNow} text="Like" />
      <Button vote={rando} text="Random Quote" />

      <br />
      <br />
      <br />
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
