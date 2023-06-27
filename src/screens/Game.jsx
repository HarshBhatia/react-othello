import React from "react";
import useSound from "use-sound";
import clickSound from "../assets/click.mp3";
import Board from "../components/Board";

function isInBoard(x, y) {
  return x >= 0 && y >= 0 && x < 8 && y < 8;
}

function getIndicesOfElement(arr, element) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === element) {
        return [i, j]; // Return as soon as the element is found
      }
    }
  }
  return -1; // Return -1 if the element is not found
}

export default function Game() {
  const [board, setBoard] = React.useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [turn, setTurn] = React.useState(1);

  const [playClick] = useSound(clickSound, { volume: 1 });

  function getTilesToFlip(board, x, y, dx, dy, color) {
    let newX = x + dx;
    let newY = y + dy;
    let tilesToFlip = [];
    while (isInBoard(newX, newY) && board[newX][newY] === 3 - color) {
      tilesToFlip.push({ x: newX, y: newY });
      newX += dx;
      newY += dy;
    }
    if (isInBoard(newX, newY) && board[newX][newY] === color) {
      return tilesToFlip;
    }

    return [];
  }

  function calculateMoves(board, color) {
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        if (board[x][y] !== 0) continue; // Skip if not empty

        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            if (dx !== 0 || dy !== 0) {
              if (getTilesToFlip(board, x, y, dx, dy, color).length) {
                board[x][y] = 3; // If the move is legal, mark it on the board
              }
            }
          }
        }
      }
    }
    return board;
  }

  React.useEffect(() => {
    if (turn == 1) {
      if (
        board
          .map((row) => row.filter((x) => x == 1).length)
          .reduce((p, c) => p + c, 0) == 0 ||
        board
          .map((row) => row.filter((x) => x == 1 || x == 2).length)
          .reduce((p, c) => p + c, 0) == 64
      ) {
        alert("You win!");
      }
      setTimeout(() => {
        let resetedBoard = board.map((row) =>
          row.map((cell) => (cell === 3 ? 0 : cell))
        );
        let possibleTurn = getIndicesOfElement(
          calculateMoves(resetedBoard, turn),
          3
        );
        if (possibleTurn == -1) {
          setTurn(3 - turn);
        } else {
          updateBoard(possibleTurn[0], possibleTurn[1]);
        }
      }, 1500);
    } else {
      setBoard((prevBoard) => {
        let resetBoard = prevBoard.map((row) =>
          row.map((cell) => (cell === 3 ? 0 : cell))
        );
        return calculateMoves(resetBoard, turn);
      });
    }
  }, [turn]);

  function updateBoard(x, y) {
    // if (board[x][y] !== 3) return; // Must place on a playable spot
    playClick();

    let newBoard = board.map((row) =>
      row.map((cell) => (cell === 3 ? 0 : cell))
    ); // Reset the playable cells

    let tilesToFlip = [];
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx !== 0 || dy !== 0) {
          tilesToFlip = tilesToFlip.concat(
            getTilesToFlip(newBoard, x, y, dx, dy, turn)
          );
        }
      }
    }

    if (tilesToFlip.length === 0) return; // If no flips, the move is illegal

    newBoard[x][y] = turn; // Place the tile
    for (let i = 0; i < tilesToFlip.length; i++) {
      newBoard[tilesToFlip[i].x][tilesToFlip[i].y] = turn; // Flip opponent tiles
    }

    setBoard(newBoard);
    setTurn(3 - turn); // Switch turn
  }

  return (
    <div className="container">
      <div id="score">
        <p>
          WHITE:{" "}
          {board
            .map((row) => row.filter((x) => x == 2).length)
            .reduce((p, c) => p + c, 0)}
        </p>
        <p>
          BLACK:{" "}
          {board
            .map((row) => row.filter((x) => x == 1).length)
            .reduce((p, c) => p + c, 0)}
        </p>
      </div>
      <Board board={board} onClick={updateBoard} />
      <p>Turn: {["", "BLACK", "WHITE"][turn]}</p>
    </div>
  );
}
