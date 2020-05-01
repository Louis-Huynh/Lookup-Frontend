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
  console.log("novotes", noVotes);
  return noVotes === undefined ? <p>no votes yet</p> : <p>has {noVotes}</p>;
};

const Favorite = ({ favorite }) => {
  return favorite === undefined ? <p></p> : <p>{favorite}</p>;
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
  const [favorite, setFavorite] = useState(-1);

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
  // console.log("selected", selected);

  const voteNow = () => {
    if (selected >= 0) {
      const temp = [...vote];
      temp[selected]++;
      addVote(temp);
    }
    mostVoted();
  };

  const mostVoted = () => {
    let temp = Math.max(...vote);
    console.log("temp: ", temp);
    for (let i = 0; i < vote.length; i++) {
      if (temp === vote[i]) {
        console.log("i is the biggest index: ", i);
        setFavorite(i);
      }
    }
  };

  return (
    <div>
      <Anecdote quote={anecdotes[selected]} selected={selected} />
      <Vote noVotes={vote[selected]} />
      <Button vote={voteNow} text="Vote it" />
      <Button vote={rando} text="Random Dancing" />
      {/* <Button vote={mostVoted} text="chimy" /> */}

      <Favorite favorite={anecdotes[favorite]} />

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
