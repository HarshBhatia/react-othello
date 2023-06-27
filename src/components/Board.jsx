import Tile from "./Tile";

export default function Board({ board, onClick }) {
  return (
    <div className="board-frame">
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((t, colIndex) => (
            <div
              data-key={`${rowIndex}-${colIndex}`}
              key={`${rowIndex}-${colIndex}`}
              className="grid-item"
            >
              <Tile tile={t} onClick={() => onClick(rowIndex, colIndex)} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
