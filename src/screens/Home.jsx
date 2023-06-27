import React from "react";
import "./Home.css";

function WavyHeading({ text }) {
  return (
    <div className="waviy">
      {text
        .toUpperCase()
        .split("")
        .map((c, i) => (
          <span style={{ "--i": i }}>{c}</span>
        ))}
    </div>
  );
}
export default function Home({ onClickPlay }) {
  return (
    <div className="home-container">
      <h1>Adventures in</h1>
      <WavyHeading text={"Othello"} />
      <button className="button" onClick={onClickPlay}>
        Play Vs AI
      </button>
      <button className="button" onClick={onClickPlay}>
        Play Vs Player
      </button>
    </div>
  );
}
