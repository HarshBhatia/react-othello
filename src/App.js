import "./App.css";
import React from "react";
import Game from "./screens/Game";
import Home from "./screens/Home";

function App() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  return isPlaying ? <Game /> : <Home onClickPlay={() => setIsPlaying(true)} />;
}

export default App;
